<?php

return [
    'office_base_url' => env(
        'UNIPDA_OFFICE_API',
        'https://office.universitaspgridelta.ac.id/rest/public/api'
    ),
    'office_web_url' => env(
        'UNIPDA_OFFICE_WEB',
        'https://office.universitaspgridelta.ac.id'
    ),
    'saintek_base_url' => env(
        'UNIPDA_SAINTEK_API',
        'https://saintek.universitaspgridelta.ac.id/backend/public/api'
    ),
    'saintek_public_url' => env(
        'UNIPDA_SAINTEK_PUBLIC',
        'https://saintek.universitaspgridelta.ac.id'
    ),
    // Path prefix where Saintek serves uploaded files (e.g. /storage/dosen/*.png)
    'saintek_storage_prefix' => env('UNIPDA_SAINTEK_STORAGE_PREFIX', '/backend/public'),
    'http_timeout' => (int) env('UNIPDA_HTTP_TIMEOUT', 15),
    'cache_ttl' => (int) env('UNIPDA_CACHE_TTL', 300),

    /*
    | Daftar aplikasi di landing page Application Showcase.
    | Edit backend/config/showcase-apps.json — hanya entry di file ini yang ditampilkan.
    */
    'showcase_apps_path' => env('UNIPDA_SHOWCASE_APPS_PATH', config_path('showcase-apps.json')),

    /*
    | Daftar fakultas di landing page.
    | Edit backend/config/faculties.json
    */
    'faculties_path' => env('UNIPDA_FACULTIES_PATH', config_path('faculties.json')),

    'faculty_aliases' => [
        'fip' => ['Fakultas Ilmu Pendidikan', 'Ilmu Pendidikan'],
        'saintek' => ['Fakultas Sains dan Teknologi', 'Sains dan Teknologi'],
    ],
];
