<?php

namespace App\Services;

use App\Support\LecturerNormalizer;
use Illuminate\Support\Facades\Cache;

class OfficeLecturerAggregator
{
    public function __construct(private OfficePublicApiClient $office)
    {
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function getByFaculty(?string $faculty = null): array
    {
        $faculty = $faculty !== null && $faculty !== '' && $faculty !== 'all'
            ? strtolower($faculty)
            : null;

        $cacheKey = 'unipda:office.lecturers.aggregated:'.($faculty ?? 'all');

        $ttl = (int) config('unipda.cache_ttl', 300);
        $resolver = fn (): array => $this->aggregate($faculty);

        if ($ttl <= 0) {
            return $resolver();
        }

        return Cache::remember($cacheKey, $ttl, $resolver);
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function aggregate(?string $faculty): array
    {
        $payload = $this->office->getStudyPrograms();
        $programs = $payload['data'] ?? (is_array($payload) ? $payload : []);
        $indexed = [];

        foreach ($programs as $program) {
            if (! is_array($program)) {
                continue;
            }

            $facultySlug = $this->resolveFacultySlug($program['faculty']['nama'] ?? null);

            if ($faculty !== null && $facultySlug !== $faculty) {
                continue;
            }

            $publicRef = $program['public_ref'] ?? null;
            if (! is_string($publicRef) || $publicRef === '') {
                continue;
            }

            $payload = $this->office->getStudyProgramLecturers($publicRef);
            $data = $payload['data'] ?? $payload;
            $candidates = $data['lecturers'] ?? [];

            $ketua = $data['ketua_prodi'] ?? null;
            if (is_array($ketua) && ($ketua['public_ref'] ?? null)) {
                $candidates[] = $ketua;
            }

            foreach ($candidates as $item) {
                if (! is_array($item) || empty($item['public_ref'])) {
                    continue;
                }

                if (($item['employee_type'] ?? $item['position'] ?? '') !== 'Dosen'
                    && ($item['position'] ?? '') !== 'Dosen') {
                    continue;
                }

                $ref = $item['public_ref'];
                $normalized = LecturerNormalizer::fromOfficeProgramLecturer($item, $program, $facultySlug);

                if (isset($indexed[$ref])) {
                    $indexed[$ref]['specializations'] = array_values(array_unique(array_merge(
                        $indexed[$ref]['specializations'] ?? [],
                        $normalized['specializations'] ?? []
                    )));
                    $indexed[$ref]['profile_image'] = $indexed[$ref]['profile_image'] ?? $normalized['profile_image'];

                    continue;
                }

                $indexed[$ref] = $normalized;
            }
        }

        $lecturers = array_values($indexed);
        usort($lecturers, fn (array $a, array $b): int => strcasecmp($a['name'] ?? '', $b['name'] ?? ''));

        return $lecturers;
    }

    private function resolveFacultySlug(?string $facultyName): ?string
    {
        if ($facultyName === null || $facultyName === '') {
            return null;
        }

        $aliases = config('unipda.faculty_aliases', []);

        foreach ($aliases as $slug => $names) {
            foreach ($names as $name) {
                if (stripos($facultyName, $name) !== false || stripos($name, $facultyName) !== false) {
                    return $slug;
                }
            }
        }

        if (stripos($facultyName, 'Pendidikan') !== false) {
            return 'fip';
        }

        if (stripos($facultyName, 'Sains') !== false || stripos($facultyName, 'Teknologi') !== false) {
            return 'saintek';
        }

        return null;
    }
}
