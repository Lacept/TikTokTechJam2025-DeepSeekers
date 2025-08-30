from flask import Flask, request, jsonify, g, send_file
import sqlite3
from pathlib import Path
import json
import cv2
import random
import base64
import shutil
from flask_cors import CORS  # <-- ensure installed

# ---- App ----
app = Flask(__name__)
# Wide-open CORS for dev. Adjust origins if you prefer.
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

DB_PATH = Path(f"{app.root_path}/app.db")
VIDEOS_DIR = Path(f"{app.root_path}/static/videos")
THUMBNAILS_DIR = Path(f"{app.root_path}/static/thumbnails")

# ---- DB helpers ----
def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db

@app.teardown_appcontext
def close_db(_exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()

    # Videos
    db.execute("DROP TABLE IF EXISTS videos;")
    db.execute("""
        CREATE TABLE videos (
            video_id         INTEGER PRIMARY KEY AUTOINCREMENT,
            creator_id       INTEGER NOT NULL DEFAULT 0,
            title            TEXT NOT NULL,
            views            INTEGER NOT NULL DEFAULT 0,
            likes            INTEGER NOT NULL DEFAULT 0,
            comments         INTEGER NOT NULL DEFAULT 0,
            shares           INTEGER NOT NULL DEFAULT 0,

            watch_completion FLOAT  NOT NULL DEFAULT 0.5,
            engagement_rate  FLOAT  NOT NULL DEFAULT 0.5,
            engagement_diversity FLOAT NOT NULL DEFAULT 0.5,
            rewatch          FLOAT  NOT NULL DEFAULT 0.5,
            nlp_quality      FLOAT  NOT NULL DEFAULT 0.5,
            compliance       INTEGER NOT NULL DEFAULT 0,

            rev_prop         FLOAT  NOT NULL DEFAULT 0,
            proj_earnings    FLOAT  NOT NULL DEFAULT 0,
            quality_score    FLOAT  NOT NULL DEFAULT 0,

            created_at       TEXT   NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    """)

    with open(f"{app.root_path}/tables_init/videos_init.json", "rb") as f:
        videos_init = json.load(f)
    if videos_init:
        videos_init_rows = [list(row.values()) for row in videos_init]
        colnames = list(videos_init[0].keys())
        cols = ", ".join(colnames)
        placeholders = ", ".join("?" for _ in colnames)
        sql = f"INSERT INTO videos ({cols}) VALUES ({placeholders})"
        db.executemany(sql, videos_init_rows)

    db.execute("CREATE INDEX IF NOT EXISTS idx_videos_creator ON videos(creator_id);")
    db.commit()

    # Creators
    db.execute("DROP TABLE IF EXISTS creators;")
    db.execute("""
        CREATE TABLE creators (
            creator_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT    NOT NULL,
            following  INTEGER NOT NULL DEFAULT 0,
            followers  INTEGER NOT NULL DEFAULT 0,
            likes      INTEGER NOT NULL DEFAULT 0
        );
    """)
    db.execute("CREATE INDEX IF NOT EXISTS idx_creators_name ON creators(name);")

    with open(f"{app.root_path}/tables_init/creators_init.json", "rb") as f:
        creators_init = json.load(f)
    if creators_init:
        creators_init_rows = [list(row.values()) for row in creators_init]
        db.executemany(
            "INSERT INTO creators (name, following, followers, likes) VALUES (?, ?, ?, ?)",
            creators_init_rows,
        )
    db.commit()

    # Copy seed videos (optional)
    VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    THUMBNAILS_DIR.mkdir(parents=True, exist_ok=True)

    for p in VIDEOS_DIR.glob("*"):
        p.unlink()
    videos_init_dir = Path(app.root_path) / "tables_init" / "videos"
    if videos_init_dir.exists():
        for vid_fp in videos_init_dir.iterdir():
            shutil.copy2(vid_fp, VIDEOS_DIR / f"{vid_fp.stem}{vid_fp.suffix}")

    # Rebuild thumbnails
    for p in THUMBNAILS_DIR.glob("*"):
        p.unlink()
    for video_path in VIDEOS_DIR.glob("*.mp4"):
        save_thumbnail(video_path.stem)

# ---- Routes ----
@app.get("/health")
def health():
    return jsonify({"ok": True})

@app.route("/")
def index():
    return "Hello World"

# ---- Helpers ----
def save_thumbnail(video_id: str):
    try:
        video_filename = f"{app.root_path}/static/videos/{video_id}.mp4"
        vid = cv2.VideoCapture(video_filename)
        ok, img = vid.read()
        if not ok or img is None:
            raise RuntimeError("Failed to read video frame")
        thumbnail_filename = f"{app.root_path}/static/thumbnails/{video_id}.jpg"
        cv2.imwrite(thumbnail_filename, img)
    except Exception as e:
        print("Thumbnail cannot be extracted:", e)

def save_video(video_id: int, file):
    video_filename = f"{app.root_path}/static/videos/{video_id}.mp4"
    with open(video_filename, "wb") as f:
        f.write(file.read())

def gen_random_video_data():
    views = random.randint(100, 50000)
    likes = random.randint(int(views * 0.3), int(views * 0.5))
    return {
        "views": views,
        "likes": likes,
        "shares": random.randint(int(likes * 0.05), int(likes * 0.1)),
        "comments": random.randint(int(likes * 0.2), int(likes * 0.3)),
        "watch_completion": random.random(),
        "engagement_rate": random.random(),
        "engagement_diversity": random.random(),
        "rewatch": random.random(),
        "nlp_quality": random.random(),
        "compliance": random.randint(0, 1),
    }

# ---- POST ----
@app.post("/upload-video")
def upload_video():
    if "file" not in request.files:
        return {"error": "no file part"}, 400
    file = request.files["file"]
    if file.filename == "":
        return {"error": "no selected file"}, 400

    new_row = {
        "creator_id": request.form.get("creator_id"),
        "title": request.form.get("title")
    } | gen_random_video_data()

    db = get_db()
    try:
        cols = ", ".join(new_row.keys())
        placeholders = ", ".join("?" for _ in new_row)
        sql = f"INSERT INTO videos ({cols}) VALUES ({placeholders})"
        cur = db.execute(sql, tuple(new_row.values()))
        db.commit()
    except sqlite3.IntegrityError as e:
        return {"error": str(e)}, 409

    video_id = cur.lastrowid
    save_video(video_id, file)
    save_thumbnail(str(video_id))
    return {"ok": True, "video_id": video_id}, 201

# ---- GET (Creators) ----
@app.get("/get-creator-by-name")
def get_creator_by_name():
    name = request.args.get("name")
    if not name:
        return jsonify({"error": "name is required"}), 400
    db = get_db()
    row = db.execute("SELECT * FROM creators WHERE name = ?", (name,)).fetchone()
    if not row:
        return jsonify({"error": "not found"}), 404
    return jsonify(dict(row))

@app.get("/list-creators")
def list_creators():
    db = get_db()
    rows = db.execute("SELECT creator_id, name, following, followers, likes FROM creators ORDER BY creator_id").fetchall()
    return jsonify([dict(r) for r in rows])

# ---- GET (Videos) ----
@app.get("/get-all-videos-data")
def get_all_videos_data():
    creator_id = request.args.get('creator_id')
    if not creator_id:
        return "creator_id parameter is missing."
    db = get_db()
    rows = db.execute("SELECT * FROM videos WHERE creator_id = ?", (creator_id,)).fetchall()
    return jsonify([dict(row) for row in rows])

@app.get("/get-all-videos-thumbnails")
def get_all_videos_thumbnails():
    creator_id = request.args.get('creator_id')
    if not creator_id:
        return "creator_id parameter is missing."
    db = get_db()
    rows = db.execute("SELECT video_id FROM videos WHERE creator_id = ?", (creator_id,)).fetchall()
    out = []
    for (video_id,) in rows:
        thumb = THUMBNAILS_DIR / f"{video_id}.jpg"
        if thumb.exists():
            with open(thumb, "rb") as f:
                b64 = base64.b64encode(f.read()).decode("ascii")
            out.append({
                "video_id": video_id,
                "content_type": "image/jpeg",
                "data_uri": f"data:image/jpeg;base64,{b64}",
            })
    return jsonify({"ok": True, "images": out})

@app.get("/get-video-data")
def get_video_data():
    video_id = request.args.get('video_id')
    if not video_id:
        return jsonify({"error": "video_id parameter is required"}), 400
    
    db = get_db()
    row = db.execute("SELECT * FROM videos WHERE video_id = ?", (video_id,)).fetchone()
    if not row:
        return jsonify({"error": "Video not found"}), 404
    
    video_data = dict(row)
    
    # Calculate additional derived metrics for the detail view
    video_data['revenue_proportion_percent'] = video_data['rev_prop'] * 100
    video_data['quality_score_percent'] = video_data['quality_score'] * 100
    video_data['engagement_rate_percent'] = video_data['engagement_rate'] * 100
    video_data['watch_completion_percent'] = video_data['watch_completion'] * 100
    video_data['engagement_diversity_percent'] = video_data['engagement_diversity'] * 100
    video_data['rewatch_percent'] = video_data['rewatch'] * 100
    video_data['nlp_quality_percent'] = video_data['nlp_quality'] * 100
    
    # Add mock demographic data (would come from analytics system in real app)
    video_data['demographics'] = {
        'gender': {
            'male': 80,
            'female': 20,
            'other': 0
        },
        'age_groups': {
            '18-24': 61,
            '25-34': 32,
            '35-44': 4,
            '45-54': 2,
            '55+': 1
        },
        'top_locations': {
            'Singapore': 60.1,
            'Other': 17.1,
            'Malaysia': 10.8,
            'Myanmar (Burma)': 2.5,
            'Philippines': 2.0
        }
    }
    
    # Add mock earnings over time data (7 days)
    import datetime
    base_date = datetime.datetime.now()
    earnings_timeline = []
    cumulative = 0
    daily_earnings = video_data['proj_earnings'] / 7  # Spread over 7 days
    
    for i in range(7):
        date = base_date - datetime.timedelta(days=6-i)
        daily_amount = daily_earnings * (0.5 + random.random())  # Add some variation
        cumulative += daily_amount
        earnings_timeline.append({
            'date': date.strftime('%m/%d'),
            'daily_earnings': round(daily_amount, 2),
            'cumulative_earnings': round(cumulative, 2)
        })
    
    video_data['earnings_timeline'] = earnings_timeline
    
    # Calculate earnings per view
    if video_data['views'] > 0:
        video_data['earnings_per_view'] = video_data['proj_earnings'] / video_data['views']
    else:
        video_data['earnings_per_view'] = 0
    
    # Add mock revenue split data
    video_data['revenue_split'] = {
        'premium_coins': {
            'amount': video_data['proj_earnings'] * 0.65,
            'percentage': 65
        },
        'standard_coins': {
            'amount': video_data['proj_earnings'] * 0.35,
            'percentage': 35
        }
    }
    
    return jsonify(video_data)

if __name__ == "__main__":
    with app.app_context():
        init_db()
    app.run(host="0.0.0.0", port=5001, debug=True)
