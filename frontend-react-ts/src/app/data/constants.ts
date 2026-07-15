import {
  BookOpen, Code2, BarChart3, ShieldCheck, Smartphone, Layers,
  UserPlus, LogIn, GraduationCap, TrendingUp,
} from "lucide-react";

export const stats = { courses: 48, lessons: 312, enrollments: 1840 };

export const featuredCourses = [
  {
    id: 1,
    title: "Matematika Kelas 10 — Dari Dasar Sampai Mahir",
    category: "Matematika",
    level: "SMA Kelas 10",
    price: 0,
    instructor: "Bu Ratna Dewi",
    desc: "Kuasai aljabar, fungsi, trigonometri, dan statistika dasar dengan soal-soal latihan terstruktur.",
    color: "from-emerald-600/20 to-green-600/20",
    accent: "#2FA66A",
  },
  {
    id: 2,
    title: "Bahasa Inggris — Grammar & Speaking Confidence",
    category: "Bahasa Inggris",
    level: "SMP/SMA",
    price: 0,
    instructor: "Pak Denny Haryanto",
    desc: "Tingkatkan kemampuan grammar, kosakata, dan kepercayaan diri berbicara bahasa Inggris.",
    color: "from-amber-600/20 to-yellow-600/20",
    accent: "#F2B84B",
  },
  {
    id: 3,
    title: "Persiapan UTBK — Saintek & Soshum",
    category: "Persiapan Ujian",
    level: "SMA Kelas 12",
    price: 0,
    instructor: "Tim Pengajar CourseHub",
    desc: "Latihan soal UTBK lengkap dengan pembahasan mendalam untuk semua bidang studi.",
    color: "from-green-600/20 to-emerald-600/20",
    accent: "#3BBF7A",
  },
];

export const features = [
  {
    icon: BookOpen,
    label: "Manajemen Kursus",
    desc: "Kelola judul, kategori, level, harga, thumbnail, status, dan instruktur.",
    accent: "#2FA66A",
  },
  {
    icon: Layers,
    label: "Kelola Materi",
    desc: "Materi terstruktur berdasarkan urutan, konten, dan tautan video.",
    accent: "#F2B84B",
  },
  {
    icon: BarChart3,
    label: "Monitoring Progress",
    desc: "Siswa memperbarui progress, admin dan instruktur memantau secara real-time.",
    accent: "#3BBF7A",
  },
  {
    icon: ShieldCheck,
    label: "Autentikasi & Otorisasi",
    desc: "Akses dibedakan antara peran admin, instruktur, dan siswa.",
    accent: "#F2B84B",
  },
  {
    icon: Code2,
    label: "REST API",
    desc: "Endpoint CRUD siap diuji menggunakan Postman.",
    accent: "#2FA66A",
  },
  {
    icon: Smartphone,
    label: "Responsif",
    desc: "Tampilan menyesuaikan layar desktop dan mobile.",
    accent: "#F2B84B",
  },
];

export const steps = [
  {
    icon: UserPlus,
    step: "01",
    label: "Daftar Akun",
    desc: "Siswa membuat akun baru melalui halaman registrasi.",
  },
  {
    icon: LogIn,
    step: "02",
    label: "Masuk Sistem",
    desc: "Pengguna login sesuai peran masing-masing.",
  },
  {
    icon: GraduationCap,
    step: "03",
    label: "Ikuti Kursus",
    desc: "Siswa mendaftar dan mempelajari materi terstruktur.",
  },
  {
    icon: TrendingUp,
    step: "04",
    label: "Pantau Progress",
    desc: "Progress belajar diperbarui dan dipantau bersama.",
  },
];