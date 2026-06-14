# UNIPDA Application Showcase & Faculty Portal

A full-stack web application showcasing software applications built by the university (UNIPDA), alongside a faculty/lecturer directory, core vision-mission statements, and educational standards.

**Tech Stack:** React 19 + Vite 8 + Tailwind CSS v4 | Laravel 12 REST API | MySQL 8.0 | Spline 3D

---

## 🚀 Quick Start

### Development Mode (with hot reload)

```bash
# Docker (recommended — all services at once)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Services:
# - Frontend:  http://localhost:5173   (HMR enabled — instant updates on save)
# - Backend:   http://localhost:8000   (auto-reloads on file changes)
# - MySQL:     localhost:3306

# View logs:
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Stop:
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
```

#### Dev mode features
| Feature | Frontend | Backend |
|---------|----------|---------|
| Hot reload | ✅ Vite HMR (WebSocket) | ✅ inotifywait auto-restart |
| File watching | Polling mode for WSL | Watches app/, config/, routes/, database/, resources/ |
| Code changes | Instant browser update | Server auto-restarts |

---

### Standard Mode (without dev overrides)

Without `-f docker-compose.dev.yml`, the services run without hot reload or auto-restart.
The frontend still uses Vite dev server (HMR disabled, no polling).

```bash
docker compose up -d

# Services:
# - Frontend:  http://localhost:5173  (Vite dev, no HMR)
# - Backend:   http://localhost:8000
# - MySQL:     localhost:3306
```

### Production Build

For a true production deployment, build the frontend to static files and serve with Nginx:

```bash
# 1. Build frontend
cd frontend && npm run build
# Output goes to frontend/dist/

# 2. Serve the built files with any static server
npx serve frontend/dist -l 3000

# Or use the backend's Nginx to serve both API and frontend
# (see docker-compose.prod.yml — not yet created)
```

---

## 🖥️ Local Development (without Docker)

### Prerequisites
- **Node.js** v22+
- **PHP** 8.2+ with extensions: pdo_mysql, mbstring, zip, gd, intl
- **Composer** v2+
- **MySQL** 8.0

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env to match your MySQL credentials

composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
# → http://localhost:8000
```

---

## 🐳 Docker Setup Reference

### File structure

```
docker-compose.yml          # Base services (MySQL, prod-like backend, frontend)
docker-compose.dev.yml      # Dev overrides (hot reload, file watching)
backend/docker/
├── Dockerfile.dev          # Dev image with Composer + inotify-tools pre-installed
└── dev-entrypoint.sh       # Dev entrypoint with file watcher + auto-reload
```

### Commands cheat sheet

| Command | What it does |
|---------|-------------|
| `docker compose up -d` | Start in production mode |
| `docker compose -f compose.yml -f compose.dev.yml up -d` | Start in dev mode |
| `docker compose down` | Stop all services |
| `docker compose logs -f` | Follow logs |
| `docker compose -f compose.yml -f compose.dev.yml build --no-cache backend` | Rebuild backend image |
| `docker compose exec backend bash` | Shell into backend container |
| `docker compose exec frontend sh` | Shell into frontend container |

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_ROOT_PASSWORD` | `root` | MySQL root password |
| `DB_PASSWORD` | `secret` | MySQL application user password |

---

## 📁 Project Structure

```
SSO/
├── frontend/                    # React SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn-style UI primitives
│   │   │   ├── dashboard/       # Admin dashboard components
│   │   │   ├── Hero.jsx         # Spline 3D-powered hero
│   │   │   ├── ApplicationShowcase.jsx
│   │   │   ├── LecturerDirectory.jsx
│   │   │   └── ...
│   │   ├── layouts/             # MainLayout, DashboardLayout
│   │   ├── pages/               # Dashboard page
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/utils.ts         # cn() utility
│   │   ├── App.jsx              # Router setup
│   │   └── index.css            # Tailwind v4 + design tokens
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                     # Laravel 12 API
│   ├── app/Http/Controllers/    # ApplicationController, LecturerController
│   ├── app/Http/Resources/      # JSON API Resources
│   ├── app/Models/              # Application, Lecturer
│   ├── database/migrations/     # Schema definitions
│   ├── database/seeders/        # Sample data
│   ├── routes/api.php           # API routes
│   ├── docker/                  # Dev Dockerfile + entrypoint
│   └── composer.json
│
├── docker-compose.yml           # Docker base config
├── docker-compose.dev.yml       # Docker dev overrides
├── .env                         # Docker environment variables
├── README.md
├── memory.md                    # Project context & decisions
├── skills.md                    # AI agent skills
└── agent.md                     # Agent configuration
```

---

## 🧭 Routes

### Public Pages
| Path | Content |
|------|---------|
| `/` | Hero → Applications → Lecturers → About |

### Admin Panel
| Path | Content |
|------|---------|
| `/admin` | Dashboard with stats, activity, quick actions |
| `/admin/*` | Placeholder pages (sub-routes render Dashboard) |

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/applications?category=` | List applications (optional filter) |
| `GET` | `/api/lecturers` | List faculty members |

---

## 📚 Additional Docs

| File | What it covers |
|------|---------------|
| `memory.md` | Project context, architecture decisions, design tokens |
| `skills.md` | Installed AI agent skills & how to use them |
| `agent.md` | Agent configuration, available tools, conventions |

---

## 🧪 Database

```bash
# Connect via Docker
docker compose exec mysql mysql -u root -p -h localhost unipda

# Run migrations manually
cd backend && php artisan migrate --seed
```

## 🛠️ Useful Commands

```bash
# Frontend — build for production
cd frontend && npm run build

# Backend — run tests
cd backend && php artisan test

# Backend — create new migration
cd backend && php artisan make:migration create_something_table
```
