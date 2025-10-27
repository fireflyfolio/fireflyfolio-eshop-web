# eShop — Socle B2C & Admin (Step 1)

Monorepo minimal avec **4 applications** et **infrastructure** prête à l’emploi :

- **Web (B2C)**
  - Frontend : **Next.js** (SSR) — appelle une route `status` de l’API
  - API : **NestJS** (REST) — expose `GET /status = "Hello dear customer"`, **Swagger** `/docs`
- **Admin**
  - Frontend : **Nuxt 3** (SSR) — appelle une route `status` de l’API
  - API : **NestJS** (REST) — expose `GET /status = "Hello dear manager"`, **Swagger** `/docs`
- **Infra** : **PostgreSQL**, **pgAdmin**, **Redis**
- **Docker Compose** : orchestrations des 4 apps + services d’infra

---

## Architecture & Dossiers

- `apps/web-frontend` : UI B2C (Next.js)
- `apps/web-api` : API B2C (NestJS + Swagger)
- `apps/admin-frontend` : UI Admin (Nuxt 3)
- `apps/admin-api` : API Admin (NestJS + Swagger)
- Services : `postgres`, `pgadmin`, `redis`

Frontends consomment leurs APIs via des **variables d’environnement** d’URL interne (noms de services Docker).

---

## Ports (hôte)

- Web Frontend : **http://localhost:6000**
- Web API : **http://localhost:6001** (routes `/status`, `/docs`)
- Admin Frontend : **http://localhost:7000**
- Admin API : **http://localhost:7001** (routes `/status`, `/docs`)
- pgAdmin : **http://localhost:5050**

> Les apps écoutent en **interne** sur `3000` et sont mappées vers les ports hôte ci-dessus.

---

## Variables d’environnement (extrait)

- **Ports** : `WEB_FRONTEND_PORT=6000`, `WEB_API_PORT=6001`, `ADMIN_FRONTEND_PORT=7000`, `ADMIN_API_PORT=7001`
- **Base de données** : `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `DATABASE_URL`
- **Redis** : `REDIS_URL`
- **pgAdmin** : `PGADMIN_DEFAULT_EMAIL`, `PGADMIN_DEFAULT_PASSWORD`, `PGADMIN_PORT`
- **Frontends (URLs internes vers APIs)** :
  - Next (Web) : `INTERNAL_WEB_API_URL` → `http://web-api:3000` (Docker)
  - Nuxt (Admin) : `INTERNAL_ADMIN_API_URL` → `http://admin-api:3000` (Docker)

> Hors Docker (développement local), définir les URLs internes vers `http://localhost:6001` (Web) et `http://localhost:7001` (Admin).

---

## Démarrage

1) Copier l’exemple d’env en `.env` (racine).  
2) Lancer les services avec Docker Compose (build + up).  
3) Vérifier les 4 endpoints principaux :
   - Web Frontend (6000) → affiche la réponse de Web API
   - Web API (6001) → `/status` + Swagger `/docs`
   - Admin Frontend (7000) → affiche la réponse de Admin API
   - Admin API (7001) → `/status` + Swagger `/docs`
   - pgAdmin (5050) → se connecter avec les identifiants de `.env`

---

## Tests (MVP)

- **APIs (NestJS)** : Jest + Supertest  
  - Tests unitaires, intégration et e2e (dossier `test/`)
- **Frontends** :
  - Next (Web) : Vitest (unit), Testing Library (components), Playwright (e2e)
  - Nuxt (Admin) : Vitest (unit), Playwright (e2e)

> Les tests e2e des APIs utilisent une instance Nest en mémoire (Supertest sur `app.getHttpServer()`), sans dépendre des conteneurs.

---

## Logs & Observabilité

- **NestJS** : `Logger` natif (logs de démarrage, ports, chemins Swagger).  
- **Frontends** : logs console (MVP).  
- Évolutions possibles (étape suivante) :
  - **nestjs-pino** + format NDJSON
  - endpoints `/healthz` / `/readyz`
  - `depends_on` avec **healthchecks HTTP** pour APIs

---

## Sécurité & Qualité (base)

- **Versionning** : dépendances épinglées (front/back) pour éviter les régressions.
- **Swagger** : exposé uniquement en dev (recommandation) ; sécuriser/filtrer en prod.
- **Env** : validation avec `@nestjs/config` + `Joi` (APIs).
- **CI (proposée)** : lint, build, tests (unit/int/e2e), audit de vulnérabilités.

---

## Prochaines étapes

- **Clean Architecture** : couches domain/use-cases/repositories/adapters.
- **Auth Admin** : sessions/ JWT, garde de routes, UI login (Nuxt).
- **State & UI** : Tailwind + composants (b2c), Pinia (admin), layout, pages.
- **Données** : Prisma/PostgreSQL (modèles `User`, `Product`, etc.), migrations & seeds.
- **Observabilité** : `pino`, traces, dashboards, alerting.
- **CD** : images Docker, déploiement orchestré (compose/Swarm/K8s), secrets.
