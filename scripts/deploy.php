<?php
/**
 * HTTP deploy endpoint — dipanggil GitHub Actions (tanpa FTP).
 *
 * Setup sekali di server (public_html/):
 *   1. Copy file ini → public_html/deploy.php
 *   2. echo 'TOKEN_ACAK_PANJANG' > public_html/.deploy-token && chmod 600 .deploy-token
 *
 * GitHub Secrets:
 *   DEPLOY_HOOK_URL   = https://portal.universitaspgridelta.ac.id/deploy.php
 *   DEPLOY_HOOK_TOKEN = (sama dengan isi .deploy-token)
 */

declare(strict_types=1);

const MAX_ZIP_BYTES = 80 * 1024 * 1024;

$tokenFile = __DIR__ . '/.deploy-token';
if (!is_file($tokenFile)) {
    http_response_code(500);
    exit('Missing .deploy-token file on server.');
}

$token = trim((string) file_get_contents($tokenFile));
$auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if ($auth !== 'Bearer ' . $token) {
    http_response_code(401);
    exit('Unauthorized');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

header('Content-Type: text/plain; charset=utf-8');

$root = __DIR__;
$script = $root . '/scripts/deploy.sh';

if (!is_file($script)) {
    http_response_code(500);
    exit("deploy.sh not found at {$script}");
}

$zipPath = saveUploadedZip();
$log = [];

$log[] = '==> Backend deploy (git pull, composer, migrate)';
putenv('BACKEND_ONLY=1');
$backendOutput = shell_exec('bash ' . escapeshellarg($script) . ' 2>&1') ?? '';
$log[] = trim($backendOutput);

if ($zipPath !== null) {
    $log[] = '==> Frontend: extract build zip ke document root';
    try {
        extractZipSafely($zipPath, $root);
        $htaccess = $root . '/scripts/public_html.htaccess';
        if (is_file($htaccess)) {
            copy($htaccess, $root . '/.htaccess');
            $log[] = 'Copied .htaccess';
        }
        $log[] = 'Frontend published OK';
    } catch (Throwable $e) {
        @unlink($zipPath);
        http_response_code(500);
        exit(implode("\n", $log) . "\nZIP error: " . $e->getMessage());
    }
    @unlink($zipPath);
} else {
    $log[] = 'No zip body — skipped frontend publish (backend only).';
}

$log[] = 'Deploy selesai (' . gmdate('c') . ')';
echo implode("\n", $log);

function saveUploadedZip(): ?string
{
    $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return null;
    }

    if (strlen($raw) > MAX_ZIP_BYTES) {
        http_response_code(413);
        exit('Zip too large');
    }

    if (!str_contains($contentType, 'application/zip') && !str_starts_with($raw, "PK\x03\x04")) {
        return null;
    }

    $path = sys_get_temp_dir() . '/unipda-deploy-' . bin2hex(random_bytes(8)) . '.zip';
    if (file_put_contents($path, $raw) === false) {
        http_response_code(500);
        exit('Failed to save upload');
    }

    return $path;
}

function extractZipSafely(string $zipPath, string $dest): void
{
    if (!class_exists(ZipArchive::class)) {
        throw new RuntimeException('ZipArchive not available on server');
    }

    $zip = new ZipArchive();
    if ($zip->open($zipPath) !== true) {
        throw new RuntimeException('Invalid zip file');
    }

    $destReal = realpath($dest);
    if ($destReal === false) {
        $zip->close();
        throw new RuntimeException('Invalid destination');
    }

    for ($i = 0; $i < $zip->numFiles; $i++) {
        $name = (string) $zip->getNameIndex($i);
        if ($name === '' || str_contains($name, '..') || str_starts_with($name, '/')) {
            $zip->close();
            throw new RuntimeException('Unsafe zip entry: ' . $name);
        }

        $fullPath = $destReal . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $name);
        $base = rtrim(str_replace('\\', '/', $destReal), '/') . '/';
        $candidate = str_replace('\\', '/', $fullPath);
        if (!str_starts_with($candidate, $base)) {
            $zip->close();
            throw new RuntimeException('Zip slip blocked: ' . $name);
        }
    }

    if (!$zip->extractTo($destReal)) {
        $zip->close();
        throw new RuntimeException('Extract failed');
    }

    $zip->close();
}
