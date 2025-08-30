# Database Documentation

This document provides an overview of the Flask backend database structure and current data state.

## Server Status

**Health Check:**
```bash
curl -s http://localhost:5001/health
```
Response: `{"ok": true}`

## Database Schema

### Creators Table
- **creator_id** (INTEGER, PRIMARY KEY)
- **name** (TEXT)
- **following** (INTEGER)
- **followers** (INTEGER) 
- **likes** (INTEGER)

### Videos Table
- **video_id** (INTEGER, PRIMARY KEY)
- **creator_id** (INTEGER)
- **title** (TEXT)
- **views** (INTEGER)
- **likes** (INTEGER)
- **comments** (INTEGER)
- **shares** (INTEGER)
- **watch_completion** (FLOAT)
- **engagement_rate** (FLOAT)
- **engagement_diversity** (FLOAT)
- **rewatch** (FLOAT)
- **nlp_quality** (FLOAT)
- **compliance** (INTEGER)
- **rev_prop** (FLOAT)
- **proj_earnings** (FLOAT)
- **quality_score** (FLOAT)
- **created_at** (TEXT)

## Current Data State

### Creators
Currently contains **1 creator**:

```json
{
  "creator_id": 1,
  "followers": 420,
  "following": 69,
  "likes": 20,
  "name": "John Doe"
}
```

### Videos
Currently contains **5 videos** for creator "John Doe":

1. **"OIAIOIA"** (video_id: 1)
   - Views: 110, Likes: 69, Comments: 10, Shares: 3
   - Watch completion: 0.1, Engagement rate: 0.9
   - Compliance: 1 (compliant)

2. **"China Vlog"** (video_id: 2)
   - Views: 52, Likes: 2, Comments: 1, Shares: 1
   - Watch completion: 0.3, Engagement rate: 0.7
   - Compliance: 1 (compliant)

3. **"Dank memes"** (video_id: 3)
   - Views: 325, Likes: 50, Comments: 9, Shares: 2
   - Watch completion: 0.8, Engagement rate: 0.4
   - Compliance: 1 (compliant)

4. **"Day in the life of a high school student"** (video_id: 4)
   - Views: 1,520, Likes: 170, Comments: 21, Shares: 4
   - Watch completion: 0.5, Engagement rate: 0.1
   - NLP Quality: 0.99 (highest quality content)
   - Compliance: 1 (compliant)

5. **"feeling cute"** (video_id: 5) - **Most Popular**
   - Views: 23,071, Likes: 1,090, Comments: 15, Shares: 19
   - Watch completion: 0.9, Engagement rate: 0.9
   - **Compliance: 0 (non-compliant)**
   - NLP Quality: 0.1 (lowest quality)

## API Endpoints

### GET Endpoints

**List all creators:**
```bash
curl -s "http://localhost:5001/list-creators"
```

**Get creator by name:**
```bash
curl -s "http://localhost:5001/get-creator-by-name?name=John%20Doe"
```

**Get all videos for a creator:**
```bash
curl -s "http://localhost:5001/get-all-videos-data?creator_id=1"
```

**Get video thumbnails:**
```bash
curl -s "http://localhost:5001/get-all-videos-thumbnails?creator_id=1"
```

### POST Endpoints

**Upload video:**
```bash
curl -X POST -F "file=@video.mp4" -F "creator_id=1" -F "title=My Video" http://localhost:5001/upload-video
```

## Key Observations

1. **Content Quality vs Popularity**: The most popular video ("feeling cute") has the lowest NLP quality (0.1) and is non-compliant
2. **Engagement Patterns**: Higher engagement doesn't always correlate with compliance
3. **Creator Profile**: John Doe has a modest following (420 followers) but decent engagement
4. **Revenue Metrics**: All videos currently show 0 for revenue-related fields (rev_prop, proj_earnings, quality_score)

## Database Location

- **File**: `backend/app.db`
- **Type**: SQLite
- **Initialization**: Automatic on Flask app startup
- **Sample Data**: Loaded from `backend/tables_init/videos_init.json` and `backend/tables_init/creators_init.json`

## Development Notes

- Server runs on port 5001 (changed from 5000 due to macOS AirPlay conflict)
- CORS enabled for development
- Database recreated on each app startup
- Thumbnails automatically generated from uploaded videos using OpenCV