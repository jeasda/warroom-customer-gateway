# UI Decision — Variant Selector

วันที่: 2026-05-20  
สถานะ: Decided  
ที่อยู่จริงในอนาคต: `web/src/components/shop/VariantSelector.tsx` (ยังไม่ได้สร้าง — สร้างตอนทำหน้า `/shop/[slug]` จริง)

## คำถาม

หน้า Product Detail ของ Merchandise ที่มี Variants (เช่นเสื้อยืดมีไซส์ S/M/L/XL) ควรให้ Member เลือก Variant ด้วย UX แบบไหน?

## ที่พิจารณา

ทดลอง prototype 3 variation บน route `/prototype/variant-selector` (sub-shape B — throwaway route) — ดู git history หรือ `[[CONTEXT]]` ในแชต grill session สำหรับ original code

- **A** — Chip Buttons (ปุ่ม chip แนวนอน S/M/L/XL คลิกเลือก, OOS strikethrough, ลิงก์ "ตารางไซส์" อยู่บน label)
- **B** — Dropdown `<select>` + modal popup ตารางไซส์
- **C** — Visual Card Grid 2×2 แต่ละไซส์โชว์รอบอก/ความยาว inline + stock tier เคียงข้าง

## ที่เลือก

**A — Chip Buttons** ใช้ตามนี้ ไม่ผสม

## Implementation pattern ที่ต้องคงไว้

- ปุ่ม chip rounded-full กว้างอย่างต่ำ ~60px วาง flex-wrap แนวนอน
- Selected = `border-neutral-900 bg-neutral-900 text-white` (พื้นดำ ตัวขาว)
- Unselected = `border-neutral-300 bg-white` + hover เปลี่ยน border ให้เข้มขึ้น
- OOS (stock = 0) = `opacity-40 line-through cursor-not-allowed` + `disabled`
- Label "เลือกไซส์" อยู่ซ้าย, link "ตารางไซส์" (text-only, ไม่ใช่ modal) อยู่ขวา ในแถวเดียวกัน
- **ใต้ปุ่ม** เมื่อ Member เลือกแล้ว แสดง stock tier ของไซส์ที่เลือก (เช่น "ไซส์ L — เหลือน้อย")
- ไม่แสดง stock tier ของไซส์ที่ยังไม่เลือก (compact, ลด visual noise)

## ที่ตัด

- ไม่ใช้ modal/popup ตารางไซส์ (link ออกไปหน้าตารางไซส์ทีหลัง หรือ scroll anchor ในหน้าเดียวกัน — decision ภายหลัง)
- ไม่แสดงรอบอก/ความยาว inline ที่ตัวปุ่ม (เก็บไว้ใน "ตารางไซส์" แทน)
- ไม่ใช้ Card Grid

## ที่ต้อง revisit เมื่อสร้างจริง

- "ตารางไซส์" link พาไปไหน? — modal หรือ section ในหน้าเดียวกัน หรือหน้าใหม่
- ขนาดปุ่ม chip เมื่อจอเล็ก (LIFF webview จอแคบ) — ยังเป็น `min-w-[60px]` ได้มั้ย หรือต้องปรับ
