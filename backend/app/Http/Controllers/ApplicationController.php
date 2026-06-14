<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApplicationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;
use RuntimeException;

class ApplicationController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $category = $request->string('category')->toString();

        $apps = $this->loadShowcaseApps()
            ->when($category !== '' && $category !== 'all', fn (Collection $items) => $items->where('category', $category))
            ->map(fn (array $app): array => array_merge($app, ['source' => 'showcase']))
            ->values()
            ->all();

        return ApplicationResource::collection($apps);
    }

    /**
     * @return Collection<int, array<string, mixed>>
     */
    private function loadShowcaseApps(): Collection
    {
        $path = config('unipda.showcase_apps_path', config_path('showcase-apps.json'));

        if (! is_readable($path)) {
            throw new RuntimeException("Showcase apps config not found: {$path}");
        }

        $payload = json_decode((string) file_get_contents($path), true);

        if (! is_array($payload)) {
            throw new RuntimeException("Invalid showcase apps JSON: {$path}");
        }

        return collect($payload['applications'] ?? [])
            ->filter(fn ($app): bool => is_array($app) && ! empty($app['id']) && ! empty($app['title']));
    }
}
