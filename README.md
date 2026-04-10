# Lerahub – Course Platform

## Overview

Lerahub is a course platform built using a modern tech stack including Next.js, Node.js, PostgreSQL, Tailwind CSS, and shadcn/ui. It provides a scalable and user-friendly interface for managing and accessing courses.

---

## Tech Stack

* Next.js
* Node.js
* PostgreSQL
* Prisma ORM (v5.5)
* Tailwind CSS
* shadcn/ui

---

## Prerequisites

Ensure you have the following installed:

* Node.js (version 18 or higher)
* PostgreSQL

---

## Live Deployment

The application is deployed at:
https://lms12365.vercel.app/

---

## Steps to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/samradhi29/lms.git
cd lms
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Initialize Next.js (if required)

```bash
npx create-next-app@latest
```

Select default settings (Tailwind CSS will be configured automatically).

---

### 4. Setup shadcn/ui

```bash
npx shadcn-ui@latest init
```

Add components as needed:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

---

### 5. Database Setup (PostgreSQL + Prisma)

Install Prisma:

```bash
npm install prisma@5.5.0 @prisma/client@5.5.0
```

Initialize Prisma:

```bash
npx prisma init
```

---

### 6. Configure Environment Variables

Create a `.env` file in the root directory and add your database connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
EMAIL_USER="your-email@example.com"
EMAIL_PASS="your-email-app-password"
JWT_SECRET="your-secret-key"
```

---

### 7. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

---

### 8. Generate Prisma Client

```bash
npx prisma generate
```

---

### 9. Open Prisma Studio (Optional)

```bash
npx prisma studio
```

---

### 10. Run the Application

```bash
npm run dev
```

---

## Notes

* Ensure PostgreSQL is running before starting the application.
* Verify that the `.env` file is properly configured.
* Run migrations before accessing database-dependent features.

---

## License

This project is licensed under the MIT License.
