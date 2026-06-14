<?php

namespace App\Services;

use App\Services\Concerns\FetchesWithCache;

class OfficePublicApiClient
{
    use FetchesWithCache;

    public function getEmployees(array $params = []): array
    {
        return $this->fetchJson(
            $this->buildCacheKey('office.employees', $params),
            $this->url('/public/employees'),
            $params
        );
    }

    public function getEmployeeByRef(string $publicRef): array
    {
        return $this->fetchJson(
            $this->buildCacheKey('office.employee', ['ref' => $publicRef]),
            $this->url('/public/employees/ref/'.rawurlencode($publicRef))
        );
    }

    public function getStudents(array $params = []): array
    {
        return $this->fetchJson(
            $this->buildCacheKey('office.students', $params),
            $this->url('/public/students'),
            $params
        );
    }

    public function getStudyPrograms(): array
    {
        return $this->fetchJson(
            $this->buildCacheKey('office.study_programs', []),
            $this->url('/public/study-programs')
        );
    }

    public function getStudyProgramLecturers(string $publicRef): array
    {
        return $this->fetchJson(
            $this->buildCacheKey('office.study_program_lecturers', ['ref' => $publicRef]),
            $this->url('/public/study-programs/ref/'.rawurlencode($publicRef).'/lecturers')
        );
    }

    public function getAcademicCalendar(int $year, int $month): array
    {
        $params = ['year' => $year, 'month' => $month];

        return $this->fetchJson(
            $this->buildCacheKey('office.academic_calendar', $params),
            $this->url('/public/academic-calendar'),
            $params
        );
    }

    private function url(string $path): string
    {
        return rtrim(config('unipda.office_base_url'), '/').$path;
    }
}
