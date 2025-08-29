# pip install gurobipy if needed; requires a Gurobi license.
import math
import gurobipy as gp
from gurobipy import GRB
import pandas as pd

# ----------------------------
# 1) Inputs (edit these)
# ----------------------------
P = 1_000_000  # total creator pool
lambda_fair = 0.6
lambda_eff  = 0.4
alpha = 0.7
phi_W = 0.35
phi_E = 0.25
phi_D = 0.15
phi_R = 0.10
phi_S = 0.15

# Add this to adopti.py near the other quality-score helpers

def quality_score(W: float, E: float, D: float, R: float, S: float, C: int = 1) -> float:
    """
    Geometric aggregation with fixed phi's, then compliance and clamp.
    Q_v = C * min(1, W^phi_W * E^phi_E * D^phi_D * R^phi_R * S^phi_S).
    Inputs W,E,D,R,S should already be in [0,1]; C in {0,1}.
    """
    q = (W ** phi_W) \
        * (E ** phi_E) \
        * (D ** phi_D) \
        * (R ** phi_R) \
        * (S ** phi_S)
    return C * min(1.0, q)

# Example integration inside compute_quality_from_aggregates(...):
# Q = quality_score(W= W, E= E, D= D, R= R, S= S, C= C_gate)


# Example dataset: list of videos with (views, Q_v, compliant C_v)
videos = [
    {"id":"v1", "views": 1_200_000, "Q": 0.35, "C": 1},
    {"id":"v2", "views":   300_000, "Q": 0.80, "C": 1},
    {"id":"v3", "views":   150_000, "Q": 0.65, "C": 1},
    {"id":"v4", "views":   900_000, "Q": 0.20, "C": 1},
    {"id":"v5", "views":    60_000, "Q": 0.95, "C": 1},
    {"id":"v6", "views":   500_000, "Q": 0.40, "C": 1},
]

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

# Compliance gate: if C_v == 0, force p_v = 0
for v in videos:
    if v["C"] == 0:
        p[v["id"]].UB = 0.0

# Floors: p_v >= floor
for v in videos:
    if floors[v["id"]] is not None:
        p[v["id"]].LB = floors[v["id"]]

# Budget constraint: sum p_v = P
m.addConstr(gp.quicksum(p[v["id"]] for v in videos) == P, name="budget")

# Piecewise-linear approximation: z_v = log(p_v) on [p_min, p_max]
# If a video's lower bound is 0, ensure it is at least p_min to use log;
# Alternative: allow zero by also giving it a tiny floor.
for v in videos:
    # Gurobi PWL: y = pwl(x). We constrain (p_v, z_v) to lie on the PWL curve of log.
    # If p_v < p_min, the PWL is undefined; so ensure lb >= p_min or set a floor.
    # Ensure lower bound is at least p_min for log to be defined
    p[v["id"]].LB = max(floors[v["id"]], p_min)
    m.addGenConstrPWL(p[v["id"]], z[v["id"]], x_pts, y_pts, name=f"pwl_log_{v['id']}")