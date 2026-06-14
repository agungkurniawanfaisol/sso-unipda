<?php

namespace App\Support;

use App\Services\SaintekPublicApiClient;

class LecturerNormalizer
{
    public static function fromSaintek(array $item, SaintekPublicApiClient $client): array
    {
        $subjects = $item['subjects'] ?? [];
        $specializations = is_array($subjects) && $subjects !== []
            ? $subjects
            : array_filter([$item['expertise'] ?? null]);

        return [
            'id' => $item['id'] ?? null,
            'public_ref' => $item['id'] ?? null,
            'name' => $item['name'] ?? $item['shortName'] ?? '—',
            'credentials' => $item['position'] ?? null,
            'specializations' => array_values($specializations),
            'scholar_link' => isset($item['email'])
                ? 'mailto:'.$item['email']
                : ($item['id'] ? config('unipda.saintek_public_url').'/dosen/'.$item['id'] : null),
            'profile_image' => $client->resolveAssetUrl($item['photo'] ?? null),
            'bio' => $item['bio'] ?? null,
            'source' => 'saintek',
            'program_studi' => $item['programStudi'] ?? null,
        ];
    }

    public static function fromOffice(array $item): array
    {
        $name = $item['display_name'] ?? $item['name'] ?? '—';
        $credentials = $item['gelar_belakang'] ?? $item['position'] ?? null;

        return [
            'id' => $item['public_ref'] ?? null,
            'public_ref' => $item['public_ref'] ?? null,
            'name' => $name,
            'credentials' => $credentials,
            'specializations' => array_values(array_filter([
                $item['position'] ?? null,
                $item['employee_type'] ?? null,
            ])),
            'scholar_link' => config('unipda.office_web_url').'/pegawai-unipda',
            'profile_image' => $item['photo'] ?? null,
            'bio' => null,
            'source' => 'office',
            'faculty' => $item['faculty'] ?? null,
            'program_studi' => null,
        ];
    }

    public static function fromOfficeProgramLecturer(array $item, array $program, ?string $facultySlug): array
    {
        $programName = $program['nama'] ?? null;

        return [
            'id' => $item['public_ref'] ?? null,
            'public_ref' => $item['public_ref'] ?? null,
            'name' => $item['display_name'] ?? $item['name'] ?? '—',
            'credentials' => $item['gelar_belakang'] ?? $item['position'] ?? null,
            'specializations' => array_values(array_filter([$programName])),
            'scholar_link' => config('unipda.office_web_url').'/pegawai-unipda',
            'profile_image' => $item['photo'] ?? null,
            'bio' => null,
            'source' => 'office',
            'faculty' => $facultySlug,
            'program_studi' => $program['kode_prodi'] ?? null,
        ];
    }

    public static function fromOfficeDetail(array $payload): array
    {
        $item = $payload['data'] ?? $payload;

        $normalized = self::fromOffice(is_array($item) ? $item : []);
        $programs = $item['study_programs_affiliated'] ?? [];

        if (is_array($programs) && $programs !== []) {
            $normalized['specializations'] = array_values(array_filter(array_map(
                fn (array $program): ?string => $program['nama'] ?? null,
                $programs
            )));
        }

        return $normalized;
    }
}
