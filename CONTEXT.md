# WARROOM Customer Gateway

Web + LINE OA application ที่ให้ Member สั่งสินค้าที่ระลึก (Merchandise) ของ WARROOM ผ่านระบบ และให้ทีมงานบริหารจัดการคำสั่งซื้อผ่าน Admin Dashboard ระบบนี้ไม่จัดการเรื่องการชำระเงิน — Payment เกิดนอกระบบ (ทีม contact Member กลับ)

## Language (คำศัพท์หลัก)

### Identity & Roles

**Member**:
บุคคลที่ Sign in ผ่าน LINE Login แล้ว เก็บข้อมูล: `line_user_id`, `display_name`, `picture_url` (จาก LINE), `phone`, `default_shipping_address` (auto-save จาก Order ล่าสุด ของ override ได้)
_หลีกเลี่ยง_: Customer, user, account, ลูกค้า (เมื่อหมายถึง actor ที่ Sign in)

**Admin**:
ทีมงาน WARROOM ที่ใช้ Admin Dashboard มี **บทบาทเดียว** (ทำได้ทุกอย่าง) Authentication ใช้ **Email/Password ผ่าน Supabase Auth** (ไม่ใช่ LINE Login) เข้าผ่าน Web เท่านั้น **Admin ≠ Member** เป็น identity คนละชุดเด็ดขาด ไม่มี link
_หลีกเลี่ยง_: Staff, Operator, ผู้ดูแลระบบ (ใน UI ใช้ "ผู้ดูแล" ได้)

**Visitor**:
ผู้ใช้ที่ยังไม่ Sign in browse Catalog สาธารณะได้ มี Guest Cart ใน localStorage บังคับ Sign in เฉพาะตอน Checkout เป็น Order
_หลีกเลี่ยง_: Guest (ใช้เฉพาะคำผสม Guest Cart), anonymous user

### Channel

**Channel**:
ช่องทางที่ Member/Visitor เข้าใช้ระบบ มี 2: **Web** (browser) และ **LINE LIFF** (webview ใน LINE OA) ทั้งสอง render Web shop ตัวเดียวกัน Chat ใน LINE OA **ไม่ใช่ Channel** — เป็นช่องทางติดต่อทีมเท่านั้น
_หลีกเลี่ยง_: Platform, source, แพลตฟอร์ม

### Catalog

**Merchandise**:
สินค้าที่ระลึกของ WARROOM เป็น Physical good ที่ต้องจัดส่งจริง (ไม่มี Digital, ไม่มี Service) ตัวอย่าง: เสื้อยืดโลโก้, แก้วน้ำ, ตุ๊กตามาสคอต
_หลีกเลี่ยง_: Product (ทั่วไป), souvenir, ของที่ระลึก

**Variant**:
ตัวเลือกย่อยของ Merchandise ชิ้นเดียวกันที่ Member **ต้องเลือก 1 ค่าเท่านั้น** เช่นเสื้อยืด {S, M, L, XL}, แก้ว {เล็ก, ใหญ่} สินค้าที่ไม่มีตัวเลือกจะมี Variant ปริยายเพียงตัวเดียว Stock แยกต่อ Variant
_หลีกเลี่ยง_: SKU, option, ตัวเลือก

**Accessory**:
ของแต่งเพิ่มเติมที่ Member **เลือกได้หลายชิ้น (0..N)** ต่อ Merchandise 1 ชิ้น ปัจจุบันใช้กับตุ๊กตา WARROOM (เช่น หมวก, เสื้อเกราะ, ดาบ, ไซเรนติดหัว) ต่างจาก Variant เพราะ Variant must-pick-one ส่วน Accessory optional-pick-many อาจมีราคาเพิ่มหรือไม่ก็ได้
_หลีกเลี่ยง_: Add-on (กำกวม), Option (กำกวม), ของเสริม

**Category**:
หมวดสินค้าตาม **ชนิด** ของ Merchandise เป็นการจัดกลุ่มแบบ static (สินค้าหนึ่งชิ้นอยู่ Category เดียว) ปัจจุบัน: เสื้อยืด, ถ้วยและแก้ว, ตุ๊กตา WARROOM ใช้เป็น navigation หลักของ Shop
_หลีกเลี่ยง_: Type, Class, ประเภท

