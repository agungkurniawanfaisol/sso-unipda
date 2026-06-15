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

echo "==> Backend: prepare storage directories"
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/framework/testing
mkdir -p storage/app/public storage/app/private storage/logs bootstrap/cache
mkdir -p resources/views
chmod -R ug+rwx storage bootstrap/cache 2>/dev/null || true

echo "==> Backend: migrate & cache"
php artisan config:clear 2>/dev/null || true
php artisan migrate --force
php artisan config:cache
php artisan route:cache
# API-only: tidak ada Blade views — skip view:cache

# Frontend dist: di-upload via deploy.php (zip) atau ada di repo setelah git pull.
if [[ "${BACKEND_ONLY:-}" == "1" ]]; then
  echo "==> Frontend publish skipped (BACKEND_ONLY)"
elif [[ -d "$ROOT/frontend/dist" ]] && [[ -n "$(ls -A "$ROOT/frontend/dist" 2>/dev/null)" ]]; then
  echo "==> Frontend: publish ke public_html root"
  rsync -a "$ROOT/frontend/dist/" "$ROOT/"
  if [[ -f "$ROOT/scripts/public_html.htaccess" ]]; then
    cp "$ROOT/scripts/public_html.htaccess" "$ROOT/.htaccess"
  fi
else
  echo "WARNING: frontend/dist kosong — pastikan GitHub Actions sudah upload build."
fi

echo "==> Deploy selesai ($(date -u +"%Y-%m-%dT%H:%M:%SZ"))"
