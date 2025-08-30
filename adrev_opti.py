# pip install gurobipy if needed; requires a Gurobi license.
import math
import gurobipy as gp
from gurobipy import GRB
import sqlite3
import pandas as pd

db_path = "app_cheng.db"
# Connect to database to dynamically query video statistics, used as inputs to calculate quality score, Q, which is input for optimisation model
conn = sqlite3.connect(db_path)

q = """
SELECT 
    video_id,
    views,
    watch_completion,
    engagement_rate,
    engagement_diversity,
    rewatch,
    nlp_quality,
    compliance
FROM videos;
"""

df = pd.read_sql_query(q, conn)
conn.close()



# ----------------------------
# 1) Inputs (edit these)
# ----------------------------
P = 1_000_000  # total creator pool, note that this term can be interpreted in many ways. This can be the ad pool for a select amount of ads. shld be a dynamic value
lambda_fair = 0.6 # these are weights/ parameters which definitely can be learnt and refined over time with more data
lambda_eff  = 0.4
alpha = 0.7
phi_W = 0.35
phi_E = 0.25
phi_D = 0.15
phi_R = 0.10
phi_S = 0.15


# Add this to adopti.py near the other quality-score helpers

def get_quality_score(W: float, E: float, D: float, R: float, S: float, C: int = 1) -> float:
    """
    Geometric aggregation with fixed phi's, then compliance and clamp.
    Q_v = C * min(1, W^phi_W * E^phi_E * D^phi_D * R^phi_R * S^phi_S).
    Inputs W,E,D,R,S should already be in [0,1]; C in {0,1}.

    For detailed calculation of W,E,D,R and S, they require user specific interaction for each video, for which we will skip the calculation
    The mathematical formula can be found in the pdf for calculation of quality score. The intention is that TikTok can calculate them
    trivially as TikTok should easily have access to these data, (i.e. how a specific user interacts with this specific video)
    """
    q = (W ** phi_W) \
        * (E ** phi_E) \
        * (D ** phi_D) \
        * (R ** phi_R) \
        * (S ** phi_S)
    return C * min(1.0, q)

# ----------------------------
# Build `videos` list dynamically from DB rows
# ----------------------------

def clamp01(x: float) -> float:
    try:
        return max(0.0, min(1.0, float(x)))
    except Exception:
        return 0.0

if df is None or df.empty:
    raise ValueError("No rows returned from database; cannot build videos list.")

videos = []
for row in df.itertuples(index=False):
    # Expect columns: video_id, views, watch_completion, engagement_rate, engagement_diversity, rewatch, nlp_quality
    W = clamp01(row.watch_completion)
    E = clamp01(row.engagement_rate)
    D = clamp01(row.engagement_diversity)
    R = clamp01(row.rewatch)
    S = clamp01(row.nlp_quality)
    C_gate = 1 if int(row.compliance) == 1 else 0

    Qv = get_quality_score(W=W, E=E, D=D, R=R, S=S, C=C_gate)

    videos.append({
        "id":    str(row.video_id),
        "views": float(row.views),
        "Q":     Qv,
        "C":     C_gate,
    })

# Optional floors/caps per video (comment out to disable)
floors = {v["id"]: 0.0 for v in videos}        # e.g., 50.0 for a minimum payout
caps   = {v["id"]: float('inf') for v in videos}  # e.g., 250_000.0 for a cap

# Normalize caps to Gurobi's infinity if needed
for k in caps:
    if math.isinf(caps[k]):
        caps[k] = GRB.INFINITY

# ----------------------------
# 2) Derived shares/weights
# ----------------------------
for v in videos:
    v["M"] = v["views"] * v["Q"] if v["C"] == 1 else 0.0

M_total = sum(v["M"] for v in videos)
if M_total <= 0:
    raise ValueError("No eligible videos (M_total=0). Check Q_v and compliance flags.")

for v in videos:
    v["s"] = v["M"] / M_total
    v["w"] = (v["s"] ** alpha) if v["s"] > 0 else 0.0

