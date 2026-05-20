# PRD-0001 — WARROOM Customer Gateway MVP

Source-of-truth: glossary ใน [`CONTEXT.md`](../../CONTEXT.md) + decisions ใน [`docs/adr/`](../adr/) + UI patterns ใน [`docs/ui-decisions/`](../ui-decisions/)

## Problem Statement

ทีม WARROOM ต้องการขาย Merchandise (เสื้อยืดโลโก้, ถ้วยและแก้ว, ตุ๊กตามาสคอต) ให้กับ Member ปัจจุบันยังไม่มีระบบที่:
- ให้ Member สั่งสินค้าเองได้ทั้งทาง Web และ LINE OA
- ให้ทีมบริหารจัดการ Order ได้รวมศูนย์
- ค้นเจอได้จาก Search engine และ AI agents (SEO + GEO)

ผลที่ตามมา: ทีมต้องรับ Order แบบ ad-hoc ผ่าน chat ส่วนตัว/Google Form เสียเวลาทั้งสองฝั่ง, ติดตามสถานะลำบาก, ไม่มี Audit log ของการเก็บเงิน, ลูกค้าใหม่หาเจอ Merchandise ของ WARROOM ยาก

## Solution

Web + LINE LIFF application ที่:
- **Public Catalog** ให้ Visitor browse Merchandise ตาม Category (เสื้อยืด/แก้ว/ตุ๊กตา) และ Collection (ใหม่/ขายดี/โปรโมชั่น) ได้โดยไม่ต้อง Sign in
- **Member Flow** Sign in ผ่าน LINE Login → ใส่ Cart ข้าม Channel → submit Order พร้อมที่อยู่จัดส่ง → รับ LINE push notification ทุกครั้งสถานะเปลี่ยน
- **Admin Dashboard** เพื่อ transition OrderStatus, จัดการ Merchandise/Stock/Blog/Landing, มี Audit Log บันทึกการเก็บเงิน (เพราะ payment เกิดนอกระบบ)
- **Discoverability** เปิดเผย `llms.txt` + JSON-LD schema.org + sitemap.xml ให้ Search engine และ AI agents ค้นเจอ

Payment ไม่อยู่ในระบบ — ทีม contact Member กลับเพื่อแจ้งยอดและเลข PromptPay (อ้างอิง [ADR-0001](../adr/0001-soft-stock-no-atomic-decrement.md))

## User Stories

### Visitor (ยังไม่ Sign in)

1. As a Visitor, I want to browse Merchandise catalog without signing in, so that I can evaluate before committing identity
2. As a Visitor, I want to filter catalog by Category (เสื้อยืด/แก้ว/ตุ๊กตา) via left menu, so that I can find what I'm looking for
3. As a Visitor, I want to browse Collection sections on the home page (New / Best / Promo), each showing 4 items + "ดูทั้งหมด" link, so that I see curated picks
4. As a Visitor, I want to see Merchandise price (with discount strike-through if any) and Stock tier (พร้อมส่ง/เหลือน้อย/หมดชั่วคราว) publicly, so that I can decide if it's worth buying
5. As a Visitor, I want to add items to a Guest Cart stored in browser localStorage, so that I can build selection before signing in
6. As a Visitor, I want my Guest Cart to persist across page reloads, so that I don't lose my work
7. As a Visitor, I want to be discoverable via Google search and AI agents (ChatGPT/Perplexity/Claude), so that I find WARROOM via external search
8. As a Visitor, I want to read public Blog posts, so that I learn about WARROOM brand and offerings
9. As a Visitor, I want catalog pages to load fast (SSR/SSG), so that I have smooth first-visit experience

### Member (Sign in ผ่าน LINE Login)

