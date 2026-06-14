<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Lecturer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed Applications
        Application::create([
            'title' => 'E-Learning Platform',
            'description' => 'Online learning management system with real-time collaboration features.',
            'category' => 'web',
            'creator_type' => 'student',
            'profile_link' => '#',
        ]);

        Application::create([
            'title' => 'Smart Campus App',
            'description' => 'Mobile application for campus navigation, schedules, and academic info.',
            'category' => 'mobile',
            'creator_type' => 'student',
            'profile_link' => '#',
        ]);

        Application::create([
            'title' => 'IoT Weather Station',
            'description' => 'Real-time weather monitoring system using distributed sensor networks.',
            'category' => 'iot',
            'creator_type' => 'student',
            'profile_link' => '#',
        ]);

        Application::create([
            'title' => 'Greenhouse Controller',
            'description' => 'Arduino-based automated greenhouse monitoring and control system.',
            'category' => 'arduino',
            'creator_type' => 'student',
            'profile_link' => '#',
        ]);

        Application::create([
            'title' => 'Digital Library',
            'description' => 'Web-based digital library with search, borrow, and e-book support.',
            'category' => 'web',
            'creator_type' => 'lecturer',
            'profile_link' => '#',
        ]);

        Application::create([
            'title' => 'Network Monitor',
            'description' => 'Network traffic analysis and monitoring dashboard for campus infrastructure.',
            'category' => 'network',
            'creator_type' => 'student',
            'profile_link' => '#',
        ]);

        Application::create([
            'title' => 'Siakad Mobile',
            'description' => 'Mobile academic information system for students and faculty.',
            'category' => 'mobile',
            'creator_type' => 'lecturer',
            'profile_link' => '#',
        ]);

        Application::create([
            'title' => 'Smart Parking System',
            'description' => 'IoT-based smart parking with real-time slot availability detection.',
            'category' => 'iot',
            'creator_type' => 'student',
            'profile_link' => '#',
        ]);

        // Seed Lecturers
        Lecturer::create([
            'name' => 'Dr. Ahmad Fauzi',
            'credentials' => 'S.Kom., M.Kom.',
            'specializations' => ['Laravel', 'React', 'AI'],
            'scholar_link' => '#',
            'bio' => 'Expert in web development and artificial intelligence with 15+ years of teaching experience.',
        ]);

        Lecturer::create([
            'name' => 'Dr. Siti Nurhaliza',
            'credentials' => 'S.T., M.T.',
            'specializations' => ['IoT', 'Embedded Systems', 'Arduino'],
            'scholar_link' => '#',
            'bio' => 'Specializes in Internet of Things and embedded system design for smart environments.',
        ]);

        Lecturer::create([
            'name' => 'Bambang Suprapto',
            'credentials' => 'S.Kom., M.Kom.',
            'specializations' => ['Mobile Dev', 'Flutter', 'UI/UX'],
            'scholar_link' => '#',
            'bio' => 'Mobile application development expert with focus on cross-platform solutions.',
        ]);

        Lecturer::create([
            'name' => 'Dr. Dewi Sartika',
            'credentials' => 'S.Si., M.Sc.',
            'specializations' => ['Data Science', 'Machine Learning', 'Python'],
            'scholar_link' => '#',
            'bio' => 'Data science researcher focused on machine learning applications in education.',
        ]);

        Lecturer::create([
            'name' => 'Rudi Hartono',
            'credentials' => 'S.Kom., M.Kom.',
            'specializations' => ['DevOps', 'Cloud', 'Kubernetes'],
            'scholar_link' => '#',
            'bio' => 'Cloud infrastructure and DevOps specialist managing campus digital infrastructure.',
        ]);

        Lecturer::create([
            'name' => 'Dr. Maya Indah',
            'credentials' => 'S.T., M.T.',
            'specializations' => ['Cyber Security', 'Network', 'Cryptography'],
            'scholar_link' => '#',
            'bio' => 'Cybersecurity expert with research focus on network security and cryptography.',
        ]);
    }
}
