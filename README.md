# Slooze Commodities Management System

## Overview
Slooze Commodities Management System is a modern React application for monitoring commodity inventory, visualising performance metrics, and managing store operations with role-aware controls. The experience mirrors contemporary SaaS dashboards with refined light/dark themes, data-rich tables, and polished micro-interactions.

## Features
- **Authentication** with persistent sessions and friendly validation
- **Role-based Access** that adapts navigation, actions, and redirects for managers vs. storekeepers
- **Dashboard with Charts** showcasing revenue, engagement, and operational KPIs via Recharts
- **Light/Dark Mode** toggle persisted across visits
- **Products Page** featuring tabbed inventory views, actionable tables, skeleton loading states, and insight cards
- **Role-based UI restrictions** including gated buttons, safe fallbacks, and contextual messaging

## Tech Stack
- React 19
- Vite
- TailwindCSS
- Recharts
- React Router DOM

## Login Credentials
- Manager — `manager@slooze.com` / `password123`
- Storekeeper — `keeper@slooze.com` / `password123`

## Getting Started
```bash
npm install
npm run dev
```

## Project Structure
```text
slooze-commodities/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Layout.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  ├─ Sidebar.jsx
│  │  └─ ThemeToggle.jsx
│  ├─ contexts/
│  │  ├─ AuthContext.jsx
│  │  ├─ ThemeContext.jsx
│  │  └─ ToastContext.jsx
│  ├─ data/
│  │  ├─ dashboard.js
│  │  └─ products.js
│  ├─ hooks/
│  │  ├─ useAuth.js
│  │  ├─ useTheme.js
│  │  └─ useToast.js
│  ├─ pages/
│  │  ├─ Dashboard.jsx
│  │  ├─ Login.jsx
│  │  ├─ NotFound.jsx
│  │  └─ Products.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
└─ README.md
```

## Deployment
- Vercel: _link to be added after deployment_
