#!/usr/bin/env bash
# Deploy script — dijalankan di server Hostinger (via GitHub Actions atau manual).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Pull latest from main"
git fetch origin main
git reset --hard origin/main

# Muat variabel deploy lokal (VITE_API_URL, dll.) — file ini tidak ada di Git
if [[ -f "$ROOT/.env.deploy" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env.deploy"
  set +a
fi

echo "==> Backend: composer install"
cd "$ROOT/backend"
composer install --no-dev --optimize-autoloader --no-interaction

echo "==> Backend: migrate & cache"
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> Frontend: build"
cd "$ROOT/frontend"
npm ci --silent
npm run build

# Opsional: salin build frontend ke folder public Laravel (aktifkan jika 1 domain)
# rsync -a --delete dist/ "$ROOT/backend/public/"

echo "==> Deploy selesai ($(date -u +"%Y-%m-%dT%H:%M:%SZ"))"
