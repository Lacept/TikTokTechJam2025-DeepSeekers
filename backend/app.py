from flask import Flask, request, jsonify, g, send_file
import sqlite3
from pathlib import Path
import json
import cv2
import random
import base64
import shutil

from adrev_opti import get_optimised_values


#Initialise app
app = Flask(__name__)
DB_PATH = Path(f"{app.root_path}/app.db")
VIDEOS_DIR = Path(f"{app.root_path}/static/videos")
THUMBNAILS_DIR = Path(f"{app.root_path}/static/thumbnails")


# ---------- DB helpers ----------
def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row  # nicer dict-like rows
    return g.db

@app.teardown_appcontext
def close_db(_exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()

    # Initialise database and populate from scratch
    # 1. Videos table
    drop_table_sql = """
        DROP TABLE IF EXISTS videos;
    """
    db.execute(drop_table_sql)
    create_table_sql = """
        CREATE TABLE videos (
            video_id         INTEGER PRIMARY KEY AUTOINCREMENT,
            creator_id       INTEGER NOT NULL DEFAULT 0,
            title      TEXT NOT NULL,
            views      INTEGER NOT NULL DEFAULT 0,
            likes      INTEGER NOT NULL DEFAULT 0,
            comments   INTEGER NOT NULL DEFAULT 0,
            shares     INTEGER NOT NULL DEFAULT 0,
            
            watch_completion FLOAT NOT NULL DEFAULT 0.5,
            engagement_rate FLOAT NOT NULL DEFAULT 0.5,
            engagement_diversity FLOAT NOT NULL DEFAULT 0.5,
            rewatch FLOAT NOT NULL DEFAULT 0.5,
            nlp_quality FLOAT NOT NULL DEFAULT 0.5,
            compliance INTEGER NOT NULL DEFAULT 0,
            
            rev_prop FLOAT NOT NULL DEFAULT 0,
            proj_earnings FLOAT NOT NULL DEFAULT 0,
            quality_score FLOAT NOT NULL DEFAULT 0,
            
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    """
    db.execute(create_table_sql)

    with open(f"{app.root_path}/tables_init/videos_init.json", "rb") as f:
        videos_init = json.load(f)
    # Populate videos table with fake data
    videos_init_rows = [list(row.values()) for row in videos_init]
    colnames = list(videos_init[0].keys())
    print(colnames)
    print(videos_init_rows)
    db.executemany(
        f"INSERT INTO videos ({", ".join(colnames)}) VALUES ({", ".join("?" for i in range(len(colnames)))})",
        videos_init_rows,
    )
    # Helpful indexes if you’ll query by these often
    db.execute("CREATE INDEX IF NOT EXISTS idx_videos_creator ON videos(creator_id);")
    db.commit()

    # 2. Creators Table
    drop_table_sql = """
        DROP TABLE IF EXISTS creators;
     """
    db.execute(drop_table_sql)
    create_table_sql = """
       CREATE TABLE creators (
           creator_id INTEGER PRIMARY KEY AUTOINCREMENT, 
           name       INTEGER NOT NULL DEFAULT 0, 
           following  INTEGER NOT NULL DEFAULT 0, 
           followers  INTEGER NOT NULL DEFAULT 0,
           likes      INTEGER NOT NULL DEFAULT 0 
       ); 
                       """
    db.execute(create_table_sql)

    with open(f"{app.root_path}/tables_init/creators_init.json", "rb") as f:
        creators_init = json.load(f)
    # Populate videos table with fake data
    creators_init_rows = [list(row.values()) for row in creators_init]
    print(creators_init_rows)
    db.executemany(
        "INSERT INTO creators (name, following, followers, likes) VALUES (?, ?, ?, ?)",
        creators_init_rows,
    )
    db.commit()

    # Update ad revenue split in table
    compute_optimised_values()

    # Populate videos folder
    for vid_filepath in VIDEOS_DIR.iterdir():
        vid_filepath.unlink()
    videos_init_dir = Path(app.root_path) / Path("tables_init/videos")
    for vid_filepath in videos_init_dir.iterdir():
        shutil.copy2(vid_filepath,  VIDEOS_DIR / Path(f"{vid_filepath.stem}.{vid_filepath.suffix}"))

    # Populate thumbnails folder
    for thumbnail_filepath in THUMBNAILS_DIR.iterdir():
        thumbnail_filepath.unlink()
    for video_path in VIDEOS_DIR.iterdir():
        video_id = video_path.stem
        save_thumbnail(video_id)


# ---------- Routes ----------
@app.route("/")
def index():
    return "Hello World"


####### POST METHODSSSSS #######

# Helpers
def compute_optimised_values():
    conn = sqlite3.connect(DB_PATH)
    get_optimised_values(conn)
    conn.close()

def save_thumbnail(video_id):
    try:
        video_filename = f"{app.root_path}/static/videos/{video_id}.mp4"
        vid = cv2.VideoCapture(video_filename)
        _, img = vid.read()
        thumbnail_filename = f"{app.root_path}/static/thumbnails/{video_id}.jpg"
        cv2.imwrite(thumbnail_filename, img)
    except Exception as e:
        print(e)
        print("Thumbnail cannot be extracted")

def save_video(video_id, file):
    video_filename = f"{app.root_path}/static/videos/{video_id}.mp4"
    with open(video_filename, "wb") as f:
        f.write(file.read())


def gen_random_video_data():
    views = random.randint(100, 50000)
    likes = random.randint(int(views * 0.3), int(views * 0.5))
    data = {
        "views": views,
        "likes": likes,
        "shares": random.randint(int(likes * 0.05), int(likes * 0.1)),
        "comments": random.randint(int(likes * 0.2), int(likes * 0.3)),
        "watch_completion": random.random(),
        "engagement_rate": random.random(),
        "engagement_diversity": random.random(),
        "rewatch": random.random(),
        "nlp_quality": random.random(),
        "compliance": random.randint(0, 1)
    }
    return data

# Uploading videos
@app.post("/upload-video")
def upload_video():
    if "file" not in request.files:
        return {"error": "no file part"}, 400

    file = request.files["file"]
    if file.filename == "":
        return {"error": "no selected file"}, 400

    # Get video info
    new_row = {
        "creator_id": request.form.get("creator_id"),
        "title": request.form.get("title")
    } | gen_random_video_data()
    # Store video data in DB
    db = get_db()
    cur = None
    try:
        cur = db.execute(
        f"INSERT INTO videos ({", ".join(new_row.keys())}) VALUES ({", ".join("?" for i in range(len(new_row)))})",
            tuple(new_row.values()),
        )
        db.commit()
    except sqlite3.IntegrityError as e:
        return {"error": str(e)}, 409

    # Get sql-generated video id and use it as filename to store video
    video_id = cur.lastrowid
    save_video(video_id, file)
    save_thumbnail(video_id)

    # Update ad revenue split in videos table
    compute_optimised_values()

    return {
        "ok": True,
        "video_id": video_id,
    }, 201

###### GET REQUESTS (CREATORS) #########
@app.get("/get-creator-data")
def get_creator_data():
    try:
        creator_id = request.args['creator_id']
        db = get_db()
        row = db.execute(
            "SELECT * FROM creators WHERE creator_id = ?",
            (creator_id,),
        ).fetchone()
        if not row:
            return jsonify({"error": "not found"}), 404
        return jsonify(dict(row))
    except KeyError:
        return "creator_id parameter is missing."



###### GET REQUESTS (VIDEOS) #########

# Get different video stuff via video id

# Read (get) a single video by video_id
@app.get("/get-video")
def get_video():
    try:
        video_id = request.args['video_id']
        # Check if video id even exists in videos table
        db = get_db()
        row = db.execute("SELECT video_id FROM videos WHERE video_id = ?", (video_id,)).fetchone()
        if not row:
            return jsonify({"error": "not found"}), 404

        # If the video id exists, send the corresponding video
        video_filepath = VIDEOS_DIR / Path(f"{video_id}.mp4")
        return send_file(
            str(video_filepath),
            mimetype="video/mp4",  # set your real mimetype if different
            as_attachment=False,  # inline playback
            conditional=True,  # support Range
            etag=True,  # caching/If-None-Match
            last_modified=None  # let Flask infer from the file
        )
    except KeyError:
        return "video_id parameter is missing."

# Read (get) a video thumbnail for a single video by video_id
@app.get("/get-video-thumbnail")
def get_video_thumbnail():
    try:
        video_id = request.args['video_id']
        # Check if video id even exists in videos table
        db = get_db()
        row = db.execute(
            "SELECT * FROM videos WHERE video_id = ?",
            (video_id,),
        ).fetchone()
        if not row:
            return jsonify({"error": "not found"}), 404
        # If the video id exists, send the corresponding thumbnail
        thumbnail_filepath = THUMBNAILS_DIR / f"{video_id}.jpg"
        return send_file(
            str(thumbnail_filepath),
            mimetype="image/jpeg",  # set your real mimetype if different
        )
    except KeyError:
        return "video_id parameter is missing."


# Read (get) a video data for a single video by video_id
@app.get("/get-video-data")
def get_video_data():
    try:
        video_id = request.args['video_id']
        db = get_db()
        row = db.execute(
            "SELECT * FROM videos WHERE video_id = ?",
            (video_id,),
        ).fetchone()
        if not row:
            return jsonify({"error": "not found"}), 404
        return jsonify(dict(row))
    except KeyError:
        return "video_id parameter is missing."

# Get data of all videos under a creator
@app.get("/get-all-videos-data")
def get_all_videos_data():
    try:
        creator_id = request.args['creator_id']
        db = get_db()
        rows = db.execute(
            "SELECT * FROM videos WHERE creator_id = ?",
            (creator_id,),
        ).fetchall()
        if not rows:
            return jsonify({"error": "not found"}), 404
        return jsonify([dict(row) for row in rows])
    except KeyError:
        return "creator_id parameter is missing."

@app.get("/get-all-videos-thumbnails")
def get_all_videos_thumbnails():
    try:
        creator_id = request.args['creator_id']
        db = get_db()
        rows = db.execute(
            "SELECT video_id FROM videos WHERE creator_id = ?",
            (creator_id,),
        ).fetchall()
        if not rows:
            return jsonify({"error": "not found"}), 404

        # Get all thumbnails
        video_ids = [row[0] for row in rows]
        out = []
        for video_id in video_ids:
            filename = f"{app.root_path}/static/thumbnails/{video_id}.jpg"
            with open(Path(filename), "rb") as f:
                b64 = base64.b64encode(f.read()).decode("ascii")
            out.append({
                "video_id": video_id,
                "content_type": "image/jpeg",
                "data_uri": f"data:image/jpeg;base64,{b64}",
                # or send raw base64 in "base64" and build data URI on FE
            })
        return jsonify({"ok": True, "images": out})
    except KeyError:
        return "creator_id parameter is missing."


if __name__ == ("__main__"):
    with app.app_context():
        init_db()
    app.run(debug=True)