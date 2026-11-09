# Architecture and release checklist

## Frontend
- `src/App.jsx`: page composition and prototype interactions.
- `src/styles.css`: design tokens, responsive layouts, RTL and dark theme.
- `src/main.jsx`: app entry point.
- `public/`: favicon and PWA manifest.

## Backend
- `backend/src/server.js`: Express health/auth scaffold.
- `backend/sql/schema.sql`: initial relational schema.
- `backend/.env.example`: local configuration template.

## Before production
- [ ] Replace demo datasets with tenant-scoped API data.
- [ ] Add token storage/session refresh strategy using secure cookies where possible.
- [ ] Add auth middleware and per-resource authorization.
- [ ] Add email verification, password reset, rate limiting and abuse protection.
- [ ] Add transactional order/commission writes and idempotency keys.
- [ ] Add migrations and automated database backup/restore tests.
- [ ] Replace remote demo photos with cleared product imagery.
- [ ] Finish and review all Arabic/French/English copy.
- [ ] Add accessible keyboard interaction and screen-reader labels to all dynamic controls.
- [ ] Add service worker/offline strategy if PWA offline support is required.
- [ ] Configure monitoring, error reporting, CSP and production CORS allowlist.
- [ ] Run dependency audit and security review before public release.
