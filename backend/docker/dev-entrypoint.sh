#!/bin/sh
set -e

cleanup() {
    echo "🛑 Shutting down..."
    kill $SERVER_PID 2>/dev/null || true
    exit 0
}
trap cleanup SIGTERM SIGINT

# ── Setup ──────────────────────────────────────
echo "📦 Installing PHP dependencies..."
if [ ! -f vendor/autoload.php ]; then
    composer install --no-interaction --prefer-dist --quiet
else
    echo "  → Already installed, skipping..."
fi

# Create .env if missing and sync DB settings with compose environment
if [ ! -f .env ]; then
    cp .env.example .env
    echo "🔑 Generating app key..."
    php artisan key:generate --force
fi

# Override DB settings from environment (so env vars in compose take effect)
if [ -n "$DB_HOST" ]; then
    sed -i "s/DB_HOST=.*/DB_HOST=$DB_HOST/" .env
fi
if [ -n "$DB_DATABASE" ]; then
    sed -i "s/DB_DATABASE=.*/DB_DATABASE=$DB_DATABASE/" .env
fi
if [ -n "$DB_USERNAME" ]; then
    sed -i "s/DB_USERNAME=.*/DB_USERNAME=$DB_USERNAME/" .env
fi
if [ -n "$DB_PASSWORD" ]; then
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASSWORD/" .env
fi

echo "🗄️  Running migrations..."
php artisan migrate --seed --force

# ── Dev server with auto-reload ────────────────
echo "✅ Setup complete. Starting dev server..."
php artisan serve --host=0.0.0.0 --port=8000 &
SERVER_PID=$!

echo "👀 Watching for file changes..."
while true; do
    if ! inotifywait -r -e modify,create,delete,move \
        --exclude '(\.env|vendor/|storage/|bootstrap/cache/|node_modules/|\.git/)' \
        ./app ./config ./routes ./database ./resources 2>&1; then
        sleep 2
        continue
    fi
    echo "🔄 Change detected — restarting server..."
    kill $SERVER_PID 2>/dev/null || true
    php artisan serve --host=0.0.0.0 --port=8000 &
    SERVER_PID=$!
done
