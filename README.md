# HarborAid

Production-ready platform that helps food pantries, mutual-aid groups, and neighborhood hubs coordinate inventory, volunteer shifts, and household requests.

Stack: **Angular 19** + **NestJS 11** + **Neon Postgres** + **Tailwind CSS**.

## Repository

https://github.com/Criscode2022/harboraid

## Quick start

```bash
docker compose up -d
cd apps/api
cp .env.example .env
npm install
npm run seed
npm run start:dev
```

```bash
cd apps/web
npm install
npm start
```

Open http://localhost:4200

Demo login: `maria@harboraid.org` / `HarborAid!23`

## Neon

Create a Neon project, put the pooled URL in `apps/api/.env` as `DATABASE_URL`, then run `npm run seed`.

## Tests

```bash
cd apps/api && npm test
```

Unit tests cover inventory alerts, request workflow, shift coverage, and password hashing (7 passing).

## Deploy

- API: Render / Railway / Fly with `DATABASE_URL` and `JWT_SECRET`. Start: `node dist/main.js`
- Web: build `apps/web` and host `dist/web/browser`, or use the root `Dockerfile` for a single container that serves API + static Angular.

MIT © Cristian Damil García