10. As a Member, I want to sign in via LINE Login (Web) or auto-detected via LIFF (in LINE OA), so that I don't need a separate password
11. As a Member, when I sign in my Guest Cart should merge into my Member Cart by summing quantities for duplicate Variants, so that I don't lose what I added before signing in
12. As a Member, my Cart should be shared between Web and LINE LIFF, so that I can switch channels mid-shopping
13. As a Member, I want to pick a Variant (ไซส์ S/M/L/XL for เสื้อ, เล็ก/ใหญ่ for แก้ว) via chip buttons (Variant A pattern from [ui-decision](../ui-decisions/variant-selector.md)), so that I order the right one
14. As a Member, when sold-out Variant แสดง strike-through + disabled, so that I can't accidentally pick OOS
15. As a Member, I want to add multiple Accessories to a doll (หมวก/เกราะ/ดาบ/ไซเรน) with +ราคาเพิ่ม showing, so that I customize my doll
16. As a Member, I want to see Cart line items with Variant + Accessory selection labels, qty controls, per-item subtotal, so that I can review before checkout
17. As a Member, I want to deselect items in Cart (checkbox per line) and checkout only selected, so that I keep some items for later
18. As a Member, at checkout I want to enter shipping address (recipient_name, phone, address_line1/2, subdistrict, district, province, postal_code) + optional note, so that the team knows where/how to send
19. As a Member, I want my default shipping address auto-filled from my last Order, so that I don't retype
20. As a Member, I want clear notice at checkout that payment is offline (team contacts back with PromptPay), so that I don't expect online payment
21. As a Member, after submitting Order I want to see confirmation with Order ID + initial status "รอติดต่อ", so that I know it went through
22. As a Member, I want to receive LINE push message every time my Order status changes (รอติดต่อ → ยืนยัน → รอชำระ → กำลังจัดส่ง → จัดส่งแล้ว), with tracking number on `จัดส่งแล้ว`, so that I stay informed
23. As a Member, I want to view my Order history (status badge, total, items thumbnail), so that I can track past purchases
24. As a Member, I want to self-cancel my Order ONLY while status = `รอติดต่อ`, so that I can change my mind early without conflicting with team's mid-fulfillment work
25. As a Member, I want to see Stock tier (พร้อมส่ง/เหลือน้อย/หมดชั่วคราว) but not exact stock number, so that business inventory data stays private

### Admin (Sign in ผ่าน Email/Password)

26. As an Admin, I want to sign in via Email/Password through Supabase Auth (separate from LINE), so that admin identity is independent and Web-only
27. As an Admin, I want to view all Orders with filter chips by OrderStatus + count per status, so that I work through pending Orders first
28. As an Admin, I want to view Order detail in side drawer (Member info, address, lines, total, audit log), so that I have full context before contacting Member
29. As an Admin, I want to transition OrderStatus via buttons (next-step options + Cancel), so that I track fulfillment progress
30. As an Admin, marking `กำลังจัดส่ง` should be the action that records "received payment" (because payment is outside system), so that Audit Log is the source-of-truth for "did we get paid?"
31. As an Admin, I want to cancel any Order before `จัดส่งแล้ว`, so that I can handle cancellations, OOS, or fraud
32. As an Admin, I want to enter a tracking number when transitioning to `จัดส่งแล้ว`, so that Member can track and LINE push includes it
33. As an Admin, I want to CRUD Merchandise (with Variants + Accessories + images + Category + Collection flags), so that I can manage what's for sale
34. As an Admin, I want to manually adjust Stock per Variant, so that I sync DB display with real warehouse count (no atomic decrement — Soft Stock per [ADR-0001](../adr/0001-soft-stock-no-atomic-decrement.md))
35. As an Admin, I want every action logged in Audit Log (who/when/what/entity), so that we can investigate any disputes
36. As an Admin, I want to view per-Order Audit Log inline in the Order drawer, so that I see history without leaving context
37. As an Admin, I want to create/edit Blog posts in Markdown with title/slug/published date, so that the team publishes SEO/GEO content
38. As an Admin, I want to curate featured Merchandise on the Landing/Shop home, so that I promote specific items
39. As an Admin, I want to view Member list (read-only) and per-Member Order history, so that I can look up a Member when they reach out

### System

40. As the System, I want to send a LINE push message to the Member on every OrderStatus transition + Cancellation, so that the Member doesn't need to poll
41. As the System, I want to expose `/llms.txt` + JSON-LD schema.org markup on Merchandise pages + sitemap.xml + semantic HTML, so that AI agents and search engines can crawl
42. As the System, I want to use Soft Stock without atomic decrement, so that Members can place Orders even when stock is uncertain — team confirms during contact-back
43. As the System, I want LIFF and Web to render the same Web app code (no LINE-native chatbot UI), per [ADR-0002](../adr/0002-liff-renders-same-web-app.md), so that we maintain one codebase

