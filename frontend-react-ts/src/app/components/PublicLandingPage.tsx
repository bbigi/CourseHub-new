import { useState } from "react";
import {
  GraduationCap, ChevronRight, BookOpen, Users, Award,
  CheckCircle2, Mail, Phone, MapPin, TrendingUp, Clock,
  FileText, Target, Briefcase, DollarSign, PlayCircle, X
} from "lucide-react";
import { GlassCard } from "./shared/GlassCard";
import { Badge } from "./shared/Badge";

type Nav = { page: "landing" | "login" | "register" | "dashboard"; role?: "student" | "admin" | "instructor" };
type PublicSection = "beranda" | "untuk-siswa" | "untuk-instruktur" | "paket-bulanan" | "kursus" | "kontak";

const COLORS = {
  bg: {
    main: "#F8F7F1",
    page: "#F3F1E8",
    navbar: "#FFFFFF",
  },
  card: "#FFFFFF",
  border: "#DED8CB",
  text: {
    main: "#1F2A24",
    secondary: "#647067",
    muted: "#8A948B",
  },
  primary: {
    main: "#2F8F5B",
    hover: "#26754A",
  },
  softGreen: "#E7F4EC",
  accent: "#DFAE3A",
  softAmber: "#FFF4D9",
};

const COURSES = [
  { id: 1, name: "Matematika Kelas 10", category: "Matematika", level: "SMA", instructor: "Budi Santoso", materials: 24 },
  { id: 2, name: "Bahasa Indonesia - Menulis & Membaca", category: "Bahasa", level: "SMP", instructor: "Siti Nurhaliza", materials: 18 },
  { id: 3, name: "IPA Terpadu Kelas 8", category: "IPA", level: "SMP", instructor: "Ahmad Hidayat", materials: 22 },
  { id: 4, name: "IPS - Sejarah, Geografi & Ekonomi", category: "IPS", level: "SMA", instructor: "Dewi Lestari", materials: 20 },
  { id: 5, name: "Persiapan UTBK - Saintek", category: "UTBK", level: "SMA", instructor: "Prof. Susanto", materials: 30 },
  { id: 6, name: "Bahasa Inggris Dasar", category: "Bahasa", level: "Umum", instructor: "Linda Wijaya", materials: 16 },
];

