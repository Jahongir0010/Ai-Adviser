# Ai-Adviser

Ikki alohida qismdan iborat loyiha: `backend/` va `frontend/`.

## Ikkalasini birga ishga tushirish

```
npm install          # birinchi marta (root + backend + frontend)
npm run install:all  # yoki shu bilan faqat backend/frontend paketlarini o'rnatish
npm run dev          # backend (4000) va frontend'ni bir vaqtda ishga tushiradi
```

## Alohida-alohida ishga tushirish

### Backend

```
cd backend
npm install   # birinchi marta yoki dependency o'zgarganda
npm run dev   # http://localhost:4000
```

`.env` fayl kerak (`.env.example`dan nusxa ko'chiring):

```
cp backend/.env.example backend/.env
```

### Frontend

```
cd frontend
npm install   # birinchi marta yoki dependency o'zgarganda
npm run dev
```