## Implementation Decisions

### Modules (16)

#### Phase 1 — Public Read-Only

- **CatalogQuery** *(deep, pure)* — filter/sort/paginate Merchandise by Category + Collection + price range + sort key. Input: `CatalogFilter`, Output: `Merchandise[]`. Pure function over passed-in data (no DB calls inside).
- **StockTierCalculator** *(deep, pure)* — `(stockNumber: number) → "พร้อมส่ง"|"เหลือน้อย"|"หมดชั่วคราว"`. Cut-offs: `>5`, `1-5`, `0`. Trivially testable.
- **DiscountCalculator** *(deep, pure)* — `(Merchandise) → finalPriceTHB`. Encapsulates discount math (rounding) so we change it once.
- **DiscoverabilityRenderer** — emit `/llms.txt`, `/sitemap.xml`, JSON-LD Product schema injection per Merchandise page, meta tags. No business logic, mostly templates.

#### Phase 2 — Member Purchase Flow

- **MemberAuth** — wrap LINE Login OAuth (Web) + `liff.init()` + `liff.getAccessToken()` (LIFF) under one `getMember(): Member | null` interface. Identity stored in Supabase by `line_user_id`.
- **CartService** ⭐ *(deep)* — pure functions over CartState. Actions: `addLine`, `removeLine`, `setQty`, `toggleSelect`, `removeSelected`, `clear`. Returns new state. No I/O. Persistence layer (localStorage for Guest, Supabase for Member) is a separate adapter.
- **GuestMemberCartMerger** ⭐ *(deep, pure)* — `(guestLines, memberLines) → mergedLines` with sum-quantities rule for duplicate Variants (same `merchandise_id + variant_id + accessory_id_set` triple). Pure function, easy to TDD with edge cases (empty guest, empty member, full overlap, partial overlap, deleted variants).
- **OrderSubmission** — `Cart → Order` transformation with address validation + initial status = `รอติดต่อ`. Validates address fields (Thai 10-digit phone, 5-digit postal code, required fields).
- **OrderHistoryQuery** — read Orders for a Member, sorted by `created_at desc`.

#### Phase 3 — Admin Operations

- **AdminAuth** — Supabase Auth email/password. Returns `Admin | null`. Web-only (block from LIFF channel).
- **OrderStateMachine** ⭐ *(deep, pure)* — transition rules + Cancellation flag policy.

  Allowed transitions (one-step forward only, or Cancel from non-final):
  ```
  รอติดต่อ → ยืนยัน | (Cancel)
  ยืนยัน  → รอชำระ | (Cancel)
  รอชำระ  → กำลังจัดส่ง | (Cancel)   ← marks "received payment"
  กำลังจัดส่ง → จัดส่งแล้ว | (Cancel)
  จัดส่งแล้ว → (terminal — no Cancel)
  ```

  Member-initiated Cancel allowed only when current = `รอติดต่อ` Admin-initiated Cancel allowed when current ∈ {รอติดต่อ, ยืนยัน, รอชำระ, กำลังจัดส่ง}

- **MerchandiseAdmin** — CRUD for Merchandise + Variants + Accessories + image URLs + Category + Collection flags. Includes manual Stock adjust action.
- **AuditLogger** ⭐ *(deep)* — append-only log of `{actor_admin_id, action_type, entity_type, entity_id, before, after, occurred_at}`. Critical action: marking `กำลังจัดส่ง` (proof of payment receipt).

#### Phase 4 — Notifications

- **LineMessenger** ⭐ *(deep)* — `sendToMember(line_user_id, intent: OrderStatusChange | OrderCancelled) → Result`. Encapsulates LINE Messaging API push endpoint, retry, and message templating (Thai copy per OrderStatus).

#### Phase 5 — Content

- **BlogModule** — Markdown CRUD for Admin + static rendering for public read. Uses MDX or Markdown library for parsing.
- **LandingCuration** — Admin picks N featured Merchandise to highlight on `/shop` home page. Stored as ordered list of `merchandise_id`.

### Schema sketches (Supabase Postgres)

