# pip install gurobipy  (needs a Gurobi license)
import gurobipy as gp
from gurobipy import GRB

# -----------------------------
# 1) Data (edit with your real data)
# -----------------------------
V = ["v1", "v2", "v3"]                 # eligible videos (policy-compliant)
Nn = {"v1": 1200, "v2": 300, "v3": 500}   # Normal coins given to each video
Np = {"v1":  600, "v2": 900, "v3": 200}   # Premium coins given to each video
Q  = {"v1": 0.70, "v2": 0.40, "v3": 0.85} # quality scores in [0,1]

# If you already have totals, you can set them explicitly.
N_n = sum(Nn[v] for v in V)            # total Normal coins
N_p = sum(Np[v] for v in V)            # total Premium coins

# Quality multiplier f(Q) = 1 + θ Q, with an optional penalty for low quality
theta   = 0.8
Q_min   = 0.30
eta     = 0.9                          # < 1, used only if Q_v < Q_min
f = {v: (eta if Q[v] < Q_min else (1.0 + theta*Q[v])) for v in V}

# Objective weights
lambda_1 = 1.0    # platform revenue
lambda_2 = 1.0    # creator utility (quality-weighted)
lambda_3 = 0.3    # premium adoption incentive

# Premium adoption incentive: I = γ (x_p - x_n)
gamma = 1.0

# Policy / business constraints
delta     = 0.05   # premium must reward at least delta more than normal
R_min     = 200.0  # minimum platform revenue (coins kept by platform)
x_n_max   = 0.75
x_p_max   = 0.95

# -----------------------------
# 2) Model
# -----------------------------
m = gp.Model("coin_profit_share")

# Decision variables: fractions of coins paid to creators
x_n = m.addVar(lb=0.0, ub=x_n_max, name="x_n")
x_p = m.addVar(lb=0.0, ub=x_p_max, name="x_p")

# TikTok revenue kept (coins): R = (1 - x_n) N_n + (1 - x_p) N_p
R = (1 - x_n) * N_n + (1 - x_p) * N_p

# Creator utility (quality-weighted):
# U = Σ_v ( x_n * Nn[v] + x_p * Np[v] ) * f(Q_v)
U = gp.quicksum((x_n * Nn[v] + x_p * Np[v]) * f[v] for v in V)

# Premium adoption incentive: I = γ (x_p - x_n)
I = gamma * (x_p - x_n)

# Objective
m.setObjective(lambda_1 * R + lambda_2 * U + lambda_3 * I, GRB.MAXIMIZE)

# Constraints
m.addConstr(x_p >= x_n + delta, name="premium_gap")   # (C1)
m.addConstr(R   >= R_min,       name="revenue_floor") # (C2)
# bounds (C3) already enforced by variable ubs/lbs

m.Params.OutputFlag = 1
m.optimize()

# -----------------------------
# 3) Report results
# -----------------------------
if m.Status == GRB.OPTIMAL:
    xn = x_n.X
    xp = x_p.X
    Rv = R.getValue()
    Uv = U.getValue()
    Iv = I.getValue()

    print("\nOptimal fractions paid to creators:")
    print(f"  x_n (Normal)  = {xn:.4f}")
    print(f"  x_p (Premium) = {xp:.4f}")
    print(f"\nDecomposition (at optimum):")
    print(f"  TikTok Revenue R  = {Rv:.2f} coins kept")
    print(f"  Creator Utility U = {Uv:.2f} (quality-weighted)")
    print(f"  Adoption I        = {Iv:.2f}")
    print(f"  Objective value   = {m.ObjVal:.4f}")

    # (Optional) Per-video creator payout in coins (not quality-weighted):
    # payout_v = x_n*Nn[v] + x_p*Np[v]
    print("\nPer-video payouts (coins to creators):")
    for v in V:
        payout_v = xn * Nn[v] + xp * Np[v]
        print(f"  {v}: {payout_v:.2f}")

else:
    print(f"Model ended with status {m.Status}")