# Pastebin-Lite

Pastebin-Lite is a simple web application that allows users to create text pastes and share them via a unique link.
Each paste can optionally expire based on time or number of views.

This project was built as a backend-focused take-home assignment.

---

## Project Description

Users can:
- Create a text paste
- Generate a shareable URL
- View the paste using the URL
- Set optional expiration rules:
  - Expire after a certain time
  - Expire after a certain number of views

Expired pastes are never served.

---

## Tech Stack

- Framework: Next.js
- Database: PostgreSQL
- ORM: Prisma
- Database Hosting: Neon
- Deployment: Vercel 

---

## Persistence Layer

The application uses PostgreSQL as the persistence layer, hosted on Neon.

- Prisma ORM is used for database interactions
- Provides type safety, migrations, and clean queries
- Stored data includes:
  - Paste content
  - Unique paste ID
  - Optional expiration timestamp
  - Optional remaining view count
  - Created timestamp

Expiration checks are enforced on every read.

---

## How to Run the App Locally

### 1. Clone the repository
```
git clone <repository-url>
cd pastebin-lite
```

### 2. Install dependencies
```
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```
DATABASE_URL="postgresql://<username>:<password>@<host>/<database>?sslmode=require"
```

### 4. Run database migrations
```
npx prisma migrate dev --name init

```

### 5. Start the development server
```
npm run dev
```

The app will be available at:
http://localhost:3000

---

## Important Design Decisions

- Expiration logic is checked on every paste read
- View counts never go below zero
- Expired pastes are never served
- Prisma was chosen for type safety and maintainability
- The application is intentionally minimal for automated testing

---

## AI Usage Note

AI tools were used as an assistant during development.
All logic and design decisions are fully understood and explainable.
