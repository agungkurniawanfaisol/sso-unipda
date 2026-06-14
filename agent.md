# Agent — UNIPDA Portal

This file documents agent configuration, available tools, and conventions for AI-assisted development in this project.

## Available Agents

| Agent | Purpose |
|-------|---------|
| `file-picker` | Find relevant files by fuzzy search |
| `code-searcher` | Line-oriented search using ripgrep |
| `researcher-web` | Web search for information |
| `researcher-docs` | Technical documentation lookup |
| `basher` | Run terminal commands |
| `browser-use` | Browser automation (requires Chrome) |
| `code-reviewer-deepseek-flash` | Code review of changes |

## How to Use Agents

Use `@AgentName` in your message to spawn an agent directly:

```
@code-searcher find all references to the Hero component
```

Or the assistant will spawn agents automatically based on the task.

## Loadable Skills

Load a skill using the `skill` tool:

```
skill: { name: "ui-ux-pro-max" }
skill: { name: "laravel-expert" }
```

## Project Conventions

### Frontend
- **Components**: `src/components/` — one file per component
- **UI Primitives**: `src/components/ui/` — shadcn-style base components
- **Layouts**: `src/layouts/` — page-level layout wrappers
- **Pages**: `src/pages/` — route-level page components
- **Hooks**: `src/hooks/` — custom React hooks
- **Utilities**: `src/lib/` — helper functions (cn, etc.)
- **CSS**: Tailwind v4 with `@theme` block for design tokens

### Backend (Laravel)
- **Controllers**: `app/Http/Controllers/` — slim REST controllers
- **Models**: `app/Models/` — Eloquent models
- **Resources**: `app/Http/Resources/` — JSON API resources
- **Migrations**: `database/migrations/` — database schema
- **Seeders**: `database/seeders/` — sample data
- **Routes**: `routes/api.php` — API endpoint definitions

### Git
- Use conventional commit messages
- Keep commits focused on single changes

## Quick Start

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend (requires PHP 8.2+ & Composer)
cd backend
cp .env.example .env
composer install
php artisan migrate --seed
php artisan serve

# Docker (all services)
docker compose up -d
```
