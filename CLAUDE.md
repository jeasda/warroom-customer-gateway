# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

**Greenfield, just past first prototype.** Repository contains design artifacts (`CONTEXT.md`, `docs/adr/`, `docs/ui-decisions/`, `grill.md`) and a Next.js 16 + Tailwind v4 skeleton in `web/` (bootstrapped via `npx create-next-app`, no real routes built yet — only the default `web/src/app/page.tsx`). No tests, no production deploy, no Supabase wiring.

The original plan (`grill.md`) called the project "Brown-Field" — this was clarified during grilling to be Greenfield in reality.

## Dev commands

Node lives at `C:\Program Files\nodejs\` and is **not on PATH** in this environment. Prepend it before running npm/node:

```powershell
$env:Path += ";C:\Program Files\nodejs"
```

From `web/`:
- `npm run dev` — Next.js dev server (Turbopack) on http://localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint

Next.js 16 has **breaking changes** vs. earlier versions — read `web/AGENTS.md` and consult `web/node_modules/next/dist/docs/` before assuming APIs from training data are valid.

## What is being built

WARROOM Customer Gateway — Web + LINE OA application that lets Members order WARROOM merchandise (เสื้อยืดโลโก้, แก้วน้ำ, ตุ๊กตามาสคอต) with an Admin Dashboard for the team. **Payment is not handled in the system** — the team contacts Members back to collect payment via PromptPay.

Planned stack (from `grill.md`, not yet scaffolded):
- Cloudflare Pages / Workers
- Supabase Cloud (Postgres + Auth)
- Next.js + TailwindCSS + ShadCN-UI
- LINE Login (Member) + LIFF (LINE channel) + LINE Messaging API (notifications)
- Supabase Auth email/password for Admin (separate identity from Member)

## Required reading before changing anything

1. **`CONTEXT.md`** — the ubiquitous-language glossary. Read it first. Every domain term used in code and conversation must follow it (e.g. `Merchandise` not `Product`, `Member` not `Customer`, `Variant` not `SKU`). The "Flagged ambiguities" and "Example dialogue" sections capture decisions that aren't visible in code.

2. **`docs/adr/`** — architectural decisions with non-obvious trade-offs:
   - [0001 Soft Stock — ไม่ตัดสต๊อกแบบ Atomic](docs/adr/0001-soft-stock-no-atomic-decrement.md): stock is a display hint, not a constraint. Do **not** add atomic decrement, `select for update`, or stock reservation logic — that would silently break the contact-back flow.
   - [0002 LINE LIFF ใช้ Web App ตัวเดียวกัน](docs/adr/0002-liff-renders-same-web-app.md): LINE OA renders the same Web shop via LIFF webview. Do **not** port flows to a LINE-native chatbot unless the user explicitly requests it.

3. **`docs/ui-decisions/`** — UI/UX decisions captured from prototype sessions. Lighter-weight than ADRs (no trade-off analysis required). Read before building the matching component:
   - [Variant Selector](docs/ui-decisions/variant-selector.md): chosen pattern + implementation rules for the size selector on `/shop/[slug]`.

3. **`grill.md`** — original plan sketch. Useful for historical intent but **`CONTEXT.md` overrides it** wherever they disagree (e.g. grill.md says "จอง/สั่งซื้อ", CONTEXT says Order only; grill.md says "Brown-Field", reality is Greenfield).

## Documentation conventions

- **Write all documentation files in Thai**, keeping technical terms in English (`Merchandise`, `Variant`, `LINE LIFF`, `Cloudflare`, `Supabase`, schema/code identifiers). This applies to `CONTEXT.md`, ADRs, READMEs, business-rule comments. Code identifiers themselves stay English.
- When a new domain term gets resolved during a conversation, update `CONTEXT.md` inline — don't batch.
- Only create a new ADR when the decision is **hard to reverse + surprising without context + the result of a real trade-off**. See `.agents/skills/grill-with-docs/ADR-FORMAT.md`.

## Identity model (easy to get wrong)

Three distinct actor types — do not collapse them:

- **Visitor** — not signed in. Can browse public catalog. Has a Guest Cart in browser localStorage.
- **Member** — signed in via LINE Login. Identified by `line_user_id`. Has a Member Cart in DB, places Orders. Cart is shared across Web ↔ LINE LIFF channels.
- **Admin** — WARROOM team. Email/password via Supabase Auth, Web only. Single role with audit logging. **Admin and Member are completely separate identities — no linking, no account merge.**

When a Visitor signs in, their Guest Cart merges into Member Cart by **summing quantities** for duplicate Variants.
