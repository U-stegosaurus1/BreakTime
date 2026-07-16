# BreakTime REST API Documentation

**Base URL:** `http://localhost:3000/api`

All protected routes require an `Authorization: Bearer <accessToken>` header.

---

## Authentication

### POST /auth/register
Register a new user.

**Body:**
```json
{
  "email": "student@university.edu",
  "password": "securepass123",
  "fullName": "Alex Johnson",
  "university": "State University"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "user": { "id": "uuid", "email": "...", "fullName": "..." },
    "accessToken": "jwt...",
    "refreshToken": "jwt..."
  }
}
```

---

### POST /auth/login
**Body:** `{ "email": "...", "password": "..." }`

**Response 200:** Same shape as register.

---

### POST /auth/refresh
Rotate tokens.

**Body:** `{ "refreshToken": "jwt..." }`

**Response 200:**
```json
{ "success": true, "data": { "accessToken": "...", "refreshToken": "..." } }
```

---

### POST /auth/logout
**Body:** `{ "refreshToken": "jwt..." }`

---

## Users

### GET /users/profile 🔒
Returns full profile with recent badges and counts.

### PUT /users/profile 🔒
**Body:** `{ "fullName": "...", "university": "...", "avatarUrl": "...", "fcmToken": "..." }`

---

## Activities

### POST /activities 🔒
Log an activity.

**Body:**
```json
{
  "activityType": "steps",
  "value": 500,
  "unit": "count",
  "metadata": {}
}
```

`activityType` options: `steps`, `active_minutes`, `stretch`, `breaks`, `water`

**Response 201:**
```json
{
  "success": true,
  "data": { "log": {...}, "pointsEarned": 5, "xpGained": 6, "newLevel": 1 }
}
```

### GET /activities/today 🔒
Returns today's summary grouped by activity type, plus goal progress.

### GET /activities/history?days=7 🔒
Returns activity logs for the last N days (default 7).

---

## Challenges

### GET /challenges?type=daily 🔒
`type`: `daily`, `weekly`, `monthly`

Returns challenges with progress attached.

### GET /challenges/history 🔒
Returns completed challenge history.

---

## Leaderboard

### GET /leaderboard?type=global 🔒
`type`: `global`, `friends`, `university`

**Response:**
```json
{
  "success": true,
  "data": {
    "leaderboard": [{ "rank": 1, "fullName": "Sarah J.", "totalPoints": 2450, "isCurrentUser": false }],
    "myRank": { "rank": 3, "totalPoints": 850 }
  }
}
```

---

## Badges

### GET /badges 🔒
All badges with `earned: true/false` for the current user.

### GET /badges/mine 🔒
Only earned badges.

---

## Stats

### GET /stats?period=week 🔒
`period`: `week`, `month`, `year`

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": { "totalSteps": 8500, "totalActiveMinutes": 45, "totalBreaks": 12, "totalCalories": 380 },
    "byDay": { "2024-01-15": { "steps": 1200, "active_minutes": 8 } },
    "user": { "level": 6, "xp": 1250, "totalPoints": 850, "currentStreak": 7 }
  }
}
```

---

## Notifications

### GET /notifications 🔒
Returns last 30 notifications.

### PUT /notifications/:id/read 🔒
Mark one as read.

### PUT /notifications/read-all 🔒
Mark all as read.

---

## Goals

### GET /goals 🔒
All active goals.

### POST /goals 🔒
**Body:** `{ "type": "steps", "targetValue": 3000, "unit": "steps" }`

### PUT /goals/:id 🔒
**Body:** `{ "targetValue": 5000 }`

### DELETE /goals/:id 🔒
Soft-deletes (sets `isActive: false`).

---

## Rewards

### GET /rewards 🔒
All available rewards.

### POST /rewards/redeem 🔒
**Body:** `{ "rewardId": "uuid" }`

---

## Friends

### GET /friends 🔒
All accepted friends.

### POST /friends/request 🔒
**Body:** `{ "email": "friend@uni.edu" }`

### PUT /friends/:id/accept 🔒
Accept a pending friend request.

---

## Error Format

All errors return:
```json
{ "success": false, "message": "Human-readable error message" }
```

Common status codes:
- `400` Bad request / validation error
- `401` Unauthorized
- `403` Forbidden
- `404` Not found
- `409` Conflict (duplicate)
- `429` Rate limit exceeded
- `500` Internal server error