**Collection**:
กลุ่มสินค้าตาม **flag dynamic** ที่ Admin ตั้งให้ ปัจจุบัน: สินค้ามาใหม่, สินค้าขายดี, สินค้าโปรโมชั่น สินค้าหนึ่งชิ้นอยู่ได้หลาย Collection พร้อมกัน (เช่น เป็นทั้ง "ขายดี" และ "โปรโมชั่น") "สินค้าขายดี" อาจคำนวณ auto จากยอด Order ก็ได้ "สินค้าโปรโมชั่น" หมายถึงสินค้าที่มีลดราคาในช่วงเวลานั้น
_หลีกเลี่ยง_: Tag (กำกวม), Group, Section

**Stock (Soft)**:
จำนวนคงเหลือต่อ Variant แสดงเป็น hint ให้ Member ทราบ ระบบ **ไม่บล็อก** การสั่งเมื่อ stock หมด (ไม่ตัดสต๊อก atomic) ทีม WARROOM เช็ค + confirm/decline ตอน contact กลับ

UI แสดงเป็น 3 ระดับ:
- เหลือ > 5 → **"พร้อมส่ง"**
- เหลือ 1-5 → **"เหลือน้อย"**
- เหลือ = 0 → **"สินค้าหมดชั่วคราว"** + ปิดปุ่ม Add to Cart

ไม่โชว์ตัวเลขจริงเพื่อ privacy ทางธุรกิจ
_หลีกเลี่ยง_: Inventory (ใช้ตอนพูดถึง physical warehouse), Available count

### Cart & Order

**Cart**:
รายการ Variant ที่สะสมไว้ก่อน checkout เป็น Order มี 2 รูปแบบ:
- **Member Cart**: ผูกกับ Member (LINE userId) เก็บใน DB ใช้ร่วมข้าม Channel
- **Guest Cart**: Visitor ที่ยังไม่ Sign in เก็บใน browser localStorage ใช้กับ Web เท่านั้น

ตอน Visitor Sign in: **Guest Cart merge เข้า Member Cart** ด้วยกฎ **sum quantities** ถ้า Variant ซ้ำ (guest มี 2 + member มี 1 = 3)
_หลีกเลี่ยง_: Basket (ใน UI ใช้ "ตะกร้า" ได้)

**Order**:
คำสั่งซื้อ Merchandise ที่ Member ส่งให้ทีม WARROOM 1 Order มีหลาย Line items จาก Cart มี Shipping address (จัดส่งทางขนส่งเท่านั้น ไม่มีรับเอง) Payment ไม่อยู่ในระบบ — ทีม contact กลับเก็บเงิน + แจ้งเลข PromptPay/ค่าส่ง

**Form fields**: `recipient_name`, `phone` (Thai 10-digit), `address_line1`, `address_line2` (optional), `subdistrict`, `district`, `province`, `postal_code`, `note` (optional)
_หลีกเลี่ยง_: Booking, Purchase

**OrderStatus**:
สถานะของ Order ตาม lifecycle:
- **รอติดต่อ** (NEW) — Member submit แล้ว ทีมยังไม่ติดต่อ
- **ยืนยัน** (CONFIRMED) — ทีม contact ยืนยันรายการแล้ว
- **รอชำระ** (AWAITING_PAYMENT) — แจ้งค่าใช้จ่าย + PromptPay แล้ว ยังไม่ได้เงิน
- **กำลังจัดส่ง** (SHIPPING) — รับเงินแล้ว แพ็คของ
- **จัดส่งแล้ว** (SHIPPED) — ส่งขนส่งแล้ว มีเลขพัสดุ

ระบบเป็น **source of truth ของสถานะการเก็บเงิน** เพราะ payment เกิดนอกระบบ
_หลีกเลี่ยง_: Pending, Processing

