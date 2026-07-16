<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use Config\Domain;

class DevelopmentSeeder extends Seeder
{
    public function run()
    {
        if ($this->db->table('users')->countAllResults() > 0) {
            return;
        }

        $now = date('Y-m-d H:i:s');
        $password = password_hash('password123', PASSWORD_DEFAULT);

        $adminId = $this->insertAndGetId('users', [
            'name' => 'Admin CourseHub',
            'email' => 'admin@coursehub.test',
            'password_hash' => $password,
            'role' => Domain::ROLE_ADMIN,
            'account_status' => Domain::ACCOUNT_ACTIVE,
            'instructor_verification_status' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $studentId = $this->insertAndGetId('users', [
            'name' => 'Sinta Student',
            'email' => 'student@coursehub.test',
            'password_hash' => $password,
            'role' => Domain::ROLE_STUDENT,
            'account_status' => Domain::ACCOUNT_ACTIVE,
            'instructor_verification_status' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $verifiedInstructorId = $this->insertAndGetId('users', [
            'name' => 'Budi Instructor',
            'email' => 'instructor@coursehub.test',
            'password_hash' => $password,
            'role' => Domain::ROLE_INSTRUCTOR,
            'account_status' => Domain::ACCOUNT_ACTIVE,
            'instructor_verification_status' => Domain::INSTRUCTOR_VERIFIED,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $this->insertAndGetId('users', [
            'name' => 'Dewi Pending Instructor',
            'email' => 'pending.instructor@coursehub.test',
            'password_hash' => $password,
            'role' => Domain::ROLE_INSTRUCTOR,
            'account_status' => Domain::ACCOUNT_ACTIVE,
            'instructor_verification_status' => Domain::INSTRUCTOR_PENDING,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $mathCategoryId = $this->insertAndGetId('categories', [
            'name' => 'Matematika',
            'slug' => 'matematika',
            'description' => 'Kursus matematika tingkat sekolah.',
            'status' => 'active',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $webCategoryId = $this->insertAndGetId('categories', [
            'name' => 'Pemrograman Web',
            'slug' => 'pemrograman-web',
            'description' => 'Kursus pengembangan aplikasi web.',
            'status' => 'active',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $publishedCourseId = $this->insertAndGetId('courses', [
            'instructor_id' => $verifiedInstructorId,
            'category_id' => $mathCategoryId,
            'title' => 'Matematika Dasar untuk SMA',
            'slug' => 'matematika-dasar-untuk-sma',
            'description' => 'Belajar aljabar, fungsi, dan latihan soal bertahap.',
            'level' => 'beginner',
            'thumbnail' => null,
            'status' => Domain::COURSE_PUBLISHED,
            'rejection_reason' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $pendingCourseId = $this->insertAndGetId('courses', [
            'instructor_id' => $verifiedInstructorId,
            'category_id' => $webCategoryId,
            'title' => 'Dasar CodeIgniter 4',
            'slug' => 'dasar-codeigniter-4',
            'description' => 'Pengenalan MVC, routing, model, dan controller di CodeIgniter 4.',
            'level' => 'intermediate',
            'thumbnail' => null,
            'status' => Domain::COURSE_PENDING,
            'rejection_reason' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $this->db->table('lessons')->insertBatch([
            [
                'course_id' => $publishedCourseId,
                'title' => 'Pengenalan Aljabar',
                'content' => 'Materi pengantar variabel, koefisien, dan persamaan linear.',
                'video_url' => null,
                'order_no' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'course_id' => $publishedCourseId,
                'title' => 'Fungsi dan Grafik',
                'content' => 'Materi fungsi, domain, range, dan grafik sederhana.',
                'video_url' => null,
                'order_no' => 2,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'course_id' => $pendingCourseId,
                'title' => 'Pengenalan MVC',
                'content' => 'Materi hubungan model, view, controller, dan route.',
                'video_url' => null,
                'order_no' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        $this->db->table('course_reviews')->insert([
            'course_id' => $pendingCourseId,
            'instructor_id' => $verifiedInstructorId,
            'admin_id' => null,
            'status' => Domain::COURSE_PENDING,
            'submitted_at' => $now,
            'reviewed_at' => null,
            'reason' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $packageId = $this->insertAndGetId('packages', [
            'name' => 'Paket Bulanan',
            'price' => 99000,
            'duration_days' => 30,
            'description' => 'Akses seluruh kursus published selama satu bulan.',
            'status' => 'active',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $this->db->table('notifications')->insertBatch([
            [
                'user_id' => $studentId,
                'type' => 'system',
                'title' => 'Selamat datang di CourseHub',
                'message' => 'Gunakan akun demo untuk menjelajahi fitur student.',
                'read_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $verifiedInstructorId,
                'type' => 'course_review',
                'title' => 'Kursus menunggu review',
                'message' => 'Kursus Dasar CodeIgniter 4 sudah masuk antrian review.',
                'read_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        $this->db->table('payments')->insert([
            'user_id' => $studentId,
            'package_id' => $packageId,
            'transaction_number' => 'TRX-DEMO-001',
            'payment_method' => 'Transfer Bank Manual',
            'payment_date' => null,
            'amount' => 99000,
            'status' => Domain::PAYMENT_PENDING,
            'confirmed_by' => null,
            'confirmed_at' => null,
            'rejection_reason' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }

    private function insertAndGetId(string $table, array $data): int
    {
        $this->db->table($table)->insert($data);

        return (int) $this->db->insertID();
    }
}
