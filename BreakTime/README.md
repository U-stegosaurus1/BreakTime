# BreakTime 🏃

> A Persuasive Mobile Game to Reduce Sedentary Behavior Among University Students

**Move More. Feel Better. Achieve More.**

---

## Overview

BreakTime is a full-stack mobile application that encourages university students to reduce prolonged sitting and increase physical activity through gamification, rewards, social competition, reminders, and habit-building mechanics.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React Native + TypeScript |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT + Refresh Tokens |
| Notifications | Firebase Cloud Messaging |
| State Management | Zustand |
| API Client | React Query + Axios |

## Quick Start

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- React Native CLI
- Android Studio / Xcode

### 1. Clone & Install

```bash
cd BreakTime
# Backend
cd backend && npm install
# Frontend
cd ../frontend && npm install
```

### 2. Environment Setup

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your DB credentials and JWT secrets

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your API URL
```

### 3. Database Setup

```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run

```bash
# Backend (terminal 1)
cd backend && npm run dev

# Frontend (terminal 2)
cd frontend && npm run android
# or
cd frontend && npm run ios
```

## Project Structure

```
BreakTime/
├── frontend/          # React Native App
├── backend/           # Node.js API Server
├── database/          # SQL migrations & seeds
├── docs/              # API documentation
└── deployment/        # Docker & deployment configs
```

## Features

- 🏃 Activity tracking (steps, active time, breaks)
- 🎯 Daily & weekly challenges
- 🏆 Gamification (XP, levels, badges, streaks)
- 📊 Analytics & progress charts
- 🤝 Social features & leaderboards
- 🎁 Rewards store
- 🔔 Smart push notifications
- 🎨 Modern premium UI

## License

MIT — Academic Project
