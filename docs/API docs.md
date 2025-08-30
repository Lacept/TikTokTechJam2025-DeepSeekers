**Tables**  
Creator Table

| Column | Example |
| :---- | :---- |
| **creator\_id** | 123 |
| name | John Doe |
| following | 50 |
| followers | 1000 |
| likes | 120 |

Video Table

| Column | Description |
| :---- | :---- |
| **video\_id** | Auto incremented, i.e. new video id assigned automatically |
| **creator\_id** |  |
| title | Some user interaction metrics generated randomly to display on ui |
| views |  |
| likes |  |
| comments |  |
| shares |  |
| watch\_completion | Some more metrics for the optimiser thingy |
| engagement\_rate |  |
| engagement\_diversity |  |
| rewatch |  |
| nlp\_quality |  |
| compliance |  |
| rev\_prop | Proportion of tiktok’s total ad revenue earned by that single video |
| project\_earnings | Money earned by that video |
| quality\_score | Quality score is a combination of all the optimiser metrics in green i think |
| created\_at | Timestamp of video upload |

**Endpoints**

**/upload-video**  
\- POST method  
\- make sure request body is form-data

Put video title and creator\_id in request body, together with file.

| creator\_id | Id of creator (can just use 1 for John Doe haha) |
| :---- | :---- |
| title | Title of video |
| file | Mp4 file raw data |

If successful, returns:  
{  
   "ok": True,  
   "video\_id": video\_id,  
}, 201

**/get-creator-data**  
\- GET method  
\- put creator\_id in query parameter string, e.g.  /get-creator-data?creator\_id=1  
\- if successful: returns all the creator data in the creator table and 404 status code

**/get-video**  
\- GET method  
\- put video\_id in query parameter string, e.g.  /get-video?video\_id=1  
\- if successful: returns the video clip with mimetype="video/mp4"

**/get-video-thumbnail**  
\- GET method  
\- put video\_id in query parameter string, e.g.  /get-video-thumbnail?video\_id=1  
\- if successful: returns thumbnail image with mimetype="image/jpeg"

**/get-video-data**  
\- GET method  
\- put video\_id in query parameter string, e.g.  /get-video-data?video\_id=1  
\- if successful: returns all the video data in the video table for that video\_id and 404 status code

**/get-all-videos-data**  
\- GET method  
\- put creator\_id in query parameter string, e.g.  /get-all-videos-data?creator\_id=1  
\- if successful: returns all the video data in the video table which belong to that creatorSample output:  
\[  
  {  
    "comments": 10,  
    "compliance": 1,  
    "created\_at": "2025-08-30 08:49:38",  
    "creator\_id": 1,  
    "engagement\_diversity": 0.4,  
    "engagement\_rate": 0.9,  
    "likes": 69,  
    "nlp\_quality": 0.2,  
    "proj\_earnings": 602.0894493336126,  
    "quality\_score": 0.26408044970115724,  
    "rev\_prop": 0.060208944933361264,  
    "rewatch": 0.3,  
    "shares": 3,  
    "title": "OIAIOIA",  
    "video\_id": 1,  
    "views": 110,  
    "watch\_completion": 0.1  
  },  
  {  
    "comments": 1,  
    "compliance": 1,  
    "created\_at": "2025-08-30 08:49:38",  
    "creator\_id": 1,  
    "engagement\_diversity": 0.4,  
    "engagement\_rate": 0.7,  
    "likes": 2,  
    "nlp\_quality": 0.8,  
    "proj\_earnings": 440.62364277735725,  
    "quality\_score": 0.401827306180955,  
    "rev\_prop": 0.04406236427773572,  
    "rewatch": 0.1,  
    "shares": 1,  
    "title": "China Vlog",  
    "video\_id": 2,  
    "views": 52,  
    "watch\_completion": 0.3  
  },  
  {  
    "comments": 9,  
    "compliance": 1,  
    "created\_at": "2025-08-30 08:49:38",  
    "creator\_id": 1,  
    "engagement\_diversity": 0.2,  
    "engagement\_rate": 0.4,  
    "likes": 50,  
    "nlp\_quality": 0.9,  
    "proj\_earnings": 2099.1037201085546,  
    "quality\_score": 0.5487786071141879,  
    "rev\_prop": 0.20991037201085547,  
    "rewatch": 0.7,  
    "shares": 2,  
    "title": "Dank memes",  
    "video\_id": 3,  
    "views": 325,  
    "watch\_completion": 0.8  
  },  
  {  
    "comments": 21,  
    "compliance": 1,  
    "created\_at": "2025-08-30 08:49:38",  
    "creator\_id": 1,  
    "engagement\_diversity": 0.7,  
    "engagement\_rate": 0.1,  
    "likes": 170,  
    "nlp\_quality": 0.99,  
    "proj\_earnings": 6858.183187780475,  
    "quality\_score": 0.3702214796259402,  
    "rev\_prop": 0.6858183187780476,  
    "rewatch": 0.3,  
    "shares": 4,  
    "title": "Day in the life of a high school student",  
    "video\_id": 4,  
    "views": 1520,  
    "watch\_completion": 0.5  
  },  
  {  
    "comments": 15,  
    "compliance": 0,  
    "created\_at": "2025-08-30 08:49:38",  
    "creator\_id": 1,  
    "engagement\_diversity": 0.9,  
    "engagement\_rate": 0.9,  
    "likes": 1090,  
    "nlp\_quality": 0.1,  
    "proj\_earnings": 0.0,  
    "quality\_score": 0.0,  
    "rev\_prop": 0.0,  
    "rewatch": 0.9,  
    "shares": 19,  
    "title": "feeling cute",  
    "video\_id": 5,  
    "views": 23071,  
    "watch\_completion": 0.9  
  }  
\]

**/get-all-videos-thumbnails**  
\- GET method  
\- put creator\_id in query parameter string, e.g.  /get-all-videos-thumbnails?creator\_id=1  
\- if successful: returns all the video thumbnails which belong to that creator  
Output format:

{  
    "images": \[  
        {  
            "content\_type": "image/jpeg",  
            "data\_uri":  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAQAAkADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKT……………,  
"video\_id": 1  
        },  
        {  
            "content\_type": "image/jpeg",  
            "data\_uri":  "data\_uri":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAQAAkADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKT……………,  
"video\_id": 2  
        }  
    \]  
}

