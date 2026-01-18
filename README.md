# Harati Store

A modern e-commerce application built with Next.js 16, Tailwind CSS 4, and Supabase.

## 🚀 Features

- **Authentication**: Secure Login and Signup with Supabase Auth.
- **Dashboard**: Protected dashboard for users (`/dashboard`).
- **Owner Panel**: Admin management for users and images (`/owner`).
- **Modern UI**: Styled with Tailwind CSS 4, featuring a dark/light gradient theme.
- **Tech Stack**:
  - [Next.js 16](https://nextjs.org/) (App Router)
  - [Tailwind CSS 4](https://tailwindcss.com/)
  - [Supabase](https://supabase.com/) (Auth & Database)
  - TypeScript

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd HaratiStore
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory. You will need your Supabase project credentials.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# Optional: Required only for admin scripts
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> **Note**: You can find these keys in your Supabase Dashboard under `Project Settings > API`.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app/(auth)`: Login and Signup pages.
- `src/app/(dashboard)`: Dashboard and Owner/Admin routes.
- `src/app/(public)`: Public facing pages (Landing page).
- `src/lib/supabase`: Supabase client configuration.
- `src/api`: API layer for internal requests.

## 🔐 Support

If you encounter issues with authentication, ensure your Supabase URL and Anon Key are correctly set in `.env.local` and that you have enabled Email/Password auth provider in Supabase.
