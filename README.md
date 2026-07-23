# Ai-Adviser

Ikki alohida qismdan iborat loyiha: `backend/` va `frontend/`. Loyiha ikkita
kompyuterda (frontend - Windows, backend - macOS) ishlab chiqilsa ham, **har
ikkala kompyuter ham platformani to'liq lokal ishga tushira olishi kerak**
(test qilish uchun) - shuning uchun ikkalasida ham xuddi shu qadamlar
qo'llanadi.

## 0. Talab qilinadigan narsalar (har ikkala kompyuterda ham)

- Node.js 20+
- PostgreSQL (mahalliy o'rnatilgan yoki bulutli - masalan Neon/Supabase)
  - macOS: `brew install postgresql@16 && brew services start postgresql@16`
  - Windows: [postgresql.org](https://www.postgresql.org/download/windows/) rasmiy o'rnatuvchisi, yoki bulutli variant (Neon/Supabase) - lokal o'rnatishni istamasangiz shu qulayroq

## 1. Birinchi marta sozlash

```
npm install          # ildiz (concurrently)
npm run install:all  # backend + frontend paketlari
```

`.env` fayllarni yarating (ikkalasi ham git'da kuzatilmaydi - **har bir
kompyuterda alohida yaratilishi kerak**):

```
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

`backend/.env` ichida to'ldirish kerak:
- `DATABASE_URL` - shu kompyuterdagi (yoki bulutdagi) Postgres manzili
- `GEMINI_API_KEY` - Google AI Studio'dan olingan kalit

Bazani tayyorlash (jadvallarni yaratish + boshlang'ich anketa savollarini yuklash):
```
cd backend
npm run migrate
npm run db:seed:anketa
```

`frontend/.env` ichida:
- `VITE_API_BASE_URL=http://localhost:4000/api` (backend qaysi portda ishlasa, shunga mos - pastga qarang)

## 2. Ishga tushirish (har doim shu bitta buyruq, ikkala kompyuterda ham)

```
npm run dev
```

Bu ildiz papkadan backend (`http://localhost:4000`) va frontend'ni **bir vaqtda**
ishga tushiradi. Alohida-alohida kerak bo'lsa: `cd backend && npm run dev`
yoki `cd frontend && npm run dev`.

## Nega aynan 4000-port?

macOS'da 5000-port odatda ControlCenter/AirPlay tomonidan band bo'ladi,
shuning uchun backend `PORT=4000`da ishlaydi (`backend/.env`). Agar
`backend/.env.example`dan boshqacharoq qiymat qo'ysangiz, `frontend/.env`dagi
`VITE_API_BASE_URL`ni ham SHUNGA moslashtiring - ikkalasi doim bir xil
portga ishora qilishi kerak.

## "Backendga ulanib bo'lmadi" xatosi chiqsa

1. Backend chindan ham ishga tushirilganini tekshiring: alohida terminalda
   `curl http://localhost:4000/api/health` - `{"success":true,...}` qaytishi kerak.
   Qaytmasa, backend ishlamayapti - `cd backend && npm run dev` bilan ishga tushiring
   va terminaldagi xatoni o'qing.
2. `frontend/.env`dagi `VITE_API_BASE_URL` bilan backend'ning haqiqiy porti
   (odatda 4000) bir xilligini tekshiring.
3. `npm run dev`ni **ildiz papkadan** ishga tushirsangiz, bu ikkalasini birga
   boshlaydi va bu muammoni butunlay oldini oladi (birontasini ishga
   tushirishni "unutib qo'yish" mumkin emas).
