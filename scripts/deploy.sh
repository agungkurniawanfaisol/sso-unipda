#!/usr/bin/env bash
# Deploy script server-side — dijalankan di Hostinger (via GitHub Actions atau manual).
# Frontend di-build di GitHub Actions, bukan di server.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Pull latest from main"
git fetch origin main
git reset --hard origin/main

echo "==> Backend: composer install"
cd "$ROOT/backend"
composer install --no-dev --optimize-autoloader --no-interaction

echo "==> Backend: migrate & cache"
php artisan migrate --force
php artisan config:cache
php artisan route:cache
# API-only: tidak ada Blade views — skip view:cache

# Frontend dist di-upload dari GitHub Actions (npm tidak tersedia di shared hosting).
if [[ ! -d "$ROOT/frontend/dist" ]] || [[ -z "$(ls -A "$ROOT/frontend/dist" 2>/dev/null)" ]]; then
  echo "WARNING: frontend/dist kosong — pastikan GitHub Actions sudah upload build."
fi

# Opsional: salin build frontend ke folder public Laravel (aktifkan jika 1 domain)
# rsync -a --delete "$ROOT/frontend/dist/" "$ROOT/backend/public/"

echo "==> Deploy selesai ($(date -u +"%Y-%m-%dT%H:%M:%SZ"))"
