# eShop — Admin

## Infra
```
cp .env.example .env
docker compose up -d
```

## Backend
```
cd backend
npm i
npm run prisma:generate
npm run prisma:migrate # creates DB tables
npm run seed # seeds user: test/test
npm run start:dev
```

## Frontend
```
cd ../frontend
npm i
npm run dev
```

## App
```
Frontend: http://localhost:3000
API: http://localhost:3001
Login with: test / test
```

## from repo root
```
npx ts-node scripts/hash.ts yourPassword
```

or interactive prompt:
```
npx ts-node scripts/hash.ts
```


# Security & production hardening (checklist)
- Disable synchronize: true and use migrations
- Add HTTPS + proper CORS origin
- Set strong JWT_SECRET, shorter TTLs, refresh tokens if needed
- Store tokens in httpOnly cookies if you prefer (adjust interceptors)
- Rate limiting and helmet on backend
- CSRF considerations if you switch to cookies
- Proper logging/monitoring


# Notes on Clean Architecture
- Domain: users/domain (pure UserModel).
- Application: users/app and auth/app (use cases, policies).
- Infrastructure: shared/infra/prisma (Prisma adapter), shared/infra/redis (token blacklist), users/infra (Prisma repo).
- Interface: auth/interface, welcome/interface (controllers/DTOs).
- Prisma replaces TypeORM while preserving the same boundaries.
