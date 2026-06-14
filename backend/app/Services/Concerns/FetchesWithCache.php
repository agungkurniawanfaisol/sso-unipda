<?php

namespace App\Services\Concerns;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

trait FetchesWithCache
{
    protected function fetchJson(string $cacheKey, string $url, array $query = []): array
    {
        $ttl = (int) config('unipda.cache_ttl', 300);
        $request = fn (): array => $this->performGet($url, $query);

        if ($ttl <= 0) {
            return $request();
        }

        return Cache::remember($cacheKey, $ttl, $request);
    }

    protected function performGet(string $url, array $query = []): array
    {
        $response = Http::timeout((int) config('unipda.http_timeout', 15))
            ->acceptJson()
            ->get($url, $query);

        if (! $response->successful()) {
            Log::warning('Upstream API request failed', [
                'url' => $url,
                'query' => $query,
                'status' => $response->status(),
            ]);

            throw new RuntimeException('upstream_unavailable');
        }

        $json = $response->json();

        return is_array($json) ? $json : [];
    }

    protected function buildCacheKey(string $prefix, array $params = []): string
    {
        ksort($params);

        return 'unipda:'.$prefix.':'.md5(json_encode($params));
    }
}
