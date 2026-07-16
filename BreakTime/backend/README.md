# BreakTime Backend

Node.js + Express + TypeScript API server.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your values

# Run migrations
npx prisma migrate dev --name init

# Seed database
npx prisma db seed

# Start dev server
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled server |
| `npm test` | Run tests |
| `npm run prisma:studio` | Open Prisma Studio |

## Environment Variables

See `.env.example` for all required variables.

## Project Structure

```
src/
├── app.ts              # Express app
├── index.ts            # Server entry
├── config/
│   └── database.ts     # Prisma client
├── controllers/        # Route handlers
├── middleware/
│   ├── auth.middleware.ts
│   └── errorHandler.ts
├── routes/             # Express routers
└── utils/
    ├── AppError.ts
    ├── jwt.ts
    └── logger.ts
prisma/
├── schema.prisma       # DB schema
└── seed.ts             # Seed data
```

## Demo Credentials

After seeding:
- Email: `alex@university.edu`
- Password: `password123`
