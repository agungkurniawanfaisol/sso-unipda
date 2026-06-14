<?php
/**
 * Webhook deploy — dipanggil GitHub Actions setelah FTP upload.
 * Upload file ini ke: public_html/deploy.php
 * Set permission: chmod 644 deploy.php
 *
 * Secrets GitHub:
 *   DEPLOY_HOOK_URL  = https://domain-anda.com/deploy.php
 *   DEPLOY_HOOK_TOKEN = token acak panjang (sama dengan DEPLOY_TOKEN di bawah)
 */

declare(strict_types=1);

$tokenFile = __DIR__ . '/.deploy-token';
if (!is_file($tokenFile)) {
    http_response_code(500);
    exit('Missing .deploy-token file on server.');
}
$token = trim(file_get_contents($tokenFile));

$auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if ($auth !== 'Bearer ' . $token) {
    http_response_code(401);
    exit('Unauthorized');
}

header('Content-Type: text/plain; charset=utf-8');

$root = __DIR__;
$script = $root . '/scripts/deploy.sh';

if (!is_file($script)) {
    http_response_code(500);
    exit("deploy.sh not found at {$script}");
}

$cmd = 'bash ' . escapeshellarg($script) . ' 2>&1';
echo shell_exec($cmd) ?? 'Deploy finished.';
