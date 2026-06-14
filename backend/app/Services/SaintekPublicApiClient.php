<?php

namespace App\Services;

use App\Services\Concerns\FetchesWithCache;

class SaintekPublicApiClient
{
    use FetchesWithCache;

    public function getSite(): array
    {
        return $this->fetchJson(
            $this->buildCacheKey('saintek.site', []),
            $this->url('/site')
        );
    }

    public function getLecturers(): array
    {
        return $this->fetchJson(
            $this->buildCacheKey('saintek.lecturers', []),
            $this->url('/lecturers')
        );
    }

    public function getNews(): array
    {
        return $this->fetchJson(
            $this->buildCacheKey('saintek.news', []),
            $this->url('/berita')
        );
    }

    public function getActivities(): array
    {
        return $this->fetchJson(
            $this->buildCacheKey('saintek.activities', []),
            $this->url('/kegiatan')
        );
    }

    public function resolveAssetUrl(?string $path): ?string
    {
        if ($path === null || $path === '') {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        $base = rtrim(config('unipda.saintek_public_url'), '/');
        $normalized = '/'.ltrim($path, '/');

        if (str_starts_with($normalized, '/storage/')) {
            $prefix = rtrim((string) config('unipda.saintek_storage_prefix', '/backend/public'), '/');

            return $base.$prefix.$normalized;
        }

        return $base.$normalized;
    }

    private function url(string $path): string
    {
        return rtrim(config('unipda.saintek_base_url'), '/').$path;
    }
}
