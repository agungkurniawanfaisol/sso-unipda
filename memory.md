# UNIPDA Portal — Project Memory

## Overview
UNIPDA Application Showcase & Faculty Portal — a full-stack web application showcasing software applications built by the university, alongside a faculty/lecturer directory, core vision-mission statements, and educational standards.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite 8 + Tailwind CSS v4 |
| **Backend** | Laravel 12 REST API |
| **Database** | MySQL |
| **3D Graphics** | Spline (`@splinetool/react-spline`) |
| **Animation** | Framer Motion |
| **Routing** | React Router v7 |
| **Icons** | Lucide React |
| **Utilities** | clsx, tailwind-merge |

## Project Structure

```
SSO/
├── frontend/                    # React SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn-style UI primitives
│   │   │   │   ├── card.tsx
│   │   │   │   ├── splite.tsx
│   │   │   │   ├── spotlight.tsx
│   │   │   │   └── spotlight-mouse.tsx
│   │   │   ├── dashboard/       # Admin dashboard components
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── DashboardHeader.jsx
│   │   │   ├── Hero.jsx         # Spline 3D-powered hero
│   │   │   ├── ApplicationShowcase.jsx
│   │   │   ├── LecturerDirectory.jsx
│   │   │   ├── InstitutionalInfo.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── SplineSceneDemo.tsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── hooks/
│   │   │   └── useScrollPosition.js
│   │   ├── lib/
│   │   │   └── utils.ts          # cn() utility
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                     # Laravel 12 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── ApplicationController.php
│   │   │   │   └── LecturerController.php
│   │   │   └── Resources/
│   │   │       ├── ApplicationResource.php
│   │   │       └── LecturerResource.php
│   │   └── Models/
│   │       ├── Application.php
│   │       └── Lecturer.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/api.php
│   ├── bootstrap/app.php
│   ├── composer.json
│   └── .env.example
│
├── docker-compose.yml
├── memory.md
├── skills.md
├── agent.md
└── README.md
```

## Routes

### Public Pages
| Path | Component | Description |
|------|-----------|-------------|
| `/` | LandingPage | Hero → Applications → Lecturers → About |

### Admin Panel
| Path | Component | Description |
|------|-----------|-------------|
| `/admin` | Dashboard | Stats, recent apps, activity feed |
| `/admin/applications` | Dashboard* | Placeholder |
| `/admin/lecturers` | Dashboard* | Placeholder |
| `/admin/students` | Dashboard* | Placeholder |
| `/admin/settings` | Dashboard* | Placeholder |

\* Sub-routes render the same Dashboard page (awaiting individual page components).

### API Endpoints (Laravel Backend)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications?category=` | List applications (optional filter) |
| GET | `/api/lecturers` | List faculty members |

## Design Tokens
- **Theme**: Dark mode, black/carbon backgrounds
- **Accent**: Indigo (`#6366f1`) for interactive elements
- **Surface**: `#0a0a0f`, `#12121a`, `#1a1a25`
- **Glassmorphism**: `backdrop-blur-xl` with `bg-black/70` for nav/sidebar
- **Font**: Inter (system-ui fallback)
- **Radii**: 8px (sm), 12px (md), 16px (lg), 999px (full)

## Installed Skills
- `ui-ux-pro-max` — UI/UX design intelligence
- `agent-browser` — Browser automation for AI agents

## Key Decisions
1. **Tailwind v4** over v3 — Uses `@tailwindcss/vite` plugin and CSS `@theme` block
2. **Mixed JSX/TSX** — Existing components remain `.jsx`, new shadcn-style components are `.tsx`
3. **No shadcn CLI** — Components written manually to match Tailwind v4
4. **React Router** for client-side routing with `/admin/*` catch-all
5. **Spline 3D** in hero section as full-viewport background with gradient overlays
6. **No TypeScript strict mode** — `noUnusedLocals`/`noUnusedParameters` disabled for JSX compatibility
