# IMDAD Premium 1.3 — Final Prototype Review

A refined React/Vite prototype for IMDAD's two connected journeys: customer-order promotion without upfront asset purchase, and optional acquisition/ownership of stock-linked digital assets.

## Included
- Overview, Marketplace, Assets (My Assets / Available Assets / Internal Exchange), Orders, Commissions, Community Galaxy, Profile.
- Marketplace product details with IMDAD VERIFIED prototype badge, copy description, download image, and a single primary action: Order to Customer.
- Product-specific options: only variants defined for a product are requested in its customer order form. Customer contact, wilaya, municipality, and full delivery address are captured in the local demo order.
- Assets search by product and demo asset code; multiple acquisitions; demo listing and transfer flow.
- One wallet surface with portfolio, pending and available balances, withdrawal request history; demo withdrawals reserve the requested amount from the available balance.
- Arabic/English/French interface, RTL, light/dark theme, gentle sound effects toggle, responsive layout, Galaxy and Berry.
- PostgreSQL schema foundation extended with stock, physical assets, transfers, exchange listings, wallets, transactions, withdrawals and referral attribution.

## Run
Requires Node.js 20+.

```bash
npm install
npm run dev
npm run build
```

Backend scaffold: `cd backend && npm install`; configure `.env` from `.env.example`, apply `sql/schema.sql`, then run the backend script.

## Important prototype boundary
The frontend is still local demo mode using browser Local Storage. It is not connected to the API or PostgreSQL. Product verification badges, stock codes, acquisitions, exchange transfers, customer orders, commissions and withdrawals are demonstrations only. No real goods are reserved, no legal title is transferred, and no funds are received or paid. The SQL schema is a foundation only and has not been wired to API routes.

Before real-world launch, implement authenticated APIs and role/ownership checks, transactional stock reservations and transfers, commission settlement only after successful delivery/return windows, idempotent wallet ledger operations, verified warehouse workflows, payout-provider integration, audit trails, data protection, security review, and legal/accounting review of asset ownership and liquidity promises. Do not describe the 15% resale discount as guaranteed liquidity.

Product images currently use remote Unsplash demo URLs; replace with owned/licensed supplier images.
