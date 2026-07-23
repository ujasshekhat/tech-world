# Code4Web

A modern marketplace for premium website templates built with Next.js, React, Tailwind CSS, and Supabase. Code4Web provides a secure platform where developers, designers, freelancers, and businesses can browse, preview, purchase, and manage high-quality website templates.

---

## Overview

Code4Web is designed to simplify the process of discovering and purchasing modern web templates. It offers secure authentication, a scalable PostgreSQL database, responsive user interface, protected routes, shopping cart functionality, and an intuitive dashboard for managing user activities.

---

## Features

- Secure user authentication using Supabase Auth
- User profile management
- Premium template marketplace
- Category-based browsing
- Advanced search functionality
- Shopping cart management
- Order management
- Responsive design
- Dark mode interface
- Protected dashboard
- Server-side rendering
- Row Level Security (RLS)
- Fast deployment with Vercel

---

# Technology Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI

## Backend

- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Storage

## Deployment

- Vercel
- GitHub

---

# Project Structure

```
Code4Web
│
├── app/
│   ├── auth/
│   ├── dashboard/
│   ├── templates/
│   ├── cart/
│   ├── checkout/
│   ├── profile/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── auth/
│   ├── layout/
│   ├── cards/
│   ├── dashboard/
│   └── forms/
│
├── lib/
│   ├── supabase/
│   ├── hooks/
│   ├── helpers/
│   └── utils/
│
├── public/
│
├── styles/
│
├── middleware.ts
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/ujasshekhat/Code4Web.git
```

Navigate to the project directory

```bash
cd Code4Web
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

---

# Database Setup

1. Create a new Supabase project.
2. Open SQL Editor.
3. Execute the `supabase-schema.sql` file.
4. Verify that all tables and policies are created successfully.

The schema creates:

- Profiles
- Templates
- Orders
- Shopping Cart
- Authentication Triggers
- Row Level Security Policies

---

# Running the Project

Development Mode

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Start Production Server

```bash
npm start
```

Open the application:

```
http://localhost:3000
```

---

# Deployment

## Vercel

1. Import the GitHub repository into Vercel.
2. Configure the required environment variables.
3. Deploy the project.

Required Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

# Core Modules

## Authentication

- User Registration
- User Login
- Session Management
- Protected Routes

## Marketplace

- Browse Templates
- Template Details
- Categories
- Search
- Featured Templates

## User Dashboard

- Profile Management
- Order History
- Purchased Templates
- Account Settings

## Shopping

- Shopping Cart
- Checkout
- Order Processing

---

# Security

- Supabase Authentication
- JWT Session Management
- Row Level Security (RLS)
- Protected API Routes
- Secure Environment Variables

---

# Performance

- Server Components
- Static Rendering
- Image Optimization
- Lazy Loading
- Optimized Fonts
- Fast Page Navigation

---

# Future Enhancements

- Payment Gateway Integration
- Seller Dashboard
- Admin Panel
- Reviews and Ratings
- AI Template Recommendations
- Analytics Dashboard
- Multi-language Support
- Notification System
- Template Versioning

---

# Screenshots

Add screenshots for:

- Home Page
- Marketplace
- Template Details
- Dashboard
- Cart
- Checkout
- Profile

---

# Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# License

This project is licensed under the MIT License.

---

# Author

Ujas Shekhat

GitHub: https://github.com/ujasshekhat

Email: ujasshekhat1@gmail.com