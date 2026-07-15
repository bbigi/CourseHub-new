CREATE DATABASE IF NOT EXISTS coursehub
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE coursehub;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
  id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','instruktur','siswa') NOT NULL DEFAULT 'siswa',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NULL,
  updated_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE courses (
  id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  category VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  level ENUM('pemula','menengah','lanjutan') NOT NULL DEFAULT 'pemula',
  price DECIMAL(12,2) NOT NULL DEFAULT 0,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  instructor_id INT(11) UNSIGNED NOT NULL,
  thumbnail VARCHAR(255) NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  INDEX idx_courses_instructor (instructor_id),
  CONSTRAINT fk_courses_instructor
    FOREIGN KEY (instructor_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE lessons (
  id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  course_id INT(11) UNSIGNED NOT NULL,
  title VARCHAR(150) NOT NULL,
  content TEXT NOT NULL,
  video_url VARCHAR(255) NULL,
  order_no INT(11) NOT NULL DEFAULT 1,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  INDEX idx_lessons_course (course_id),
  CONSTRAINT fk_lessons_course
    FOREIGN KEY (course_id) REFERENCES courses(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE enrollments (
  id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT(11) UNSIGNED NOT NULL,
  course_id INT(11) UNSIGNED NOT NULL,
  status ENUM('aktif','selesai','dibatalkan') NOT NULL DEFAULT 'aktif',
  progress INT(3) NOT NULL DEFAULT 0,
  enrolled_at DATETIME NOT NULL,
  completed_at DATETIME NULL,
  UNIQUE KEY uq_enrollment (user_id, course_id),
  INDEX idx_enrollments_user (user_id),
  INDEX idx_enrollments_course (course_id),
  CONSTRAINT fk_enrollments_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_enrollments_course
    FOREIGN KEY (course_id) REFERENCES courses(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Semua akun contoh memakai password: password123
INSERT INTO users (name, email, password, role, is_active, created_at, updated_at) VALUES
('Admin Course', 'admin@course.test', '$2y$12$dNWG/RxY9lMKgpO6xgWZFehfLMpNDM3JbfD7Wkhp/yrop3NwSEYhi', 'admin', 1, NOW(), NOW()),
('Budi Instruktur', 'instruktur@course.test', '$2y$12$dNWG/RxY9lMKgpO6xgWZFehfLMpNDM3JbfD7Wkhp/yrop3NwSEYhi', 'instruktur', 1, NOW(), NOW()),
('Sinta Siswa', 'siswa@course.test', '$2y$12$dNWG/RxY9lMKgpO6xgWZFehfLMpNDM3JbfD7Wkhp/yrop3NwSEYhi', 'siswa', 1, NOW(), NOW()),
('Dewi Instruktur', 'dewi@course.test', '$2y$12$dNWG/RxY9lMKgpO6xgWZFehfLMpNDM3JbfD7Wkhp/yrop3NwSEYhi', 'instruktur', 1, NOW(), NOW()),
('Andi Siswa', 'andi@course.test', '$2y$12$dNWG/RxY9lMKgpO6xgWZFehfLMpNDM3JbfD7Wkhp/yrop3NwSEYhi', 'siswa', 1, NOW(), NOW());

INSERT INTO courses (title, slug, category, description, level, price, status, instructor_id, thumbnail, created_at, updated_at) VALUES
('Matematika Kelas 10 - Dari Dasar Sampai Mahir', 'matematika-kelas-10-dari-dasar-sampai-mahir', 'Matematika', 'Kuasai aljabar, fungsi, trigonometri, dan statistika dasar dengan latihan bertahap.', 'pemula', 0, 'published', 2, 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb', NOW(), NOW()),
('Bahasa Inggris - Grammar dan Speaking Confidence', 'bahasa-inggris-grammar-speaking-confidence', 'Bahasa Inggris', 'Materi grammar, vocabulary, dan speaking confidence untuk siswa SMP dan SMA.', 'pemula', 0, 'published', 4, 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8', NOW(), NOW()),
('Persiapan UTBK - Saintek dan Soshum', 'persiapan-utbk-saintek-soshum', 'Persiapan Ujian', 'Latihan soal UTBK lengkap dengan pembahasan untuk persiapan masuk perguruan tinggi.', 'lanjutan', 0, 'published', 2, 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', NOW(), NOW()),
('CodeIgniter 4 untuk Aplikasi MVC', 'codeigniter-4-untuk-aplikasi-mvc', 'Framework PHP', 'Praktik membangun aplikasi berbasis MVC, CRUD, autentikasi, otorisasi, dan REST API menggunakan CodeIgniter 4.', 'menengah', 250000, 'published', 2, 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', NOW(), NOW()),
('IPA Terpadu Kelas 8', 'ipa-terpadu-kelas-8', 'IPA', 'Materi IPA terpadu berisi konsep dasar biologi, fisika, dan kimia tingkat SMP.', 'pemula', 0, 'draft', 4, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d', NOW(), NOW());

INSERT INTO lessons (course_id, title, content, video_url, order_no, created_at, updated_at) VALUES
(1, 'Pengenalan Aljabar', 'Materi pengantar variabel, koefisien, persamaan linear, dan contoh soal.', NULL, 1, NOW(), NOW()),
(1, 'Fungsi dan Grafik', 'Materi fungsi, domain, range, dan cara membaca grafik sederhana.', NULL, 2, NOW(), NOW()),
(2, 'Basic Grammar Review', 'Pembahasan tenses dasar dan struktur kalimat sederhana.', NULL, 1, NOW(), NOW()),
(3, 'Strategi Mengerjakan Soal UTBK', 'Materi strategi waktu, identifikasi tipe soal, dan evaluasi kemampuan awal.', NULL, 1, NOW(), NOW()),
(4, 'Pengenalan MVC pada CodeIgniter 4', 'Materi ini menjelaskan hubungan Model, View, Controller, routing, dan template layout.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1, NOW(), NOW()),
(4, 'Membuat CRUD Kursus', 'Materi ini membahas proses tambah, lihat, ubah, dan hapus data kursus menggunakan Model dan Controller.', NULL, 2, NOW(), NOW());

INSERT INTO enrollments (user_id, course_id, status, progress, enrolled_at, completed_at) VALUES
(3, 1, 'aktif', 45, NOW(), NULL),
(3, 4, 'aktif', 35, NOW(), NULL),
(5, 2, 'selesai', 100, DATE_SUB(NOW(), INTERVAL 10 DAY), NOW());