**Cancellation**:
การยกเลิก Order เก็บเป็น flag แยก (`cancelled_at` timestamp) ไม่ใช่ค่าใน OrderStatus
- **Admin** cancel ได้จากทุก OrderStatus ก่อน `จัดส่งแล้ว`
- **Member self-cancel** ทำได้เฉพาะ OrderStatus = `รอติดต่อ` (NEW) เท่านั้น หลังจากนั้นต้องติดต่อทีม

_หลีกเลี่ยง_: Refund (ไม่มีในระบบ)

### Notification

**Notification**:
ระบบส่ง LINE push message ผ่าน LINE Messaging API ไปยัง Member เมื่อ:
- OrderStatus เปลี่ยนทุกครั้ง (รวมถึง `กำลังจัดส่ง` ที่ใส่เลขพัสดุ)
- Order ถูก Cancel

ไม่ใช้ email (ระบบไม่เก็บ email) ไม่ใช้ SMS
_หลีกเลี่ยง_: Alert, Message (กำกวม)

### Discoverability

**Discoverability**:
เป้าหมายให้ Visitor ค้นเจอ WARROOM ผ่าน 2 ช่องทาง:
- **Search Engine** (Google, Bing) ผ่าน SEO
- **AI Agents** (ChatGPT, Perplexity, Claude) ผ่าน GEO (`llms.txt`, JSON-LD schema.org)

ครอบคลุม public surface: Landing Page, Blog, Merchandise catalog ไม่ครอบคลุม Cart/Order/Profile/Admin
_หลีกเลี่ยง_: AI หาเจอ (กำกวม), Findability

### Audit

**Audit Log**:
บันทึก action ของ **Admin** เท่านั้น (ไม่ log Member action) เก็บ: who, what entity, what action, when
- OrderStatus transitions ทุกครั้ง
- Order cancellation
- Stock manual adjustments
- Merchandise CRUD
- Blog publish

จุดสำคัญที่สุด: การ mark `กำลังจัดส่ง` (เพราะหมายถึง "รับเงินแล้ว") — payment นอกระบบ → audit เป็น forensic ของการเก็บเงิน
_หลีกเลี่ยง_: History, Activity log

---

## Flagged ambiguities (resolved)

- **"จอง/สั่งซื้อ"** จากแผนเดิม → ใช้ **Order** อย่างเดียว Booking ตัดทิ้ง (pivot จาก workshop เป็น merchandise)
- **"AI หาเจอ"** จากแผนเดิม → ใช้ **Discoverability** (SEO + GEO) ตัด on-site chatbot และ AI gen content ออกจาก scope MVP
- **"Brown-Field"** จากแผนเดิม → ตัวจริง Greenfield ไม่มีโค้ดเดิม
- **"Customer"** จากชื่อ "Customer Gateway" → canonical คือ **Member** สำหรับ actor ที่ Sign in แล้ว, **Visitor** ก่อน Sign in

## Example dialogue

> **Dev**: คนสั่งของไม่ Sign in ได้มั้ย?  
> **Domain**: เป็น Visitor ดูได้ ใส่ตะกร้าได้ใน browser แต่ตอน checkout ต้อง Sign in เป็น Member ก่อน → Guest Cart merge เข้า Member Cart sum quantities ถ้าซ้ำ
>
> **Dev**: ถ้า stock เหลือ 0 แล้ว Member ยังกดสั่งได้มั้ย?  
> **Domain**: UI โชว์ "หมดชั่วคราว" + disable ปุ่ม แต่ Soft stock — ไม่มี atomic block ที่ backend ทีมเช็คตอน contact กลับ ถ้าหมดจริง decline หรือ ขายของจองล่วงหน้า ตามดุลพินิจ
>
> **Dev**: เก็บเงินยังไง?  
> **Domain**: นอกระบบ ทีม contact กลับ → แจ้ง PromptPay + ค่าส่ง → Member โอน → Admin mark `กำลังจัดส่ง` (Audit Log บันทึก เพราะเป็น proof ว่ารับเงินแล้ว) → ส่งของ → mark `จัดส่งแล้ว` + เลขพัสดุ → LINE push หา Member