export function PublicLandingPage({ navigate }: { navigate: (n: Nav) => void }) {
  const [activeSection, setActiveSection] = useState<PublicSection>("beranda");
  const [scrolled, setScrolled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[0] | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [showToast, setShowToast] = useState(false);

  useState(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const navItems: { label: string; section: PublicSection }[] = [
    { label: "Beranda", section: "beranda" },
    { label: "Untuk Siswa", section: "untuk-siswa" },
    { label: "Untuk Instruktur", section: "untuk-instruktur" },
    { label: "Paket Bulanan", section: "paket-bulanan" },
    { label: "Kursus", section: "kursus" },
    { label: "Kontak", section: "kontak" },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: COLORS.bg.main, minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: COLORS.bg.navbar,
          borderBottom: `1px solid ${COLORS.border}`,
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.06)" : "0 1px 0 rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <button onClick={() => setActiveSection("beranda")} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.accent})` }}
              >
                <GraduationCap size={18} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-base leading-tight" style={{ color: COLORS.text.main }}>
                  CourseHub
                </div>
                <div className="text-[10px]" style={{ color: COLORS.text.secondary }}>
                  Learning platform
                </div>
              </div>
            </button>

            {/* Nav Items */}
            <div className="hidden md:flex items-center gap-2 text-sm font-medium">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => setActiveSection(item.section)}
                  onMouseEnter={e => { if (activeSection !== item.section) (e.currentTarget as HTMLElement).style.background = COLORS.softGreen; }}
                  onMouseLeave={e => { if (activeSection !== item.section) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  className="px-4 py-2 rounded-xl transition-all text-sm"
                  style={{
                    background: activeSection === item.section ? COLORS.primary.main : "transparent",
                    color: activeSection === item.section ? "#FFFFFF" : COLORS.text.secondary,
                    fontWeight: activeSection === item.section ? 600 : 500,
                    boxShadow: activeSection === item.section ? "0 2px 8px rgba(47,143,91,0.3)" : "none",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate({ page: "login" })}
                className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-xl border transition-all hover:border-[#2F8F5B] hover:text-[#2F8F5B]"
                style={{
                  borderColor: COLORS.border,
                  color: COLORS.text.secondary,
                }}
              >
                Masuk
              </button>
              <button
                onClick={() => navigate({ page: "register" })}
                className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.primary.hover})`,
                }}
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* BERANDA */}
          {activeSection === "beranda" && (
            <div className="space-y-12">
              {/* Hero */}
              <div className="text-center py-16">
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border"
                  style={{
                    color: COLORS.primary.main,
                    borderColor: `${COLORS.primary.main}50`,
                    background: COLORS.softGreen,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: COLORS.primary.main }}
                  />
                  Platform kursus online berbasis CodeIgniter 4
                </div>
                <h1
                  className="font-extrabold leading-[1.1] mb-6"
                  style={{
                    fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                    color: COLORS.text.main,
                  }}
                >
                  Belajar lebih terarah dalam{" "}
                  <span
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.accent})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    satu platform kursus online.
                  </span>
                </h1>
                <p
                  className="text-base leading-relaxed mb-8 max-w-2xl mx-auto"
                  style={{ color: COLORS.text.secondary }}
                >
                  CourseHub membantu siswa mengakses berbagai kursus, mengikuti materi, memantau progress belajar, dan
                  mendapatkan sertifikat setelah menyelesaikan kursus.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  <button
                    onClick={() => navigate({ page: "register" })}
                    className="flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.primary.hover})`,
                    }}
                  >
                    Mulai Belajar <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={() => navigate({ page: "login" })}
                    className="flex items-center gap-2 font-semibold px-6 py-3 rounded-xl border transition-all"
                    style={{
                      borderColor: COLORS.border,
                      color: COLORS.text.secondary,
                    }}
                  >
                    <PlayCircle size={16} /> Masuk ke Sistem
                  </button>
                </div>
              </div>

              {/* Ringkasan */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: BookOpen,
                    title: "Sistem Kursus Online",
                    desc: "CourseHub adalah sistem kursus online untuk siswa belajar berbagai mata pelajaran.",
                  },
                  {
                    icon: Award,
                    title: "Paket Bulanan",
                    desc: "Siswa menggunakan Paket Bulanan untuk membuka akses seluruh kursus dan materi.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Progress Tercatat",
                    desc: "Progress belajar siswa tercatat otomatis dan sertifikat tersedia jika kursus selesai.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-xl border"
                    style={{ background: COLORS.card, borderColor: COLORS.border }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: COLORS.softGreen, color: COLORS.primary.main }}
                    >
                      <item.icon size={22} />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.text.main }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.text.secondary }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Alur */}
              <div className="py-12">
                <h2 className="font-extrabold text-3xl text-center mb-12" style={{ color: COLORS.text.main }}>
                  Alur Penggunaan Sistem
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { step: "1", label: "Daftar Akun" },
                    { step: "2", label: "Aktifkan Paket" },
                    { step: "3", label: "Jelajahi Kursus" },
                    { step: "4", label: "Belajar Materi" },
                    { step: "5", label: "Progress Tercatat" },
                    { step: "6", label: "Sertifikat" },
                  ].map((item, i) => (
                    <div key={item.step} className="text-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg"
                        style={{
                          background: COLORS.softGreen,
                          color: COLORS.primary.main,
                          border: `2px solid ${COLORS.primary.main}`,
                        }}
                      >
                        {item.step}
                      </div>
                      <p className="text-sm font-semibold" style={{ color: COLORS.text.main }}>
                        {item.label}
                      </p>
                      {i < 5 && (
                        <ChevronRight
                          size={16}
                          className="mx-auto mt-2 hidden lg:block"
                          style={{ color: COLORS.text.muted }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* UNTUK SISWA */}
          {activeSection === "untuk-siswa" && (
            <div className="py-12">
              <div className="text-center mb-12">
                <h2 className="font-extrabold text-4xl mb-4" style={{ color: COLORS.text.main }}>
                  Manfaat untuk Siswa
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: COLORS.text.secondary }}>
                  Akses kursus, belajar materi, pantau progress, dan dapatkan sertifikat.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: BookOpen, title: "Melihat Berbagai Kursus", desc: "Akses katalog kursus lengkap dari berbagai kategori." },
                  { icon: CheckCircle2, title: "Akses Semua Materi", desc: "Jika Paket Bulanan aktif, semua materi bisa diakses." },
                  { icon: TrendingUp, title: "Pantau Progress Belajar", desc: "Lihat statistik progress belajar secara real-time." },
                  { icon: Clock, title: "Riwayat Pembayaran", desc: "Cek riwayat pembayaran dan status paket aktif." },
                  { icon: Award, title: "Sertifikat Otomatis", desc: "Dapatkan sertifikat setelah menyelesaikan kursus." },
                  { icon: Users, title: "Dashboard Interaktif", desc: "Dashboard yang mudah dipahami dan informatif." },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-xl border transition-all hover:shadow-lg"
                    style={{ background: COLORS.card, borderColor: COLORS.border }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: COLORS.softGreen, color: COLORS.primary.main }}
                    >
                      <item.icon size={22} />
                    </div>
                    <h3 className="font-bold text-base mb-2" style={{ color: COLORS.text.main }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.text.secondary }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => navigate({ page: "register" })}
                  className="font-semibold px-8 py-3 rounded-xl text-white transition-all hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.primary.hover})`,
                  }}
                >
                  Daftar sebagai Siswa
                </button>
              </div>
            </div>
          )}

          {/* UNTUK INSTRUKTUR */}
          {activeSection === "untuk-instruktur" && (
            <div className="py-12">
              <div className="text-center mb-12">
                <h2 className="font-extrabold text-4xl mb-4" style={{ color: COLORS.text.main }}>
                  Manfaat untuk Instruktur
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: COLORS.text.secondary }}>
                  Buat kursus, tambahkan materi, lihat enrolmen, dan kelola komisi.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: BookOpen, title: "Membuat Kursus", desc: "Instruktur dapat membuat beberapa kursus sesuai keahlian." },
                  { icon: FileText, title: "Menambahkan Materi", desc: "Tambahkan materi kursus dengan mudah dan terstruktur." },
                  { icon: CheckCircle2, title: "Review Admin", desc: "Kursus direview admin sebelum tampil ke siswa." },
                  { icon: Users, title: "Enrolmen Siswa", desc: "Lihat jumlah siswa yang mengikuti kursus Anda." },
                  { icon: TrendingUp, title: "Progress Siswa", desc: "Pantau progress belajar siswa di setiap kursus." },
                  { icon: DollarSign, title: "Kelola Komisi", desc: "Lihat komisi dan ajukan penarikan dana." },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-xl border transition-all hover:shadow-lg"
                    style={{ background: COLORS.card, borderColor: COLORS.border }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: COLORS.softAmber, color: COLORS.accent }}
                    >
                      <item.icon size={22} />
                    </div>
                    <h3 className="font-bold text-base mb-2" style={{ color: COLORS.text.main }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.text.secondary }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => navigate({ page: "register" })}
                  className="font-semibold px-8 py-3 rounded-xl text-white transition-all hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accent}, #c9910f)`,
                  }}
                >
                  Daftar sebagai Instruktur
                </button>
              </div>
            </div>
          )}

          {/* PAKET BULANAN */}
          {activeSection === "paket-bulanan" && (
            <div className="py-12">
              <div className="text-center mb-12">
                <h2 className="font-extrabold text-4xl mb-4" style={{ color: COLORS.text.main }}>
                  Paket Bulanan
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: COLORS.text.secondary }}>
                  Satu paket, akses semua kursus. Tidak perlu beli kursus satu per satu.
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <div
                  className="p-8 rounded-2xl border-2 relative overflow-hidden"
                  style={{
                    background: COLORS.card,
                    borderColor: COLORS.accent,
                    boxShadow: `0 20px 60px ${COLORS.accent}20`,
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${COLORS.softAmber} 0%, transparent 70%)`,
                      transform: "translate(30%, -30%)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: COLORS.softAmber, color: COLORS.accent }}
                      >
                        <Award size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-lg" style={{ color: COLORS.text.main }}>
                          Paket Bulanan
                        </div>
                        <div
                          className="text-xs px-2 py-0.5 rounded-full inline-block"
                          style={{ background: COLORS.softGreen, color: COLORS.primary.main }}
                        >
                          Aktif
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div
                        className="text-4xl font-extrabold"
                        style={{ color: COLORS.accent }}
                      >
                        Rp99.000
                      </div>
                      <div className="text-sm mt-1" style={{ color: COLORS.text.secondary }}>
                        Durasi 1 bulan
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 mb-7">
                      {[
                        "Akses seluruh kursus",
                        "Akses seluruh materi",
                        "Progress belajar",
                        "Sertifikat otomatis jika kursus selesai",
                      ].map((text) => (
                        <div key={text} className="flex items-center gap-2.5 text-sm" style={{ color: COLORS.text.main }}>
                          <CheckCircle2 size={16} style={{ color: COLORS.primary.main, flexShrink: 0 }} /> {text}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate({ page: "register" })}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.accent}, #c9910f)`,
                      }}
                    >
                      Pilih Paket
                    </button>
                  </div>
                </div>
                <p className="text-center text-sm mt-6 max-w-sm mx-auto" style={{ color: COLORS.text.muted }}>
                  <strong>Catatan:</strong> CourseHub hanya menggunakan satu Paket Bulanan. Tidak ada paket Pro, Premium, 3
                  bulan, atau 6 bulan.
                </p>
              </div>
            </div>
          )}

          {/* KURSUS */}
          {activeSection === "kursus" && (
            <div className="py-12">
              <div className="text-center mb-12">
                <h2 className="font-extrabold text-4xl mb-4" style={{ color: COLORS.text.main }}>
                  Kursus Tersedia
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: COLORS.text.secondary }}>
                  Berbagai kursus dari instruktur berpengalaman.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSES.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-xl border overflow-hidden transition-all hover:shadow-lg"
                    style={{ background: COLORS.card, borderColor: COLORS.border }}
                  >
                    <div
                      className="h-32 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.primary.main}20, ${COLORS.accent}20)`,
                      }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: COLORS.softGreen, color: COLORS.primary.main }}
                      >
                        <BookOpen size={24} />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ background: COLORS.softGreen, color: COLORS.primary.main }}
                        >
                          {course.level}
                        </span>
                        <span className="text-xs" style={{ color: COLORS.text.secondary }}>
                          {course.category}
                        </span>
                      </div>
                      <h5 className="font-bold text-base mb-2" style={{ color: COLORS.text.main }}>
                        {course.name}
                      </h5>
                      <p className="text-sm mb-4" style={{ color: COLORS.text.secondary }}>
                        Instruktur: {course.instructor}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: COLORS.border }}>
                        <span className="text-xs" style={{ color: COLORS.text.secondary }}>
                          {course.materials} materi
                        </span>
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                          style={{
                            background: COLORS.softGreen,
                            color: COLORS.primary.main,
                          }}
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KONTAK */}
          {activeSection === "kontak" && (
            <div className="py-12">
              <div className="text-center mb-12">
                <h2 className="font-extrabold text-4xl mb-4" style={{ color: COLORS.text.main }}>
                  Hubungi Kami
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: COLORS.text.secondary }}>
                  Ada pertanyaan? Kami siap membantu Anda.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Kontak Info */}
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "support@coursehub.id" },
                    { icon: Phone, label: "WhatsApp", value: "0812-0000-2025" },
                    { icon: MapPin, label: "Alamat", value: "Jl. Pendidikan No. 123, Jakarta Selatan" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 p-4 rounded-xl border"
                      style={{ background: COLORS.card, borderColor: COLORS.border }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: COLORS.softGreen, color: COLORS.primary.main }}
                      >
                        <item.icon size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold mb-1" style={{ color: COLORS.text.secondary }}>
                          {item.label}
                        </div>
                        <div className="text-sm font-medium" style={{ color: COLORS.text.main }}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Form */}
                <div
                  className="p-6 rounded-xl border"
                  style={{ background: COLORS.card, borderColor: COLORS.border }}
                >
                  <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.text.main }}>
                    Kirim Pesan
                  </h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.main }}>
                        Nama
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ borderColor: COLORS.border }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.main }}>
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ borderColor: COLORS.border }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.main }}>
                        Pesan
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ borderColor: COLORS.border }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.primary.hover})`,
                      }}
                    >
                      Kirim Pesan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-10" style={{ borderColor: COLORS.border, background: COLORS.bg.navbar }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.accent})` }}
            >
              <GraduationCap size={16} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: COLORS.text.main }}>
                CourseHub
              </div>
              <div className="text-xs" style={{ color: COLORS.text.secondary }}>
                Sistem Manajemen Kursus Online berbasis CodeIgniter 4
              </div>
            </div>
          </div>
          <div className="text-xs" style={{ color: COLORS.text.muted }}>
            © 2025 CourseHub. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="max-w-md w-full rounded-2xl p-6 relative"
            style={{ background: COLORS.card }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{ background: COLORS.softGreen, color: COLORS.primary.main }}
            >
              <X size={16} />
            </button>
            <div
              className="h-32 rounded-xl flex items-center justify-center mb-6"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary.main}20, ${COLORS.accent}20)`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: COLORS.softGreen, color: COLORS.primary.main }}
              >
                <BookOpen size={24} />
              </div>
            </div>
            <h3 className="font-bold text-xl mb-4" style={{ color: COLORS.text.main }}>
              {selectedCourse.name}
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: COLORS.text.secondary }}>Kategori:</span>
                <span className="font-semibold" style={{ color: COLORS.text.main }}>
                  {selectedCourse.category}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: COLORS.text.secondary }}>Jenjang:</span>
                <span className="font-semibold" style={{ color: COLORS.text.main }}>
                  {selectedCourse.level}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: COLORS.text.secondary }}>Instruktur:</span>
                <span className="font-semibold" style={{ color: COLORS.text.main }}>
                  {selectedCourse.instructor}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: COLORS.text.secondary }}>Jumlah Materi:</span>
                <span className="font-semibold" style={{ color: COLORS.text.main }}>
                  {selectedCourse.materials} materi
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedCourse(null);
                navigate({ page: "register" });
              }}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.primary.hover})`,
              }}
            >
              Daftar untuk Mengikuti Kursus
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div
          className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
          style={{ background: COLORS.softGreen, border: `1px solid ${COLORS.primary.main}` }}
        >
          <CheckCircle2 size={20} style={{ color: COLORS.primary.main }} />
          <span className="font-semibold text-sm" style={{ color: COLORS.primary.main }}>
            Pesan berhasil dikirim.
          </span>
        </div>
      )}
    </div>
  );
}