```
members            (line_user_id PK, display_name, picture_url, phone, default_shipping_address JSON, created_at)
admins             (id PK, email UNIQUE, password_hash via Supabase Auth, name, created_at)
categories         (id PK enum: tshirt|mug|doll, label, emoji, sort_order)
merchandise        (id PK, slug UNIQUE, name, description, base_price_thb, discount_percent NULL, category_id FK, emoji, is_new BOOL, is_best BOOL, is_promo BOOL, created_at)
variants           (id PK, merchandise_id FK, label, stock INT, sort_order)
accessories        (id PK, merchandise_id FK, label, price_add_thb, sort_order)
member_carts       (line_user_id PK FK, updated_at)  
member_cart_lines  (id PK, line_user_id FK, merchandise_id FK, variant_id FK NULL, accessory_ids JSON, qty, selected BOOL)
orders             (id PK formatted "WR-YYYY-NNNN", line_user_id FK, status enum, tracking_no NULL, cancelled_at NULL, cancelled_by enum NULL, note, shipping_address JSON, created_at)
order_lines        (id PK, order_id FK, merchandise_id FK, variant_label, accessory_labels JSON, qty, unit_price_thb)
audit_logs         (id PK, admin_id FK, action_type, entity_type, entity_id, before JSON, after JSON, occurred_at)
blog_posts         (id PK, slug UNIQUE, title, body_md, published_at NULL, author_admin_id FK)
landing_features   (id PK, merchandise_id FK, sort_order)
```

Note: Guest Cart ไม่อยู่ใน DB อยู่ใน browser localStorage เท่านั้น (merge เข้า `member_cart_lines` ตอน Sign in)

### Key Invariants

- **Soft Stock** — ระบบไม่ block การสร้าง Order เมื่อ stock = 0 (ADR-0001) Stock UI tier เป็น hint อย่างเดียว Admin ตัด/ปรับสต๊อกด้วยมือ
- **Admin ≠ Member** — identity คนละชุด ไม่มี link/merge
- **Cart cross-channel** — ผูกกับ `line_user_id` เดียว ใช้ร่วม Web/LIFF
- **OrderStatus = source of truth ของ payment** — `กำลังจัดส่ง` หมายถึง "รับเงินแล้ว" Audit Log บันทึกว่า Admin คนไหน mark
- **No Payment in System** — ไม่มี payment gateway integration ทีม contact กลับเก็บเงินผ่าน PromptPay

### UI patterns ที่ตัดสินแล้ว

- **Variant Selector** ใช้ chip buttons + OOS strike-through + ลิงก์ตารางไซส์ (จาก [ui-decision](../ui-decisions/variant-selector.md))
- Other surfaces (Shop home, Catalog, Product Detail full page, Cart, Checkout, Order History, Admin Orders) มี prototype ใน `web/src/app/prototype/` ที่ user เลือก variant แล้วต้อง fold เข้า production route — pending Member decisions

## Testing Decisions

### หลักการ
- **Test external behavior, not implementation** — ทดสอบผ่าน module's public interface ไม่ทดสอบ internal helper functions โดยตรง
- **Pure modules → unit tests** ครอบคลุม edge cases (empty/single/many/conflict/error cases)
- **I/O modules → integration tests** ที่ hit Supabase test schema จริง (อย่า mock DB — เคย burn ทีมอื่น เมื่อ mock pass แต่ migration พัง)
- **UI ไม่ในขอบเขต testing MVP** — ทำ smoke test ผ่าน Cloudflare Pages preview deploy แทน
- ใช้ skill `tdd` ตาม TDD red-green-refactor

### Modules ที่จะเขียน test (ทุก module ที่มี business logic — ไม่รวม UI/template)

