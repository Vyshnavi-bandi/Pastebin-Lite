This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev# Pastebin-Lite

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

# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
