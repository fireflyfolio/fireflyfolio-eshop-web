# FireflyFolio eShop – Step 1 Foundations

Monorepo skeleton with Next.js (web), NestJS (api & admin), PostgreSQL, Redis, Prisma, and Docker Compose.

## Quick start

1. Copy env:
```bash
cp .env.example .env
```

2. Start everything:
```bash
docker compose up --build
```

3. Open:

- Frontend: http://localhost:3000 → shows API message
- API: http://localhost:3001/status → Hello dear customer
- Admin: http://localhost:3002/auth/login → login with admin/admin, then /dashboard → Hello dear manager


## Security & versions

- Packages are pinned to latest and include a script to bump quickly: `npm run check:updates` in each app.
- Consider enabling Dependabot/Renovate and CI `npm audit --production`.
- No file upload stack included in this step (avoids transient issues with packages like multer).

## Env handling

- **Nest apps** load env via dotenv (import 'dotenv/config'). In Docker, envs also come from Compose.
- **Next.js** never exposes server secrets to the client. The frontend calls a server-only route (/api/_status) which reads INTERNAL_API_URL on the server.

## Scripts (inside containers)

- API: `npm run start` | `npm run start:dev` | `npm run prisma:migrate`
- Admin: `npm run start` | `npm run start:dev` | `npm run prisma:migrate`
- Web: `npm run dev` | `npm run build` | `npm run start`

```bash
cp .env.example .env
```

## Tech

- Frontend: Next.js + Tailwind (minimal UI)
- API: NestJS (/status)
- Admin: NestJS + Redis sessions (hardcoded admin creds from env)
- DB: PostgreSQL + Prisma (migrations run on container start)
- Redis: session store

## Dev notes
- For now, Prisma has placeholder models; routes don’t use DB yet. This proves connectivity and lays the groundwork.
- Replace defaults in `.env` for real environments (admin creds, session secret).

### Notes
- The **strict minimum** is met: web→api status, api returns fixed string, admin login→dashboard using Redis-backed session.
- Next steps will introduce proper domain layers (use-cases, repositories), DTO validation, and real DB entities.
