# pip install gurobipy  (requires a Gurobi license)
import gurobipy as gp
from gurobipy import GRB
import math
import sqlite3
import pandas as pd

phi_W, phi_E, phi_D, phi_R, phi_S = 0.35, 0.25, 0.15, 0.10, 0.15

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

# -----------------------------
# Inputs for video, query from database
# -----------------------------
db_path = "app.db"
# Connect to database to dynamically query video statistics, used as inputs to calculate quality score, Q, which is input for optimisation model
conn = sqlite3.connect(db_path)

video_id = 1  # comes from user selection, to be dynamic

q = """
SELECT 
    video_id,
    watch_completion,
    engagement_rate,
    engagement_diversity,
    rewatch,
    nlp_quality,
    compliance,
    norm_coins,
    prem_coins
FROM videos
WHERE video_id = ?;
"""

df = pd.read_sql_query(q, conn, params=(video_id,))
conn.close()

# Guard: ensure we found the row
if df.empty:
    raise ValueError(f"video_id {video_id} not found in videos table")

# Pull components and compute Q function
W = float(df.loc[0, "watch_completion"])
E = float(df.loc[0, "engagement_rate"])
D = float(df.loc[0, "engagement_diversity"])
Rcomp = float(df.loc[0, "rewatch"])
S = float(df.loc[0, "nlp_quality"])
C_gate = int(df.loc[0, "compliance"])  # 0/1
Nn = int(df.loc[0, "norm_coins"])
Np = int(df.loc[0, "prem_coins"])
Q = get_quality_score(W, E, D, Rcomp, S, C_gate)

theta   = 0.8
eps     = 1e-6
xn_max  = 0.75
xp_max  = 0.95
delta   = 0.05
Delta   = 0.35

lam_rev = 1.0   # weight on revenue
lam_util= 6   # weight on creator utility
lam_inc = 0.3   # weight on premium adoption incentive

# -----------------------------
# Anchors for normalization
# -----------------------------
R_max = Nn + Np
R_min   = 0.1*R_max # TikTok will keep at least 10% of revenue of coins for any video
den_R = max(1e-9, R_max - R_min)

pay_cap = xn_max*Nn + xp_max*Np
U_max   = (1 + theta*Q) * math.log(eps + pay_cap)
den_U   = max(1e-9, U_max)

den_I   = max(1e-9, Delta - delta)

# -----------------------------
# Model
# -----------------------------
m = gp.Model("single_video")
m.Params.OutputFlag = 1

# Decision variables
xn = m.addVar(lb=0.0, ub=xn_max, name="x_n")
xp = m.addVar(lb=0.0, ub=xp_max, name="x_p")

# Revenue & payout
R   = (1 - xn)*Nn + (1 - xp)*Np
pay = xn*Nn + xp*Np

# Log utility
z = m.addVar(lb=eps, name="z_pay")
y = m.addVar(lb=-GRB.INFINITY, name="log_pay")
m.addConstr(z == eps + pay)
m.addGenConstrLog(z, y)      # y = log(z)

U = (1 + theta*Q) * y

# Normalized terms
R_norm = (R - R_min) / den_R
U_norm = U / den_U
I_norm = ((xp - xn) - delta) / den_I

# Constraints
m.addConstr(xp >= xn + delta, name="gap_floor")
m.addConstr(xp - xn <= Delta, name="gap_cap")
m.addConstr(R >= R_min,       name="revenue_floor")

# Objective
m.setObjective(lam_rev*R_norm + lam_util*U_norm + lam_inc*I_norm, GRB.MAXIMIZE)

m.optimize()

# -----------------------------
# Results
# -----------------------------
if m.Status == GRB.OPTIMAL:
    print("\n=== Optimal solution ===")
    print(f"x_n = {xn.X:.4f}, x_p = {xp.X:.4f}")
    print(f"Revenue kept R = {R.getValue():.2f}")
    print(f"Creator payout pay = {pay.getValue():.2f}")
    print(f"U (quality util) = {U.getValue():.4f}")
    print(f"Normalized terms: R={R_norm.getValue():.3f}, U={U_norm.getValue():.3f}, I={I_norm.getValue():.3f}")
    print(f"Objective value = {m.ObjVal:.4f}")