# ----------------------------
# 3) Build PWL for log(p)
# ----------------------------
# Domain for p_v in the log: [p_min, p_max]
# p_min must be > 0 so log is defined. If you want a floor, set floors[...] >= p_min.
p_min = 1.0
p_max = 300_000.0

# 50 log-spaced breakpoints works well; tune as desired
K = 50
x_pts = [p_min * (p_max/p_min)**(k/(K-1)) for k in range(K)]  # geometric spacing
y_pts = [math.log(x) for x in x_pts]  # natural log

# ----------------------------
# 4) Build model
# ----------------------------
m = gp.Model("quality_weighted_ad_pool")

# Decision variables: payouts p_v >= 0
p = {v["id"]: m.addVar(lb=0.0, ub=caps[v["id"]], name=f"p_{v['id']}") for v in videos}

# Auxiliary vars: z_v approximates log(p_v) via PWL
z = {v["id"]: m.addVar(lb=-GRB.INFINITY, name=f"log_{v['id']}") for v in videos}

# Set bounds and PWL constraints based on compliance
for v in videos:
    vid = v["id"]
    if v["C"] == 0:
        # Non-compliant: fix payout to 0 and fix z to 0 (no log defined at 0)
        p[vid].LB = 0.0
        p[vid].UB = 0.0
        m.addConstr(z[vid] == 0.0, name=f"z_fix_{vid}")
    else:
        # Compliant: apply floor and ensure >= p_min for log
        lb = floors.get(vid, 0.0)
        p[vid].LB = max(lb, p_min)
        # Optional cap already in var definition via ub=caps[vid]
        m.addGenConstrPWL(p[vid], z[vid], x_pts, y_pts, name=f"pwl_log_{vid}")

# Budget constraint: sum p_v = P
m.addConstr(gp.quicksum(p[v["id"]] for v in videos) == P, name="budget")

# Objective:
# lambda_fair * sum_v w_v * z_v  +  lambda_eff * sum_v s_v * (p_v / P)
fair_term = gp.quicksum(v["w"] * z[v["id"]] for v in videos)
eff_term  = gp.quicksum(v["s"] * (p[v["id"]] / P) for v in videos)
m.setObjective(lambda_fair * fair_term + lambda_eff * eff_term, GRB.MAXIMIZE)

# Solve
m.Params.OutputFlag = 1
m.optimize()

# ----------------------------
# 5) Report solution
# ----------------------------
if m.Status == GRB.OPTIMAL:
    total = sum(p[v["id"]].X for v in videos)
    print(f"\nObjective value: {m.ObjVal:.6f}")
    print(f"Sum p_v = {total:.2f} (should equal P={P})")
    print("\nVideo  |  Q_v (quality)   s_v (share)   w_v (fair-wt)   payout p_v    pct_of_pool")
    print("-"*90)
    for v in sorted(videos, key=lambda x: p[x["id"]].X, reverse=True):
        pv = p[v["id"]].X
        print(f"{v['id']:>5}  |  {v['Q']:>13.4f}   {v['s']:>10.4f}   {v['w']:>12.4f}   {pv:>11.2f}   {pv/P:>11.4%}")

    # --- Persist payout proportions to DB (rev_prop in [0,1]) ---
    updates = []
    for v in videos:
        vid = v["id"]
        pct = float(p[vid].X / P) if vid in p else 0.0
        # Non-compliant already forced to 0; clamp just in case
        if not (0.0 <= pct <= 1.0):
            pct = max(0.0, min(1.0, pct))
        updates.append((pct, vid))

    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.executemany("UPDATE videos SET rev_prop = ? WHERE video_id = ?;", updates)
        conn.commit()
        conn.close()
        print(f"\nWrote rev_prop for {len(updates)} videos to database.")
    except Exception as e:
        print(f"\nWARNING: Failed to write rev_prop to database: {e}")
else:
    print(f"Model ended with status {m.Status}")