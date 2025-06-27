# 🚀 Habit Hero — Fullstack App Assignment

A full-stack habit tracking web app that helps users build routines, set daily goals, and visualize progress — one ticked checkbox at a time.

## 📌 Project Brief

**Build a full-stack habit tracking application** where users can:

- Sign up and log in
- Add/edit/delete habits
- Mark habits as complete daily
- View progress and analytics over time
- Get reminded, stay consistent, and win the day

---

## 🧱 Tech Stack

### Frontend

- [React.js](https://reactjs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- Optional: [Next.js](https://nextjs.org/) for SSR and routing

### Backend

- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- Optional: [Supabase](https://supabase.io/) (for Auth + DB)

### Database

- [MongoDB](https://www.mongodb.com/) (Mongoose ORM) or Supabase (PostgreSQL)

### Authentication

- JWT (username/email-password)
- Bonus: Google OAuth via Firebase/Auth0

### Charts & Data Visualization

- [Chart.js](https://www.chartjs.org/) or [Recharts](https://recharts.org/)

---

## 🎯 Features

### MVP (Must-Have)

- ✅ User signup/login/logout
- ✅ Create/update/delete habits
- ✅ Mark habits complete (daily check-ins)
- ✅ View weekly/monthly progress charts
- ✅ Responsive UI (mobile & desktop)
- ✅ Dark mode toggle

### Nice-to-Haves (Optional)

- 🔔 Habit reminder emails (daily cron job or push)
- 📈 Leaderboard with friends
- 📤 Export data as PDF report
- 📲 PWA support / offline mode

---

## 🧪 API Endpoints (Sample)

```http
POST   /api/auth/signup         → Register new user
POST   /api/auth/login          → Login user
GET    /api/habits              → Fetch all habits for user
POST   /api/habits              → Create a new habit
PUT    /api/habits/:id          → Update a habit
DELETE /api/habits/:id          → Delete a habit
POST   /api/habits/:id/track    → Mark habit as done for today
GET    /api/stats               → Weekly progress, streaks, graphs
```
