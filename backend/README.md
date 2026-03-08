# Happee Tourz And Travels — Backend API

Node.js + Express + Supabase backend for the Happee Tourz And Travels travel website.

---

## 📁 Project Structure

```
backend/
├── server.js                  ← Express entry point
├── .env.example               ← Environment variable template
├── package.json
├── config/
│   └── supabase.js            ← Supabase client (service role)
├── middleware/
│   ├── auth.js                ← JWT verification middleware
│   └── validate.js            ← express-validator result handler
├── routes/
│   ├── auth.js                ← /api/auth/*
│   ├── packages.js            ← /api/packages/*
│   ├── testimonials.js        ← /api/testimonials/*
│   └── inquiries.js           ← /api/inquiries/*
├── controllers/
│   ├── authController.js
│   ├── packagesController.js
│   ├── testimonialsController.js
│   └── inquiriesController.js
├── services/
│   ├── packageService.js      ← Supabase queries for packages
│   ├── testimonialService.js  ← Supabase queries for testimonials
│   └── inquiryService.js      ← Supabase queries for inquiries
└── scripts/
    └── seed.js                ← One-time DB seed script
```

---

## ⚡ Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Open the **SQL Editor** and run the schema below
3. Go to **Project Settings → API** and copy your:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key (not anon!) → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Create the `.env` file

```bash
cd backend
cp .env.example .env
```

Fill in your values:

```env
PORT=5000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...your-service-role-key
JWT_SECRET=some-long-random-string-at-least-32-characters
FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Run the Supabase SQL Schema

Open Supabase → SQL Editor → New Query, paste and run:

```sql
-- Admin users (for real authentication)
create table admin_users (
  id             uuid primary key default gen_random_uuid(),
  email          text unique not null,
  password_hash  text not null,
  created_at     timestamptz default now()
);

-- Tour packages
create table packages (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  destination text not null,
  cities      text,
  duration    text not null,
  image       text,
  status      text not null default 'Active'
              check (status in ('Active', 'Coming Soon')),
  hot_deal    boolean not null default false,
  description text,
  created_at  timestamptz default now()
);

-- Customer testimonials
create table testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  review     text not null,
  date       text not null,
  image      text,
  rating     integer not null default 5
             check (rating between 1 and 5),
  created_at timestamptz default now()
);

-- Inquiry / contact form submissions
create table inquiries (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  phone        text not null,
  email        text not null,
  num_persons  integer,
  package      text,
  travel_month text,
  message      text,
  created_at   timestamptz default now()
);
```

> **Row Level Security**: All tables use the service role key (bypasses RLS). Public reads for `packages` and `testimonials` are handled by the backend API — you do not need to enable RLS or anon access.

### 5. Seed Initial Data

This creates the admin account and migrates the original JSON data to Supabase:

```bash
cd backend
npm run seed
```

Output:
```
🌱 Starting Happee Tourz database seed...
👤 Seeding admin user...
  ✅ Admin user created: admin@happeetourz.com / password: admin123
📦 Seeding packages...
  ✅ 6 packages seeded successfully.
💬 Seeding testimonials...
  ✅ 6 testimonials seeded successfully.
✨ Seed complete! Your database is ready.
```

### 6. Start the Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ Happee Tourz backend running at http://localhost:5000
```

### 7. Start the Frontend (separate terminal)

```bash
# From the project root
npm run dev
```

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

### Health Check

```
GET /api/health
```

---

### Auth

#### Login (get JWT token)
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@happeetourz.com",
  "password": "admin123"
}
```
Response:
```json
{ "success": true, "token": "<jwt>", "admin": { "id": "...", "email": "..." } }
```

#### Verify Token
```
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```
POST /api/auth/logout
```

---

### Packages

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/packages` | Public | Get all packages |
| `GET` | `/api/packages/:id` | Public | Get package by ID |
| `POST` | `/api/packages` | Admin | Create package |
| `PUT` | `/api/packages/:id` | Admin | Update package |
| `DELETE` | `/api/packages/:id` | Admin | Delete package |

**Create/Update Package body:**
```json
{
  "title": "Japan Group Tour",
  "destination": "Japan",
  "cities": "Tokyo, Kyoto, Osaka",
  "duration": "7 Days / 6 Nights",
  "image": "https://...",
  "status": "Active",
  "hot_deal": true,
  "description": "..."
}
```

---

### Testimonials

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/testimonials` | Public | Get all testimonials |
| `GET` | `/api/testimonials/:id` | Public | Get by ID |
| `POST` | `/api/testimonials` | Admin | Create testimonial |
| `PUT` | `/api/testimonials/:id` | Admin | Update testimonial |
| `DELETE` | `/api/testimonials/:id` | Admin | Delete testimonial |

**Create/Update body:**
```json
{
  "name": "Devi A",
  "review": "Excellent service!",
  "date": "2 days ago",
  "image": "https://...",
  "rating": 5
}
```

---

### Inquiries

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/inquiries` | Public | Submit inquiry |
| `GET` | `/api/inquiries` | Admin | List all inquiries |
| `DELETE` | `/api/inquiries/:id` | Admin | Delete inquiry |

**Submit Inquiry body:**
```json
{
  "full_name": "Test User",
  "phone": "+91 9876543210",
  "email": "test@example.com",
  "num_persons": 2,
  "package": "Japan Group Tour",
  "travel_month": "March",
  "message": "Please send us a quote"
}
```

---

## 🧪 Sample curl Commands

```bash
# 1. Login and get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@happeetourz.com","password":"admin123"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

echo "Token: $TOKEN"

# 2. Get all packages (public)
curl http://localhost:5000/api/packages | python -m json.tool

# 3. Create a package (admin)
curl -X POST http://localhost:5000/api/packages \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Package","destination":"Maldives","duration":"5 Days / 4 Nights","status":"Active"}'

# 4. Submit an inquiry (public)
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Anish","phone":"+91 9999999999","email":"anish@example.com","num_persons":3}'

# 5. List all inquiries (admin)
curl http://localhost:5000/api/inquiries \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool
```

---

## 🔒 Security Notes

- **Never expose** the `SUPABASE_SERVICE_ROLE_KEY` or `JWT_SECRET` publicly
- The service role key bypasses Supabase RLS — it is only used server-side
- Change the admin password after first login (update in Supabase dashboard)
- The JWT expires in **24 hours**; the frontend stores it in `localStorage`

---

## 🚀 Running Both Servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| Admin Login | http://localhost:5173/admin/login |
| Admin Dashboard | http://localhost:5173/admin/dashboard |
