# alumni-hub

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), styled with Tailwind CSS (v4), and configured to use [Prisma](https://www.prisma.io/) with a MongoDB database. The app now ships with a marketing-ready alumni hub experience, complete with modular components, sample data, and supporting feature pages (events, mentorship, giving, directory, and more).

## Prerequisites

- Node.js 18+
- A MongoDB connection string (local or hosted)

## Configuration

1. Copy `.env` and update the `DATABASE_URL` with your MongoDB connection string.
2. Generate the Prisma Client whenever you change the schema:

	 ```bash
	 npx prisma generate
	 ```

3. Optional: Apply schema changes to your database (MongoDB does not require migrations, but you can seed data with Prisma scripts if needed).

## Development Workflow

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The application is available at [http://localhost:3000](http://localhost:3000).

### Application Structure

- `src/app` – App Router pages. In addition to the marketing homepage, dedicated pages showcase events, mentorship, donations, directory, alumni stories, profiles, auth, and legal/contact details.
- `src/components` – Reusable layout and marketing components (hero sections, content grids, tables) composed across pages.
- `src/data/content.ts` – Type-safe sample data used to render the marketing surfaces.
- `src/lib` – Prisma client helper (`prisma.ts`) and small utilities (`utils.ts`).
- `scripts/check-db.js` – Quick connectivity script to ensure Prisma can reach your MongoDB cluster.

### API Routes

- `GET /api/users` – Fetches the latest 20 users from MongoDB using Prisma (example route to validate the database connection).

## Prisma Schema Overview

The default schema defines a simple `User` model:

```prisma
model User {
	id        String   @id @default(auto()) @map("_id") @db.ObjectId
	email     String   @unique
	name      String?
	createdAt DateTime @default(now())
}
```

Extend this schema to model the rest of your application data.

## Useful Commands

- `npm run dev` – Start the development server.
- `npm run build` – Create a production build.
- `npm run start` – Run the production server.
- `npm run lint` – Lint the codebase.
- `npm run check:db` – Verify the Prisma connection to MongoDB.
- `npx prisma studio` – Launch Prisma Studio to explore your data.
