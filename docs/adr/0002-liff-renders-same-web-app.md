# LINE LIFF ใช้ Web App ตัวเดียวกัน ไม่ใช่ Chatbot แบบ LINE-native

WARROOM Customer Gateway มี 2 Channel คือ **Web** (browser) และ **LINE OA** ทางเลือกปกติของร้านค้าใน LINE OA คือทำ chatbot/Rich Menu/Flex Message ที่เป็น UI แบบ LINE-native (ให้ Member ช้อปผ่านการ chat) แต่เราเลือกอีกทางหนึ่ง

## การตัดสินใจ

LINE OA ใช้ **LIFF (LINE Front-end Framework)** เปิด **webview ของ Web shop ตัวเดียวกัน** Rich Menu ใน LINE มีปุ่ม "เปิดร้าน" → LIFF URL → render Web app ใน webview ส่วน Chat ใน LINE OA **ไม่ใช่** ช่องทางสำหรับช้อป เป็นช่องทางติดต่อทีมเท่านั้น

## เหตุผล

1. **DRY (ไม่เขียนซ้ำ)** — Web shop และร้านใน LINE ใช้ codebase เดียวกัน ไม่ต้องดูแล UI/flow 2 ชุด (ไม่ต้องเขียน state machine ของ chatbot, flex carousel, หรือ NLU)
2. **Cart sync ได้ฟรี** — LINE Login บอก `line_user_id` เดียวกันทั้งใน LIFF และ Web → Cart ผูกกับ Member คนเดียว → ไม่มีปัญหาเรื่อง sync ข้าม Channel
3. **Catalog แค่ 3 SKU + Variant** ไม่ซับซ้อนพอที่จะออกแบบ flow แบบ chat ให้ดีกว่าหน้าจอ touch UI ปกติ

## ทางเลือกที่พิจารณาแล้วไม่เลือก

- **Chatbot + Rich Menu + Flex Message แบบ LINE-native** — รู้สึก native ใน LINE จริง แต่ scope พองมาก ต้องดูแล bot script และ state machine คู่ขนานกับ Web
- **LINE OA เป็นช่องทางส่ง notification อย่างเดียว** (ช้อปเฉพาะ Web) — คำว่า "สองช่องทาง" ในแผนเดิมจะกลายเป็นโกหก (จริงๆ มี Web ช่องทางเดียว)

## ผลที่ตามมา

- ผู้อ่านที่คาดหวังรูปแบบ LINE bot ทั่วไปจะรู้สึกแปลก — **ห้ามย้ายโค้ดไปทำเป็น chatbot** จนกว่าจะมี requirement ชัดเจน (เช่น Member ฟีดแบ็กว่า LIFF ช้าหรือ UX แย่)
- ต้องคำนึงถึง UX ของ LIFF เป็นพิเศษ: webview เปิดในแอป LINE → ไม่มี full-screen, ไม่มีปุ่ม back ของระบบแบบเดิม, status bar เปลี่ยนรูป → ต้องทดสอบใน LINE จริง
- Flow ของ LINE Login ต่างกันเล็กน้อย: ใน Web ใช้ OAuth redirect, ใน LIFF ใช้ `liff.init()` + `liff.getAccessToken()` — ต้องทำ abstraction layer ที่รวมสองทางให้เป็น interface เดียวกัน