| Module | Test type | Why |
|---|---|---|
| CatalogQuery | unit | pure filter/sort logic, easy edge cases |
| StockTierCalculator | unit | 3 cut-off bounds — trivial |
| DiscountCalculator | unit | rounding edge cases |
| CartService | unit (heavy) | core domain logic — sum/dedupe/select |
| GuestMemberCartMerger | unit (heavy) | edge cases of merging — empty/overlap/deleted variant |
| OrderSubmission | unit | validation rules (phone format, address required fields) |
| OrderStateMachine | unit (heavy) | every transition + every rejection + Cancel from each state |
| AuditLogger | integration | writes happen on real DB — must verify shape |
| LineMessenger | integration (with mock LINE API) | retry behavior + message template per status |
| MemberAuth | integration | OAuth flow + LIFF + session — needs real LINE side dev account |
| AdminAuth | integration | Supabase Auth flow |
| MerchandiseAdmin | integration | CRUD against real DB |
| OrderHistoryQuery | integration | read against real DB |
| BlogModule | unit (Markdown parsing) + integration (CRUD) | |
| LandingCuration | integration | small CRUD |
| DiscoverabilityRenderer | snapshot test | output ของ llms.txt + sitemap.xml + JSON-LD |

### Prior art
- ยังไม่มีในโปรเจกต์ (Greenfield) — establish pattern จาก `.agents/skills/tdd/` SKILL.md + supporting docs
- ใช้ Vitest หรือ Jest ตามที่ Next.js 16 + Tailwind v4 + Supabase ecosystem ปกติใช้ (decide ตอน start coding)

## Out of Scope

- ❌ Payment processing — payment เกิดนอกระบบ (PromptPay) ทีม contact Member กลับเก็บเอง
- ❌ Atomic stock decrement / stock reservation — Soft Stock per ADR-0001
- ❌ LINE-native chatbot UI / Rich Menu shopping / Flex carousel — LIFF render Web app ตัวเดียวกัน per ADR-0002
- ❌ Refund flow — payment นอกระบบ → refund ก็นอกระบบ
- ❌ Pickup at store — shipping-only (decision จาก grill session)
- ❌ Multi-role Admin / per-permission roles — Admin บทบาทเดียว + Audit Log
- ❌ Member-to-Member referral / loyalty points / coupons
- ❌ On-site AI chatbot / RAG search — Discoverability เน้น external AI crawler (GEO) เท่านั้น
- ❌ Multi-language UI — ไทยอย่างเดียว
- ❌ Email notifications — LINE push เท่านั้น (ไม่เก็บ email ของ Member)
- ❌ Order edit หลัง submit — Member ยกเลิกได้ใน `รอติดต่อ` เท่านั้น ที่เหลือทีมจัดการ
- ❌ Admin-to-Admin chat / messaging
- ❌ Inventory forecasting / sales analytics dashboard
- ❌ Account merge ระหว่าง Admin และ Member

## Further Notes

### Deploy path

- **Phase 1 (prototype phase ตอนนี้)** — Static export ของ Next.js 16 → Cloudflare Pages (ทำเสร็จแล้ว: `warroom-customer-gateway.pages.dev`)
- **Phase 2+ (จริง)** — ต้อง migrate ไป `@cloudflare/next-on-pages` adapter เพราะมี Supabase auth, API routes (LINE webhook), Server Actions ตอนนั้นเขียน ADR-0003 Deployment Strategy

### Prototype routes ที่ต้อง promote/ลบ

ใน `web/src/app/prototype/` มี 7 surfaces (16 routes) ที่เป็น throwaway routes — เมื่อ Member ตัดสินใจ variant แต่ละหน้าแล้ว fold winner เข้า production route แล้วลบ prototype folder + เขียน UI decision doc (pattern: `docs/ui-decisions/<surface>.md`)

### Reference

- Glossary canonical: [`CONTEXT.md`](../../CONTEXT.md)
- Architecture decisions: [`docs/adr/`](../adr/)
- UI decisions: [`docs/ui-decisions/`](../ui-decisions/)
- Original plan (historical): [`grill.md`](../../grill.md) — **CONTEXT.md overrides where they disagree**

### Open questions ที่ defer ไปจนถึง implementation

- ตารางไซส์ของ Variant Selector — modal / scroll anchor / standalone page (revisit ตอนสร้าง production `/shop/[slug]`)
- จำนวน featured items บน Landing Curation — 3, 5, หรือ 6 ตัว
- Blog editor — เขียน plain Markdown editor หรือใช้ library เช่น TipTap/Lexical
- Sitemap freshness — rebuild on every Order? Or daily cron?
- LINE Messenger retry policy — exponential backoff parameters
