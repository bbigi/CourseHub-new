import { useEffect, useState, useCallback } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { useAuth } from "./context/AuthContext";
import { AuthApiError, type UserRole } from "./features/auth/types";
import { VerificationStatusPage } from "./features/auth/VerificationStatusPage";
import { AuthRegisterPage } from "./features/auth/AuthRegisterPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { CanonicalDashboardRedirect, RoleRoute } from "./routes/RoleRoute";
import {
  BookOpen, Code2, BarChart3, ShieldCheck, Smartphone, Layers,
  UserPlus, LogIn, GraduationCap, TrendingUp, ArrowDown, ChevronRight,
  PlayCircle, Users, Award, Eye, EyeOff, Mail, Lock, User,
  LayoutDashboard, BookMarked, ClipboardList, Settings, LogOut,
  Plus, Pencil, Trash2, Search, Bell, ChevronDown, Check,
  FileText, Video, BarChart2, Star, Clock, CheckCircle2,
  AlertCircle, X, Menu, Upload, Filter, MoreHorizontal,
  UserCheck, Briefcase, Activity, Phone, MapPin, Target, DollarSign,
} from "lucide-react";

// ─── Types & Shared Components ────────────────────────────────────────────────
type Page = "landing" | "login" | "register" | "dashboard" | "verification-status";
type Role = UserRole;
type InstrId = 1 | 2;
type Nav = { page: Page; role?: Role; instrId?: InstrId };

function errorMessage(error: unknown): string {
  if (!(error instanceof AuthApiError)) throw error;
  const validationMessages = Object.values(error.errors);
  return validationMessages.length > 0 ? validationMessages.join(" ") : error.message;
}

// ─── Color Palette ────────────────────────────────────────────────────────────
const COLORS = {
  bg: {
    main: "#F7F5EF",
    sidebar: "#FFFFFF",
    card: "#FFFFFF",
    surface: "#F3F0E8",
  },
  border: "#D9D4C7",
  primary: {
    main: "#2F8F5B",
    hover: "#27784C",
  },
  accent: "#D9A93E",
  text: {
    main: "#1F2A24",
    secondary: "#657166",
  },
  danger: "#D95C5C",
  success: "#2F8F5B",
  warning: "#D9A93E",
  info: "#2F8F5B",
} as const;

// Import shared components
import { GlassCard } from "./components/shared/GlassCard";
import { Badge } from "./components/shared/Badge";
import { Loader } from "./components/shared/Loader";
import { PageHeader } from "./components/shared/PageHeader";
import { ActionBtn, CapsuleBtn, IconBtn } from "./components/shared/ActionBtn";
import { useToast } from "./hooks/useToast";
import { AppToast } from "./components/shared/Toast";
import { useParallax } from "./hooks/useParallax";
import { PublicLandingPage } from "./components/PublicLandingPage";

// ═══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// ═══════════════════════════════════════════════════════════════════════════════
import { stats, featuredCourses, features, steps } from "./data/constants";

function LandingPage({ navigate }: { navigate: (n: Nav) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useParallax(true);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: COLORS.bg.main, color: COLORS.text.main, overflowX: "hidden" }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{ background: scrolled ? "rgba(15,23,19,0.92)" : "transparent", borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none", backdropFilter: scrolled ? "blur(20px)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.accent})` }}>
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-base leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>CourseHub</div>
              <div className="text-[10px]" style={{ color: COLORS.text.secondary }}>Learning platform</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Beranda", "Untuk Siswa", "Untuk Instruktur", "Paket Bulanan", "Kursus", "Kontak"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="navbar-item transition-colors hover:text-[#2FA66A]" style={{ color: COLORS.text.secondary }}>{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate({ page: "login" })} className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-xl border transition-all hover:border-[#2FA66A] hover:text-[#2FA66A]" style={{ borderColor: COLORS.border, color: COLORS.text.secondary, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Masuk</button>
            <button onClick={() => navigate({ page: "register" })} className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90" style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.primary.hover})`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Daftar</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: COLORS.bg.main }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(47,166,106,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(242,184,75,0.06) 0%, transparent 55%)" }} />
        <div data-parallax data-speed="-0.32" data-x="0.06" className="absolute rounded-full pointer-events-none" style={{ width: 520, height: 520, top: "5%", left: "8%", background: "radial-gradient(circle, rgba(47,166,106,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div data-parallax data-speed="0.24" data-x="-0.05" className="absolute rounded-full pointer-events-none" style={{ width: 400, height: 400, bottom: "10%", right: "5%", background: "radial-gradient(circle, rgba(242,184,75,0.10) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div data-parallax data-speed="0.12" className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, ${COLORS.text.secondary} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div data-parallax data-speed="-0.07">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border" style={{ color: COLORS.primary.main, borderColor: `${COLORS.primary.main}50`, background: `${COLORS.primary.main}15`, fontFamily: "'JetBrains Mono',monospace" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.primary.main }} />
                Platform kursus online berbasis CodeIgniter 4
              </div>
              <h1 className="font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", color: COLORS.text.main }}>
                Belajar lebih terarah dalam{" "}
                <span style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  satu platform kursus online.
                </span>
              </h1>
              <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: COLORS.text.secondary }}>
                CourseHub membantu siswa mengakses berbagai kursus, mengikuti materi, memantau progress belajar, dan mendapatkan sertifikat setelah menyelesaikan kursus.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <button onClick={() => navigate({ page: "register" })} className="flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.primary.hover})`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  Mulai Belajar Sekarang <ChevronRight size={16} />
                </button>
                <button onClick={() => navigate({ page: "login" })} className="flex items-center gap-2 font-semibold px-6 py-3 rounded-xl border transition-all hover:border-[#2FA66A] hover:-translate-y-0.5" style={{ borderColor: COLORS.border, color: COLORS.text.secondary, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  <PlayCircle size={16} /> Masuk ke Sistem
                </button>
              </div>
              <div className="flex flex-wrap gap-8">
                {[{ l: "Kursus Tersedia", v: `${stats.courses}+`, sp: "0.05" }, { l: "Materi Aktif", v: `${stats.lessons}+`, sp: "0.09" }, { l: "Enrolmen", v: `${stats.enrollments}+`, sp: "0.13" }].map(({ l, v, sp }) => (
                  <div key={l} data-parallax data-speed={sp}>
                    <div className="text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>{v}</div>
                    <div className="text-xs" style={{ color: COLORS.text.secondary }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero card */}
            <div className="relative h-[500px] hidden lg:block">
              <GlassCard data-parallax data-speed="0.18" data-x="-0.03" data-rotate="-0.018" className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${COLORS.primary.main}25`, color: COLORS.primary.main, fontFamily: "'JetBrains Mono',monospace" }}>Live Dashboard</span>
                    <span className="text-xs" style={{ color: COLORS.text.secondary, fontFamily: "'JetBrains Mono',monospace" }}>CourseHub v2.4</span>
                  </div>
                  <h3 className="font-bold text-2xl leading-snug mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>Dashboard pembelajaran yang informatif.</h3>
                  <p className="text-sm" style={{ color: COLORS.text.secondary }}>Kartu, grafik, data kursus, dan monitoring progress dalam satu layar.</p>
                </div>
                <div>
                  <div className="flex items-end gap-2 h-20 mb-2">
                    {[40, 65, 52, 80, 72, 88, 76, 92, 68, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 9 ? `linear-gradient(180deg,${COLORS.primary.main},${COLORS.accent})` : `${COLORS.primary.main}35` }} />
                    ))}
                  </div>
                  <div className="text-xs" style={{ color: COLORS.text.secondary, fontFamily: "'JetBrains Mono',monospace" }}>Aktivitas mingguan</div>
                </div>
              </GlassCard>
              <GlassCard data-parallax data-speed="-0.40" data-x="0.09" data-rotate="0.025" className="absolute -top-4 -right-6 p-4 w-52" style={{ boxShadow: `0 8px 32px ${COLORS.primary.main}30` }}>
                <div className="text-xs mb-1" style={{ color: COLORS.text.secondary }}>Monitoring progress</div>
                <div className="text-xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>87% aktif</div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${COLORS.primary.main}20` }}>
                  <div className="h-full rounded-full" style={{ width: "87%", background: `linear-gradient(90deg,${COLORS.primary.main},${COLORS.accent})` }} />
                </div>
              </GlassCard>
              <GlassCard data-parallax data-speed="0.36" data-x="-0.08" data-rotate="-0.03" className="absolute bottom-8 -left-8 p-4 w-44">
                <div className="text-xs mb-1" style={{ color: COLORS.text.secondary }}>Materi</div>
                <div className="text-lg font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.primary.main }}>Terstruktur</div>
                <div className="text-xs mt-1" style={{ color: COLORS.text.secondary }}>{stats.lessons} modul aktif</div>
              </GlassCard>
              <GlassCard data-parallax data-speed="-0.28" data-x="-0.04" data-rotate="0.02" className="absolute bottom-24 -right-4 p-4 w-40">
                <div className="text-xs mb-1" style={{ color: COLORS.text.secondary }}>REST API</div>
                <div className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.accent }}>CRUD Ready</div>
              </GlassCard>
            </div>
          </div>
          <div data-parallax data-speed="0.22" className="flex flex-col items-center gap-2 mt-16 opacity-40">
            <div className="w-px h-10 rounded-full" style={{ background: `linear-gradient(180deg,transparent,${COLORS.primary.main})` }} />
            <ArrowDown size={14} style={{ color: COLORS.primary.main }} />
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="relative py-28 overflow-hidden" style={{ background: "#111B15" }}>
        <div data-parallax data-speed="-0.20" data-x="0.07" className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, top: "-10%", left: "-5%", background: "radial-gradient(circle,rgba(47,166,106,0.06) 0%,transparent 70%)", filter: "blur(80px)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div data-parallax data-speed="-0.08" className="text-center mb-16">
            <div className="inline-flex text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border" style={{ color: COLORS.accent, borderColor: `${COLORS.accent}40`, background: `${COLORS.accent}12`, fontFamily: "'JetBrains Mono',monospace" }}>Fitur unggulan</div>
            <h2 className="font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: COLORS.text.main }}>Dirancang untuk manajemen kursus yang lengkap</h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: COLORS.text.secondary }}>Sistem UI yang estetik agar nyaman saat presentasi maupun digunakan langsung.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, label, desc, accent }, i) => (
              <GlassCard key={label} data-parallax data-speed={`${0.08 + (i % 3) * 0.06}`} className="p-7 group cursor-default transition-all duration-300 hover:-translate-y-1" style={{ borderColor: `${accent}20` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110" style={{ background: `${accent}18`, color: accent }}><Icon size={22} /></div>
                <h5 className="font-bold text-base mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>{label}</h5>
                <p className="text-sm leading-relaxed" style={{ color: COLORS.text.secondary }}>{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Platform */}
      <section id="platform" className="relative py-28 overflow-hidden" style={{ background: `linear-gradient(160deg,${COLORS.bg.main} 0%,${COLORS.bg.sidebar} 60%,#0C1410 100%)` }}>
        <div data-parallax data-speed="-0.34" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 80% at 60% 50%,rgba(47,166,106,0.05) 0%,transparent 65%)" }} />
        <div data-parallax data-speed="-0.50" data-x="0.06" className="absolute pointer-events-none opacity-[0.02]" style={{ inset: 0, backgroundImage: `radial-gradient(circle,${COLORS.text.secondary} 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div data-parallax data-speed="-0.10">
              <div className="inline-flex text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border" style={{ color: COLORS.primary.main, borderColor: `${COLORS.primary.main}40`, background: `${COLORS.primary.main}12`, fontFamily: "'JetBrains Mono',monospace" }}>Platform kursus digital</div>
              <h2 className="font-extrabold leading-tight mb-5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: COLORS.text.main }}>Kelola kursus, materi, dan progress belajar dalam satu web app.</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: COLORS.text.secondary }}>Background, orb, kartu sistem, dan card statistik bergerak naik-turun saat scroll — efek parallax aktif di seluruh halaman.</p>
              <button onClick={() => navigate({ page: "register" })} className="font-semibold px-6 py-3 rounded-xl text-white transition-all hover:opacity-90" style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.primary.hover})`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Daftar Kursus</button>
            </div>
            <div className="relative h-80 lg:h-[420px]">
              <GlassCard data-parallax data-speed="0.30" data-x="-0.04" data-rotate="-0.018" className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-4 p-7" style={{ boxShadow: `0 16px 48px ${COLORS.primary.main}20` }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs" style={{ color: COLORS.text.secondary }}>Kursus aktif</div>
                    <div className="text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>{stats.courses} Course</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${COLORS.primary.main}20`, color: COLORS.primary.main }}><GraduationCap size={22} /></div>
                </div>
                <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: `${COLORS.primary.main}18` }}>
                  <div className="h-full rounded-full" style={{ width: "72%", background: `linear-gradient(90deg,${COLORS.primary.main},${COLORS.accent})` }} />
                </div>
                <div className="text-xs" style={{ color: COLORS.text.secondary }}>72% kapasitas terisi</div>
              </GlassCard>
              <GlassCard data-parallax data-speed="-0.44" data-x="0.11" data-rotate="0.045" className="absolute top-0 left-0 p-4 w-40">
                <Badge color={COLORS.success}>Materi</Badge>
                <div className="font-bold text-lg mt-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>{stats.lessons} Modul</div>
              </GlassCard>
              <GlassCard data-parallax data-speed="0.46" data-x="-0.10" data-rotate="-0.04" className="absolute top-0 right-0 p-4 w-36">
                <Badge color={COLORS.primary.main}>API</Badge>
                <div className="font-bold mt-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>CRUD Ready</div>
              </GlassCard>
              <GlassCard data-parallax data-speed="-0.32" data-x="-0.07" data-rotate="0.035" className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 w-48">
                <Badge color={COLORS.accent}>Progress</Badge>
                <div className="font-bold mt-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>Realtime Update</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Kursus */}
      <section id="kursus" className="relative py-28 overflow-hidden" style={{ background: "#111B15" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12" data-parallax data-speed="-0.10">
            <div>
              <div className="inline-flex text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border" style={{ color: COLORS.accent, borderColor: `${COLORS.accent}40`, background: `${COLORS.accent}12`, fontFamily: "'JetBrains Mono',monospace" }}>Preview konten</div>
              <h2 className="font-extrabold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: COLORS.text.main }}>Contoh kursus unggulan</h2>
              <p className="text-sm" style={{ color: COLORS.text.secondary }}>Daftar kursus diambil langsung dari database aplikasi.</p>
            </div>
            <button onClick={() => navigate({ page: "login" })} className="text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all hover:border-[#2FA66A] hover:text-[#2FA66A]" style={{ borderColor: COLORS.border, color: COLORS.text.secondary, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Masuk untuk melihat semua</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(({ id, title, category, level, price, instructor, desc, color, accent }, i) => (
              <GlassCard key={id} data-parallax data-speed={`${0.12 + i * 0.07}`} className="overflow-hidden group transition-all duration-300 hover:-translate-y-2" style={{ borderColor: `${accent}20` }}>
                <div className={`h-40 bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${accent}22`, color: accent }}><BookOpen size={28} /></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge color={accent}>{level}</Badge>
                    <span className="text-xs" style={{ color: COLORS.text.secondary }}>{category}</span>
                  </div>
                  <h5 className="font-bold text-sm leading-snug mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>{title}</h5>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: COLORS.text.secondary }}>{desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: COLORS.border }}>
                    <div>
                      <div className="text-[10px] mb-0.5" style={{ color: COLORS.text.secondary }}>Instruktur</div>
                      <div className="text-xs font-semibold" style={{ color: COLORS.text.main, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{instructor}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] mb-0.5" style={{ color: COLORS.text.secondary }}>Harga</div>
                      <div className="text-sm font-bold" style={{ color: accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Rp{price.toLocaleString("id-ID")}</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Alur */}
      <section id="alur" className="relative py-28 overflow-hidden" style={{ background: COLORS.bg.main }}>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div data-parallax data-speed="-0.10" className="text-center mb-16">
            <div className="inline-flex text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border" style={{ color: COLORS.success, borderColor: `${COLORS.success}40`, background: `${COLORS.success}15`, fontFamily: "'JetBrains Mono',monospace" }}>Alur penggunaan</div>
            <h2 className="font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: COLORS.text.main }}>Proses penggunaan sistem</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: COLORS.text.secondary }}>Alur ini cocok untuk menjelaskan aplikasi saat presentasi final project.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ icon: Icon, step, label, desc }, i) => (
              <GlassCard key={step} data-parallax data-speed={`${0.08 + i * 0.08}`} className="p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
                <div className="text-xs font-bold mb-4" style={{ fontFamily: "'JetBrains Mono',monospace", color: COLORS.text.secondary }}>{step}</div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${COLORS.primary.main}20`, color: COLORS.primary.main }}><Icon size={24} /></div>
                <h6 className="font-bold text-base mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>{label}</h6>
                <p className="text-sm leading-relaxed" style={{ color: COLORS.text.secondary }}>{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Paket Bulanan */}
      <section className="relative py-24 overflow-hidden" style={{ background: COLORS.bg.main }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border" style={{ color: COLORS.accent, borderColor: `${COLORS.accent}40`, background: `${COLORS.accent}12`, fontFamily: "'JetBrains Mono',monospace" }}>Harga & Paket</div>
            <h2 className="font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: COLORS.text.main }}>Satu paket, akses semua kursus.</h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: COLORS.text.secondary }}>Tidak perlu beli kursus satu per satu. Dengan Paket Bulanan, kamu bisa mengakses seluruh kursus dan materi yang tersedia.</p>
          </div>
          <div className="max-w-md mx-auto">
            <GlassCard className="p-8 relative overflow-hidden" style={{ borderColor: `${COLORS.accent}40`, boxShadow: `0 20px 60px ${COLORS.accent}15` }}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle,${COLORS.accent}20 0%,transparent 70%)`, transform: "translate(30%,-30%)" }} />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${COLORS.accent}25`, color: COLORS.accent }}><Award size={24} /></div>
                <div>
                  <div className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>Paket Bulanan</div>
                  <Badge color={COLORS.success}>Aktif</Badge>
                </div>
              </div>
              <div className="mb-6">
                <div className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.accent }}>Rp99.000</div>
                <div className="text-sm mt-0.5" style={{ color: COLORS.text.secondary }}>per bulan · perpanjang kapan saja</div>
              </div>
              <div className="flex flex-col gap-3 mb-7">
                {[
                  { text: "Akses seluruh kursus yang tersedia", color: COLORS.primary.main },
                  { text: "Akses seluruh materi di setiap kursus", color: COLORS.accent },
                  { text: "Pantau progress belajar secara real-time", color: COLORS.success },
                  { text: "Sertifikat otomatis jika kursus selesai", color: COLORS.accent },
                ].map(({ text, color }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm" style={{ color: COLORS.text.main }}>
                    <CheckCircle2 size={16} style={{ color, flexShrink: 0 }} /> {text}
                  </div>
                ))}
              </div>
              <button onClick={() => navigate({ page: "register" })} className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: `linear-gradient(135deg,${COLORS.accent},#d97706)`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Daftar & Mulai Belajar
              </button>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden" style={{ background: "#111B15" }}>
        <div data-parallax data-speed="-0.36" data-x="0.12" className="absolute rounded-full pointer-events-none" style={{ width: 700, height: 700, top: "-20%", right: "-10%", background: `radial-gradient(circle,rgba(47,166,106,0.08) 0%,transparent 70%)`, filter: "blur(80px)" }} />
        <div data-parallax data-speed="0.38" data-x="-0.10" className="absolute rounded-full pointer-events-none" style={{ width: 500, height: 500, bottom: "-10%", left: "-5%", background: `radial-gradient(circle,rgba(242,184,75,0.06) 0%,transparent 70%)`, filter: "blur(70px)" }} />
        <div className="max-w-4xl mx-auto px-6 relative">
          <GlassCard data-parallax data-speed="-0.10" className="p-12 text-center" style={{ boxShadow: `0 24px 80px ${COLORS.primary.main}15` }}>
            <div className="inline-flex text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border" style={{ color: COLORS.primary.main, borderColor: `${COLORS.primary.main}40`, background: `${COLORS.primary.main}12`, fontFamily: "'JetBrains Mono',monospace" }}>Siap digunakan</div>
            <h2 className="font-extrabold mb-5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: COLORS.text.main, lineHeight: 1.2 }}>Masuk ke CourseHub dan coba sistemnya sekarang.</h2>
            <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: COLORS.text.secondary }}>Gunakan akun demo atau daftar sebagai siswa untuk mencoba pengalaman antarmuka yang sudah diperbarui.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate({ page: "login" })} className="font-semibold px-7 py-3 rounded-xl text-white transition-all hover:opacity-90" style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.primary.hover})`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Masuk Sekarang</button>
              <button onClick={() => navigate({ page: "register" })} className="font-semibold px-7 py-3 rounded-xl border transition-all hover:border-[#2FA66A] hover:text-[#2FA66A]" style={{ borderColor: COLORS.border, color: COLORS.text.secondary, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Daftar Akun Siswa</button>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10" style={{ borderColor: COLORS.border, background: COLORS.bg.main }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.accent})` }}><GraduationCap size={16} className="text-white" /></div>
            <div>
              <div className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>CourseHub</div>
              <div className="text-xs" style={{ color: COLORS.text.secondary }}>Sistem Manajemen Kursus Online berbasis CodeIgniter 4</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {["Fitur", "Platform", "Kursus", "Alur"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-xs transition-colors hover:text-[#2FA66A]" style={{ color: COLORS.text.secondary }}>{l}</a>
            ))}
          </div>
          <div className="text-xs" style={{ color: COLORS.text.secondary, fontFamily: "'JetBrains Mono',monospace" }}>scroll parallax aktif</div>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTH LAYOUT WRAPPER
// ═══════════════════════════════════════════════════════════════════════════════
function AuthLayout({ children, navigate }: { children: React.ReactNode; navigate: (n: Nav) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: COLORS.bg.main }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(47,166,106,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(242,184,75,0.06) 0%, transparent 55%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle,${COLORS.text.secondary} 1px,transparent 1px)`, backgroundSize: "36px 36px" }} />
      <button onClick={() => navigate({ page: "landing" })} className="absolute top-6 left-6 flex items-center gap-2 text-sm transition-colors hover:text-[#2FA66A]" style={{ color: COLORS.text.secondary, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        <ChevronRight size={16} className="rotate-180" /> Kembali ke beranda
      </button>
      <div className="w-full max-w-md px-4 py-12 relative">{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function LoginPage({ navigate }: { navigate: (n: Nav) => void }) {
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !pass) {
      setError("Email dan password tidak boleh kosong.");
      return;
    }

    setSubmitting(true);
    try {
      const user = await login({ email: email.trim(), password: pass });
      if (user.role === "instructor" && user.instructor_verification_status !== "verified") {
        navigate({ page: "verification-status" });
        return;
      }
      navigate({ page: "dashboard", role: user.role });
    } catch (caughtError) {
      setError(errorMessage(caughtError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout navigate={navigate}>
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.accent})` }}>
          <GraduationCap size={24} className="text-white" />
        </div>
        <h1 className="font-extrabold text-2xl mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>Masuk ke CourseHub</h1>
        <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: COLORS.text.secondary }}>
          Masuk menggunakan akun yang sudah terdaftar. Sistem akan menyesuaikan dashboard berdasarkan akun pengguna.
        </p>
      </div>

      <GlassCard className="p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: COLORS.text.main, fontFamily: "'JetBrains Mono',monospace" }}>EMAIL</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: COLORS.text.secondary }} />
              <input
                type="email"
                autoComplete="email"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#2FA66A]"
                style={{ background: COLORS.bg.card, borderColor: COLORS.border, color: COLORS.text.main }}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: COLORS.text.main, fontFamily: "'JetBrains Mono',monospace" }}>PASSWORD</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: COLORS.text.secondary }} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full pl-10 pr-11 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#2FA66A]"
                style={{ background: COLORS.bg.card, borderColor: COLORS.border, color: COLORS.text.main }}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: COLORS.text.secondary }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-full" style={{ background: `${COLORS.danger}20`, color: COLORS.danger }}>
              <AlertCircle size={13} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm mt-1 transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.primary.hover})`, fontFamily: "'Plus Jakarta Sans',sans-serif", opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: COLORS.text.secondary }}>
          Belum punya akun?{" "}
          <button onClick={() => navigate({ page: "register" })} className="font-semibold transition-colors hover:text-[#2FA66A]" style={{ color: COLORS.primary.main }}>Daftar sekarang</button>
        </p>
      </GlassCard>
    </AuthLayout>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REGISTER PAGE
// ══════════════════════════════════════════════════════════════════════════���════
function FormField({ label, placeholder, type = "text", icon: Icon }: { label: string; placeholder: string; type?: string; icon?: React.ElementType }) {
  return (
    <div>
      <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</label>
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#8B948D" }} />}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[#2F8F5B]`}
          style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }}
        />
      </div>
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</label>
      <select className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }}>
        <option value="">— Pilih —</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function RegisterPage({ navigate }: { navigate: (n: Nav) => void }) {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<Role>("student");
  const [submitted, setSubmitted] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const allInterests = ["Matematika","Bahasa Inggris","Bahasa Indonesia","IPA","IPS","Teknologi","Desain","Bisnis","Persiapan Ujian"];

  function toggleInterest(tag: string) {
    setSelectedInterests(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (role === "instructor") {
      // Instruktur tidak langsung masuk dashboard — status Pending
      setSubmitted(true);
    } else {
      navigate({ page: "dashboard", role });
    }
  }

  const inputBase = "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[#2F8F5B]";
  const inputStyle = { background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" };
  const accent = role === "student" ? "#4f8ef7" : "#a855f7";

  // ── Pending screen for instructor ──
  if (submitted && role === "instructor") {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#F7F5EF" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(168,85,247,0.10) 0%, transparent 60%)" }} />
        <div className="relative w-full max-w-md px-4">
          <GlassCard className="p-10 text-center" style={{ borderColor: "rgba(217,169,62,0.25)" }}>
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(217,169,62,0.12)", color: "#D9A93E" }}>
              <Clock size={30} />
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(217,169,62,0.10)", color: "#D9A93E", border: "1px solid rgba(245,158,11,0.3)", fontFamily: "'JetBrains Mono',monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#f59e0b" }} />
              Status Verifikasi: Pending
            </div>

            <h2 className="font-extrabold text-xl mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>
              Pendaftaran Diterima
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#657166" }}>
              Pendaftaran instrukturmu sudah kami terima. Akun kamu sedang dalam proses peninjauan oleh admin. Kamu akan mendapat notifikasi setelah akun diverifikasi.
            </p>

            {/* Info steps */}
            <div className="flex flex-col gap-3 mb-8 text-left">
              {[
                { step: "01", text: "Pendaftaran diterima sistem", done: true },
                { step: "02", text: "Admin meninjau data & dokumen", done: false },
                { step: "03", text: "Akun diaktifkan, kamu bisa login", done: false },
              ].map(({ step, text, done }) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: done ? "rgba(47,143,91,0.15)" : "#EDE8DF", color: done ? "#2F8F5B" : "#8B948D", fontFamily: "'JetBrains Mono',monospace" }}>
                    {done ? <CheckCircle2 size={14} /> : step}
                  </div>
                  <span className="text-xs" style={{ color: done ? "#657166" : "#8B948D" }}>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate({ page: "login" })}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#a855f7,#4f8ef7)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              >
                Kembali ke Halaman Login
              </button>
              <button
                onClick={() => navigate({ page: "landing" })}
                className="w-full py-2.5 rounded-xl text-sm font-semibold border transition-all hover:border-[#4f8ef7]"
                style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              >
                Ke Beranda
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#F7F5EF" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(79,142,247,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(168,85,247,0.08) 0%, transparent 55%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle,#a8b8d8 1px,transparent 1px)", backgroundSize: "36px 36px" }} />

      <div className="relative max-w-2xl mx-auto px-4 py-10">
        <button onClick={() => navigate({ page: "landing" })} className="flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#4f8ef7]" style={{ color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <ChevronRight size={16} className="rotate-180" /> Kembali ke beranda
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `linear-gradient(135deg,${accent},${accent}88)` }}>
            <UserPlus size={24} className="text-white" />
          </div>
          <h1 className="font-extrabold text-2xl mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Buat Akun Baru</h1>
          <p className="text-sm" style={{ color: "#657166" }}>Bergabung dan mulai belajar bersama CourseHub</p>
        </div>

        <GlassCard className="p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          {/* Role selector */}
          <div className="mb-7">
            <label className="text-xs font-semibold mb-3 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>DAFTAR SEBAGAI</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { value: "student" as Role, label: "Siswa", icon: User, color: "#4f8ef7", sub: "Pelajar yang ingin belajar" },
                { value: "instructor" as Role, label: "Instruktur", icon: Briefcase, color: "#a855f7", sub: "Pengajar yang ingin berbagi ilmu" },
              ]).map(({ value, label, icon: Icon, color, sub }) => (
                <button key={value} type="button" onClick={() => setRole(value)}
                  className="flex flex-col items-center gap-1.5 py-4 rounded-xl border transition-all duration-200"
                  style={{ borderColor: role === value ? "#2F8F5B" : "#D9D4C7", background: role === value ? "#2F8F5B" : "#FAFAF8", color: role === value ? "#FFFFFF" : "#8B948D", boxShadow: role === value ? "0 2px 8px rgba(47,143,91,0.25)" : "none" }}
                >
                  <Icon size={20} />
                  <span className="text-xs font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{label}</span>
                  <span className="text-[10px] leading-tight text-center px-2" style={{ color: role === value ? "rgba(255,255,255,0.75)" : "#8B948D" }}>{sub}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleRegister}>
            {role === "student" ? (
              <div className="flex flex-col gap-4">
                {/* Section: Data akun */}
                <div className="text-xs font-semibold pb-2 border-b" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace", borderColor: "#E8E4DB" }}>DATA AKUN</div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="NAMA LENGKAP" placeholder="Nama lengkap" icon={User} />
                  <FormField label="USERNAME" placeholder="Username unik" icon={User} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="EMAIL" placeholder="email@domain.com" type="email" icon={Mail} />
                  <div>
                    <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>PASSWORD</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#8B948D" }} />
                      <input type={showPass ? "text" : "password"} placeholder="Min. 8 karakter" className={`${inputBase} pl-10 pr-10`} style={inputStyle} />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#8B948D" }}>
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section: Data sekolah */}
                <div className="text-xs font-semibold pb-2 border-b mt-2" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace", borderColor: "#E8E4DB" }}>DATA SEKOLAH</div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="NAMA SEKOLAH" placeholder="Nama sekolah kamu" />
                  <SelectField label="JENJANG" options={["SD", "SMP", "SMA/SMK"]} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="KELAS" options={["Kelas 1","Kelas 2","Kelas 3","Kelas 4","Kelas 5","Kelas 6","Kelas 7","Kelas 8","Kelas 9","Kelas 10","Kelas 11","Kelas 12"]} />
                  <FormField label="JURUSAN (OPSIONAL)" placeholder="IPA / IPS / dll" />
                </div>
                <FormField label="NIS / NISN" placeholder="Nomor induk siswa" />

                {/* Section: Minat belajar */}
                <div className="text-xs font-semibold pb-2 border-b mt-2" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace", borderColor: "#E8E4DB" }}>MINAT BELAJAR</div>
                <p className="text-xs -mt-1" style={{ color: "#8B948D" }}>Pilih satu atau lebih bidang yang kamu minati.</p>
                <div className="flex flex-wrap gap-2">
                  {allInterests.map(tag => {
                    const selected = selectedInterests.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleInterest(tag)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150"
                        style={{
                          background: selected ? "#E6F3EB" : "#F3F0E8",
                          color: selected ? "#4f8ef7" : "#8B948D",
                          border: `1px solid ${selected ? "#D9D4C7" : "#D9D4C7"}`,
                        }}
                      >
                        {selected && <Check size={11} />}
                        {tag}
                      </button>
                    );
                  })}
                </div>
                {selectedInterests.length > 0 && (
                  <p className="text-[10px]" style={{ color: "#4f8ef7", fontFamily: "'JetBrains Mono',monospace" }}>
                    {selectedInterests.length} minat dipilih
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Status verifikasi indicator */}
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(217,169,62,0.15)" }}>
                  <div className="flex items-center gap-2">
                    <Clock size={14} style={{ color: "#D9A93E" }} />
                    <span className="text-xs font-semibold" style={{ color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Status Verifikasi</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(217,169,62,0.12)", color: "#D9A93E", fontFamily: "'JetBrains Mono',monospace" }}>Pending</span>
                </div>

                {/* Section: Data akun */}
                <div className="text-xs font-semibold pb-2 border-b" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace", borderColor: "#E8E4DB" }}>DATA AKUN</div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="NAMA LENGKAP" placeholder="Nama lengkap" icon={User} />
                  <FormField label="USERNAME" placeholder="Username unik" icon={User} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="EMAIL" placeholder="email@domain.com" type="email" icon={Mail} />
                  <div>
                    <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>PASSWORD</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#8B948D" }} />
                      <input type={showPass ? "text" : "password"} placeholder="Min. 8 karakter" className={`${inputBase} pl-10 pr-10`} style={inputStyle} />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#8B948D" }}>
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
                <FormField label="NOMOR HP" placeholder="08xxxxxxxxxx" />

                {/* Section: Profil pengajar */}
                <div className="text-xs font-semibold pb-2 border-b mt-2" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace", borderColor: "#E8E4DB" }}>PROFIL PENGAJAR</div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="PROFESI" placeholder="Guru / Dosen / Tutor" />
                  <FormField label="BIDANG KEAHLIAN" placeholder="Matematika, IPA, dll" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="PENDIDIKAN TERAKHIR" options={["SMA/SMK","D3","S1","S2","S3"]} />
                  <FormField label="INSTANSI / TEMPAT MENGAJAR" placeholder="Nama sekolah/instansi" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="PENGALAMAN MENGAJAR" options={["< 1 tahun","1–3 tahun","3–5 tahun","5–10 tahun","> 10 tahun"]} />
                  <FormField label="PORTOFOLIO / SERTIFIKAT (URL)" placeholder="https://..." />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>DESKRIPSI KEAHLIAN</label>
                  <textarea placeholder="Ceritakan keahlian dan pengalaman mengajarmu..." rows={3} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-sm mt-6 transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg,${accent},${accent}bb)`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            >
              {role === "student" ? "Daftar sebagai Siswa" : "Kirim Pendaftaran Instruktur"}
            </button>
          </form>

          <p className="text-center text-xs mt-5" style={{ color: "#657166" }}>
            Sudah punya akun?{" "}
            <button onClick={() => navigate({ page: "login" })} className="font-semibold transition-colors hover:text-[#4f8ef7]" style={{ color: "#4f8ef7" }}>Masuk</button>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD SHELL (sidebar + topbar)
// ═══════════════════════════════════════════════════════════════════════════════
// ─── Notification panel ──────────────────────────────────────────────────────
type Notif = { id: number; title: string; body: string; tag: "Paket" | "Progress" | "Info" | "Baru" | "Review" | "Verifikasi" | "Pembayaran" | "Sertifikat" | "Komisi"; read: boolean; time: string };
const TAG_COLORS: Record<string, string> = { Paket: "#f59e0b", Progress: "#a855f7", Info: "#4f8ef7", Baru: "#10b981", Review: "#f59e0b", Verifikasi: "#06c5d9", Pembayaran: "#10b981", Sertifikat: "#ec4899", Komisi: "#a855f7" };

const STUDENT_NOTIFS_DEFAULT: Notif[] = [
  { id: 1, title: "Paket Bulanan aktif",         body: "Paket Bulanan aktif sampai 7 Februari 2025. Akses semua kursus dan materi.", tag: "Paket",    read: false, time: "Baru saja" },
  { id: 2, title: "Materi selesai",              body: "Materi Matematika Kelas 10 berhasil diselesaikan. Lanjutkan ke materi berikutnya.", tag: "Progress", read: false, time: "1 jam lalu" },
  { id: 3, title: "Progress meningkat",          body: "Progress Bahasa Inggris meningkat menjadi 44%. Terus semangat!", tag: "Progress", read: false, time: "2 jam lalu" },
  { id: 4, title: "Kursus ditambahkan",          body: "Kursus Persiapan UTBK berhasil ditambahkan ke Kursus Saya.",   tag: "Baru",    read: true,  time: "3 jam lalu" },
  { id: 5, title: "Tips belajar",               body: "Selesaikan kursus hingga 100% untuk mendapatkan sertifikat otomatis.", tag: "Info", read: true, time: "1 hari lalu" },
];

const ADMIN_NOTIFS: Notif[] = [
  { id: 1, title: "Kursus menunggu review",       body: "Ada 2 kursus baru menunggu review dari instruktur.", tag: "Review",       read: false, time: "15 menit lalu" },
  { id: 2, title: "Instruktur menunggu verifikasi", body: "Instruktur Dewi Kusuma menunggu verifikasi.", tag: "Verifikasi", read: false, time: "1 jam lalu" },
  { id: 3, title: "Pembayaran dikonfirmasi",      body: "Pembayaran paket siswa Ahmad Fauzi berhasil dikonfirmasi.", tag: "Pembayaran", read: false, time: "2 jam lalu" },
  { id: 4, title: "Sertifikat diterbitkan",       body: "Sertifikat CERT-CH-001 berhasil diterbitkan untuk Ahmad Fauzi.", tag: "Sertifikat", read: true, time: "3 jam lalu" },
  { id: 5, title: "Pengajuan penarikan komisi",   body: "Instruktur Pak Hendra mengajukan penarikan komisi Rp2.400.000.", tag: "Komisi", read: true, time: "5 jam lalu" },
  { id: 6, title: "Siswa baru mendaftar",         body: "5 siswa baru berhasil mendaftar hari ini.", tag: "Baru", read: true, time: "1 hari lalu" },
];

function NotificationPanel({ notifs, setNotifs, onClose }: {
  notifs: Notif[]; setNotifs: (v: Notif[]) => void; onClose: () => void;
}) {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const unread = notifs.filter(n => !n.read);
  const shown = filter === "unread" ? unread : notifs;

  function markRead(id: number) {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  }
  function markAll() { setNotifs(notifs.map(n => ({ ...n, read: true }))); }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full right-0 mt-2 w-80 z-50 flex flex-col rounded-2xl overflow-hidden"
        style={{ background: "rgba(10,18,40,0.97)", border: "1px solid #D9D4C7", backdropFilter: "blur(20px)", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#E8E4DB" }}>
          <div className="font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>
            Notifikasi {unread.length > 0 && <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#2F8F5B", color: "#fff" }}>{unread.length}</span>}
          </div>
          <div className="flex items-center gap-2">
            {unread.length > 0 && (
              <button onClick={markAll} className="text-[10px] font-semibold transition-colors hover:text-[#4f8ef7]" style={{ color: "#657166" }}>Tandai semua dibaca</button>
            )}
            <button onClick={onClose} style={{ color: "#657166" }}><X size={16} /></button>
          </div>
        </div>
        {/* Filter tabs */}
        <div className="flex gap-1 px-4 py-2 border-b" style={{ borderColor: "#EDE8DF" }}>
          {([{ v: "all", l: "Semua" }, { v: "unread", l: `Belum Dibaca (${unread.length})` }] as const).map(({ v, l }) => (
            <button key={v} onClick={() => setFilter(v)}
              className="px-3 py-1 rounded-full text-[10px] font-semibold transition-all"
              style={{ background: filter === v ? "#E6F3EB" : "transparent", color: filter === v ? "#2F8F5B" : "#8B948D", border: `1px solid ${filter === v ? "#D9D4C7" : "transparent"}` }}>
              {l}
            </button>
          ))}
        </div>
        {/* List */}
        <div className="flex flex-col overflow-y-auto" style={{ maxHeight: 320 }}>
          {shown.length === 0 && (
            <div className="px-4 py-8 text-center text-xs" style={{ color: "#8B948D" }}>Tidak ada notifikasi.</div>
          )}
          {shown.map(n => (
            <button key={n.id} onClick={() => markRead(n.id)}
              className="flex items-start gap-3 px-4 py-3 text-left transition-all border-b last:border-b-0"
              style={{ borderColor: "#F3F0E8", background: n.read ? "transparent" : "#F3F0E8" }}>
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: n.read ? "transparent" : "#2F8F5B" }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-xs font-semibold" style={{ color: n.read ? "#657166" : "#1F2A24", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{n.title}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: `${TAG_COLORS[n.tag]}18`, color: TAG_COLORS[n.tag] }}>{n.tag}</span>
                </div>
                <div className="text-[11px] leading-relaxed" style={{ color: "#657166" }}>{n.body}</div>
                <div className="text-[10px] mt-1" style={{ color: "#8B948D", fontFamily: "'JetBrains Mono',monospace" }}>{n.time}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function DashboardShell({
  role, activeNav, setActiveNav, children, instrId,
}: {
  role: Role; activeNav: string; setActiveNav: (v: string) => void;
  children: React.ReactNode; instrId?: InstrId;
}) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notif[]>(
    role === "admin" ? ADMIN_NOTIFS : role === "instructor" && instrId ? INSTR_NOTIFS[instrId] : STUDENT_NOTIFS_DEFAULT
  );

  const navsByRole: Record<Role, { key: string; label: string; icon: React.ElementType }[]> = {
    student: [
      { key: "overview",    label: "Beranda",         icon: LayoutDashboard },
      { key: "explore",     label: "Jelajahi Kursus", icon: BookOpen },
      { key: "my-courses",  label: "Kursus Saya",     icon: BookMarked },
      { key: "progress",    label: "Progress",         icon: BarChart3 },
      { key: "my-package",  label: "Paket Saya",       icon: Award },
      { key: "profile",     label: "Profil",           icon: User },
    ],
    instructor: [
      { key: "overview",    label: "Beranda",    icon: LayoutDashboard },
      { key: "my-courses",  label: "Kursus Saya", icon: BookMarked },
      { key: "materials",   label: "Materi",      icon: FileText },
      { key: "enrollments", label: "Enrolmen",    icon: Users },
      { key: "commission",  label: "Komisi",      icon: BarChart2 },
      { key: "profile",     label: "Profil",      icon: User },
    ],
    admin: [
      { key: "overview", label: "Beranda", icon: LayoutDashboard },
      { key: "courses", label: "Kelola Kursus", icon: BookOpen },
      { key: "users", label: "Kelola Pengguna", icon: Users },
      { key: "instructors", label: "Instruktur", icon: UserCheck },
      { key: "enrollments", label: "Enrolmen", icon: ClipboardList },
      { key: "packages", label: "Paket", icon: Award },
      { key: "certificates", label: "Sertifikat", icon: Award },
      { key: "transactions", label: "Transaksi & Komisi", icon: Activity },
    ],
  };

  const roleLabel: Record<Role, string> = { student: "Siswa", instructor: "Instruktur", admin: "Admin" };
  const roleColor: Record<Role, string> = { student: COLORS.primary.main, instructor: "#a855f7", admin: COLORS.accent };
  const navs = navsByRole[role];

  const Sidebar = () => (
    <aside className="flex flex-col h-full" style={{ background: COLORS.bg.sidebar, borderRight: `1px solid ${COLORS.border}` }}>
      <div className="p-5 border-b" style={{ borderColor: COLORS.border }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.primary.hover})` }}>
            <GraduationCap size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>CourseHub</div>
            <div className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full w-fit mt-0.5" style={{ background: `${roleColor[role]}18`, color: roleColor[role], fontFamily: "'JetBrains Mono',monospace" }}>{roleLabel[role]}</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => { setActiveNav(key); setSidebarOpen(false); }}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left w-full"
            style={{
              background: activeNav === key ? "#2F8F5B" : "transparent",
              color: activeNav === key ? "#FFFFFF" : COLORS.text.secondary,
              fontWeight: activeNav === key ? 600 : 400,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              boxShadow: activeNav === key ? "0 2px 8px rgba(47,143,91,0.25)" : "none",
            }}
            onMouseEnter={e => { if (activeNav !== key) (e.currentTarget as HTMLElement).style.background = "#F3F0E8"; }}
            onMouseLeave={e => { if (activeNav !== key) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t" style={{ borderColor: COLORS.border }}>
        <button onClick={() => { void logout(); }} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium w-full transition-all" style={{ color: COLORS.text.secondary, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <LogOut size={17} /> Keluar
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: COLORS.bg.main, fontFamily: "'Inter',sans-serif", color: COLORS.text.main }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-60 flex-shrink-0 flex-col"><Sidebar /></div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-60 flex flex-col"><Sidebar /></div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b" style={{ background: COLORS.bg.sidebar, borderColor: COLORS.border, backdropFilter: "blur(12px)" }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg" style={{ color: COLORS.text.secondary }}><Menu size={20} /></button>
            <div>
              <div className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>
                {navs.find(n => n.key === activeNav)?.label}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setNotifOpen(v => !v)}
                className="w-9 h-9 rounded-xl flex items-center justify-center relative transition-all hover:bg-white/5" style={{ color: COLORS.text.secondary }}>
                <Bell size={18} />
                {notifs.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: COLORS.primary.main }}>{notifs.filter(n => !n.read).length}</span>
                )}
              </button>
              {notifOpen && (
                <NotificationPanel notifs={notifs} setNotifs={setNotifs} onClose={() => setNotifOpen(false)} />
              )}
            </div>
            <div className="flex items-center gap-2.5 pl-3 border-l" style={{ borderColor: COLORS.border }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm text-white" style={{ background: `linear-gradient(135deg,${roleColor[role]},${roleColor[role]}88)` }}>
                {roleLabel[role][0]}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>{user?.name ?? roleLabel[role]}</div>
                <div className="text-[10px]" style={{ color: COLORS.text.secondary }}>{roleLabel[role]}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STUDENT DASHBOARD — shared data & types
// ═══════════════════════════════════════════════════════════════════════════════
type CourseRow = {
  id: number; title: string; category: string; level: string;
  instructor: string; desc: string; accent: string;
  totalMateri: number;
};

const allCourses: CourseRow[] = [
  { id: 1, title: "Matematika Kelas 10",                  category: "Matematika",       level: "SMA Kelas 10",  instructor: "Bu Ratna Dewi",         desc: "Aljabar, fungsi, trigonometri, dan statistika dasar dengan latihan terstruktur.", accent: "#4f8ef7", totalMateri: 24 },
  { id: 2, title: "Bahasa Inggris — Grammar & Speaking",  category: "Bahasa Inggris",   level: "SMP/SMA",       instructor: "Pak Denny Haryanto",     desc: "Grammar, kosakata, dan kepercayaan diri berbicara bahasa Inggris.", accent: "#a855f7", totalMateri: 18 },
  { id: 3, title: "Persiapan UTBK — Saintek & Soshum",   category: "Persiapan Ujian",  level: "SMA Kelas 12",  instructor: "Tim Pengajar CourseHub", desc: "Latihan soal UTBK lengkap dengan pembahasan mendalam.", accent: "#06c5d9", totalMateri: 30 },
  { id: 4, title: "IPA Terpadu Kelas 8",                  category: "IPA",              level: "SMP Kelas 8",   instructor: "Bu Lestari Ningrum",     desc: "Fisika, kimia, dan biologi dasar yang disajikan secara terpadu.", accent: "#10b981", totalMateri: 20 },
  { id: 5, title: "Bahasa Indonesia — Menulis & Membaca", category: "Bahasa Indonesia", level: "SMP/SMA",       instructor: "Pak Hendra Wijaya",      desc: "Menulis esai, membaca kritis, dan memahami teks sastra.", accent: "#f59e0b", totalMateri: 16 },
  { id: 6, title: "IPS — Sejarah, Geografi & Ekonomi",   category: "IPS",              level: "SMP Kelas 9",   instructor: "Bu Sri Handayani",       desc: "Sejarah Indonesia, geografi, dan ekonomi dasar secara terpadu.", accent: "#ec4899", totalMateri: 22 },
];

// Progress record per enrolled course
type ProgressEntry = { done: number };

// Materials per course (student-visible)
type Material = { id: number; title: string; type: "video" | "text" | "quiz"; duration: string };
const COURSE_MATERIALS: Record<number, Material[]> = {
  1: [
    { id: 101, title: "Pengenalan Aljabar dan Variabel", type: "video", duration: "14:22" },
    { id: 102, title: "Persamaan Linear Satu Variabel",  type: "video", duration: "18:45" },
    { id: 103, title: "Latihan: PLSV",                   type: "quiz",  duration: "—" },
    { id: 104, title: "Fungsi dan Relasi",                type: "video", duration: "21:10" },
    { id: 105, title: "Trigonometri Dasar",              type: "video", duration: "25:30" },
    { id: 106, title: "Latihan: Trigonometri",           type: "quiz",  duration: "—" },
  ],
  2: [
    { id: 201, title: "Simple Present & Present Continuous", type: "video", duration: "16:00" },
    { id: 202, title: "Vocabulary: Daily Life",               type: "text",  duration: "—" },
    { id: 203, title: "Present Perfect Tense",               type: "video", duration: "19:22" },
    { id: 204, title: "Quiz: Tenses Review",                 type: "quiz",  duration: "—" },
    { id: 205, title: "Speaking: Introducing Yourself",      type: "video", duration: "11:40" },
  ],
  3: [
    { id: 301, title: "Strategi Mengerjakan TPS",              type: "video", duration: "22:15" },
    { id: 302, title: "Penalaran Umum Set 1",                  type: "quiz",  duration: "—" },
    { id: 303, title: "Bahasa Indonesia: Pemahaman Bacaan",    type: "video", duration: "18:30" },
    { id: 304, title: "Matematika: Penalaran Kuantitatif",     type: "video", duration: "28:00" },
  ],
  4: [
    { id: 401, title: "Gerak dan Gaya (Fisika)",        type: "video", duration: "20:00" },
    { id: 402, title: "Tabel Periodik Unsur (Kimia)",   type: "video", duration: "16:45" },
    { id: 403, title: "Sel dan Jaringan (Biologi)",     type: "video", duration: "22:30" },
    { id: 404, title: "Latihan IPA Terpadu",            type: "quiz",  duration: "—" },
  ],
  5: [
    { id: 501, title: "Struktur Teks Eksposisi",       type: "video", duration: "15:00" },
    { id: 502, title: "Menulis Esai Argumentatif",     type: "text",  duration: "—" },
    { id: 503, title: "Membaca Kritis",                type: "video", duration: "18:20" },
  ],
  6: [
    { id: 601, title: "Sejarah Proklamasi Indonesia",  type: "video", duration: "25:00" },
    { id: 602, title: "Peta dan Proyeksi (Geografi)",  type: "video", duration: "18:00" },
    { id: 603, title: "Konsep Dasar Ekonomi",          type: "video", duration: "20:15" },
    { id: 604, title: "Latihan IPS",                   type: "quiz",  duration: "—" },
  ],
};

// Shared student state props
type StudentProps = {
  packageActive: boolean;
  setPackageActive: (v: boolean) => void;
  enrolledIds: number[];
  onEnroll: (id: number) => void;
  progressMap: Record<number, ProgressEntry>;
  setProgressMap: React.Dispatch<React.SetStateAction<Record<number, ProgressEntry>>>;
  // in-dashboard navigation
  setActiveNav: (v: string) => void;
  selectedCourseId: number | null;
  setSelectedCourseId: (id: number | null) => void;
  currentMaterialIdx: number;
  setCurrentMaterialIdx: (idx: number) => void;
};

// AccessBtn — full navigation-aware
function AccessBtn({ courseId, packageActive, enrolledIds, onEnroll, accent, nav }: {
  courseId: number; packageActive: boolean; enrolledIds: number[]; onEnroll: (id: number) => void;
  accent: string; nav: StudentProps;
}) {
  const enrolled = enrolledIds.includes(courseId);
  if (!packageActive) {
    return (
      <button className="w-full py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
        style={{ background: "rgba(217,169,62,0.12)", color: "#D9A93E", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        onClick={() => nav.setActiveNav("my-package")}>
        Beli Paket
      </button>
    );
  }
  if (enrolled) {
    return (
      <button className="w-full py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
        style={{ background: `${accent}18`, color: accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        onClick={() => { nav.setSelectedCourseId(courseId); nav.setCurrentMaterialIdx(nav.progressMap[courseId]?.done ?? 0); nav.setActiveNav("learn"); }}>
        Lanjut Belajar
      </button>
    );
  }
  return (
    <button className="w-full py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 text-white"
      style={{ background: `linear-gradient(135deg,${accent},${accent}cc)`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
      onClick={() => { onEnroll(courseId); nav.setSelectedCourseId(courseId); nav.setActiveNav("course-detail"); }}>
      Ikuti Kursus
    </button>
  );
}

// ─── 1. Beranda ───────────────────────────────────────────────────────────────
function StudentOverview(nav: StudentProps) {
  const { packageActive, enrolledIds, progressMap, setActiveNav, setSelectedCourseId, setCurrentMaterialIdx } = nav;
  const enrolled = allCourses.filter(c => enrolledIds.includes(c.id));
  const totalDone = enrolled.reduce((sum, c) => sum + (progressMap[c.id]?.done ?? 0), 0);
  const avgProgress = enrolled.length
    ? Math.round(enrolled.reduce((sum, c) => {
        const p = progressMap[c.id];
        return sum + (p ? Math.round((p.done / c.totalMateri) * 100) : 0);
      }, 0) / enrolled.length)
    : 0;
  const lastCourse = enrolled.find(c => (progressMap[c.id]?.done ?? 0) > 0) ?? enrolled[0];

  return (
    <div className="flex flex-col gap-5">
      {/* Package status banner */}
      <GlassCard
        className="p-5"
        style={{
          borderColor: packageActive ? "rgba(47,143,91,0.25)" : "rgba(217,169,62,0.25)",
          background: packageActive ? "rgba(47,143,91,0.05)" : "rgba(217,169,62,0.05)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: packageActive ? "rgba(47,143,91,0.15)" : "rgba(217,169,62,0.15)", color: packageActive ? "#2F8F5B" : "#D9A93E" }}>
              {packageActive ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Paket Bulanan</span>
                <Badge color={packageActive ? "#2F8F5B" : "#D9A93E"}>{packageActive ? "Aktif" : "Tidak Aktif"}</Badge>
              </div>
              <div className="text-xs" style={{ color: "#657166" }}>
                {packageActive
                  ? <>Berlaku sampai <span className="font-semibold" style={{ color: "#657166" }}>7 Februari 2025</span> · Akses seluruh kursus & materi</>
                  : "Beli Paket Bulanan untuk mengakses seluruh kursus dan materi."}
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveNav("my-package")}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{
              background: packageActive ? "rgba(47,143,91,0.15)" : "rgba(217,169,62,0.15)",
              color: packageActive ? "#2F8F5B" : "#D9A93E",
              border: `1px solid ${packageActive ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}
          >
            {packageActive ? "Perpanjang Paket" : "Beli Paket"}
          </button>
        </div>
      </GlassCard>

      {/* Stats — clickable */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Kursus Diikuti",    val: String(enrolled.length), icon: BookOpen,    color: "#4f8ef7", nav: "my-courses" },
          { label: "Materi Selesai",    val: String(totalDone),       icon: CheckCircle2, color: "#2F8F5B", nav: "progress" },
          { label: "Rata-rata Progress",val: `${avgProgress}%`,       icon: BarChart2,    color: "#a855f7", nav: "progress" },
          { label: "Sertifikat",        val: "0",                     icon: Award,        color: "#D9A93E", nav: "certificate" },
        ].map(({ label, val, icon: Icon, color, nav: dst }) => (
          <GlassCard key={label} className="p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:border-[#2F8F5B]"
            onClick={() => setActiveNav(dst)}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}18`, color }}><Icon size={20} /></div>
            <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{val}</div>
            <div className="text-xs" style={{ color: "#657166" }}>{label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Last active material */}
      {lastCourse && (
        <GlassCard className="p-5" style={{ borderColor: `${lastCourse.accent}20` }}>
          <div className="text-xs font-semibold mb-3" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>TERAKHIR DIPELAJARI</div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${lastCourse.accent}18`, color: lastCourse.accent }}><BookOpen size={20} /></div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm truncate" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{lastCourse.title}</div>
              <div className="text-xs mt-0.5" style={{ color: "#657166" }}>
                Materi {(progressMap[lastCourse.id]?.done ?? 0) + 1} dari {lastCourse.totalMateri}
              </div>
            </div>
            <button className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
              style={{ background: `${lastCourse.accent}18`, color: lastCourse.accent, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              onClick={() => { setSelectedCourseId(lastCourse.id); setCurrentMaterialIdx(progressMap[lastCourse.id]?.done ?? 0); setActiveNav("learn"); }}>
              Lanjut Belajar
            </button>
          </div>
        </GlassCard>
      )}

      {/* Active courses */}
      {enrolled.length > 0 && (
        <div>
          <div className="text-xs font-semibold mb-3" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>KURSUS AKTIF</div>
          <div className="grid lg:grid-cols-3 gap-4">
            {enrolled.map(c => {
              const done = progressMap[c.id]?.done ?? 0;
              const pct = Math.round((done / c.totalMateri) * 100);
              return (
                <GlassCard key={c.id} className="p-5 cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{ borderColor: `${c.accent}20` }}
                  onClick={() => { setSelectedCourseId(c.id); setActiveNav("course-detail"); }}>
                  <div className="flex items-center justify-between mb-3">
                    <Badge color={c.accent}>{c.category}</Badge>
                    <span className="text-xs" style={{ color: "#657166" }}>{done}/{c.totalMateri}</span>
                  </div>
                  <div className="font-bold text-sm mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{c.title}</div>
                  <div className="text-xs mb-4" style={{ color: "#657166" }}>{c.instructor}</div>
                  <div className="h-1.5 rounded-full overflow-hidden mb-1" style={{ background: "#EDE8DF" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${c.accent},${c.accent}88)` }} />
                  </div>
                  <div className="flex items-center justify-between mt-2" onClick={e => e.stopPropagation()}>
                    <span className="text-xs font-semibold" style={{ color: c.accent }}>{pct}% selesai</span>
                    <button className="text-xs font-semibold px-3 py-1 rounded-full transition-all hover:opacity-80"
                      style={{ background: `${c.accent}15`, color: c.accent }}
                      onClick={() => { setSelectedCourseId(c.id); setCurrentMaterialIdx(done); setActiveNav("learn"); }}>
                      Lanjut Belajar
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {enrolled.length === 0 && (
        <GlassCard className="p-8 text-center">
          <BookOpen size={32} className="mx-auto mb-3" style={{ color: "#8B948D" }} />
          <div className="text-sm font-semibold mb-1" style={{ color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Belum ada kursus yang diikuti</div>
          <div className="text-xs" style={{ color: "#657166" }}>Jelajahi kursus dan klik Ikuti Kursus untuk mulai belajar.</div>
        </GlassCard>
      )}
    </div>
  );
}

// ─── 2. Jelajahi Kursus ───────────────────────────────────────────────────────
function StudentExplore(nav: StudentProps) {
  const { packageActive, enrolledIds, onEnroll, setActiveNav, setSelectedCourseId, setCurrentMaterialIdx, progressMap } = nav;
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = ["Semua", "Matematika", "Bahasa Inggris", "Bahasa Indonesia", "IPA", "IPS", "Persiapan Ujian"];

  const filtered = allCourses.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    const matchCat = activeCategory === "Semua" || c.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Package notice */}
      <GlassCard className="p-4 flex items-center gap-3"
        style={{ borderColor: packageActive ? "#E6F3EB" : "rgba(245,158,11,0.2)", background: packageActive ? "#F8F6F0" : "rgba(245,158,11,0.04)" }}>
        {packageActive
          ? <CheckCircle2 size={15} style={{ color: "#4f8ef7", flexShrink: 0 }} />
          : <AlertCircle size={15} style={{ color: "#D9A93E", flexShrink: 0 }} />}
        <span className="text-xs flex-1" style={{ color: "#657166" }}>
          {packageActive
            ? <>Paket Bulananmu <span className="font-semibold" style={{ color: "#4f8ef7" }}>aktif</span> — kamu bisa mengikuti dan mengakses seluruh kursus di bawah ini.</>
            : <>Paket Bulananmu <span className="font-semibold" style={{ color: "#D9A93E" }}>belum aktif</span> — beli paket terlebih dahulu untuk mengakses materi kursus.</>}
        </span>
        {!packageActive && (
          <button onClick={() => setActiveNav("my-package")} className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
            style={{ background: "rgba(217,169,62,0.15)", color: "#D9A93E", border: "1px solid rgba(245,158,11,0.3)" }}>
            Beli Paket
          </button>
        )}
      </GlassCard>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#8B948D" }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari kursus..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none"
          style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: activeCategory === cat ? "#E6F3EB" : "#F3F0E8",
              color: activeCategory === cat ? "#4f8ef7" : "#8B948D",
              border: `1px solid ${activeCategory === cat ? "#D9D4C7" : "#EDE8DF"}`,
            }}>{cat}</button>
        ))}
      </div>

      {/* Course grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(c => {
          const enrolled = enrolledIds.includes(c.id);
          return (
            <GlassCard key={c.id} className="overflow-hidden transition-all hover:-translate-y-1 cursor-pointer" style={{ borderColor: `${c.accent}20` }}
              onClick={() => { setSelectedCourseId(c.id); setActiveNav("course-detail"); }}>
              <div className="h-28 flex items-center justify-center relative" style={{ background: `${c.accent}10` }}>
                <BookOpen size={30} style={{ color: c.accent }} />
                {enrolled && (
                  <div className="absolute top-3 right-3">
                    <Badge color="#2F8F5B">Diikuti</Badge>
                  </div>
                )}
              </div>
              <div className="p-5" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-2">
                  <Badge color={c.accent}>{c.level}</Badge>
                  <span className="text-xs" style={{ color: "#657166" }}>{c.category}</span>
                </div>
                <div className="font-bold text-sm mb-1 cursor-pointer" onClick={() => { setSelectedCourseId(c.id); setActiveNav("course-detail"); }}
                  style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{c.title}</div>
                <div className="text-xs mb-2 line-clamp-2" style={{ color: "#657166" }}>{c.desc}</div>
                <div className="text-xs mb-4" style={{ color: "#657166" }}>
                  Pengajar: {c.instructor} · {c.totalMateri} materi
                </div>
                <AccessBtn courseId={c.id} packageActive={packageActive} enrolledIds={enrolledIds}
                  onEnroll={onEnroll} accent={c.accent} nav={nav} />
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── 3. Kursus Saya ───────────────────────────────────────────────────────────
function StudentMyCourses(nav: StudentProps) {
  const { packageActive, enrolledIds, progressMap, setActiveNav, setSelectedCourseId, setCurrentMaterialIdx } = nav;
  const enrolled = allCourses.filter(c => enrolledIds.includes(c.id));

  if (enrolled.length === 0) {
    return (
      <GlassCard className="p-10 text-center">
        <BookOpen size={32} className="mx-auto mb-3" style={{ color: "#8B948D" }} />
        <div className="text-sm font-semibold mb-1" style={{ color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Belum ada kursus</div>
        <div className="text-xs" style={{ color: "#657166" }}>Buka Jelajahi Kursus dan klik Ikuti Kursus untuk mulai.</div>
      </GlassCard>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {enrolled.map(c => {
        const done = progressMap[c.id]?.done ?? 0;
        const pct = Math.round((done / c.totalMateri) * 100);
        return (
          <GlassCard key={c.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer transition-all hover:-translate-y-0.5"
            style={{ borderColor: `${c.accent}20` }}
            onClick={() => { setSelectedCourseId(c.id); setActiveNav("course-detail"); }}>
            <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center" style={{ background: `${c.accent}18`, color: c.accent }}>
              <BookOpen size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge color={c.accent}>{c.category}</Badge>
              </div>
              <div className="font-bold text-sm mb-0.5 truncate" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{c.title}</div>
              <div className="text-xs mb-3" style={{ color: "#657166" }}>Instruktur: {c.instructor} · {done}/{c.totalMateri} materi</div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#EDE8DF" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${c.accent},${c.accent}88)` }} />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
              <div className="text-xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: c.accent }}>{pct}%</div>
              {packageActive
                ? <button className="text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-80" style={{ background: `${c.accent}18`, color: c.accent }}
                    onClick={() => { setSelectedCourseId(c.id); setCurrentMaterialIdx(done); setActiveNav("learn"); }}>Lanjut Belajar</button>
                : <button className="text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-80" style={{ background: "rgba(217,169,62,0.12)", color: "#D9A93E" }}
                    onClick={() => setActiveNav("my-package")}>Beli Paket</button>}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}

// ─── 4. Progress ──────────────────────────────────────────────────────────────
function StudentProgress(nav: StudentProps) {
  const { enrolledIds, progressMap, setActiveNav } = nav;
  const enrolled = allCourses.filter(c => enrolledIds.includes(c.id));
  const totalDone = enrolled.reduce((s, c) => s + (progressMap[c.id]?.done ?? 0), 0);

  const lastMaterials = [
    { title: "Fungsi Kuadrat dan Grafiknya",         course: "Matematika Kelas 10",                 time: "2 jam lalu",  accent: "#4f8ef7" },
    { title: "Present Perfect Tense — Exercises",    course: "Bahasa Inggris — Grammar & Speaking", time: "kemarin",     accent: "#a855f7" },
    { title: "Soal TPS — Penalaran Umum Set 3",      course: "Persiapan UTBK — Saintek & Soshum",  time: "3 hari lalu", accent: "#06c5d9" },
  ].filter(m => enrolled.some(c => c.title === m.course));

  return (
    <div className="flex flex-col gap-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Kursus Aktif",    val: String(enrolled.length), color: "#4f8ef7" },
          { label: "Materi Selesai",  val: String(totalDone),       color: "#2F8F5B" },
          { label: "Sertifikat",      val: "0",                     color: "#D9A93E", clickNav: "certificate" },
        ].map(({ label, val, color, clickNav }) => (
          <GlassCard key={label} className={`p-4 text-center ${clickNav ? "cursor-pointer hover:-translate-y-0.5 transition-all" : ""}`}
            onClick={clickNav ? () => setActiveNav(clickNav) : undefined}>
            <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color }}>{val}</div>
            <div className="text-xs" style={{ color: "#657166" }}>{label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Per-course progress */}
      <div>
        <div className="text-xs font-semibold mb-3" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>PROGRESS PER KURSUS</div>
        <div className="flex flex-col gap-4">
          {enrolled.map(c => {
            const done = progressMap[c.id]?.done ?? 0;
            const pct = Math.round((done / c.totalMateri) * 100);
            return (
              <GlassCard key={c.id} className="p-5" style={{ borderColor: `${c.accent}20` }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <Badge color={c.accent}>{c.category}</Badge>
                    <div className="font-bold text-sm mt-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{c.title}</div>
                  </div>
                  <div className="text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: c.accent }}>{pct}%</div>
                </div>
                <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "#EDE8DF" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${c.accent},${c.accent}99)` }} />
                </div>
                <div className="flex flex-wrap gap-5 text-xs" style={{ color: "#657166" }}>
                  <span><span className="font-semibold" style={{ color: "#1F2A24" }}>{done}</span> materi selesai</span>
                  <span><span className="font-semibold" style={{ color: "#1F2A24" }}>{c.totalMateri - done}</span> tersisa</span>
                  <span><span className="font-semibold" style={{ color: "#1F2A24" }}>{c.totalMateri}</span> total materi</span>
                </div>
              </GlassCard>
            );
          })}
          {enrolled.length === 0 && (
            <GlassCard className="p-8 text-center">
              <div className="text-sm" style={{ color: "#8B948D" }}>Belum ada kursus yang diikuti.</div>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Last materials */}
      {lastMaterials.length > 0 && (
        <div>
          <div className="text-xs font-semibold mb-3" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>MATERI TERAKHIR DIPELAJARI</div>
          <div className="flex flex-col gap-3">
            {lastMaterials.map(m => (
              <GlassCard key={m.title} className="p-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${m.accent}18`, color: m.accent }}><FileText size={17} /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs truncate" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{m.title}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#657166" }}>{m.course}</div>
                </div>
                <div className="text-[10px] flex-shrink-0" style={{ color: "#8B948D", fontFamily: "'JetBrains Mono',monospace" }}>{m.time}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 5. Paket Saya ────────────────────────────────────────────────────────────
const NIS = "1234567890"; // Demo student NIS
type PayHistory = { id: string; period: string; expiry: string; status: "active" | "expired"; paid: string; bank: string; va: string; txId: string; date: string; time: string };

function makeVA(bank: string, unique = "001") {
  const prefix: Record<string, string> = { BCA: "8808", BRI: "7777", Mandiri: "8899" };
  return `${prefix[bank] ?? "0000"} ${NIS} ${unique}`;
}

function StudentPackage(nav: StudentProps) {
  const { packageActive, setPackageActive } = nav;
  const { toast, show: showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<PayHistory | null>(null);
  const [selectedBank, setSelectedBank] = useState("");
  const [copied, setCopied] = useState(false);

  const vaNumber = selectedBank ? makeVA(selectedBank) : "";

  function copyVA() {
    navigator.clipboard?.writeText(vaNumber.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const [history, setHistory] = useState<PayHistory[]>([
    { id: "TXN-001", period: "8 Jan – 7 Feb 2025", expiry: "7 Feb 2025", status: "active",  paid: "Rp99.000", bank: "BCA",    va: makeVA("BCA"),    txId: "TXN-202501-001", date: "8 Jan 2025", time: "09:14 WIB" },
    { id: "TXN-002", period: "8 Des – 7 Jan 2025", expiry: "7 Jan 2025", status: "expired", paid: "Rp99.000", bank: "BRI",    va: makeVA("BRI","002"), txId: "TXN-202412-002", date: "8 Des 2024", time: "14:32 WIB" },
    { id: "TXN-003", period: "8 Nov – 7 Des 2024", expiry: "7 Des 2024", status: "expired", paid: "Rp99.000", bank: "Mandiri",va: makeVA("Mandiri","003"),txId: "TXN-202411-003",date: "8 Nov 2024",time: "10:55 WIB" },
  ]);

  function handleConfirmPay() {
    if (!selectedBank) return;
    const newEntry: PayHistory = {
      id: `TXN-00${history.length + 1}`,
      period: "8 Feb – 7 Mar 2025", expiry: "7 Mar 2025",
      status: "active", paid: "Rp99.000",
      bank: selectedBank, va: makeVA(selectedBank, `00${history.length + 1}`),
      txId: `TXN-202502-00${history.length + 1}`,
      date: "8 Feb 2025", time: "08:00 WIB",
    };
    setHistory(prev => [newEntry, ...prev]);
    setShowModal(false);
    setSelectedBank("");
    setPackageActive(true);
    showToast("Paket Bulanan berhasil diaktifkan! Akses kamu berlaku selama 1 bulan.");
  }

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader title="Paket Saya" subtitle="Kelola berlangganan Paket Bulanan kamu" />

      {/* Package card */}
      <GlassCard className="p-7" style={{ borderColor: packageActive ? "rgba(47,143,91,0.25)" : "rgba(217,169,62,0.25)" }}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#E6F3EB", color: "#4f8ef7" }}>
                <Award size={24} />
              </div>
              <div>
                <div className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Paket Bulanan</div>
                <Badge color={packageActive ? "#2F8F5B" : "#D9A93E"}>{packageActive ? "Aktif" : "Tidak Aktif"}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl p-4" style={{ background: "#F3F0E8", border: "1px solid #E8E4DB" }}>
                <div className="text-xs mb-1" style={{ color: "#657166" }}>Harga</div>
                <div className="text-xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#4f8ef7" }}>Rp99.000</div>
                <div className="text-xs" style={{ color: "#657166" }}>per bulan</div>
              </div>
              <div className="rounded-xl p-4" style={{ background: "#F3F0E8", border: "1px solid #E8E4DB" }}>
                <div className="text-xs mb-1" style={{ color: "#657166" }}>
                  {packageActive ? "Masa Aktif" : "Durasi"}
                </div>
                <div className="text-xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: packageActive ? "#2F8F5B" : "#8B948D" }}>
                  {packageActive ? "7 Feb 2025" : "1 bulan"}
                </div>
                <div className="text-xs" style={{ color: "#657166" }}>
                  {packageActive ? "berlaku sampai" : "setelah pembayaran"}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {["Akses seluruh kursus yang tersedia", "Akses seluruh materi di setiap kursus", "Pantau progress belajar secara real-time", "Sertifikat otomatis jika kursus selesai"].map(b => (
                <div key={b} className="flex items-center gap-2 text-sm" style={{ color: "#657166" }}>
                  <CheckCircle2 size={14} style={{ color: "#2F8F5B", flexShrink: 0 }} /> {b}
                </div>
              ))}
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 sm:items-stretch sm:w-44">
            <button onClick={() => setShowModal(true)}
              className="py-3 rounded-xl text-sm font-semibold text-white text-center transition-all hover:opacity-90"
              style={{ background: packageActive ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#f59e0b,#d97706)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {packageActive ? "Perpanjang Paket" : "Beli Paket"}
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Payment history */}
      <div>
        <div className="text-xs font-semibold mb-3" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>RIWAYAT PEMBAYARAN</div>
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                  {["Periode", "Paket", "Bank", "Jumlah", "Status"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map(row => (
                  <tr key={row.id} className="hover:bg-white/[0.03] cursor-pointer transition-all"
                    style={{ borderBottom: "1px solid #F0EDE4" }}
                    onClick={() => setShowDetail(row)}>
                    <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{row.period}</span></td>
                    <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>Paket Bulanan</span></td>
                    <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{row.bank}</span></td>
                    <td className="px-5 py-3.5"><span className="text-xs font-semibold" style={{ color: "#2F8F5B" }}>{row.paid}</span></td>
                    <td className="px-5 py-3.5">
                      <Badge color={row.status === "active" ? "#2F8F5B" : "#8B948D"}>{row.status === "active" ? "Aktif" : "Kadaluarsa"}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* ── Payment modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <GlassCard className="relative w-full max-w-md p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>
                  {packageActive ? "Perpanjang Paket Bulanan" : "Beli Paket Bulanan"}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "#657166" }}>Akses seluruh kursus selama 1 bulan penuh</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>

            {/* Ringkasan */}
            <div className="p-4 rounded-xl mb-5" style={{ background: "#F3F0E8", border: "1px solid #D9D4C7" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "#657166" }}>Paket Bulanan × 1</span>
                <span className="font-bold text-base" style={{ color: "#4f8ef7", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Rp99.000</span>
              </div>
              <div className="text-xs mt-1" style={{ color: "#657166" }}>Berlaku 1 bulan setelah pembayaran dikonfirmasi.</div>
            </div>

            {/* Bank dropdown */}
            <div className="mb-5">
              <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>METODE PEMBAYARAN</label>
              <select value={selectedBank} onChange={e => setSelectedBank(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: selectedBank ? "#1F2A24" : "#657166" }}>
                <option value="">— Pilih bank —</option>
                <option value="BCA">Transfer Bank — BCA</option>
                <option value="BRI">Transfer Bank — BRI</option>
                <option value="Mandiri">Transfer Bank — Mandiri</option>
              </select>

              {!selectedBank && (
                <p className="text-xs mt-2" style={{ color: "#8B948D" }}>Pilih metode pembayaran untuk melihat nomor virtual account.</p>
              )}

              {selectedBank && (
                <div className="mt-3 p-4 rounded-xl" style={{ background: "#F3F0E8", border: "1px solid #D9D4C7" }}>
                  <div className="text-xs mb-1" style={{ color: "#657166" }}>Nomor Virtual Account {selectedBank}</div>
                  <div className="font-bold text-base mb-1" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#4f8ef7" }}>{vaNumber}</div>
                  <div className="text-xs mb-3" style={{ color: "#657166" }}>
                    Transfer ke Virtual Account {selectedBank} <span className="font-semibold">{vaNumber}</span> a/n CourseHub Indonesia
                  </div>
                  <button onClick={copyVA}
                    className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                    style={{ background: copied ? "rgba(47,143,91,0.12)" : "#E6F3EB", color: copied ? "#2F8F5B" : "#2F8F5B" }}>
                    {copied ? <><CheckCircle2 size={12} /> Tersalin!</> : <><ClipboardList size={12} /> Salin Nomor Virtual Account</>}
                  </button>
                  <p className="text-[10px] mt-2" style={{ color: "#8B948D" }}>
                    Nomor virtual account dibuat khusus untuk akun siswa ini. Pembayaran akan diverifikasi otomatis dalam simulasi sistem.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold"
                style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Batal</button>
              <button onClick={handleConfirmPay} disabled={!selectedBank}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "linear-gradient(135deg,#4f8ef7,#2563eb)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Konfirmasi Bayar</button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ── Detail Pembayaran modal ── */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetail(null)} />
          <GlassCard className="relative w-full max-w-md p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Detail Pembayaran</h3>
              <button onClick={() => setShowDetail(null)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Nama Paket",       val: "Paket Bulanan" },
                { label: "Nama Siswa",        val: "Ahmad Fauzi" },
                { label: "NIS / NISN",        val: NIS },
                { label: "Tanggal Pembelian", val: showDetail.date },
                { label: "Jam Pembelian",     val: showDetail.time },
                { label: "Masa Aktif Paket",  val: showDetail.period },
                { label: "Harga Paket",       val: showDetail.paid },
                { label: "Metode Pembayaran", val: `Transfer Bank — ${showDetail.bank}` },
                { label: "Nomor Virtual Account", val: showDetail.va },
                { label: "ID Transaksi",      val: showDetail.txId },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between gap-4 py-2 border-b" style={{ borderColor: "#EDE8DF" }}>
                  <span className="text-xs" style={{ color: "#657166" }}>{label}</span>
                  <span className="text-xs font-semibold text-right" style={{ color: "#1F2A24", fontFamily: label.includes("Virtual") || label === "ID Transaksi" ? "'JetBrains Mono',monospace" : "inherit" }}>{val}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 py-2 border-b" style={{ borderColor: "#EDE8DF" }}>
                <span className="text-xs" style={{ color: "#657166" }}>Status Pembayaran</span>
                <Badge color={showDetail.status === "active" ? "#2F8F5B" : "#8B948D"}>{showDetail.status === "active" ? "Aktif" : "Kadaluarsa"}</Badge>
              </div>
              <div className="p-3 rounded-xl mt-1" style={{ background: "#F3F0E8" }}>
                <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Benefit Paket</div>
                {["Akses seluruh kursus","Akses seluruh materi","Pantau progress belajar","Sertifikat otomatis jika kursus selesai"].map(b => (
                  <div key={b} className="flex items-center gap-1.5 text-xs mt-1" style={{ color: "#657166" }}>
                    <CheckCircle2 size={12} style={{ color: "#2F8F5B" }} /> {b}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-2">
                {showDetail.status === "expired" ? (
                  <button onClick={() => { setShowDetail(null); setShowModal(true); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                    Perpanjang Paket
                  </button>
                ) : (
                  <button onClick={() => setShowDetail(null)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#4f8ef7,#2563eb)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                    Lihat Kursus
                  </button>
                )}
                <button onClick={() => setShowDetail(null)} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold"
                  style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Tutup</button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── 7. Detail Kursus ─────────────────────────────────────────────────────────
function StudentCourseDetail(nav: StudentProps) {
  const { selectedCourseId, setActiveNav, setCurrentMaterialIdx, enrolledIds, onEnroll, packageActive, progressMap } = nav;
  const course = allCourses.find(c => c.id === selectedCourseId);
  if (!course) return null;

  const materials = COURSE_MATERIALS[course.id] ?? [];
  const done = progressMap[course.id]?.done ?? 0;
  const pct = Math.round((done / course.totalMateri) * 100);
  const enrolled = enrolledIds.includes(course.id);

  function goLearn(idx = done) {
    setCurrentMaterialIdx(idx);
    setActiveNav("learn");
  }

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <button onClick={() => setActiveNav(enrolled ? "my-courses" : "explore")}
        className="flex items-center gap-2 text-sm w-fit transition-colors hover:text-[#4f8ef7]"
        style={{ color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        <ChevronRight size={15} className="rotate-180" /> Kembali
      </button>

      <GlassCard className="p-7" style={{ borderColor: `${course.accent}20` }}>
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${course.accent}18`, color: course.accent }}>
            <BookOpen size={26} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge color={course.accent}>{course.category}</Badge>
              <Badge color="#8B948D">{course.level}</Badge>
              {enrolled && <Badge color="#2F8F5B">Diikuti</Badge>}
            </div>
            <h2 className="font-extrabold text-xl mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{course.title}</h2>
            <p className="text-sm" style={{ color: "#657166" }}>Pengajar: {course.instructor}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "#657166" }}>{course.desc}</p>

        {/* Progress bar (only if enrolled) */}
        {enrolled && (
          <div className="mb-5">
            <div className="flex justify-between text-xs mb-1.5">
              <span style={{ color: "#657166" }}>Progres belajar</span>
              <span className="font-semibold" style={{ color: course.accent }}>{pct}% ({done}/{course.totalMateri} materi)</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "#EDE8DF" }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${course.accent},${course.accent}88)` }} />
            </div>
          </div>
        )}

        {/* Status paket + CTA */}
        {!packageActive && (
          <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <AlertCircle size={15} style={{ color: "#D9A93E", flexShrink: 0 }} />
            <span className="text-xs" style={{ color: "#657166" }}>Aktifkan Paket Bulanan untuk mengakses materi kursus ini.</span>
            <button onClick={() => setActiveNav("my-package")} className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: "rgba(217,169,62,0.15)", color: "#D9A93E", border: "1px solid rgba(245,158,11,0.3)" }}>Beli Paket</button>
          </div>
        )}
        {packageActive && !enrolled && (
          <button className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}cc)`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            onClick={() => { onEnroll(course.id); goLearn(0); }}>
            Mulai Ikuti Kursus
          </button>
        )}
        {packageActive && enrolled && (
          <button className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}cc)`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            onClick={() => goLearn()}>
            Lanjut Belajar — Materi {done + 1}
          </button>
        )}
      </GlassCard>

      {/* Daftar materi */}
      <div>
        <div className="text-xs font-semibold mb-3" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>DAFTAR MATERI ({materials.length})</div>
        <div className="flex flex-col gap-2">
          {materials.map((m, idx) => {
            const isCompleted = idx < done;
            const isCurrent = idx === done;
            return (
              <GlassCard key={m.id} className={`p-4 flex items-center gap-3 ${packageActive && enrolled ? "cursor-pointer hover:border-[#2F8F5B] transition-all" : ""}`}
                style={{ borderColor: isCompleted ? `${course.accent}25` : isCurrent ? "#D9D4C7" : "#EDE8DF" }}
                onClick={() => { if (packageActive && enrolled) goLearn(idx); }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: isCompleted ? `${course.accent}18` : isCurrent ? "#D9D4C7" : "#F3F0E8", color: isCompleted ? course.accent : isCurrent ? "#4f8ef7" : "#8B948D" }}>
                  {isCompleted ? <CheckCircle2 size={16} /> : m.type === "video" ? <Video size={15} /> : m.type === "quiz" ? <FileText size={15} /> : <FileText size={15} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: isCompleted ? course.accent : "#1F2A24" }}>{m.title}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#657166" }}>{m.type} · {m.duration}</div>
                </div>
                {isCurrent && packageActive && enrolled && (
                  <Badge color="#4f8ef7">Lanjut</Badge>
                )}
                {isCompleted && <Badge color={course.accent}>Selesai</Badge>}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── 8. Halaman Belajar/Materi ────────────────────────────────────────────────
function StudentLearn(nav: StudentProps) {
  const { selectedCourseId, currentMaterialIdx, setCurrentMaterialIdx, setActiveNav, progressMap, setProgressMap } = nav;
  const { toast, show: showToast } = useToast();

  const course = allCourses.find(c => c.id === selectedCourseId);
  if (!course) return null;

  const materials = COURSE_MATERIALS[course.id] ?? [];
  const mat = materials[currentMaterialIdx];
  const done = progressMap[course.id]?.done ?? 0;
  const isCompleted = currentMaterialIdx < done;

  function markDone() {
    if (!isCompleted) {
      const newDone = Math.max(done, currentMaterialIdx + 1);
      setProgressMap(prev => ({ ...prev, [course.id]: { done: newDone } }));
      showToast("Materi ditandai selesai!");
      if (currentMaterialIdx + 1 < materials.length) {
        setTimeout(() => setCurrentMaterialIdx(currentMaterialIdx + 1), 600);
      }
    }
  }

  if (!mat) return null;

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs" style={{ color: "#657166" }}>
        <button onClick={() => setActiveNav("my-courses")} className="hover:text-[#4f8ef7] transition-colors">Kursus Saya</button>
        <span>/</span>
        <button onClick={() => setActiveNav("course-detail")} className="hover:text-[#4f8ef7] transition-colors">{course.title}</button>
        <span>/</span>
        <span style={{ color: "#657166" }}>{mat.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Main content area */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <GlassCard className="p-6" style={{ borderColor: `${course.accent}20` }}>
            <div className="flex items-center gap-2 mb-3">
              <Badge color={course.accent}>{course.category}</Badge>
              <Badge color={mat.type === "video" ? "#4f8ef7" : mat.type === "quiz" ? "#f59e0b" : "#10b981"}>{mat.type}</Badge>
              {isCompleted && <Badge color="#2F8F5B">Selesai</Badge>}
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{mat.title}</h3>
            <p className="text-xs mb-5" style={{ color: "#657166" }}>{course.title} · Materi {currentMaterialIdx + 1} dari {materials.length}</p>

            {/* Content placeholder */}
            <div className="rounded-2xl flex flex-col items-center justify-center gap-3 mb-5"
              style={{ background: `${course.accent}08`, border: `1px solid ${course.accent}20`, minHeight: 220 }}>
              {mat.type === "video" ? (
                <>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${course.accent}18`, color: course.accent }}>
                    <Video size={32} />
                  </div>
                  <div className="text-sm font-semibold" style={{ color: "#657166" }}>{mat.title}</div>
                  <div className="text-xs" style={{ color: "#657166" }}>Durasi: {mat.duration}</div>
                  <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white mt-1 transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}cc)`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                    ▶ Putar Video
                  </button>
                </>
              ) : mat.type === "quiz" ? (
                <>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(217,169,62,0.15)", color: "#D9A93E" }}>
                    <FileText size={32} />
                  </div>
                  <div className="text-sm font-semibold" style={{ color: "#657166" }}>Quiz: {mat.title}</div>
                  <div className="text-xs" style={{ color: "#657166" }}>Kerjakan soal-soal latihan di bawah ini</div>
                  <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white mt-1 transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                    Mulai Quiz
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(47,143,91,0.15)", color: "#2F8F5B" }}>
                    <FileText size={32} />
                  </div>
                  <div className="text-sm font-semibold" style={{ color: "#657166" }}>Baca Materi: {mat.title}</div>
                  <div className="text-xs px-4 text-center leading-relaxed" style={{ color: "#657166" }}>Konten teks tersedia dalam sistem. Klik Tandai Selesai setelah selesai membaca.</div>
                </>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setCurrentMaterialIdx(Math.max(0, currentMaterialIdx - 1))}
                disabled={currentMaterialIdx === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all disabled:opacity-30"
                style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                <ChevronRight size={14} className="rotate-180" /> Sebelumnya
              </button>
              <button onClick={markDone} disabled={isCompleted}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg,#10b981,#059669)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {isCompleted ? "✓ Sudah Selesai" : "Tandai Selesai"}
              </button>
              <button
                onClick={() => setCurrentMaterialIdx(Math.min(materials.length - 1, currentMaterialIdx + 1))}
                disabled={currentMaterialIdx === materials.length - 1}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all disabled:opacity-30"
                style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Berikutnya <ChevronRight size={14} />
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar — daftar materi */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>
            MATERI KURSUS ({done}/{materials.length} selesai)
          </div>
          {materials.map((m2, idx) => {
            const comp = idx < done;
            const curr = idx === currentMaterialIdx;
            return (
              <GlassCard key={m2.id}
                className="p-3 flex items-center gap-2.5 cursor-pointer transition-all hover:border-[#2F8F5B]"
                style={{ borderColor: curr ? "#D9D4C7" : comp ? `${course.accent}20` : "#EDE8DF", background: curr ? "rgba(47,143,91,0.08)" : "#FFFFFF" }}
                onClick={() => setCurrentMaterialIdx(idx)}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: comp ? `${course.accent}18` : curr ? "#E6F3EB" : "#F3F0E8", color: comp ? course.accent : curr ? "#4f8ef7" : "#8B948D" }}>
                  {comp ? <Check size={11} /> : m2.type === "video" ? <Video size={11} /> : <FileText size={11} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: curr ? "#1F2A24" : comp ? "#657166" : "#657166" }}>{m2.title}</div>
                  <div className="text-[10px]" style={{ color: "#8B948D" }}>{m2.type} · {m2.duration}</div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── 9. Sertifikat ────────────────────────────────────────────────────────────
function StudentCertificate({ enrolledIds, progressMap }: StudentProps) {
  const enrolled = allCourses.filter(c => enrolledIds.includes(c.id));
  const completed = enrolled.filter(c => (progressMap[c.id]?.done ?? 0) >= c.totalMateri);

  // Cert number generator
  function certNum(idx: number) { return `CERT-CH-${String(idx + 1).padStart(3, "0")}`; }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Sertifikat"
        subtitle={`${completed.length} sertifikat tersedia · ${enrolled.length - completed.length} kursus sedang berjalan`}
      />

      {/* Empty state */}
      {completed.length === 0 && (
        <GlassCard className="p-12 text-center">
          <Award size={44} className="mx-auto mb-4" style={{ color: "#8B948D" }} />
          <div className="font-bold text-sm mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#657166" }}>Belum Ada Sertifikat</div>
          <div className="text-xs max-w-xs mx-auto" style={{ color: "#657166" }}>
            Selesaikan semua materi pada kursus yang kamu ikuti untuk mendapatkan sertifikat otomatis.
          </div>
        </GlassCard>
      )}

      {/* Completed certs */}
      {completed.map((c, idx) => (
        <GlassCard key={c.id} className="p-6" style={{ borderColor: `${c.accent}30`, background: "rgba(16,185,129,0.03)" }}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(47,143,91,0.15)", color: "#2F8F5B" }}>
                <Award size={24} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Badge color="#2F8F5B">Valid</Badge>
                  <Badge color={c.accent}>{c.category}</Badge>
                </div>
                <div className="font-bold text-sm mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{c.title}</div>
                <div className="text-xs mb-3" style={{ color: "#657166" }}>Instruktur: {c.instructor}</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                  {[
                    { l: "Nama Siswa",     v: "Ahmad Fauzi" },
                    { l: "Nomor Sertifikat", v: certNum(idx) },
                    { l: "Tanggal Selesai", v: "7 Februari 2025" },
                    { l: "Status",          v: "Valid" },
                  ].map(({ l, v }) => (
                    <div key={l}>
                      <span style={{ color: "#657166" }}>{l}: </span>
                      <span className="font-semibold" style={{ color: "#657166", fontFamily: l === "Nomor Sertifikat" ? "'JetBrains Mono',monospace" : "inherit" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex sm:flex-col gap-2">
              <button className="text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-90 text-white"
                style={{ background: "linear-gradient(135deg,#10b981,#059669)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Lihat Sertifikat
              </button>
              <button className="text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-80"
                style={{ background: "rgba(47,143,91,0.12)", color: "#2F8F5B", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Download
              </button>
            </div>
          </div>
        </GlassCard>
      ))}

      {/* In-progress courses */}
      {enrolled.filter(c => (progressMap[c.id]?.done ?? 0) < c.totalMateri).length > 0 && (
        <div>
          <div className="text-xs font-semibold mb-3" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>KURSUS SEDANG BERJALAN</div>
          <div className="flex flex-col gap-3">
            {enrolled.filter(c => (progressMap[c.id]?.done ?? 0) < c.totalMateri).map(c => {
              const done = progressMap[c.id]?.done ?? 0;
              const pct = Math.round((done / c.totalMateri) * 100);
              return (
                <GlassCard key={c.id} className="p-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${c.accent}18`, color: c.accent }}>
                    <BookOpen size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate mb-1" style={{ color: "#1F2A24", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{c.title}</div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#EDE8DF" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${c.accent},${c.accent}88)` }} />
                    </div>
                  </div>
                  <div className="text-xs text-right flex-shrink-0" style={{ color: "#657166" }}>
                    <div className="font-semibold" style={{ color: c.accent }}>{pct}%</div>
                    <div>Selesaikan {c.totalMateri - done} materi lagi</div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 6. Profil Siswa ──────────────────────────────────────────────────────────
function StudentProfilePage() {
  const [interests] = useState(["Matematika", "Bahasa Inggris", "Persiapan Ujian"]);
  const color = "#4f8ef7";

  return (
    <div className="max-w-xl flex flex-col gap-5">
      {/* Avatar + name */}
      <GlassCard className="p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg,${color},${color}88)` }}>A</div>
        <div>
          <div className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Ahmad Fauzi</div>
          <div className="text-sm" style={{ color: "#657166" }}>ahmad@email.com</div>
          <div className="text-xs mt-0.5" style={{ color: "#8B948D", fontFamily: "'JetBrains Mono',monospace" }}>@ahmad_fauzi</div>
          <div className="mt-1.5"><Badge color={color}>Siswa</Badge></div>
        </div>
      </GlassCard>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Kursus Diikuti", val: "3",  color: "#4f8ef7" },
          { label: "Avg Progress",   val: "44%", color: "#2F8F5B" },
          { label: "Sertifikat",     val: "0",   color: "#D9A93E" },
        ].map(({ label, val, color: c }) => (
          <GlassCard key={label} className="p-4 text-center">
            <div className="font-bold text-xl mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: c }}>{val}</div>
            <div className="text-[10px]" style={{ color: "#657166" }}>{label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Data akun */}
      <GlassCard className="p-6">
        <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Data Akun</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "NAMA LENGKAP", val: "Ahmad Fauzi" },
            { label: "USERNAME",     val: "ahmad_fauzi" },
            { label: "EMAIL",        val: "ahmad@email.com" },
            { label: "BERGABUNG",    val: "2 Januari 2025" },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="text-[10px] font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
              <div className="text-sm" style={{ color: "#1F2A24" }}>{val}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Data sekolah */}
      <GlassCard className="p-6">
        <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Data Sekolah</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "NAMA SEKOLAH", val: "SMA Negeri 1 Jakarta" },
            { label: "JENJANG",      val: "SMA" },
            { label: "KELAS",        val: "Kelas 11" },
            { label: "JURUSAN",      val: "IPA" },
            { label: "NIS / NISN",   val: NIS },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="text-[10px] font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
              <div className="text-sm" style={{ color: "#1F2A24", fontFamily: label === "NIS / NISN" ? "'JetBrains Mono',monospace" : "inherit" }}>{val}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Minat belajar */}
      <GlassCard className="p-6">
        <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Minat Belajar</div>
        <div className="flex flex-wrap gap-2">
          {interests.map(tag => (
            <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: "#E6F3EB", color: "#2F8F5B", border: "1px solid #D9D4C7" }}>
              <Check size={11} /> {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD — shared data
// ═══════════════════════════════════════════════════════════════════════════════
type AdminCourse = { id: number; title: string; category: string; level: string; instructor: string; modules: number; status: "active" | "pending" | "draft" | "rejected"; students: number };
type AdminUser   = { id: number; name: string; email: string; school: string; grade: string; major: string; nisn: string; packageStatus: "active" | "inactive"; joined: string; status: "active" | "inactive" };
type AdminInstr  = { id: number; name: string; email: string; profession: string; expertise: string; institution: string; experience: string; courses: number; students: number; verifyStatus: "verified" | "pending" | "rejected" };

const ADMIN_COURSE_STATUS: Record<string, { label: string; color: string }> = {
  active:   { label: "Aktif",          color: "#2F8F5B" },
  pending:  { label: "Pending Review", color: "#D9A93E" },
  draft:    { label: "Draft",          color: "#8B948D" },
  rejected: { label: "Ditolak",        color: "#D95C5C" },
};


// ─── 1. Beranda ───────────────────────────────────────────────────────────────
function AdminOverview({ setActiveNav }: { setActiveNav?: (nav: string) => void }) {
  const [activityModal, setActivityModal] = useState<{ msg: string; time: string; detail: string; type: string } | null>(null);

  const stats = [
    { label: "Total Siswa",         val: "1,840", icon: Users,         color: "#4f8ef7", sub: "+42 minggu ini", nav: "users" },
    { label: "Total Instruktur",    val: "12",    icon: UserCheck,     color: "#2F8F5B", sub: "2 pending", nav: "instructors" },
    { label: "Total Kursus",        val: "6",     icon: BookOpen,      color: "#a855f7", sub: "1 pending review", nav: "courses" },
    { label: "Total Enrolmen",      val: "3,120", icon: ClipboardList, color: "#D9A93E", sub: "+180 bulan ini", nav: "enrollments" },
    { label: "Paket Aktif",         val: "1,840", icon: Award,         color: "#06c5d9", sub: "Paket Bulanan", nav: "packages" },
    { label: "Kursus Pending Review", val: "2",  icon: AlertCircle,   color: "#D9A93E", sub: "menunggu review", nav: "courses" },
    { label: "Instruktur Pending",  val: "2",     icon: UserPlus,      color: "#D95C5C", sub: "menunggu verifikasi", nav: "instructors" },
    { label: "Sertifikat Terbit",   val: "342",   icon: Award,         color: "#ec4899", sub: "bulan ini", nav: "certificates" },
  ];

  const activities = [
    { msg: "Instruktur 1 mengajukan kursus Persiapan Ujian Bahasa Indonesia", time: "5 menit lalu", icon: BookOpen, color: "#a855f7", type: "kursus", detail: "Kursus baru 'Persiapan Ujian Bahasa Indonesia' dari Pak Hendra Wijaya menunggu review admin. Kategori: Bahasa Indonesia, Level: SMP/SMA, 18 materi." },
    { msg: "Instruktur 2 mengajukan kursus Persiapan UTBK - Saintek", time: "22 menit lalu", icon: BookOpen, color: "#a855f7", type: "kursus", detail: "Kursus baru 'Persiapan UTBK - Saintek' dari Bu Ratna Dewi menunggu review. Kategori: Persiapan Ujian, Level: SMA Kelas 12, 30 materi." },
    { msg: "Ahmad Fauzi menyelesaikan kursus Matematika Kelas 10", time: "1 jam lalu", icon: CheckCircle2, color: "#2F8F5B", type: "progress", detail: "Ahmad Fauzi berhasil menyelesaikan 100% dari 24 materi kursus Matematika Kelas 10. Sertifikat CERT-CH-342 sudah diterbitkan." },
    { msg: "Paket Bulanan Ahmad Fauzi berhasil diperpanjang", time: "2 jam lalu", icon: Award, color: "#4f8ef7", type: "paket", detail: "Pembayaran paket bulanan Ahmad Fauzi sebesar Rp99.000 berhasil dikonfirmasi. Masa aktif diperpanjang hingga 7 Maret 2025." },
    { msg: "Sertifikat CERT-CH-001 berhasil diterbitkan", time: "3 jam lalu", icon: Award, color: "#ec4899", type: "sertifikat", detail: "Sertifikat CERT-CH-001 diterbitkan untuk siswa Budi Raharjo yang menyelesaikan kursus Bahasa Inggris — Grammar & Speaking dengan progress 100%." },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Alert: pending instructors */}
      <GlassCard className="p-4 flex items-center gap-3" style={{ borderColor: "rgba(217,169,62,0.25)", background: "rgba(217,169,62,0.05)" }}>
        <AlertCircle size={16} style={{ color: "#D9A93E", flexShrink: 0 }} />
        <span className="text-xs" style={{ color: "#657166" }}>
          Ada <span className="font-semibold" style={{ color: "#D9A93E" }}>2 instruktur</span> dan <span className="font-semibold" style={{ color: "#D9A93E" }}>2 kursus</span> menunggu tindakan admin.
        </span>
      </GlassCard>

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, val, icon: Icon, color, sub, nav }) => (
          <button
            key={label}
            onClick={() => setActiveNav?.(nav)}
            className="text-left transition-all hover:scale-[1.02]"
          >
            <GlassCard className="p-5 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, color }}><Icon size={20} /></div>
                <span className="text-[10px]" style={{ color: "#657166" }}>{sub}</span>
              </div>
              <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{val}</div>
              <div className="text-xs" style={{ color: "#657166" }}>{label}</div>
            </GlassCard>
          </button>
        ))}
      </div>

      {/* Activity feed */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Aktivitas Terbaru</div>
          <Badge color="#4f8ef7">Live</Badge>
        </div>
        <div className="flex flex-col gap-1">
          {activities.map(({ msg, time, icon: Icon, color, detail, type }) => (
            <button
              key={msg}
              onClick={() => setActivityModal({ msg, time, detail, type })}
              className="flex items-start gap-3 px-3 py-3 border-b last:border-b-0 w-full text-left hover:bg-[#F3F0E8] rounded-xl transition-all"
              style={{ borderColor: "#EDE8DF" }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${color}15`, color }}><Icon size={14} /></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs leading-relaxed font-medium" style={{ color: "#1F2A24" }}>{msg}</div>
                <div className="text-[10px] mt-1" style={{ color: "#8B948D", fontFamily: "'JetBrains Mono',monospace" }}>{time}</div>
              </div>
              <ChevronRight size={14} style={{ color: "#8B948D" }} />
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Activity Detail Modal */}
      {activityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActivityModal(null)} />
          <GlassCard className="relative w-full max-w-md p-6 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge color={activityModal.type === "kursus" ? "#a855f7" : activityModal.type === "progress" ? "#10b981" : activityModal.type === "paket" ? "#4f8ef7" : "#ec4899"}>
                    {activityModal.type.charAt(0).toUpperCase() + activityModal.type.slice(1)}
                  </Badge>
                  <span className="text-[10px]" style={{ color: "#8B948D", fontFamily: "'JetBrains Mono',monospace" }}>{activityModal.time}</span>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{activityModal.msg}</h3>
              </div>
              <button onClick={() => setActivityModal(null)} className="flex-shrink-0 ml-3" style={{ color: "#657166" }}><X size={18} /></button>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#657166" }}>{activityModal.detail}</p>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── 2. Kelola Kursus ─────────────────────────────────────────────────────────
function AdminCourses() {
  const init: AdminCourse[] = [
    { id: 1, title: "Bahasa Indonesia - Menulis & Membaca",       category: "Bahasa Indonesia", level: "SMP/SMA",       instructor: "Pak Hendra Wijaya", modules: 16, status: "active",  students: 42 },
    { id: 2, title: "IPS - Sejarah, Geografi & Ekonomi",          category: "IPS",              level: "SMP Kelas 9",   instructor: "Pak Hendra Wijaya", modules: 22, status: "active",  students: 36 },
    { id: 3, title: "Persiapan Ujian Bahasa Indonesia",           category: "Persiapan Ujian",  level: "SMA Kelas 12",  instructor: "Pak Hendra Wijaya", modules: 6,  status: "pending", students: 0 },
    { id: 4, title: "Matematika Kelas 10 - Dasar sampai Mahir",   category: "Matematika",       level: "SMA Kelas 10",  instructor: "Bu Ratna Dewi",     modules: 24, status: "active",  students: 84 },
    { id: 5, title: "IPA Terpadu Kelas 8",                        category: "IPA",              level: "SMP Kelas 8",   instructor: "Bu Ratna Dewi",     modules: 20, status: "active",  students: 48 },
    { id: 6, title: "Persiapan UTBK - Saintek",                   category: "Persiapan Ujian",  level: "SMA Kelas 12",  instructor: "Bu Ratna Dewi",     modules: 8,  status: "pending", students: 16 },
  ];
  const [courses, setCourses] = useState(init);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [detailModal, setDetailModal] = useState<AdminCourse | null>(null);
  const [rejectModal, setRejectModal] = useState<AdminCourse | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const { toast, show: showToast } = useToast();

  function approve(id: number) {
    setCourses(p => p.map(c => c.id === id ? { ...c, status: "active" as const } : c));
    showToast("Kursus disetujui dan sekarang aktif.");
  }
  function rejectCourse() {
    if (!rejectModal || !rejectReason.trim()) {
      showToast("Alasan penolakan wajib diisi.", false);
      return;
    }
    setCourses(p => p.map(c => c.id === rejectModal.id ? { ...c, status: "rejected" as const } : c));
    showToast("Kursus ditolak.", false);
    setRejectModal(null);
    setRejectReason("");
  }
  function remove(id: number) {
    setCourses(p => p.filter(c => c.id !== id));
    showToast("Kursus dihapus.", false);
  }

  const statusOpts = ["all", "active", "pending", "draft", "rejected"];
  const filtered = courses.filter(c => {
    const q = search.toLowerCase();
    return (filterStatus === "all" || c.status === filterStatus) &&
      (c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
  });

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader title="Kelola Kursus" subtitle={`${courses.length} kursus terdaftar · ${courses.filter(c => c.status === "pending").length} pending review`} />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8B948D" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari kursus atau instruktur..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOpts.map(s => {
            const cfg = s === "all" ? { label: "Semua", color: "#4f8ef7" } : ADMIN_COURSE_STATUS[s];
            return (
              <button key={s} onClick={() => setFilterStatus(s)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{ background: filterStatus === s ? `${cfg.color}18` : "#F3F0E8", color: filterStatus === s ? cfg.color : "#657166", border: `1px solid ${filterStatus === s ? `${cfg.color}40` : "#D9D4C7"}` }}>
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                {["Judul Kursus", "Instruktur", "Kategori", "Jenjang/Kelas", "Jumlah Materi", "Jumlah Siswa", "Status", "Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const s = ADMIN_COURSE_STATUS[c.status];
                return (
                  <tr key={c.id} className="hover:bg-[#F8FAF7]" style={{ borderBottom: "1px solid #F0EDE4" }}>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-xs" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24", maxWidth: 220 }}>{c.title}</div>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs" style={{ color: "#657166" }}>{c.instructor}</span></td>
                    <td className="px-5 py-4"><Badge color="#4f8ef7">{c.category}</Badge></td>
                    <td className="px-5 py-4"><span className="text-xs" style={{ color: "#657166" }}>{c.level}</span></td>
                    <td className="px-5 py-4 text-center"><span className="text-xs" style={{ color: "#657166" }}>{c.modules}</span></td>
                    <td className="px-5 py-4 text-center"><span className="text-xs" style={{ color: "#657166" }}>{c.students}</span></td>
                    <td className="px-5 py-4"><Badge color={s.color}>{s.label}</Badge></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <IconBtn icon={Eye} color="#4f8ef7" title="Detail" onClick={() => setDetailModal(c)} />
                        {c.status === "pending" ? (
                          <>
                            <CapsuleBtn color="#10b981" bg="rgba(47,143,91,0.12)" onClick={() => approve(c.id)}>Setujui</CapsuleBtn>
                            <CapsuleBtn color="#D95C5C" bg="rgba(224,61,90,0.15)" onClick={() => setRejectModal(c)}>Tolak</CapsuleBtn>
                          </>
                        ) : (
                          <>
                            <IconBtn icon={Pencil} color="#4f8ef7" title="Edit" />
                            <IconBtn icon={Trash2} color="#D95C5C" title="Hapus" onClick={() => remove(c.id)} />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-8 text-center text-xs" style={{ color: "#8B948D" }}>Tidak ada kursus ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Modal Detail Kursus */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(5,12,26,0.85)", backdropFilter: "blur(8px)" }} onClick={() => setDetailModal(null)}>
          <GlassCard className="max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Detail Kursus</h3>
                <p className="text-xs" style={{ color: "#657166" }}>Informasi lengkap kursus</p>
              </div>
              <button onClick={() => setDetailModal(null)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <X size={16} style={{ color: "#657166" }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Judul Kursus</div>
                <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.title}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Instruktur</div>
                  <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.instructor}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Kategori</div>
                  <Badge color="#4f8ef7">{detailModal.category}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Jenjang/Kelas</div>
                  <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.level}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Status</div>
                  <Badge color={ADMIN_COURSE_STATUS[detailModal.status].color}>{ADMIN_COURSE_STATUS[detailModal.status].label}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Jumlah Materi</div>
                  <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.modules} materi</div>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Jumlah Siswa</div>
                  <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.students} siswa</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Modal Tolak Kursus */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(5,12,26,0.85)", backdropFilter: "blur(8px)" }} onClick={() => { setRejectModal(null); setRejectReason(""); }}>
          <GlassCard className="max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Tolak Kursus</h3>
                <p className="text-xs" style={{ color: "#657166" }}>{rejectModal.title}</p>
              </div>
              <button onClick={() => { setRejectModal(null); setRejectReason(""); }} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <X size={16} style={{ color: "#657166" }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#657166" }}>Alasan Penolakan *</label>
                <textarea
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="Jelaskan alasan penolakan kursus..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none"
                  style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setRejectModal(null); setRejectReason(""); }}
                  className="flex-1 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all"
                  style={{ borderColor: "#D9D4C7", color: "#657166" }}
                >
                  Batal
                </button>
                <button
                  onClick={rejectCourse}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: "linear-gradient(135deg,#e03d5a,#c62641)" }}
                >
                  Tolak Kursus
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── 3. Kelola Pengguna ───────────────────────────────────────────────────────
function AdminUsers() {
  const init: AdminUser[] = [
    { id: 1, name: "Ahmad Fauzi",    email: "ahmad@email.com",    school: "SMA Negeri 1 Jakarta",   grade: "Kelas 11", major: "IPA",   nisn: "0051234567",  packageStatus: "active",   joined: "2 Jan 2025",  status: "active" },
    { id: 2, name: "Siti Rahma",     email: "siti@email.com",     school: "SMA Negeri 3 Bandung",   grade: "Kelas 10", major: "IPS",   nisn: "0051234568",  packageStatus: "active",   joined: "5 Jan 2025",  status: "active" },
    { id: 3, name: "Budi Raharjo",   email: "budi@email.com",     school: "SMP Negeri 2 Jakarta",   grade: "Kelas 9",  major: "Umum",  nisn: "0041234569",  packageStatus: "inactive", joined: "8 Jan 2025",  status: "active" },
    { id: 4, name: "Eka Putri",      email: "eka@email.com",      school: "SMA Negeri 5 Surabaya",  grade: "Kelas 12", major: "IPA",   nisn: "0031234570",  packageStatus: "active",   joined: "15 Jan 2025", status: "active" },
  ];
  const [users, setUsers] = useState(init);
  const [search, setSearch] = useState("");
  const [detailModal, setDetailModal] = useState<AdminUser | null>(null);
  const { toast, show: showToast } = useToast();

  function toggleStatus(id: number) {
    setUsers(p => p.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" as const : "active" as const } : u));
    showToast("Status pengguna diperbarui.");
  }

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.school.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader title="Kelola Pengguna" subtitle={`${users.length} siswa terdaftar · ${users.filter(u => u.packageStatus === "active").length} paket aktif`} />
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8B948D" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari siswa atau sekolah..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
        </div>
        <span className="text-xs" style={{ color: "#657166" }}>{filtered.length} siswa terdaftar</span>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                {["Nama Siswa", "Email", "Sekolah", "Kelas", "Jurusan", "NIS/NISN", "Status Paket", "Status Akun", "Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[#F8FAF7]" style={{ borderBottom: "1px solid #F0EDE4" }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#4f8ef7,#2563eb)" }}>{u.name[0]}</div>
                      <div className="text-xs font-semibold" style={{ color: "#1F2A24" }}>{u.name}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{u.email}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{u.school}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{u.grade}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{u.major}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{u.nisn}</span></td>
                  <td className="px-5 py-3.5">
                    <Badge color={u.packageStatus === "active" ? "#2F8F5B" : "#8B948D"}>{u.packageStatus === "active" ? "Paket Aktif" : "Paket Kadaluarsa"}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge color={u.status === "active" ? "#4f8ef7" : "#8B948D"}>{u.status === "active" ? "Aktif" : "Nonaktif"}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <IconBtn icon={Eye} color="#4f8ef7" title="Detail" onClick={() => setDetailModal(u)} />
                      <IconBtn icon={Pencil} color="#4f8ef7" title="Edit" />
                      <CapsuleBtn
                        color={u.status === "active" ? "#8B948D" : "#10b981"}
                        bg={u.status === "active" ? "rgba(107,130,168,0.12)" : "rgba(47,143,91,0.12)"}
                        onClick={() => toggleStatus(u.id)}
                      >
                        {u.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                      </CapsuleBtn>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-5 py-8 text-center text-xs" style={{ color: "#8B948D" }}>Tidak ada siswa ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Modal Detail Siswa */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(5,12,26,0.85)", backdropFilter: "blur(8px)" }} onClick={() => setDetailModal(null)}>
          <GlassCard className="max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Detail Siswa</h3>
                <p className="text-xs" style={{ color: "#657166" }}>Informasi lengkap siswa</p>
              </div>
              <button onClick={() => setDetailModal(null)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <X size={16} style={{ color: "#657166" }} />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold mb-3" style={{ color: "#4f8ef7" }}>Data Akun</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Nama Lengkap</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.name}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Email</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.email}</div>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #E8E4DB", paddingTop: 20 }}>
                <div className="text-xs font-semibold mb-3" style={{ color: "#4f8ef7" }}>Data Sekolah</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Sekolah</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.school}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Kelas</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.grade}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Jurusan</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.major}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>NIS/NISN</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.nisn}</div>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #E8E4DB", paddingTop: 20 }}>
                <div className="text-xs font-semibold mb-3" style={{ color: "#4f8ef7" }}>Status</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Status Paket</div>
                    <Badge color={detailModal.packageStatus === "active" ? "#2F8F5B" : "#8B948D"}>
                      {detailModal.packageStatus === "active" ? "Paket Aktif" : "Paket Kadaluarsa"}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Status Akun</div>
                    <Badge color={detailModal.status === "active" ? "#4f8ef7" : "#8B948D"}>
                      {detailModal.status === "active" ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Tanggal Bergabung</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.joined}</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── 4. Instruktur ────────────────────────────────────────────────────────────
function AdminInstructors() {
  const init: AdminInstr[] = [
    { id: 1, name: "Pak Hendra Wijaya", email: "instruktur1@coursehub.id", profession: "Guru/Pengajar", expertise: "Bahasa Indonesia, IPS, Persiapan Ujian", institution: "SMA Negeri 1 Jakarta", experience: "5–10 tahun", courses: 3, students: 78, verifyStatus: "verified" },
    { id: 2, name: "Bu Ratna Dewi",     email: "instruktur2@coursehub.id", profession: "Guru/Pengajar", expertise: "Matematika, IPA, Persiapan Ujian",      institution: "SMA Negeri 2 Jakarta", experience: "5–10 tahun", courses: 3, students: 148, verifyStatus: "verified" },
    { id: 3, name: "Denny Haryanto",    email: "denny@coursehub.id",       profession: "Pengajar Bahasa Inggris", expertise: "Bahasa Inggris",      institution: "Lembaga Bahasa Mandiri", experience: "3–5 tahun", courses: 0, students: 0, verifyStatus: "pending" },
  ];
  const [instructors, setInstructors] = useState(init);
  const [detailModal, setDetailModal] = useState<AdminInstr | null>(null);
  const { toast, show: showToast } = useToast();

  function verify(id: number) {
    setInstructors(p => p.map(i => i.id === id ? { ...i, verifyStatus: "verified" as const } : i));
    showToast("Instruktur berhasil diverifikasi.");
  }
  function reject(id: number) {
    setInstructors(p => p.map(i => i.id === id ? { ...i, verifyStatus: "rejected" as const } : i));
    showToast("Instruktur ditolak.", false);
  }
  function toggleActive(id: number) {
    showToast("Status instruktur diperbarui.");
  }

  const VSTATUS: Record<string, { label: string; color: string }> = {
    verified: { label: "Terverifikasi", color: "#2F8F5B" },
    pending:  { label: "Pending",       color: "#D9A93E" },
    rejected: { label: "Ditolak",       color: "#D95C5C" },
  };

  const pending = instructors.filter(i => i.verifyStatus === "pending");

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader title="Instruktur" subtitle={`${instructors.length} terdaftar · ${instructors.filter(i => i.verifyStatus === "verified").length} terverifikasi · ${pending.length} pending`} />

      {pending.length > 0 && (
        <GlassCard className="p-4 flex items-center gap-3" style={{ borderColor: "rgba(217,169,62,0.25)", background: "rgba(217,169,62,0.05)" }}>
          <AlertCircle size={15} style={{ color: "#D9A93E", flexShrink: 0 }} />
          <span className="text-xs" style={{ color: "#657166" }}>
            <span className="font-semibold" style={{ color: "#D9A93E" }}>{pending.length} instruktur</span> menunggu verifikasi admin.
          </span>
        </GlassCard>
      )}

      <div className="text-xs" style={{ color: "#657166" }}>{instructors.length} instruktur terdaftar · {instructors.filter(i => i.verifyStatus === "verified").length} terverifikasi</div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                {["Nama Instruktur", "Email", "Profesi", "Bidang Keahlian", "Instansi", "Total Kursus", "Status Verifikasi", "Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {instructors.map(i => {
                const vs = VSTATUS[i.verifyStatus];
                return (
                  <tr key={i.id} className="hover:bg-[#F8FAF7]" style={{ borderBottom: "1px solid #F0EDE4" }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>{i.name[0]}</div>
                        <div className="text-xs font-semibold" style={{ color: "#1F2A24" }}>{i.name}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{i.email}</span></td>
                    <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{i.profession}</span></td>
                    <td className="px-5 py-3.5">
                      <div className="max-w-[180px]">
                        <Badge color="#2F8F5B">{i.expertise}</Badge>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{i.institution}</span></td>
                    <td className="px-5 py-3.5 text-center"><span className="text-xs" style={{ color: "#657166" }}>{i.courses}</span></td>
                    <td className="px-5 py-3.5"><Badge color={vs.color}>{vs.label}</Badge></td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <IconBtn icon={Eye} color="#4f8ef7" title="Detail" onClick={() => setDetailModal(i)} />
                        {i.verifyStatus === "pending" ? (
                          <>
                            <CapsuleBtn color="#10b981" bg="rgba(47,143,91,0.12)" onClick={() => verify(i.id)}>Verifikasi</CapsuleBtn>
                            <CapsuleBtn color="#D95C5C" bg="rgba(224,61,90,0.15)" onClick={() => reject(i.id)}>Tolak</CapsuleBtn>
                          </>
                        ) : (
                          <>
                            <IconBtn icon={Pencil} color="#4f8ef7" title="Edit" />
                            <CapsuleBtn color="#8B948D" bg="rgba(107,130,168,0.12)" onClick={() => toggleActive(i.id)}>Nonaktifkan</CapsuleBtn>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {instructors.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-8 text-center text-xs" style={{ color: "#8B948D" }}>Tidak ada instruktur ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Modal Detail Instruktur */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(5,12,26,0.85)", backdropFilter: "blur(8px)" }} onClick={() => setDetailModal(null)}>
          <GlassCard className="max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Detail Instruktur</h3>
                <p className="text-xs" style={{ color: "#657166" }}>Informasi lengkap instruktur</p>
              </div>
              <button onClick={() => setDetailModal(null)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <X size={16} style={{ color: "#657166" }} />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold mb-3" style={{ color: "#4f8ef7" }}>Data Akun</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Nama Lengkap</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.name}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Email</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.email}</div>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #E8E4DB", paddingTop: 20 }}>
                <div className="text-xs font-semibold mb-3" style={{ color: "#4f8ef7" }}>Profesi & Keahlian</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Profesi</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.profession}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Pengalaman Mengajar</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.experience}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Bidang Keahlian</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.expertise}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Instansi</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.institution}</div>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #E8E4DB", paddingTop: 20 }}>
                <div className="text-xs font-semibold mb-3" style={{ color: "#4f8ef7" }}>Statistik</div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Kursus Dibuat</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.courses} kursus</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Total Siswa</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{detailModal.students} siswa</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166" }}>Status Verifikasi</div>
                    <Badge color={VSTATUS[detailModal.verifyStatus].color}>{VSTATUS[detailModal.verifyStatus].label}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── 5. Enrolmen ──────────────────────────────────────────────────────────────
type AdminEnrollment = { 
  student: string; 
  course: string; 
  instructor: string; 
  date: string; 
  progress: number; 
  packageStatus: "active" | "inactive"; 
  certStatus: "Tersedia" | "Belum Tersedia";
  studentNisn: string;
  materiCompleted: number;
  materiTotal: number;
};

function AdminEnrollments() {
  const init: AdminEnrollment[] = [
    { student: "Ahmad Fauzi", course: "Matematika Kelas 10", instructor: "Bu Ratna Dewi", date: "10 Jan 2025", progress: 72, packageStatus: "active", certStatus: "Belum Tersedia", studentNisn: "0051234567", materiCompleted: 17, materiTotal: 24 },
    { student: "Ahmad Fauzi", course: "Bahasa Indonesia — Menulis & Membaca", instructor: "Pak Hendra Wijaya", date: "10 Jan 2025", progress: 100, packageStatus: "active", certStatus: "Tersedia", studentNisn: "0051234567", materiCompleted: 16, materiTotal: 16 },
    { student: "Siti Rahma", course: "Bahasa Indonesia — Menulis & Membaca", instructor: "Pak Hendra Wijaya", date: "12 Jan 2025", progress: 80, packageStatus: "active", certStatus: "Belum Tersedia", studentNisn: "0051234568", materiCompleted: 13, materiTotal: 16 },
    { student: "Eka Putri", course: "IPA Terpadu Kelas 8", instructor: "Bu Ratna Dewi", date: "2 Jan 2025", progress: 100, packageStatus: "active", certStatus: "Tersedia", studentNisn: "0031234570", materiCompleted: 20, materiTotal: 20 },
    { student: "Budi Raharjo", course: "IPS — Sejarah, Geografi & Ekonomi", instructor: "Pak Hendra Wijaya", date: "8 Jan 2025", progress: 45, packageStatus: "inactive", certStatus: "Belum Tersedia", studentNisn: "0041234569", materiCompleted: 10, materiTotal: 22 },
  ];

  const [enrollments, setEnrollments] = useState(init);
  const [filterStatus, setFilterStatus] = useState("all");
  const [detailModal, setDetailModal] = useState<AdminEnrollment | null>(null);
  const { toast, show: showToast } = useToast();

  const filtered = filterStatus === "all" ? enrollments : enrollments.filter(d => d.packageStatus === filterStatus);

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader title="Enrolmen" subtitle={`${enrollments.length} total enrolmen · ${enrollments.filter(d => d.packageStatus === "active").length} paket aktif`} />

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Enrolmen", val: String(enrollments.length), color: "#4f8ef7" },
          { label: "Paket Aktif", val: String(enrollments.filter(d => d.packageStatus === "active").length), color: "#2F8F5B" },
          { label: "Sertifikat Tersedia", val: String(enrollments.filter(d => d.certStatus === "Tersedia").length), color: "#a855f7" },
          { label: "Avg Progress", val: `${Math.round(enrollments.reduce((s, d) => s + d.progress, 0) / enrollments.length)}%`, color: "#D9A93E" },
        ].map(({ label, val, color }) => (
          <GlassCard key={label} className="p-4 text-center">
            <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color }}>{val}</div>
            <div className="text-xs" style={{ color: "#657166" }}>{label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[{ v: "all", l: "Semua", c: "#4f8ef7" }, { v: "active", l: "Paket Aktif", c: "#10b981" }, { v: "inactive", l: "Paket Kadaluarsa", c: "#8B948D" }].map(({ v, l, c }) => (
          <button key={v} onClick={() => setFilterStatus(v)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{ background: filterStatus === v ? `${c}20` : "#F3F0E8", color: filterStatus === v ? c : "#8B948D", border: `1px solid ${filterStatus === v ? `${c}35` : "#EDE8DF"}` }}>
            {l}
          </button>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                {["Nama Siswa", "Kursus", "Instruktur", "Tanggal Enrol", "Progress", "Status Paket", "Status Sertifikat", "Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAF7] cursor-pointer" style={{ borderBottom: "1px solid #F0EDE4" }} onClick={() => setDetailModal(e)}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#4f8ef7,#2563eb)" }}>{e.student[0]}</div>
                      <span className="text-xs font-medium" style={{ color: "#1F2A24" }}>{e.student}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166", maxWidth: 180, display: "block" }}>{e.course}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{e.instructor}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{e.date}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: "#EDE8DF" }}>
                        <div className="h-full rounded-full" style={{ width: `${e.progress}%`, background: "linear-gradient(90deg,#4f8ef7,#06c5d9)" }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: "#4f8ef7" }}>{e.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge color={e.packageStatus === "active" ? "#2F8F5B" : "#D95C5C"}>
                      {e.packageStatus === "active" ? "Paket Aktif" : "Paket Kadaluarsa"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge color={e.certStatus === "Tersedia" ? "#2F8F5B" : "#8B948D"}>
                      {e.certStatus}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5" onClick={(ev) => ev.stopPropagation()}>
                    <IconBtn icon={Eye} color="#4f8ef7" onClick={() => setDetailModal(e)} title="Detail" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Detail Modal */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetailModal(null)} />
          <GlassCard className="relative w-full max-w-lg p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Detail Enrolmen</h3>
              <button onClick={() => setDetailModal(null)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "#EDE8DF", border: "1px solid #E8E4DB" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                  style={{ background: "linear-gradient(135deg,#4f8ef7,#2563eb)" }}>{detailModal.student[0]}</div>
                <div className="flex-1">
                  <div className="text-sm font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{detailModal.student}</div>
                  <div className="text-xs" style={{ color: "#657166" }}>NISN: {detailModal.studentNisn}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "KURSUS", val: detailModal.course },
                  { label: "INSTRUKTUR", val: detailModal.instructor },
                  { label: "TANGGAL ENROL", val: detailModal.date },
                  { label: "PROGRESS", val: `${detailModal.progress}%` },
                  { label: "MATERI SELESAI", val: `${detailModal.materiCompleted} materi` },
                  { label: "MATERI TERSISA", val: `${detailModal.materiTotal - detailModal.materiCompleted} materi` },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{val}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl text-center" style={{ background: detailModal.packageStatus === "active" ? "rgba(47,143,91,0.08)" : "rgba(224,61,90,0.08)", border: `1px solid ${detailModal.packageStatus === "active" ? "rgba(47,143,91,0.10)" : "rgba(224,61,90,0.12)"}` }}>
                  <div className="text-xs mb-1" style={{ color: "#657166" }}>Status Paket</div>
                  <div className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: detailModal.packageStatus === "active" ? "#2F8F5B" : "#D95C5C" }}>
                    {detailModal.packageStatus === "active" ? "Paket Aktif" : "Paket Kadaluarsa"}
                  </div>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: detailModal.certStatus === "Tersedia" ? "rgba(47,143,91,0.08)" : "rgba(107,130,168,0.08)", border: `1px solid ${detailModal.certStatus === "Tersedia" ? "rgba(47,143,91,0.10)" : "rgba(107,130,168,0.12)"}` }}>
                  <div className="text-xs mb-1" style={{ color: "#657166" }}>Status Sertifikat</div>
                  <div className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: detailModal.certStatus === "Tersedia" ? "#2F8F5B" : "#8B948D" }}>
                    {detailModal.certStatus}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INSTRUCTOR DASHBOARD — per-account data & types
// ═══════════════════════════════════════════════════════════════════════════════
type InstrCourse = { id: number; title: string; category: string; level: string; students: number; modules: number; rating: number; status: "active" | "draft" | "pending" | "rejected"; accent: string; };
type InstrMaterial = { id: number; courseId: number; course: string; title: string; type: "video" | "quiz" | "text"; duration: string };
type InstrEnrollment = { student: string; course: string; date: string; progress: number; packageStatus: "active" | "inactive"; certStatus: "Tersedia" | "Belum Tersedia" };
type InstrCommRow = { period: string; course: string; students: number; commission: string; status: "paid" | "waiting" | "processing" };
type InstrWithdrawRow = { date: string; amount: string; bank: string; account: string; status: "paid" | "waiting" | "processing" };
type InstrActivity = { msg: string; time: string; icon: React.ElementType; color: string };
type InstrAccount = {
  id: InstrId; name: string; username: string; email: string; phone: string;
  profession: string; expertise: string; education: string; institution: string;
  experience: string; description: string;
  totalStudents: number; avgRating: number; totalMateriCount: number;
  commTotal: string; commMonth: string; commReady: string;
  courses: InstrCourse[]; materials: InstrMaterial[];
  enrollments: InstrEnrollment[]; commHistory: InstrCommRow[];
  withdrawHistory: InstrWithdrawRow[]; activity: InstrActivity[];
};

const STATUS_INSTR: Record<string, { label: string; color: string }> = {
  active:   { label: "Aktif",          color: "#2F8F5B" },
  draft:    { label: "Draft",          color: "#657166" },
  pending:  { label: "Pending Review", color: "#D9A93E" },
  rejected: { label: "Ditolak",        color: "#D95C5C" },
};
const COMM_STATUS: Record<string, { label: string; color: string }> = {
  paid:       { label: "Dibayar",   color: "#2F8F5B" },
  waiting:    { label: "Menunggu",  color: "#D9A93E" },
  processing: { label: "Diproses", color: "#D9A93E" },
};

const INSTR_ACCOUNTS: Record<InstrId, InstrAccount> = {
  1: {
    id: 1, name: "Pak Hendra Wijaya", username: "instruktur1.com",
    email: "instruktur1@coursehub.id", phone: "0812-1111-2025",
    profession: "Guru / Pengajar", expertise: "Bahasa Indonesia, IPS, Persiapan Ujian",
    education: "S1 Pendidikan Bahasa Indonesia", institution: "SMA Negeri 1 Jakarta",
    experience: "7 tahun",
    description: "Pengajar yang berfokus pada Bahasa Indonesia, literasi, pemahaman teks, IPS dasar, dan persiapan ujian sekolah.",
    totalStudents: 126, avgRating: 4.8, totalMateriCount: 44,
    commTotal: "Rp2.750.000", commMonth: "Rp1.100.000", commReady: "Rp1.100.000",
    courses: [
      { id: 101, title: "Bahasa Indonesia — Menulis & Membaca", category: "Bahasa Indonesia", level: "SMP/SMA",      students: 42, modules: 16, rating: 4.8, status: "active",  accent: "#f59e0b" },
      { id: 102, title: "IPS — Sejarah, Geografi & Ekonomi",   category: "IPS",              level: "SMP Kelas 9",  students: 36, modules: 22, rating: 4.7, status: "active",  accent: "#ec4899" },
      { id: 103, title: "Persiapan Ujian Bahasa Indonesia",     category: "Persiapan Ujian",  level: "SMA Kelas 12", students: 0,  modules: 6,  rating: 0,   status: "pending", accent: "#a855f7" },
    ],
    materials: [
      { id: 1001, courseId: 101, course: "Bahasa Indonesia — Menulis & Membaca", title: "Mengenal Teks Eksposisi",        type: "video", duration: "14:30" },
      { id: 1002, courseId: 101, course: "Bahasa Indonesia — Menulis & Membaca", title: "Struktur Teks Eksposisi",        type: "text",  duration: "—" },
      { id: 1003, courseId: 101, course: "Bahasa Indonesia — Menulis & Membaca", title: "Menulis Paragraf Argumentatif",  type: "video", duration: "18:45" },
      { id: 1004, courseId: 101, course: "Bahasa Indonesia — Menulis & Membaca", title: "Latihan Membaca Kritis",         type: "quiz",  duration: "—" },
      { id: 1005, courseId: 102, course: "IPS — Sejarah, Geografi & Ekonomi",   title: "Sejarah Indonesia Masa Awal",    type: "video", duration: "22:00" },
      { id: 1006, courseId: 102, course: "IPS — Sejarah, Geografi & Ekonomi",   title: "Letak Geografis Indonesia",      type: "text",  duration: "—" },
      { id: 1007, courseId: 102, course: "IPS — Sejarah, Geografi & Ekonomi",   title: "Kegiatan Ekonomi Masyarakat",    type: "quiz",  duration: "—" },
      { id: 1008, courseId: 103, course: "Persiapan Ujian Bahasa Indonesia",     title: "Strategi Ujian Bahasa Indonesia",type: "video", duration: "20:00" },
    ],
    enrollments: [
      { student: "Siti Rahma",       course: "Bahasa Indonesia — Menulis & Membaca", date: "12 Jan 2025", progress: 80,  packageStatus: "active", certStatus: "Belum Tersedia" },
      { student: "Ahmad Fauzi",      course: "Bahasa Indonesia — Menulis & Membaca", date: "10 Jan 2025", progress: 100, packageStatus: "active", certStatus: "Tersedia" },
      { student: "Gita Nurfadillah", course: "IPS — Sejarah, Geografi & Ekonomi",   date: "8 Jan 2025",  progress: 45,  packageStatus: "active", certStatus: "Belum Tersedia" },
      { student: "Budi Raharjo",     course: "Persiapan Ujian Bahasa Indonesia",     date: "7 Jan 2025",  progress: 20,  packageStatus: "active", certStatus: "Belum Tersedia" },
    ],
    commHistory: [
      { period: "Januari 2025",  course: "Bahasa Indonesia",  students: 42, commission: "Rp1.100.000", status: "waiting" },
      { period: "Desember 2024", course: "IPS",               students: 36, commission: "Rp850.000",   status: "paid" },
      { period: "November 2024", course: "Bahasa Indonesia",  students: 38, commission: "Rp800.000",   status: "paid" },
    ],
    withdrawHistory: [
      { date: "8 Jan 2025",  amount: "Rp850.000", bank: "BCA", account: "1234567890", status: "paid" },
      { date: "8 Des 2024",  amount: "Rp800.000", bank: "BCA", account: "1234567890", status: "paid" },
    ],
    activity: [
      { msg: 'Ahmad Fauzi menyelesaikan materi "Struktur Teks Eksposisi"',          time: "30 menit lalu", icon: CheckCircle2, color: "#2F8F5B" },
      { msg: "Siti Rahma mengikuti kursus Bahasa Indonesia — Menulis & Membaca",    time: "2 jam lalu",    icon: UserPlus,     color: "#4f8ef7" },
      { msg: "Kursus Persiapan Ujian BI sedang menunggu review admin",              time: "1 hari lalu",   icon: Clock,        color: "#D9A93E" },
    ],
  },
  2: {
    id: 2, name: "Bu Ratna Dewi", username: "instruktur2.com",
    email: "instruktur2@coursehub.id", phone: "0812-2222-2025",
    profession: "Guru / Pengajar", expertise: "Matematika, IPA, Persiapan Ujian",
    education: "S1 Pendidikan Matematika", institution: "SMA Negeri 2 Jakarta",
    experience: "8 tahun",
    description: "Pengajar yang membantu siswa memahami Matematika, IPA, dan persiapan ujian melalui materi yang runtut dan latihan terarah.",
    totalStudents: 148, avgRating: 4.8, totalMateriCount: 52,
    commTotal: "Rp3.594.000", commMonth: "Rp1.437.000", commReady: "Rp1.437.000",
    courses: [
      { id: 201, title: "Matematika Kelas 10 — Dasar sampai Mahir", category: "Matematika",      level: "SMA Kelas 10", students: 84, modules: 24, rating: 4.8, status: "active",  accent: "#4f8ef7" },
      { id: 202, title: "IPA Terpadu Kelas 8",                      category: "IPA",             level: "SMP Kelas 8",  students: 48, modules: 20, rating: 4.6, status: "active",  accent: "#10b981" },
      { id: 203, title: "Persiapan UTBK — Saintek",                 category: "Persiapan Ujian", level: "SMA Kelas 12", students: 16, modules: 8,  rating: 4.5, status: "pending", accent: "#06c5d9" },
    ],
    materials: [
      { id: 2001, courseId: 201, course: "Matematika Kelas 10 — Dasar sampai Mahir", title: "Pengenalan Aljabar dan Fungsi", type: "video", duration: "14:22" },
      { id: 2002, courseId: 201, course: "Matematika Kelas 10 — Dasar sampai Mahir", title: "Trigonometri Dasar",            type: "video", duration: "22:15" },
      { id: 2003, courseId: 201, course: "Matematika Kelas 10 — Dasar sampai Mahir", title: "Fungsi Kuadrat dan Grafiknya",  type: "video", duration: "19:40" },
      { id: 2004, courseId: 201, course: "Matematika Kelas 10 — Dasar sampai Mahir", title: "Latihan Soal Aljabar",          type: "quiz",  duration: "—" },
      { id: 2005, courseId: 202, course: "IPA Terpadu Kelas 8",                      title: "Sistem Pernapasan Manusia",     type: "video", duration: "20:00" },
      { id: 2006, courseId: 202, course: "IPA Terpadu Kelas 8",                      title: "Gaya dan Gerak",               type: "text",  duration: "—" },
      { id: 2007, courseId: 202, course: "IPA Terpadu Kelas 8",                      title: "Struktur Tumbuhan",             type: "quiz",  duration: "—" },
      { id: 2008, courseId: 203, course: "Persiapan UTBK — Saintek",                 title: "Strategi Mengerjakan TPS",     type: "video", duration: "22:15" },
    ],
    enrollments: [
      { student: "Ahmad Fauzi",  course: "Matematika Kelas 10 — Dasar sampai Mahir", date: "10 Jan 2025", progress: 72,  packageStatus: "active", certStatus: "Belum Tersedia" },
      { student: "Budi Raharjo", course: "Matematika Kelas 10 — Dasar sampai Mahir", date: "8 Jan 2025",  progress: 50,  packageStatus: "active", certStatus: "Belum Tersedia" },
      { student: "Eka Putri",    course: "IPA Terpadu Kelas 8",                      date: "2 Jan 2025",  progress: 100, packageStatus: "active", certStatus: "Tersedia" },
      { student: "Citra Dewi",   course: "Persiapan UTBK — Saintek",                 date: "5 Jan 2025",  progress: 30,  packageStatus: "active", certStatus: "Belum Tersedia" },
    ],
    commHistory: [
      { period: "Januari 2025",  course: "Matematika Kelas 10", students: 84, commission: "Rp1.437.000", status: "waiting" },
      { period: "Desember 2024", course: "IPA Terpadu Kelas 8", students: 48, commission: "Rp1.100.000", status: "paid" },
      { period: "November 2024", course: "Matematika Kelas 10", students: 80, commission: "Rp1.057.000", status: "paid" },
    ],
    withdrawHistory: [
      { date: "8 Jan 2025",  amount: "Rp1.100.000", bank: "Mandiri", account: "0987654321", status: "paid" },
      { date: "8 Des 2024",  amount: "Rp1.057.000", bank: "Mandiri", account: "0987654321", status: "paid" },
    ],
    activity: [
      { msg: 'Budi Raharjo menyelesaikan materi "Fungsi Kuadrat dan Grafiknya"', time: "1 jam lalu",  icon: CheckCircle2, color: "#2F8F5B" },
      { msg: "Eka Putri mengikuti kursus Matematika Kelas 10",                   time: "3 jam lalu",  icon: UserPlus,     color: "#4f8ef7" },
      { msg: "Kursus Persiapan UTBK — Saintek sedang menunggu review admin",     time: "1 hari lalu", icon: Clock,        color: "#D9A93E" },
    ],
  },
};

const INSTR_NOTIFS: Record<InstrId, Notif[]> = {
  1: [
    { id: 1, title: "Kursus menunggu review",    body: "Kursus Persiapan Ujian BI sedang menunggu review admin.",         tag: "Baru",     read: false, time: "1 jam lalu" },
    { id: 2, title: "Siswa baru bergabung",       body: "Siti Rahma mengikuti kursus Bahasa Indonesia.",                  tag: "Info",     read: false, time: "2 jam lalu" },
    { id: 3, title: "Materi berhasil ditambah",   body: "Materi Struktur Teks Eksposisi berhasil ditambahkan.",           tag: "Progress", read: false, time: "3 jam lalu" },
    { id: 4, title: "Siswa menyelesaikan materi", body: "Ahmad Fauzi menyelesaikan materi Latihan Membaca Kritis.",       tag: "Progress", read: true,  time: "5 jam lalu" },
    { id: 5, title: "Komisi diperbarui",          body: "Komisi Januari 2025 sudah diperbarui.",                          tag: "Paket",    read: true,  time: "1 hari lalu" },
  ],
  2: [
    { id: 1, title: "Kursus menunggu review",    body: "Kursus Persiapan UTBK — Saintek sedang menunggu review admin.",   tag: "Baru",     read: false, time: "30 menit lalu" },
    { id: 2, title: "Siswa baru bergabung",       body: "Eka Putri mengikuti kursus Matematika Kelas 10.",                tag: "Info",     read: false, time: "2 jam lalu" },
    { id: 3, title: "Materi berhasil ditambah",   body: "Materi Fungsi Kuadrat berhasil ditambahkan.",                    tag: "Progress", read: false, time: "4 jam lalu" },
    { id: 4, title: "Siswa menyelesaikan materi", body: "Eka Putri menyelesaikan semua materi IPA Terpadu Kelas 8.",      tag: "Progress", read: true,  time: "6 jam lalu" },
    { id: 5, title: "Komisi diperbarui",          body: "Komisi Januari 2025 sudah diperbarui.",                          tag: "Paket",    read: true,  time: "1 hari lalu" },
  ],
};

// Shared state for instructor passed from DashboardPage
type InstrProps = {
  account: InstrAccount;
  courses: InstrCourse[];
  setCourses: React.Dispatch<React.SetStateAction<InstrCourse[]>>;
  materials: InstrMaterial[];
  setMaterials: React.Dispatch<React.SetStateAction<InstrMaterial[]>>;
  setActiveNav: (v: string) => void;
  materialFilter: string;
  setMaterialFilter: (v: string) => void;
};


// ─── 1. Beranda ───────────────────────────────────────────────────────────────
function InstructorOverview({ account, courses, materials, setActiveNav }: InstrProps) {
  const activeC = courses.filter(c => c.status === "active");
  const pendingC = courses.filter(c => c.status === "pending");
  const totalStudents = courses.reduce((s, c) => s + c.students, 0);

  return (
    <div className="flex flex-col gap-5">
      {pendingC.length > 0 && (
        <GlassCard className="p-4 flex items-center gap-3" style={{ borderColor: "rgba(217,169,62,0.25)", background: "rgba(217,169,62,0.05)" }}>
          <AlertCircle size={16} style={{ color: "#D9A93E", flexShrink: 0 }} />
          <span className="text-xs" style={{ color: "#657166" }}>
            <span className="font-semibold" style={{ color: "#D9A93E" }}>{pendingC.length} kursus</span> sedang menunggu review admin sebelum aktif.
          </span>
        </GlassCard>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Kursus",     val: String(courses.length),   icon: BookOpen,  color: "#4f8ef7", nav: "my-courses" },
          { label: "Total Materi",     val: String(materials.length), icon: FileText,  color: "#2F8F5B", nav: "materials" },
          { label: "Total Siswa",      val: String(totalStudents),    icon: Users,     color: "#a855f7", nav: "enrollments" },
          { label: "Komisi Bulan Ini", val: account.commMonth,        icon: BarChart2, color: "#D9A93E", nav: "commission" },
        ].map(({ label, val, icon: Icon, color, nav }) => (
          <GlassCard key={label} className="p-5 cursor-pointer transition-all hover:-translate-y-0.5" onClick={() => setActiveNav(nav)}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}18`, color }}><Icon size={20} /></div>
            <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{val}</div>
            <div className="text-xs" style={{ color: "#657166" }}>{label}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {activeC.map(c => (
          <GlassCard key={c.id} className="p-5" style={{ borderColor: `${c.accent}20` }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <Badge color={c.accent}>{c.category}</Badge>
                <div className="font-bold text-sm mt-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{c.title}</div>
              </div>
              {c.rating > 0 && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star size={12} fill="#f59e0b" style={{ color: "#D9A93E" }} />
                  <span className="text-xs font-semibold" style={{ color: "#D9A93E" }}>{c.rating}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[{ l: "Siswa", v: c.students }, { l: "Materi", v: c.modules }, { l: "Status", v: "Aktif" }].map(({ l, v }) => (
                <div key={l} className="rounded-xl p-2.5 text-center" style={{ background: "#F3F0E8" }}>
                  <div className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{v}</div>
                  <div className="text-[10px]" style={{ color: "#657166" }}>{l}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Aktivitas Terkini</div>
        <div className="flex flex-col gap-1">
          {account.activity.map(({ msg, time, icon: Icon, color }) => (
            <div key={msg} className="flex items-start gap-3 px-3 py-3 border-b last:border-b-0 rounded-xl hover:bg-[#F3F0E8] transition-all" style={{ borderColor: "#EDE8DF" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${color}15`, color }}><Icon size={14} /></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs leading-relaxed font-medium" style={{ color: "#1F2A24" }}>{msg}</div>
                <div className="text-[10px] mt-1" style={{ color: "#8B948D", fontFamily: "'JetBrains Mono',monospace" }}>{time}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ─── 2. Kursus Saya ───────────────────────────────────────────────────────────
const KURSUS_CATEGORIES = ["Matematika","Bahasa Inggris","Bahasa Indonesia","IPA","IPS","Persiapan Ujian","Teknologi","Desain"];
const KURSUS_LEVELS = ["SD","SMP","SMP Kelas 7","SMP Kelas 8","SMP Kelas 9","SMA Kelas 10","SMA Kelas 11","SMA Kelas 12","Umum"];
const ACCENT_LIST = ["#4f8ef7","#a855f7","#10b981","#f59e0b","#06c5d9","#ec4899"];

function ModalOverlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <GlassCard className="relative w-full max-w-lg p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
        {children}
      </GlassCard>
    </div>
  );
}

function FieldInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
    </div>
  );
}

function FieldSelect({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }}>
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ModalActions({ onCancel, onConfirm, confirmLabel = "Simpan", confirmStyle }: { onCancel: () => void; onConfirm: () => void; confirmLabel?: string; confirmStyle?: React.CSSProperties }) {
  return (
    <div className="flex gap-3 mt-1">
      <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold"
        style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Batal</button>
      <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
        style={confirmStyle ?? { background: "linear-gradient(135deg,#a855f7,#4f8ef7)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{confirmLabel}</button>
    </div>
  );
}

function InstructorMyCourses({ courses, setCourses, setActiveNav, setMaterialFilter }: InstrProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [detailCourse, setDetailCourse] = useState<InstrCourse | null>(null);
  const [editCourse, setEditCourse] = useState<InstrCourse | null>(null);
  const [deleteCourse, setDeleteCourse] = useState<InstrCourse | null>(null);
  const [createForm, setCreateForm] = useState({ title: "", desc: "", category: "Matematika", level: "SMP/SMA" });
  const [editForm, setEditForm] = useState({ title: "", desc: "", category: "Matematika", level: "SMP/SMA" });
  const { toast, show } = useToast();

  function handleCreate() {
    if (!createForm.title.trim()) return;
    setCourses(prev => [...prev, {
      id: Date.now(), title: createForm.title, category: createForm.category,
      level: createForm.level, students: 0, modules: 0, rating: 0, status: "pending",
      accent: ACCENT_LIST[prev.length % ACCENT_LIST.length],
    }]);
    setShowCreate(false);
    setCreateForm({ title: "", desc: "", category: "Matematika", level: "SMP/SMA" });
    show("Kursus dikirim untuk review. Status: Pending Review.");
  }

  function openEdit(c: InstrCourse) {
    setEditCourse(c);
    setEditForm({ title: c.title, desc: "", category: c.category, level: c.level });
  }

  function handleEdit() {
    if (!editCourse || !editForm.title.trim()) return;
    setCourses(prev => prev.map(c => c.id === editCourse.id ? { ...c, title: editForm.title, category: editForm.category, level: editForm.level } : c));
    setEditCourse(null);
    show("Kursus berhasil diperbarui.");
  }

  function handleDelete() {
    if (!deleteCourse) return;
    setCourses(prev => prev.filter(c => c.id !== deleteCourse.id));
    setDeleteCourse(null);
    show("Kursus berhasil dihapus.", false);
  }

  function handleKelolaMateriByCourse(c: InstrCourse) {
    setMaterialFilter(String(c.id));
    setActiveNav("materials");
  }

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader
        title="Kursus Saya"
        subtitle={`${courses.length} kursus · ${courses.filter(c => c.status === "active").length} aktif · ${courses.filter(c => c.status === "pending").length} pending`}
        action={<ActionBtn variant="primary" icon={Plus} onClick={() => setShowCreate(true)}>Buat Kursus Baru</ActionBtn>}
      />

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                {["Judul Kursus","Kategori","Jenjang/Kelas","Materi","Siswa","Rating","Status","Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map(c => {
                const s = STATUS_INSTR[c.status];
                const isPending = c.status === "pending";
                return (
                  <tr key={c.id} className="hover:bg-[#F8FAF7]" style={{ borderBottom: "1px solid #F0EDE4" }}>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-xs" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24", maxWidth: 200 }}>{c.title}</div>
                    </td>
                    <td className="px-5 py-4"><Badge color={c.accent}>{c.category}</Badge></td>
                    <td className="px-5 py-4"><span className="text-xs" style={{ color: "#657166" }}>{c.level}</span></td>
                    <td className="px-5 py-4"><span className="text-xs" style={{ color: "#657166" }}>{c.modules}</span></td>
                    <td className="px-5 py-4"><span className="text-xs" style={{ color: "#657166" }}>{c.students}</span></td>
                    <td className="px-5 py-4">
                      {c.rating > 0
                        ? <div className="flex items-center gap-1"><Star size={12} fill="#f59e0b" style={{ color: "#D9A93E" }} /><span className="text-xs font-semibold" style={{ color: "#D9A93E" }}>{c.rating}</span></div>
                        : <span className="text-xs" style={{ color: "#8B948D" }}>—</span>}
                    </td>
                    <td className="px-5 py-4"><Badge color={s.color}>{s.label}</Badge></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <CapsuleBtn color="#10b981" bg="rgba(47,143,91,0.12)" onClick={() => setDetailCourse(c)}>Detail</CapsuleBtn>
                        {!isPending && <CapsuleBtn color="#4f8ef7" bg="#D9D4C7" onClick={() => openEdit(c)}>Edit</CapsuleBtn>}
                        {!isPending && <CapsuleBtn color="#a855f7" bg="#E6F3EB" onClick={() => handleKelolaMateriByCourse(c)}>Kelola Materi</CapsuleBtn>}
                        <IconBtn icon={Trash2} color="#D95C5C" title="Hapus" onClick={() => setDeleteCourse(c)} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Modal Buat Kursus Baru */}
      {showCreate && (
        <ModalOverlay onClose={() => setShowCreate(false)}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Buat Kursus Baru</h3>
              <p className="text-xs mt-0.5" style={{ color: "#657166" }}>Kursus akan masuk Pending Review sampai disetujui admin.</p>
            </div>
            <button onClick={() => setShowCreate(false)} style={{ color: "#657166" }}><X size={20} /></button>
          </div>
          <div className="flex flex-col gap-4">
            <FieldInput label="JUDUL KURSUS" value={createForm.title} onChange={v => setCreateForm(f => ({ ...f, title: v }))} placeholder="Judul kursus kamu" />
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>DESKRIPSI</label>
              <textarea value={createForm.desc} onChange={e => setCreateForm(f => ({ ...f, desc: e.target.value }))} placeholder="Deskripsi singkat" rows={2}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldSelect label="KATEGORI" value={createForm.category} onChange={v => setCreateForm(f => ({ ...f, category: v }))} opts={KURSUS_CATEGORIES} />
              <FieldSelect label="JENJANG / KELAS" value={createForm.level} onChange={v => setCreateForm(f => ({ ...f, level: v }))} opts={KURSUS_LEVELS} />
            </div>
            <ModalActions onCancel={() => setShowCreate(false)} onConfirm={handleCreate} confirmLabel="Kirim untuk Review" />
          </div>
        </ModalOverlay>
      )}

      {/* Modal Detail Kursus */}
      {detailCourse && (
        <ModalOverlay onClose={() => setDetailCourse(null)}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Detail Kursus</h3>
            <button onClick={() => setDetailCourse(null)} style={{ color: "#657166" }}><X size={20} /></button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl p-4" style={{ background: "#F3F0E8", border: "1px solid #E8E4DB" }}>
              <div className="font-bold text-sm mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{detailCourse.title}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge color={detailCourse.accent}>{detailCourse.category}</Badge>
                <Badge color={STATUS_INSTR[detailCourse.status].color}>{STATUS_INSTR[detailCourse.status].label}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Jenjang/Kelas", val: detailCourse.level },
                { label: "Jumlah Materi", val: String(detailCourse.modules) },
                { label: "Jumlah Siswa",  val: String(detailCourse.students) },
                { label: "Rating",         val: detailCourse.rating > 0 ? String(detailCourse.rating) : "—" },
              ].map(({ label, val }) => (
                <div key={label} className="rounded-xl p-3" style={{ background: "#F7F5EF", border: "1px solid #D9D4C7" }}>
                  <div className="text-[10px] mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
                  <div className="font-semibold text-sm" style={{ color: "#1F2A24" }}>{val}</div>
                </div>
              ))}
            </div>
            {detailCourse.status === "pending" && (
              <div className="flex items-center gap-2 rounded-xl p-3" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <AlertCircle size={14} style={{ color: "#D9A93E", flexShrink: 0 }} />
                <span className="text-xs" style={{ color: "#657166" }}>Kursus sedang menunggu review admin. Edit dan kelola materi tersedia setelah disetujui.</span>
              </div>
            )}
            <button onClick={() => setDetailCourse(null)} className="w-full py-2.5 rounded-xl border text-sm font-semibold"
              style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Tutup</button>
          </div>
        </ModalOverlay>
      )}

      {/* Modal Edit Kursus */}
      {editCourse && (
        <ModalOverlay onClose={() => setEditCourse(null)}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Edit Kursus</h3>
              <p className="text-xs mt-0.5" style={{ color: "#657166" }}>Perbarui informasi kursus kamu.</p>
            </div>
            <button onClick={() => setEditCourse(null)} style={{ color: "#657166" }}><X size={20} /></button>
          </div>
          <div className="flex flex-col gap-4">
            <FieldInput label="JUDUL KURSUS" value={editForm.title} onChange={v => setEditForm(f => ({ ...f, title: v }))} placeholder="Judul kursus" />
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>DESKRIPSI</label>
              <textarea value={editForm.desc} onChange={e => setEditForm(f => ({ ...f, desc: e.target.value }))} placeholder="Deskripsi singkat" rows={2}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldSelect label="KATEGORI" value={editForm.category} onChange={v => setEditForm(f => ({ ...f, category: v }))} opts={KURSUS_CATEGORIES} />
              <FieldSelect label="JENJANG / KELAS" value={editForm.level} onChange={v => setEditForm(f => ({ ...f, level: v }))} opts={KURSUS_LEVELS} />
            </div>
            <ModalActions onCancel={() => setEditCourse(null)} onConfirm={handleEdit} confirmLabel="Simpan Perubahan" />
          </div>
        </ModalOverlay>
      )}

      {/* Konfirmasi Hapus */}
      {deleteCourse && (
        <ModalOverlay onClose={() => setDeleteCourse(null)}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Hapus Kursus</h3>
            <button onClick={() => setDeleteCourse(null)} style={{ color: "#657166" }}><X size={20} /></button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl p-4" style={{ background: "rgba(224,61,90,0.07)", border: "1px solid rgba(224,61,90,0.2)" }}>
              <div className="flex items-start gap-3">
                <AlertCircle size={16} style={{ color: "#D95C5C", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "#1F2A24" }}>Konfirmasi penghapusan kursus</div>
                  <div className="text-xs" style={{ color: "#657166" }}>Kursus <span className="font-semibold" style={{ color: "#1F2A24" }}>"{deleteCourse.title}"</span> akan dihapus permanen beserta semua datanya. Tindakan ini tidak bisa dibatalkan.</div>
                </div>
              </div>
            </div>
            <ModalActions onCancel={() => setDeleteCourse(null)} onConfirm={handleDelete} confirmLabel="Hapus Kursus"
              confirmStyle={{ background: "linear-gradient(135deg,#e03d5a,#be123c)", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

// ─── 3. Materi ────────────────────────────────────────────────────────────────
function MatTypeIcon({ type }: { type: "video" | "quiz" | "text" }) {
  const cfg = {
    video: { bg: "#E6F3EB", color: "#4f8ef7", icon: Video },
    quiz:  { bg: "rgba(217,169,62,0.12)",  color: "#D9A93E", icon: FileText },
    text:  { bg: "rgba(47,143,91,0.12)",  color: "#2F8F5B", icon: FileText },
  }[type];
  const Icon = cfg.icon;
  return (
    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg, color: cfg.color }}>
      <Icon size={17} />
    </div>
  );
}

function InstructorMaterials({ courses, materials, setMaterials, materialFilter, setMaterialFilter }: InstrProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [editMaterial, setEditMaterial] = useState<InstrMaterial | null>(null);
  const [deleteMaterial, setDeleteMaterial] = useState<InstrMaterial | null>(null);
  const [filterCourse, setFilterCourse] = useState(materialFilter);
  const [addForm, setAddForm] = useState({ title: "", url: "", type: "video" as "video" | "quiz" | "text", courseId: "" });
  const [editForm, setEditForm] = useState({ title: "", url: "", type: "video" as "video" | "quiz" | "text" });
  const { toast, show } = useToast();

  const activeCourses = courses.filter(c => c.status === "active");
  const allCourses = courses;
  const filtered = filterCourse === "all" ? materials : materials.filter(m => String(m.courseId) === filterCourse);

  function handleFilterChange(val: string) {
    setFilterCourse(val);
    setMaterialFilter(val);
  }

  function handleAdd() {
    if (!addForm.title.trim() || !addForm.courseId) return;
    const course = courses.find(c => c.id === Number(addForm.courseId));
    if (!course) return;
    const newM: InstrMaterial = {
      id: Date.now(), courseId: Number(addForm.courseId), course: course.title,
      title: addForm.title, type: addForm.type, duration: addForm.type === "video" ? "—:—" : "—",
    };
    setMaterials(prev => [...prev, newM]);
    setShowAdd(false);
    setAddForm({ title: "", url: "", type: "video", courseId: "" });
    show("Materi berhasil ditambahkan.");
  }

  function openEdit(m: InstrMaterial) {
    setEditMaterial(m);
    setEditForm({ title: m.title, url: "", type: m.type });
  }

  function handleEdit() {
    if (!editMaterial || !editForm.title.trim()) return;
    setMaterials(prev => prev.map(m => m.id === editMaterial.id ? { ...m, title: editForm.title, type: editForm.type } : m));
    setEditMaterial(null);
    show("Materi berhasil diperbarui.");
  }

  function handleDelete() {
    if (!deleteMaterial) return;
    setMaterials(prev => prev.filter(m => m.id !== deleteMaterial.id));
    setDeleteMaterial(null);
    show("Materi berhasil dihapus.", false);
  }

  const typeColor = (t: "video" | "quiz" | "text") => t === "video" ? "#4f8ef7" : t === "quiz" ? "#f59e0b" : "#10b981";

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader
        title="Materi"
        subtitle={`${materials.length} materi total · ${filtered.length} ditampilkan`}
        action={<ActionBtn variant="primary" icon={Plus} onClick={() => setShowAdd(true)}>Tambah Materi</ActionBtn>}
      />

      {/* Filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {[{ val: "all", label: "Semua Materi" }, ...allCourses.map(c => ({ val: String(c.id), label: c.title }))].map(({ val, label }) => (
          <button key={val} onClick={() => handleFilterChange(val)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all max-w-[180px] truncate"
            style={{ background: filterCourse === val ? "#E6F3EB" : "#F3F0E8", color: filterCourse === val ? "#2F8F5B" : "#657166", border: `1px solid ${filterCourse === val ? "#D9D4C7" : "#D9D4C7"}` }}>
            {label}
          </button>
        ))}
      </div>

      {activeCourses.length === 0 && (
        <GlassCard className="p-7 text-center" style={{ borderColor: "rgba(245,158,11,0.2)", background: "rgba(245,158,11,0.04)" }}>
          <AlertCircle size={28} className="mx-auto mb-3" style={{ color: "#D9A93E" }} />
          <div className="text-sm font-semibold mb-1" style={{ color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Belum ada kursus aktif</div>
          <div className="text-xs" style={{ color: "#657166" }}>Materi hanya bisa ditambahkan ke kursus yang sudah disetujui admin.</div>
        </GlassCard>
      )}

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map(m => (
            <GlassCard key={m.id} className="p-4 flex items-center gap-4">
              <MatTypeIcon type={m.type} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] mb-0.5" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{m.course}</div>
                <div className="font-semibold text-sm truncate" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{m.title}</div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{m.duration}</span>
                <Badge color={typeColor(m.type)}>{m.type}</Badge>
                <IconBtn icon={Pencil} color="#4f8ef7" title="Edit" onClick={() => openEdit(m)} />
                <IconBtn icon={Trash2} color="#D95C5C" title="Hapus" onClick={() => setDeleteMaterial(m)} />
              </div>
            </GlassCard>
          ))}
        </div>
      ) : activeCourses.length > 0 ? (
        <GlassCard className="p-8 text-center">
          <div className="text-sm" style={{ color: "#8B948D" }}>Belum ada materi untuk filter ini. Klik Tambah Materi untuk mulai.</div>
        </GlassCard>
      ) : null}

      {/* Modal Tambah Materi */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
          <GlassCard className="relative w-full max-w-md p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Tambah Materi</h3>
              <button onClick={() => setShowAdd(false)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>PILIH KURSUS</label>
                <select value={addForm.courseId} onChange={e => setAddForm(f => ({ ...f, courseId: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }}>
                  <option value="">— Pilih kursus —</option>
                  {activeCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
              <FieldInput label="JUDUL MATERI" value={addForm.title} onChange={v => setAddForm(f => ({ ...f, title: v }))} placeholder="Judul materi" />
              <FieldInput label="URL VIDEO / KONTEN" value={addForm.url} onChange={v => setAddForm(f => ({ ...f, url: v }))} placeholder="https://..." />
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>TIPE MATERI</label>
                <div className="flex gap-2">
                  {(["video", "quiz", "text"] as const).map(t => (
                    <button key={t} type="button" onClick={() => setAddForm(f => ({ ...f, type: t }))}
                      className="px-4 py-2 rounded-full text-xs font-semibold transition-all capitalize"
                      style={{ background: addForm.type === t ? "#E6F3EB" : "#F3F0E8", color: addForm.type === t ? "#2F8F5B" : "#657166", border: `1px solid ${addForm.type === t ? "#D9D4C7" : "#D9D4C7"}` }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <ModalActions onCancel={() => setShowAdd(false)} onConfirm={handleAdd} confirmLabel="Simpan" />
            </div>
          </GlassCard>
        </div>
      )}

      {/* Modal Edit Materi */}
      {editMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditMaterial(null)} />
          <GlassCard className="relative w-full max-w-md p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Edit Materi</h3>
                <p className="text-xs mt-0.5" style={{ color: "#657166" }}>{editMaterial.course}</p>
              </div>
              <button onClick={() => setEditMaterial(null)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <FieldInput label="JUDUL MATERI" value={editForm.title} onChange={v => setEditForm(f => ({ ...f, title: v }))} placeholder="Judul materi" />
              <FieldInput label="URL VIDEO / KONTEN" value={editForm.url} onChange={v => setEditForm(f => ({ ...f, url: v }))} placeholder="https://..." />
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>TIPE MATERI</label>
                <div className="flex gap-2">
                  {(["video", "quiz", "text"] as const).map(t => (
                    <button key={t} type="button" onClick={() => setEditForm(f => ({ ...f, type: t }))}
                      className="px-4 py-2 rounded-full text-xs font-semibold transition-all capitalize"
                      style={{ background: editForm.type === t ? "#E6F3EB" : "#F3F0E8", color: editForm.type === t ? "#2F8F5B" : "#657166", border: `1px solid ${editForm.type === t ? "#D9D4C7" : "#D9D4C7"}` }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <ModalActions onCancel={() => setEditMaterial(null)} onConfirm={handleEdit} confirmLabel="Simpan Perubahan" />
            </div>
          </GlassCard>
        </div>
      )}

      {/* Konfirmasi Hapus Materi */}
      {deleteMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteMaterial(null)} />
          <GlassCard className="relative w-full max-w-md p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Hapus Materi</h3>
              <button onClick={() => setDeleteMaterial(null)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl p-4" style={{ background: "rgba(224,61,90,0.07)", border: "1px solid rgba(224,61,90,0.2)" }}>
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} style={{ color: "#D95C5C", flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "#1F2A24" }}>Konfirmasi penghapusan materi</div>
                    <div className="text-xs" style={{ color: "#657166" }}>Materi <span className="font-semibold" style={{ color: "#1F2A24" }}>"{deleteMaterial.title}"</span> akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.</div>
                  </div>
                </div>
              </div>
              <ModalActions onCancel={() => setDeleteMaterial(null)} onConfirm={handleDelete} confirmLabel="Hapus Materi"
                confirmStyle={{ background: "linear-gradient(135deg,#e03d5a,#be123c)", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── 4. Enrolmen ──────────────────────────────────────────────────────────────
function InstructorEnrollments({ account, courses }: InstrProps) {
  const [filterCourse, setFilterCourse] = useState("all");
  const [detail, setDetail] = useState<InstrEnrollment | null>(null);

  const activeCourses = courses.filter(c => c.status === "active");
  const filtered = filterCourse === "all" ? account.enrollments : account.enrollments.filter(e => e.course === filterCourse);

  function totalMat(courseName: string) {
    return courses.find(c => c.title === courseName)?.modules ?? 0;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Enrolmen" subtitle={`${account.enrollments.length} siswa mengikuti kursus kamu`} />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Enrolmen", val: String(account.enrollments.length), color: "#a855f7" },
          { label: "Siswa Aktif",    val: String(account.enrollments.filter(e => e.packageStatus === "active").length), color: "#2F8F5B" },
          { label: "Sertifikat",     val: String(account.enrollments.filter(e => e.certStatus === "Tersedia").length),  color: "#D9A93E" },
        ].map(({ label, val, color }) => (
          <GlassCard key={label} className="p-4 text-center">
            <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color }}>{val}</div>
            <div className="text-xs" style={{ color: "#657166" }}>{label}</div>
          </GlassCard>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {[{ val: "all", label: "Semua Kursus" }, ...activeCourses.map(c => ({ val: c.title, label: c.title }))].map(({ val, label }) => (
          <button key={val} onClick={() => setFilterCourse(val)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all max-w-[200px] truncate"
            style={{ background: filterCourse === val ? "#E6F3EB" : "#F3F0E8", color: filterCourse === val ? "#2F8F5B" : "#657166", border: `1px solid ${filterCourse === val ? "#D9D4C7" : "#D9D4C7"}` }}>
            {label}
          </button>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                {["Nama Siswa","Kursus","Tanggal Enrol","Progress","Status Paket","Sertifikat","Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.student + e.course} className="hover:bg-[#F8FAF7] cursor-pointer" style={{ borderBottom: "1px solid #F0EDE4" }}
                  onClick={() => setDetail(e)}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#a855f7,#4f8ef7)" }}>{e.student[0]}</div>
                      <span className="text-xs font-medium" style={{ color: "#1F2A24" }}>{e.student}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{e.course}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{e.date}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: "#EDE8DF" }}>
                        <div className="h-full rounded-full" style={{ width: `${e.progress}%`, background: "linear-gradient(90deg,#a855f7,#4f8ef7)" }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: "#657166" }}>{e.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><Badge color={e.packageStatus === "active" ? "#2F8F5B" : "#8B948D"}>{e.packageStatus === "active" ? "Paket Aktif" : "Tidak Aktif"}</Badge></td>
                  <td className="px-5 py-3.5"><Badge color={e.certStatus === "Tersedia" ? "#2F8F5B" : "#8B948D"}>{e.certStatus}</Badge></td>
                  <td className="px-5 py-3.5" onClick={ev => ev.stopPropagation()}>
                    <CapsuleBtn color="#4f8ef7" bg="#D9D4C7" onClick={() => setDetail(e)}>Detail</CapsuleBtn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
          <GlassCard className="relative w-full max-w-md p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Detail Siswa</h3>
              <button onClick={() => setDetail(null)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Nama Siswa",         val: detail.student },
                { label: "Nama Kursus",         val: detail.course },
                { label: "Tanggal Enrol",       val: detail.date },
                { label: "Progress",            val: `${detail.progress}%` },
                { label: "Materi Selesai",      val: `${Math.round(detail.progress / 100 * totalMat(detail.course))} dari ${totalMat(detail.course)}` },
                { label: "Materi Tersisa",      val: `${totalMat(detail.course) - Math.round(detail.progress / 100 * totalMat(detail.course))} materi` },
                { label: "Status Paket",        val: detail.packageStatus === "active" ? "Paket Aktif" : "Tidak Aktif" },
                { label: "Status Sertifikat",   val: detail.certStatus },
                { label: "Aktivitas Terakhir",  val: detail.progress === 100 ? "Menyelesaikan semua materi" : detail.progress > 0 ? "Melanjutkan materi kursus" : "Baru bergabung" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between gap-4 py-2 border-b" style={{ borderColor: "#EDE8DF" }}>
                  <span className="text-xs" style={{ color: "#657166" }}>{label}</span>
                  <span className="text-xs font-semibold text-right" style={{ color: "#1F2A24" }}>{val}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setDetail(null)} className="w-full mt-5 py-2.5 rounded-xl border text-sm font-semibold"
              style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Tutup</button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── 5. Komisi ────────────────────────────────────────────────────────────────
function InstructorCommission({ account }: InstrProps) {
  const [showModal, setShowModal] = useState(false);
  const [bank, setBank] = useState("");
  const [rekening, setRekening] = useState("");
  const [atasNama, setAtasNama] = useState("");
  const [jumlah, setJumlah] = useState(account.commReady);
  const [withdrawHistory, setWithdrawHistory] = useState<InstrWithdrawRow[]>(account.withdrawHistory);
  const { toast, show } = useToast();

  function handleWithdraw() {
    if (!bank || !rekening || !atasNama || !jumlah) return;
    setWithdrawHistory(prev => [{ date: "8 Feb 2025", amount: jumlah, bank, account: rekening, status: "waiting" }, ...prev]);
    setShowModal(false);
    setBank(""); setRekening(""); setAtasNama(""); setJumlah(account.commReady);
    show("Pengajuan penarikan berhasil dikirim. Status: Menunggu.");
  }

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader title="Komisi" subtitle="Ringkasan komisi dari kursus aktif kamu" />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Komisi",     val: account.commTotal, color: "#D9A93E" },
          { label: "Komisi Bulan Ini", val: account.commMonth, color: "#2F8F5B" },
          { label: "Siap Ditarik",     val: account.commReady, color: "#4f8ef7" },
        ].map(({ label, val, color }) => (
          <GlassCard key={label} className="p-5">
            <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color }}>{val}</div>
            <div className="text-xs" style={{ color: "#657166" }}>{label}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-5" style={{ borderColor: "rgba(245,158,11,0.2)" }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs" style={{ color: "#657166" }}>
            Komisi dihitung dari aktivitas kursus aktif. Detail perhitungan dikelola oleh sistem.
          </div>
          <button onClick={() => setShowModal(true)} className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            Ajukan Penarikan
          </button>
        </div>
      </GlassCard>

      <div>
        <div className="text-xs font-semibold mb-3" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>RIWAYAT KOMISI</div>
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                  {["Periode","Kursus","Siswa Aktif","Komisi","Status"].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {account.commHistory.map(({ period, course, students, commission, status }) => {
                  const s = COMM_STATUS[status];
                  return (
                    <tr key={period + course} className="hover:bg-[#F8FAF7]" style={{ borderBottom: "1px solid #F0EDE4" }}>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{period}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{course}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{students}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs font-semibold" style={{ color: "#2F8F5B" }}>{commission}</span></td>
                      <td className="px-5 py-3.5"><Badge color={s.color}>{s.label}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      <div>
        <div className="text-xs font-semibold mb-3" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>RIWAYAT PENARIKAN</div>
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                  {["Tanggal","Nominal","Bank","Nomor Rekening","Status"].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {withdrawHistory.map((w, i) => {
                  const s = COMM_STATUS[w.status];
                  return (
                    <tr key={i} className="hover:bg-[#F8FAF7]" style={{ borderBottom: "1px solid #F0EDE4" }}>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{w.date}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs font-semibold" style={{ color: "#2F8F5B" }}>{w.amount}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{w.bank}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{w.account}</span></td>
                      <td className="px-5 py-3.5"><Badge color={s.color}>{s.label}</Badge></td>
                    </tr>
                  );
                })}
                {withdrawHistory.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-xs" style={{ color: "#8B948D" }}>Belum ada riwayat penarikan.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <GlassCard className="relative w-full max-w-md p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Ajukan Penarikan Komisi</h3>
              <button onClick={() => setShowModal(false)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-xl" style={{ background: "rgba(217,169,62,0.06)", border: "1px solid rgba(217,169,62,0.12)" }}>
                <div className="text-[10px] mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>Saldo siap ditarik</div>
                <div className="text-lg font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#D9A93E" }}>{account.commReady}</div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>JUMLAH YANG AKAN DITARIK</label>
                <input value={jumlah} onChange={e => setJumlah(e.target.value)} placeholder={account.commReady}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "rgba(217,169,62,0.25)", color: "#1F2A24" }} />
              </div>
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>NAMA BANK</label>
                <select value={bank} onChange={e => setBank(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: bank ? "#1F2A24" : "#657166" }}>
                  <option value="">— Pilih bank —</option>
                  {["BCA","BRI","Mandiri","BNI"].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              {[{ label: "NOMOR REKENING", val: rekening, set: setRekening, ph: "Nomor rekening" }, { label: "ATAS NAMA", val: atasNama, set: setAtasNama, ph: "Nama pemilik rekening" }].map(({ label, val, set, ph }) => (
                <div key={label}>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</label>
                  <input value={val} onChange={e => set(e.target.value)} placeholder={ph}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
                </div>
              ))}
              <div className="flex gap-3 mt-1">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold" style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Batal</button>
                <button onClick={handleWithdraw} disabled={!bank || !rekening || !atasNama || !jumlah}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Ajukan</button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ─── 6. Profil Instruktur ─────────────────────────────────────────────────────
function InstructorProfilePage({ account }: { account: InstrAccount }) {
  const color = "#a855f7";
  return (
    <div className="max-w-xl flex flex-col gap-5">
      <GlassCard className="p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg,${color},${color}88)` }}>{account.name[0]}</div>
        <div className="flex-1">
          <div className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{account.name}</div>
          <div className="text-sm mb-2" style={{ color: "#657166" }}>{account.email}</div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge color={color}>Instruktur</Badge>
            <Badge color="#2F8F5B">Terverifikasi</Badge>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Kursus",  val: String(account.courses.length), color: "#a855f7" },
          { label: "Siswa",   val: String(account.totalStudents),  color: "#4f8ef7" },
          { label: "Rating",  val: String(account.avgRating),      color: "#D9A93E" },
          { label: "Materi",  val: String(account.totalMateriCount),color: "#2F8F5B" },
        ].map(({ label, val, color: c }) => (
          <GlassCard key={label} className="p-4 flex flex-col items-center text-center">
            <div className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: c }}>{val}</div>
            <div className="text-[10px]" style={{ color: "#657166" }}>{label}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Data Akun</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "NAMA LENGKAP", val: account.name },
            { label: "USERNAME",     val: account.username },
            { label: "EMAIL",        val: account.email },
            { label: "NOMOR HP",     val: account.phone },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="text-[10px] font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
              <div className="text-sm" style={{ color: "#1F2A24" }}>{val}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Profil Pengajar</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "PROFESI",               val: account.profession },
            { label: "BIDANG KEAHLIAN",        val: account.expertise },
            { label: "PENDIDIKAN TERAKHIR",    val: account.education },
            { label: "INSTANSI / MENGAJAR DI", val: account.institution },
            { label: "PENGALAMAN MENGAJAR",    val: account.experience },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="text-[10px] font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
              <div className="text-sm" style={{ color: "#1F2A24" }}>{val}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="text-[10px] font-semibold mb-2" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>DESKRIPSI KEAHLIAN</div>
          <p className="text-sm leading-relaxed" style={{ color: "#657166" }}>{account.description}</p>
        </div>
      </GlassCard>

      <GlassCard className="p-5" style={{ borderColor: "rgba(47,143,91,0.25)", background: "rgba(47,143,91,0.05)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(47,143,91,0.12)", color: "#2F8F5B" }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Status Verifikasi</div>
              <div className="text-xs" style={{ color: "#657166" }}>Akun sudah diverifikasi oleh admin</div>
            </div>
          </div>
          <Badge color="#2F8F5B">Terverifikasi</Badge>
        </div>
      </GlassCard>
    </div>
  );
}

function ProfilePage({ role }: { role: Role }) {
  const roleColor: Record<Role, string> = { student: "#4f8ef7", instructor: "#a855f7", admin: "#f59e0b" };
  const roleLabel: Record<Role, string> = { student: "Siswa", instructor: "Instruktur", admin: "Admin" };
  const color = roleColor[role];

  if (role === "student") {
    return (
      <div className="max-w-xl flex flex-col gap-5">
        <GlassCard className="p-7 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg,${color},${color}88)` }}>A</div>
          <div>
            <div className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Ahmad Fauzi</div>
            <div className="text-sm mb-1" style={{ color: "#657166" }}>ahmad@email.com</div>
            <Badge color={color}>{roleLabel[role]}</Badge>
          </div>
        </GlassCard>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Kursus Diikuti", val: "3", icon: BookOpen, color: "#4f8ef7" },
            { label: "Avg. Progress", val: "44%", icon: BarChart2, color: "#2F8F5B" },
            { label: "Materi Selesai", val: "30", icon: CheckCircle2, color: "#a855f7" },
            { label: "Sertifikat", val: "0", icon: Award, color: "#D9A93E" },
          ].map(({ label, val, icon: Icon, color: c }) => (
            <GlassCard key={label} className="p-4 flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: `${c}18`, color: c }}><Icon size={18} /></div>
              <div className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{val}</div>
              <div className="text-[10px]" style={{ color: "#657166" }}>{label}</div>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-7">
          <div className="font-bold text-sm mb-5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Data Akun</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ label: "NAMA LENGKAP", val: "Ahmad Fauzi" }, { label: "EMAIL", val: "ahmad@email.com" }, { label: "BERGABUNG", val: "2 Januari 2025" }, { label: "STATUS", val: "Aktif" }].map(({ label, val }) => (
              <div key={label}>
                <div className="text-xs font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
                <div className="text-sm" style={{ color: "#1F2A24" }}>{val}</div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-7">
          <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Minat Belajar</div>
          <div className="flex flex-wrap gap-2">
            {["Web Development", "UI/UX Design", "Data Science", "JavaScript"].map(tag => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "#EDE8DF", color: "#4f8ef7", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{tag}</span>
            ))}
          </div>
        </GlassCard>
      </div>
    );
  }

  if (role === "instructor") {
    return (
      <div className="max-w-xl flex flex-col gap-5">
        {/* Avatar + status verifikasi */}
        <GlassCard className="p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg,${color},${color}88)` }}>A</div>
          <div className="flex-1">
            <div className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Andi Prasetyo</div>
            <div className="text-sm mb-2" style={{ color: "#657166" }}>andi@coursehub.id</div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge color={color}>Instruktur</Badge>
              <Badge color="#2F8F5B">Terverifikasi</Badge>
            </div>
          </div>
        </GlassCard>

        {/* Stat row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Kursus Dibuat", val: "2", icon: BookOpen, color: "#a855f7" },
            { label: "Total Siswa", val: "121", icon: Users, color: "#4f8ef7" },
            { label: "Rating Rata-rata", val: "4.7", icon: Star, color: "#D9A93E" },
            { label: "Total Materi", val: "40", icon: FileText, color: "#2F8F5B" },
          ].map(({ label, val, icon: Icon, color: c }) => (
            <GlassCard key={label} className="p-4 flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: `${c}18`, color: c }}><Icon size={18} /></div>
              <div className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{val}</div>
              <div className="text-[10px]" style={{ color: "#657166" }}>{label}</div>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-7">
          <div className="font-bold text-sm mb-5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Data Akun & Keahlian</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ label: "NAMA LENGKAP", val: "Andi Prasetyo" }, { label: "EMAIL", val: "andi@coursehub.id" }, { label: "BERGABUNG", val: "10 Desember 2024" }, { label: "BIDANG KEAHLIAN", val: "Web Development" }].map(({ label, val }) => (
              <div key={label}>
                <div className="text-xs font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
                <div className="text-sm" style={{ color: "#1F2A24" }}>{val}</div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-7">
          <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Performa Mengajar</div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Tingkat Penyelesaian Rata-rata", val: 68 },
              { label: "Kepuasan Siswa", val: 94 },
            ].map(({ label, val }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: "#657166" }}>{label}</span>
                  <span className="font-semibold" style={{ color: "#a855f7" }}>{val}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#EDE8DF" }}>
                  <div className="h-full rounded-full" style={{ width: `${val}%`, background: "linear-gradient(90deg,#a855f7,#4f8ef7)" }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Data akun */}
        <GlassCard className="p-6">
          <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Data Akun</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "NAMA LENGKAP",  val: "Andi Prasetyo" },
              { label: "USERNAME",      val: "andi_prasetyo" },
              { label: "EMAIL",         val: "andi@coursehub.id" },
              { label: "NOMOR HP",      val: "0812-3456-7890" },
              { label: "BERGABUNG",     val: "10 Desember 2024" },
              { label: "STATUS AKUN",   val: "Aktif" },
            ].map(({ label, val }) => (
              <div key={label}>
                <div className="text-[10px] font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
                <div className="text-sm" style={{ color: "#1F2A24" }}>{val}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Profil pengajar */}
        <GlassCard className="p-6">
          <div className="font-bold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Profil Pengajar</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "PROFESI",               val: "Guru / Pengajar" },
              { label: "BIDANG KEAHLIAN",        val: "Matematika, IPA" },
              { label: "PENDIDIKAN TERAKHIR",    val: "S1 Pendidikan Matematika" },
              { label: "INSTANSI / MENGAJAR DI", val: "SMA Negeri 2 Jakarta" },
              { label: "PENGALAMAN MENGAJAR",    val: "5–10 tahun" },
            ].map(({ label, val }) => (
              <div key={label}>
                <div className="text-[10px] font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
                <div className="text-sm" style={{ color: "#1F2A24" }}>{val}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="text-[10px] font-semibold mb-2" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>DESKRIPSI KEAHLIAN</div>
            <p className="text-sm leading-relaxed" style={{ color: "#657166" }}>
              Pengajar aktif dengan pengalaman lebih dari 8 tahun membimbing siswa SMP dan SMA. Fokus pada pemahaman konsep dasar matematika dan IPA melalui pendekatan yang menyenangkan dan terstruktur.
            </p>
          </div>
        </GlassCard>

        {/* Status verifikasi */}
        <GlassCard className="p-5" style={{ borderColor: "rgba(47,143,91,0.25)", background: "rgba(47,143,91,0.05)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(47,143,91,0.12)", color: "#2F8F5B" }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Status Verifikasi</div>
                <div className="text-xs" style={{ color: "#657166" }}>Akun sudah diverifikasi admin</div>
              </div>
            </div>
            <Badge color="#2F8F5B">Terverifikasi</Badge>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Admin profile (fallback)
  return (
    <div className="max-w-lg flex flex-col gap-5">
      <GlassCard className="p-7 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: `linear-gradient(135deg,${color},${color}88)` }}>A</div>
        <div>
          <div className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Admin Sistem</div>
          <div className="text-sm mb-1" style={{ color: "#657166" }}>kelompok13.com</div>
          <Badge color={color}>{roleLabel[role]}</Badge>
        </div>
      </GlassCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN — PAKET
// ═══════════════════════════════════════════════════════════════════════════════
type Pkg = { name: string; desc: string; price: number; duration: string; benefits: string[]; status: "active" | "draft" };

function AdminPackages() {
  const [pkg, setPkg] = useState<Pkg>({
    name: "Paket Bulanan",
    desc: "Akses seluruh kursus dan materi selama 1 bulan penuh.",
    price: 99000,
    duration: "1 bulan",
    benefits: ["Akses seluruh kursus", "Akses seluruh materi", "Pantau progress belajar", "Sertifikat jika kursus selesai"],
    status: "active",
  });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...pkg, benefits: pkg.benefits.join(", "), price: pkg.price });
  const { toast, show: showToast } = useToast();

  function handleSave() {
    setPkg({ ...form, benefits: form.benefits.split(",").map(b => b.trim()).filter(Boolean) });
    setShowModal(false);
    showToast("Paket Bulanan berhasil diperbarui.");
  }

  function toggleStatus() {
    const next = pkg.status === "active" ? "draft" : "active";
    setPkg(p => ({ ...p, status: next }));
    showToast(next === "active" ? "Paket diaktifkan." : "Paket dinonaktifkan.", next === "active");
  }

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader
        title="Kelola Paket"
        subtitle="CourseHub hanya memiliki satu paket belajar aktif"
        action={
          <ActionBtn variant="warning" icon={Pencil} onClick={() => { setForm({ ...pkg, benefits: pkg.benefits.join(", "), price: pkg.price }); setShowModal(true); }}>
            Edit Paket
          </ActionBtn>
        }
      />

      {/* Single package card */}
      <GlassCard className="p-7" style={{ borderColor: "rgba(245,158,11,0.2)" }}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(217,169,62,0.12)", color: "#D9A93E" }}>
                <Award size={22} />
              </div>
              <div>
                <div className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>{pkg.name}</div>
                <Badge color={pkg.status === "active" ? "#2F8F5B" : "#D9A93E"}>{pkg.status === "active" ? "Aktif" : "Draft"}</Badge>
              </div>
            </div>
            <p className="text-sm mb-5" style={{ color: "#657166" }}>{pkg.desc}</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl p-4" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(217,169,62,0.10)" }}>
                <div className="text-xs mb-1" style={{ color: "#657166" }}>Harga</div>
                <div className="text-xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#D9A93E" }}>Rp{pkg.price.toLocaleString("id-ID")}</div>
                <div className="text-xs mt-0.5" style={{ color: "#657166" }}>per {pkg.duration}</div>
              </div>
              <div className="rounded-xl p-4" style={{ background: "#F3F0E8", border: "1px solid #E8E4DB" }}>
                <div className="text-xs mb-1" style={{ color: "#657166" }}>Durasi</div>
                <div className="text-xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#4f8ef7" }}>{pkg.duration}</div>
                <div className="text-xs mt-0.5" style={{ color: "#657166" }}>masa aktif berlangganan</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>BENEFIT PAKET</div>
              <div className="flex flex-col gap-2">
                {pkg.benefits.map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm" style={{ color: "#657166" }}>
                    <CheckCircle2 size={14} style={{ color: "#2F8F5B", flexShrink: 0 }} /> {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col gap-2 sm:items-end">
            <button onClick={() => { setForm({ ...pkg, benefits: pkg.benefits.join(", "), price: pkg.price }); setShowModal(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "#E6F3EB", color: "#4f8ef7", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              <Pencil size={14} /> Edit
            </button>
            <button onClick={toggleStatus}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
              style={{ background: pkg.status === "active" ? "rgba(107,130,168,0.12)" : "rgba(47,143,91,0.10)", color: pkg.status === "active" ? "#8B948D" : "#10b981", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {pkg.status === "active" ? "Nonaktifkan" : "Aktifkan"}
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Subscriber stats */}
      <div className="grid grid-cols-3 gap-4">
        {[{ label: "Siswa Berlangganan", val: "1,840", color: "#4f8ef7" }, { label: "Aktif Bulan Ini", val: "312", color: "#2F8F5B" }, { label: "Perpanjang Bulan Ini", val: "98", color: "#D9A93E" }].map(({ label, val, color }) => (
          <GlassCard key={label} className="p-5 text-center">
            <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color }}>{val}</div>
            <div className="text-xs" style={{ color: "#657166" }}>{label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Payment History */}
      <div>
        <div className="mb-4">
          <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Riwayat Pembayaran Paket Siswa</h3>
          <p className="text-xs" style={{ color: "#657166" }}>Riwayat pembelian paket bulanan dari siswa</p>
        </div>
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                  {["Nama Siswa", "Tanggal Pembelian", "Masa Aktif", "Metode", "Bank", "Nomor Virtual Account", "Jumlah", "Status"].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { student: "Ahmad Fauzi", nisn: "0051234567", date: "8 Jan 2025", period: "8 Jan–7 Feb 2025", bank: "BCA", amount: 99000, status: "active" },
                  { student: "Siti Rahma", nisn: "0051234568", date: "5 Jan 2025", period: "5 Jan–4 Feb 2025", bank: "Mandiri", amount: 99000, status: "active" },
                  { student: "Eka Putri", nisn: "0031234570", date: "2 Jan 2025", period: "2 Jan–1 Feb 2025", bank: "BRI", amount: 99000, status: "active" },
                  { student: "Budi Raharjo", nisn: "0041234569", date: "1 Des 2024", period: "1 Des 2024–31 Des 2024", bank: "BCA", amount: 99000, status: "expired" },
                ].map((p, idx) => {
                  const vaPrefix: Record<string, string> = { BCA: "8808", BRI: "7777", Mandiri: "8899" };
                  const va = `${vaPrefix[p.bank]} ${p.nisn} ${String(idx + 1).padStart(3, "0")}`;
                  return (
                    <tr key={idx} className="hover:bg-[#F8FAF7]" style={{ borderBottom: "1px solid #F0EDE4" }}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "linear-gradient(135deg,#4f8ef7,#2563eb)" }}>{p.student[0]}</div>
                          <span className="text-xs font-medium" style={{ color: "#1F2A24" }}>{p.student}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{p.date}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>{p.period}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166" }}>Transfer Bank</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs font-semibold" style={{ color: "#4f8ef7" }}>{p.bank}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{va}</span></td>
                      <td className="px-5 py-3.5"><span className="text-xs font-semibold" style={{ color: "#1F2A24" }}>Rp{p.amount.toLocaleString("id-ID")}</span></td>
                      <td className="px-5 py-3.5">
                        <Badge color={p.status === "active" ? "#2F8F5B" : "#8B948D"}>
                          {p.status === "active" ? "Aktif" : "Kadaluarsa"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Edit modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <GlassCard className="relative w-full max-w-lg p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Edit Paket Bulanan</h3>
              <button onClick={() => setShowModal(false)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[{ label: "NAMA PAKET", key: "name", placeholder: "Paket Bulanan" }, { label: "DESKRIPSI", key: "desc", placeholder: "Deskripsi singkat paket" }].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</label>
                  <input value={(form as Record<string, unknown>)[key] as string} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>HARGA (RP)</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>DURASI</label>
                  <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="1 bulan" className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>BENEFIT (pisahkan dengan koma)</label>
                <textarea value={form.benefits} onChange={e => setForm(f => ({ ...f, benefits: e.target.value }))} rows={3} placeholder="Akses seluruh kursus, Sertifikat, ..." className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
              </div>
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>STATUS</label>
                <div className="flex gap-2">
                  {(["active", "draft"] as const).map(s => (
                    <button key={s} type="button" onClick={() => setForm(f => ({ ...f, status: s }))}
                      className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                      style={{ background: form.status === s ? (s === "active" ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)") : "#EDE8DF", color: form.status === s ? (s === "active" ? "#2F8F5B" : "#D9A93E") : "#8B948D", border: `1px solid ${form.status === s ? (s === "active" ? "rgba(47,143,91,0.35)" : "rgba(217,169,62,0.35)") : "#E6F3EB"}` }}>
                      {s === "active" ? "Aktif" : "Draft"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-1">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold" style={{ borderColor: "#D9D4C7", color: "#657166", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Batal</button>
                <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Simpan</button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN — SERTIFIKAT
// ═══════════════════════════════════════════════════════════════════════════════
type Certificate = { id: string; student: string; course: string; instructor: string; issueDate: string; status: "valid" | "expired"; progress: number };

function AdminCertificates() {
  const init: Certificate[] = [
    { id: "CERT-CH-001", student: "Ahmad Fauzi", course: "Bahasa Indonesia — Menulis & Membaca", instructor: "Pak Hendra Wijaya", issueDate: "7 Feb 2025", status: "valid", progress: 100 },
    { id: "CERT-CH-002", student: "Eka Putri", course: "IPA Terpadu Kelas 8", instructor: "Bu Ratna Dewi", issueDate: "5 Feb 2025", status: "valid", progress: 100 },
  ];
  const [certs, setCerts] = useState(init);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [detailModal, setDetailModal] = useState<Certificate | null>(null);
  const { toast, show: showToast } = useToast();

  function handleValidate(cert: Certificate) {
    showToast(`Sertifikat ${cert.id} berhasil divalidasi.`);
  }

  function handleCancelValidation(cert: Certificate) {
    showToast(`Validasi sertifikat ${cert.id} dibatalkan.`, false);
  }

  function handleDownload(cert: Certificate) {
    showToast(`Sertifikat ${cert.id} berhasil diunduh.`);
  }

  const statusOpts = ["all", "valid", "expired"];
  const filtered = certs.filter(c => {
    const q = search.toLowerCase();
    return (filterStatus === "all" || c.status === filterStatus) &&
      (c.id.toLowerCase().includes(q) || c.student.toLowerCase().includes(q) || c.course.toLowerCase().includes(q));
  });

  const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
    valid:   { label: "Valid",     color: "#2F8F5B" },
    expired: { label: "Kadaluarsa", color: "#D95C5C" },
  };

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader
        title="Kelola Sertifikat"
        subtitle={`${certs.length} sertifikat terbit · ${certs.filter(c => c.status === "valid").length} valid`}
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8B948D" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari ID sertifikat, siswa, atau kursus..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: "#FFFFFF", borderColor: "#D9D4C7", color: "#1F2A24" }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOpts.map(s => {
            const cfg = s === "all" ? { label: "Semua", color: "#4f8ef7" } : STATUS_CONFIG[s];
            return (
              <button key={s} onClick={() => setFilterStatus(s)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{ background: filterStatus === s ? `${cfg.color}18` : "#F3F0E8", color: filterStatus === s ? cfg.color : "#657166", border: `1px solid ${filterStatus === s ? `${cfg.color}40` : "#D9D4C7"}` }}>
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E4DB", background: "#F8F6F0" }}>
                {["Nomor Sertifikat", "Nama Siswa", "Kursus", "Instruktur", "Tanggal Selesai", "Status", "Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const s = STATUS_CONFIG[c.status];
                return (
                  <tr key={c.id} className="hover:bg-[#F8FAF7] cursor-pointer" style={{ borderBottom: "1px solid #F0EDE4" }} onClick={() => setDetailModal(c)}>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#4f8ef7" }}>{c.id}</span>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs font-medium" style={{ color: "#1F2A24" }}>{c.student}</span></td>
                    <td className="px-5 py-4">
                      <div className="text-xs" style={{ color: "#657166", maxWidth: 200 }}>{c.course}</div>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs" style={{ color: "#657166" }}>{c.instructor}</span></td>
                    <td className="px-5 py-4"><span className="text-xs" style={{ color: "#657166" }}>{c.issueDate}</span></td>
                    <td className="px-5 py-4"><Badge color={s.color}>{s.label}</Badge></td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5">
                        <IconBtn icon={Eye} color="#4f8ef7" onClick={() => setDetailModal(c)} title="Detail" />
                        <IconBtn icon={CheckCircle2} color="#10b981" onClick={() => handleValidate(c)} title="Validasi" />
                        <IconBtn icon={ArrowDown} color="#06c5d9" onClick={() => handleDownload(c)} title="Download" />
                        <IconBtn icon={X} color="#D95C5C" onClick={() => handleCancelValidation(c)} title="Batalkan Validasi" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Detail Modal */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetailModal(null)} />
          <GlassCard className="relative w-full max-w-lg p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}>Detail Sertifikat</h3>
              <button onClick={() => setDetailModal(null)} style={{ color: "#657166" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "#EDE8DF", border: "1px solid #E8E4DB" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(236,72,153,0.15)", color: "#ec4899" }}>
                  <Award size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold mb-0.5" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#4f8ef7" }}>{detailModal.id}</div>
                  <Badge color={STATUS_CONFIG[detailModal.status].color}>{STATUS_CONFIG[detailModal.status].label}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "NAMA SISWA", val: detailModal.student },
                  { label: "KURSUS", val: detailModal.course },
                  { label: "INSTRUKTUR", val: detailModal.instructor },
                  { label: "TANGGAL SELESAI", val: detailModal.issueDate },
                  { label: "STATUS", val: STATUS_CONFIG[detailModal.status].label },
                  { label: "PROGRESS", val: `${detailModal.progress}%` },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#657166", fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
                    <div className="text-sm" style={{ color: "#1F2A24" }}>{val}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl" style={{ background: "rgba(47,143,91,0.08)", border: "1px solid rgba(47,143,91,0.10)" }}>
                <div className="flex items-center gap-2 text-xs" style={{ color: "#2F8F5B" }}>
                  <CheckCircle2 size={14} />
                  <span className="font-semibold">Sertifikat diterbitkan otomatis setelah progress mencapai 100%</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN — TRANSAKSI & KOMISI
// ═══════════════════════════════════════════════════════════════════════════════
type Transaction = {
  id: number;
  student: string;
  nis: string;
  subscription: string;
  vaNumber: string;
  bank: string;
  amount: number;
  date: string;
  status: "success" | "pending" | "cancelled";
};

type WithdrawalRequest = {
  id: number;
  instructor: string;
  email: string;
  amount: number;
  bank: string;
  accountNumber: string;
  accountName: string;
  dateRequested: string;
  dateProcessed: string;
  status: "waiting" | "processing" | "success" | "failed" | "cancelled";
};

function AdminTransactions() {
  const [activeTab, setActiveTab] = useState<"transactions" | "withdrawals">("transactions");
  
  // Transactions tab
  const initTransactions: Transaction[] = [
    { id: 1, student: "Ahmad Fauzi", nis: "1234567890", subscription: "Paket Bulanan", vaNumber: "8808 1234567890 001", bank: "BCA", amount: 99000, date: "8 Jan 2025", status: "success" },
    { id: 2, student: "Siti Rahma", nis: "1234567891", subscription: "Paket Bulanan", vaNumber: "7777 1234567891 002", bank: "BRI", amount: 99000, date: "10 Jan 2025", status: "success" },
    { id: 3, student: "Budi Raharjo", nis: "1234567892", subscription: "Paket Bulanan", vaNumber: "8899 1234567892 003", bank: "Mandiri", amount: 99000, date: "12 Jan 2025", status: "pending" },
    { id: 4, student: "Eka Putri", nis: "1234567893", subscription: "Paket Bulanan", vaNumber: "8808 1234567893 004", bank: "BCA", amount: 99000, date: "14 Jan 2025", status: "cancelled" },
  ];
  
  const [transactions, setTransactions] = useState(initTransactions);
  const [transFilterStatus, setTransFilterStatus] = useState("all");
  const [transDetailModal, setTransDetailModal] = useState<Transaction | null>(null);
  
  // Withdrawals tab
  const initWithdrawals: WithdrawalRequest[] = [
    { id: 1, instructor: "Pak Hendra Wijaya", email: "instruktur1@coursehub.id", amount: 1100000, bank: "BCA", accountNumber: "1234567890", accountName: "Hendra Wijaya", dateRequested: "12 Jan 2025", dateProcessed: "13 Jan 2025", status: "success" },
    { id: 2, instructor: "Bu Ratna Dewi", email: "instruktur2@coursehub.id", amount: 1437000, bank: "Mandiri", accountNumber: "9876543210", accountName: "Ratna Dewi", dateRequested: "12 Jan 2025", dateProcessed: "13 Jan 2025", status: "processing" },
    { id: 3, instructor: "Pak Hendra Wijaya", email: "instruktur1@coursehub.id", amount: 750000, bank: "BRI", accountNumber: "1122334455", accountName: "Hendra Wijaya", dateRequested: "15 Jan 2025", dateProcessed: "-", status: "waiting" },
    { id: 4, instructor: "Bu Ratna Dewi", email: "instruktur2@coursehub.id", amount: 500000, bank: "BCA", accountNumber: "5566778899", accountName: "Ratna Dewi", dateRequested: "16 Jan 2025", dateProcessed: "17 Jan 2025", status: "failed" },
  ];
  
  const [withdrawals, setWithdrawals] = useState(initWithdrawals);
  const [withdrawalFilterStatus, setWithdrawalFilterStatus] = useState("all");
  const [withdrawalDetailModal, setWithdrawalDetailModal] = useState<WithdrawalRequest | null>(null);
  
  const { toast, show: showToast } = useToast();
  
  const TRANS_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
    success: { label: "Berhasil", color: COLORS.success },
    pending: { label: "Ditunda", color: COLORS.warning },
    cancelled: { label: "Dibatalkan", color: COLORS.danger },
  };
  
  const WITHDRAWAL_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
    waiting: { label: "Menunggu", color: COLORS.warning },
    processing: { label: "Diproses", color: COLORS.info },
    success: { label: "Berhasil", color: COLORS.success },
    failed: { label: "Gagal", color: COLORS.danger },
    cancelled: { label: "Dibatalkan", color: COLORS.danger },
  };
  
  const filteredTrans = transFilterStatus === "all" ? transactions : transactions.filter(t => t.status === transFilterStatus);
  const filteredWithdrawals = withdrawalFilterStatus === "all" ? withdrawals : withdrawals.filter(w => w.status === withdrawalFilterStatus);
  
  // Transaction handlers
  function handleChangeTransStatus(trans: Transaction, newStatus: Transaction["status"]) {
    setTransactions(prev => prev.map(t => t.id === trans.id ? { ...t, status: newStatus } : t));
    showToast(`Status transaksi ${trans.student} diubah menjadi ${TRANS_STATUS_CONFIG[newStatus].label}.`);
  }
  
  // Withdrawal handlers
  function handleProcessWithdrawal(req: WithdrawalRequest) {
    setWithdrawals(prev => prev.map(r => r.id === req.id ? { ...r, status: "processing" as const } : r));
    showToast(`Pencairan dana ${req.instructor} sedang diproses.`);
  }

  function handleMarkSuccess(req: WithdrawalRequest) {
    setWithdrawals(prev => prev.map(r => r.id === req.id ? { ...r, status: "success" as const, dateProcessed: "17 Jan 2025" } : r));
    showToast(`Pencairan dana ${req.instructor} berhasil dikonfirmasi.`);
  }
  
  function handleMarkFailed(req: WithdrawalRequest) {
    setWithdrawals(prev => prev.map(r => r.id === req.id ? { ...r, status: "failed" as const, dateProcessed: "17 Jan 2025" } : r));
    showToast(`Pencairan dana ${req.instructor} gagal.`, false);
  }
  
  function handleCancelWithdrawal(req: WithdrawalRequest) {
    setWithdrawals(prev => prev.map(r => r.id === req.id ? { ...r, status: "cancelled" as const } : r));
    showToast(`Pencairan dana ${req.instructor} dibatalkan.`, false);
  }

  return (
    <div className="flex flex-col gap-5">
      <AppToast toast={toast} />
      <PageHeader
        title="Transaksi & Komisi"
        subtitle="Monitor transaksi langganan siswa dan pencairan dana instruktur"
      />
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Transaksi Berhasil", val: String(transactions.filter(t => t.status === "success").length), color: COLORS.success },
          { label: "Transaksi Ditunda", val: String(transactions.filter(t => t.status === "pending").length), color: COLORS.warning },
          { label: "Transaksi Dibatalkan", val: String(transactions.filter(t => t.status === "cancelled").length), color: COLORS.danger },
          { label: "Pendapatan Bulan Ini", val: `Rp${(transactions.filter(t => t.status === "success").reduce((sum, t) => sum + t.amount, 0) / 1000).toFixed(0)}k`, color: COLORS.accent },
          { label: "Komisi Instruktur", val: `Rp${((withdrawals.filter(w => w.status === "success").reduce((sum, w) => sum + w.amount, 0)) / 1000).toFixed(0)}k`, color: COLORS.primary.main },
          { label: "Pencairan Berhasil", val: String(withdrawals.filter(w => w.status === "success").length), color: COLORS.success },
        ].map(({ label, val, color }) => (
          <GlassCard key={label} className="p-4 text-center">
            <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color }}>{val}</div>
            <div className="text-xs" style={{ color: COLORS.text.secondary }}>{label}</div>
          </GlassCard>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 border-b" style={{ borderColor: COLORS.border }}>
        {[
          { key: "transactions" as const, label: "Transaksi Langganan" },
          { key: "withdrawals" as const, label: "Pencairan Dana" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="px-4 py-2.5 text-sm font-semibold transition-all relative"
            style={{
              color: activeTab === key ? COLORS.primary.main : COLORS.text.secondary,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}
          >
            {label}
            {activeTab === key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: COLORS.primary.main }} />
            )}
          </button>
        ))}
      </div>
      
      {/* Tab Content: Transactions */}
      {activeTab === "transactions" && (
        <>
          {/* Filter & Export */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              {[
                { v: "all", l: "Semua Status", c: COLORS.primary.main },
                { v: "success", l: "Berhasil", c: COLORS.success },
                { v: "pending", l: "Ditunda", c: COLORS.warning },
                { v: "cancelled", l: "Dibatalkan", c: COLORS.danger },
              ].map(({ v, l, c }) => (
                <button key={v} onClick={() => setTransFilterStatus(v)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: transFilterStatus === v ? `${c}20` : COLORS.bg.card,
                    color: transFilterStatus === v ? c : COLORS.text.secondary,
                    border: `1px solid ${transFilterStatus === v ? `${c}35` : COLORS.border}`,
                  }}>
                  {l}
                </button>
              ))}
            </div>
            <ActionBtn onClick={() => showToast("Laporan transaksi berhasil disiapkan dalam format PDF.")}>
              Export PDF
            </ActionBtn>
          </div>
          
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {["Tanggal", "Nama Siswa", "NIS/NISN", "Langganan", "VA Number", "Bank", "Nominal", "Status", "Aksi"].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: COLORS.text.secondary, fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTrans.map((trans) => {
                    const s = TRANS_STATUS_CONFIG[trans.status];
                    return (
                      <tr key={trans.id} className="hover:bg-[#F8FAF7] cursor-pointer" style={{ borderBottom: `1px solid ${COLORS.border}40` }} onClick={() => setTransDetailModal(trans)}>
                        <td className="px-5 py-3.5"><span className="text-xs" style={{ color: COLORS.text.secondary }}>{trans.date}</span></td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-medium" style={{ color: COLORS.text.main }}>{trans.student}</span>
                        </td>
                        <td className="px-5 py-3.5"><span className="text-xs" style={{ color: COLORS.text.secondary, fontFamily: "'JetBrains Mono',monospace" }}>{trans.nis}</span></td>
                        <td className="px-5 py-3.5"><span className="text-xs" style={{ color: COLORS.text.secondary }}>{trans.subscription}</span></td>
                        <td className="px-5 py-3.5"><span className="text-xs font-semibold" style={{ color: COLORS.accent, fontFamily: "'JetBrains Mono',monospace" }}>{trans.vaNumber}</span></td>
                        <td className="px-5 py-3.5"><Badge color={COLORS.primary.main}>{trans.bank}</Badge></td>
                        <td className="px-5 py-3.5"><span className="text-xs font-semibold" style={{ color: COLORS.success }}>Rp{trans.amount.toLocaleString("id-ID")}</span></td>
                        <td className="px-5 py-3.5"><Badge color={s.color}>{s.label}</Badge></td>
                        <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <IconBtn icon={Eye} color={COLORS.primary.main} onClick={() => setTransDetailModal(trans)} title="Detail" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </>
      )}
      
      {/* Tab Content: Withdrawals */}
      {activeTab === "withdrawals" && (
        <>
          {/* Filter & Export */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              {[
                { v: "all", l: "Semua Status", c: COLORS.primary.main },
                { v: "waiting", l: "Menunggu", c: COLORS.warning },
                { v: "processing", l: "Diproses", c: COLORS.info },
                { v: "success", l: "Berhasil", c: COLORS.success },
                { v: "failed", l: "Gagal", c: COLORS.danger },
                { v: "cancelled", l: "Dibatalkan", c: COLORS.danger },
              ].map(({ v, l, c }) => (
                <button key={v} onClick={() => setWithdrawalFilterStatus(v)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: withdrawalFilterStatus === v ? `${c}20` : COLORS.bg.card,
                    color: withdrawalFilterStatus === v ? c : COLORS.text.secondary,
                    border: `1px solid ${withdrawalFilterStatus === v ? `${c}35` : COLORS.border}`,
                  }}>
                  {l}
                </button>
              ))}
            </div>
            <ActionBtn onClick={() => showToast("Laporan pencairan dana berhasil disiapkan dalam format PDF.")}>
              Export PDF
            </ActionBtn>
          </div>
          
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {["Tanggal Pengajuan", "Nama Instruktur", "Nominal", "Bank", "Nomor Rekening", "Atas Nama", "Tanggal Pencairan", "Status", "Aksi"].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-semibold" style={{ color: COLORS.text.secondary, fontFamily: "'JetBrains Mono',monospace" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredWithdrawals.map((req) => {
                    const s = WITHDRAWAL_STATUS_CONFIG[req.status];
                    return (
                      <tr key={req.id} className="hover:bg-[#F8FAF7] cursor-pointer" style={{ borderBottom: `1px solid ${COLORS.border}40` }} onClick={() => setWithdrawalDetailModal(req)}>
                        <td className="px-5 py-3.5"><span className="text-xs" style={{ color: COLORS.text.secondary }}>{req.dateRequested}</span></td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{ background: `linear-gradient(135deg,${COLORS.primary.main},${COLORS.primary.hover})` }}>{req.instructor[0]}</div>
                            <span className="text-xs font-medium" style={{ color: COLORS.text.main }}>{req.instructor}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5"><span className="text-xs font-semibold" style={{ color: COLORS.accent }}>Rp{req.amount.toLocaleString("id-ID")}</span></td>
                        <td className="px-5 py-3.5"><Badge color={COLORS.primary.main}>{req.bank}</Badge></td>
                        <td className="px-5 py-3.5"><span className="text-xs" style={{ color: COLORS.text.secondary, fontFamily: "'JetBrains Mono',monospace" }}>{req.accountNumber}</span></td>
                        <td className="px-5 py-3.5"><span className="text-xs" style={{ color: COLORS.text.secondary }}>{req.accountName}</span></td>
                        <td className="px-5 py-3.5"><span className="text-xs" style={{ color: COLORS.text.secondary }}>{req.dateProcessed}</span></td>
                        <td className="px-5 py-3.5"><Badge color={s.color}>{s.label}</Badge></td>
                        <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            <IconBtn icon={Eye} color={COLORS.primary.main} onClick={() => setWithdrawalDetailModal(req)} title="Detail" />
                            {req.status === "waiting" && <IconBtn icon={Activity} color={COLORS.info} onClick={() => handleProcessWithdrawal(req)} title="Proses" />}
                            {(req.status === "waiting" || req.status === "processing") && <IconBtn icon={CheckCircle2} color={COLORS.success} onClick={() => handleMarkSuccess(req)} title="Tandai Berhasil" />}
                            {(req.status === "waiting" || req.status === "processing") && <IconBtn icon={AlertCircle} color={COLORS.danger} onClick={() => handleMarkFailed(req)} title="Tandai Gagal" />}
                            {req.status === "waiting" && <IconBtn icon={X} color={COLORS.danger} onClick={() => handleCancelWithdrawal(req)} title="Batalkan" />}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </>
      )}
      
      {/* Transaction Detail Modal */}
      {transDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setTransDetailModal(null)} />
          <GlassCard className="relative w-full max-w-lg p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>Detail Transaksi</h3>
              <button onClick={() => setTransDetailModal(null)} style={{ color: COLORS.text.secondary }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: `${COLORS.primary.main}10`, border: `1px solid ${COLORS.primary.main}30` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${COLORS.accent}25`, color: COLORS.accent }}>
                  <Activity size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold mb-0.5" style={{ fontFamily: "'JetBrains Mono',monospace", color: COLORS.text.secondary }}>ID: TRX-{transDetailModal.id.toString().padStart(4, '0')}</div>
                  <Badge color={TRANS_STATUS_CONFIG[transDetailModal.status].color}>{TRANS_STATUS_CONFIG[transDetailModal.status].label}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "TANGGAL", val: transDetailModal.date },
                  { label: "NAMA SISWA", val: transDetailModal.student },
                  { label: "NIS/NISN", val: transDetailModal.nis },
                  { label: "LANGGANAN", val: transDetailModal.subscription },
                  { label: "BANK", val: transDetailModal.bank },
                  { label: "VA NUMBER", val: transDetailModal.vaNumber },
                  { label: "NOMINAL", val: `Rp${transDetailModal.amount.toLocaleString("id-ID")}` },
                  { label: "STATUS", val: TRANS_STATUS_CONFIG[transDetailModal.status].label },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="text-xs font-semibold mb-1" style={{ color: COLORS.text.secondary, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
                    <div className="text-sm" style={{ color: COLORS.text.main }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      )}
      
      {/* Withdrawal Detail Modal */}
      {withdrawalDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setWithdrawalDetailModal(null)} />
          <GlassCard className="relative w-full max-w-lg p-7 z-10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>Detail Pencairan</h3>
              <button onClick={() => setWithdrawalDetailModal(null)} style={{ color: COLORS.text.secondary }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: `${COLORS.accent}10`, border: `1px solid ${COLORS.accent}30` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${COLORS.accent}25`, color: COLORS.accent }}>
                  <BarChart2 size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: COLORS.text.main }}>{withdrawalDetailModal.instructor}</div>
                  <Badge color={WITHDRAWAL_STATUS_CONFIG[withdrawalDetailModal.status].color}>{WITHDRAWAL_STATUS_CONFIG[withdrawalDetailModal.status].label}</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "TANGGAL PENGAJUAN", val: withdrawalDetailModal.dateRequested },
                  { label: "NAMA INSTRUKTUR", val: withdrawalDetailModal.instructor },
                  { label: "EMAIL", val: withdrawalDetailModal.email },
                  { label: "NOMINAL", val: `Rp${withdrawalDetailModal.amount.toLocaleString("id-ID")}` },
                  { label: "BANK", val: withdrawalDetailModal.bank },
                  { label: "NOMOR REKENING", val: withdrawalDetailModal.accountNumber },
                  { label: "ATAS NAMA", val: withdrawalDetailModal.accountName },
                  { label: "TANGGAL PENCAIRAN", val: withdrawalDetailModal.dateProcessed },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="text-xs font-semibold mb-1" style={{ color: COLORS.text.secondary, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
                    <div className="text-sm" style={{ color: COLORS.text.main }}>{val}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-2">
                {withdrawalDetailModal.status === "waiting" && (
                  <>
                    <button onClick={() => { handleProcessWithdrawal(withdrawalDetailModal); setWithdrawalDetailModal(null); }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: `linear-gradient(135deg,${COLORS.info},${COLORS.info}88)`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                      Proses
                    </button>
                    <button onClick={() => { handleCancelWithdrawal(withdrawalDetailModal); setWithdrawalDetailModal(null); }}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                      style={{ background: `${COLORS.danger}25`, color: COLORS.danger, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                      Batalkan
                    </button>
                  </>
                )}
                {(withdrawalDetailModal.status === "waiting" || withdrawalDetailModal.status === "processing") && (
                  <>
                    <button onClick={() => { handleMarkSuccess(withdrawalDetailModal); setWithdrawalDetailModal(null); }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: `linear-gradient(135deg,${COLORS.success},${COLORS.success}88)`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                      Tandai Berhasil
                    </button>
                    <button onClick={() => { handleMarkFailed(withdrawalDetailModal); setWithdrawalDetailModal(null); }}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                      style={{ background: `${COLORS.danger}25`, color: COLORS.danger, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                      Tandai Gagal
                    </button>
                  </>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD PAGE (router by role + activeNav)
// ═══════════════════════════════════════════════════════════════════════════════
function DashboardPage({ role, instrId: instrIdProp }: { role: Role; instrId?: InstrId }) {
  const defaultNav: Record<Role, string> = { student: "overview", instructor: "overview", admin: "overview" };
  const [activeNav, setActiveNav] = useState(defaultNav[role]);

  // ── Instructor shared state ───────────────────────────────────────────────
  const instrId: InstrId = instrIdProp ?? 1;
  const baseAccount = INSTR_ACCOUNTS[instrId];
  const [instrCourses, setInstrCourses] = useState<InstrCourse[]>(baseAccount.courses);
  const [instrMaterials, setInstrMaterials] = useState<InstrMaterial[]>(baseAccount.materials);
  const [instrMaterialFilter, setInstrMaterialFilter] = useState("all");
  const instrAccount: InstrAccount = { ...baseAccount, courses: instrCourses, materials: instrMaterials };
  const instrProps: InstrProps = {
    account: instrAccount,
    courses: instrCourses, setCourses: setInstrCourses,
    materials: instrMaterials, setMaterials: setInstrMaterials,
    setActiveNav,
    materialFilter: instrMaterialFilter,
    setMaterialFilter: setInstrMaterialFilter,
  };

  // ── Student shared state ──────────────────────────────────────────────────
  const [packageActive, setPackageActive] = useState(true);
  const [enrolledIds, setEnrolledIds] = useState<number[]>([1, 2, 3]);
  const [progressMap, setProgressMap] = useState<Record<number, { done: number }>>({
    1: { done: 17 },
    2: { done: 8 },
    3: { done: 5 },
  });
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(1);
  const [currentMaterialIdx, setCurrentMaterialIdx] = useState(0);

  function onEnroll(id: number) {
    if (!enrolledIds.includes(id)) {
      setEnrolledIds(prev => [...prev, id]);
      setProgressMap(prev => ({ ...prev, [id]: { done: 0 } }));
    }
  }

  const studentProps: StudentProps = {
    packageActive, setPackageActive,
    enrolledIds, onEnroll,
    progressMap, setProgressMap,
    setActiveNav,
    selectedCourseId, setSelectedCourseId,
    currentMaterialIdx, setCurrentMaterialIdx,
  };

  function renderContent() {
    if (role === "student") {
      if (activeNav === "overview")      return <StudentOverview     {...studentProps} />;
      if (activeNav === "explore")       return <StudentExplore      {...studentProps} />;
      if (activeNav === "my-courses")    return <StudentMyCourses    {...studentProps} />;
      if (activeNav === "progress")      return <StudentProgress     {...studentProps} />;
      if (activeNav === "my-package")    return <StudentPackage      {...studentProps} />;
      if (activeNav === "profile")       return <StudentProfilePage />;
      if (activeNav === "course-detail") return <StudentCourseDetail {...studentProps} />;
      if (activeNav === "learn")         return <StudentLearn        {...studentProps} />;
      if (activeNav === "certificate")   return <StudentCertificate  {...studentProps} />;
    }
    if (role === "admin") {
      if (activeNav === "overview")     return <AdminOverview setActiveNav={setActiveNav} />;
      if (activeNav === "courses")      return <AdminCourses />;
      if (activeNav === "users")        return <AdminUsers />;
      if (activeNav === "instructors")  return <AdminInstructors />;
      if (activeNav === "enrollments")  return <AdminEnrollments />;
      if (activeNav === "packages")     return <AdminPackages />;
      if (activeNav === "certificates") return <AdminCertificates />;
      if (activeNav === "transactions")  return <AdminTransactions />;
    }
    if (role === "instructor") {
      if (activeNav === "overview")    return <InstructorOverview    {...instrProps} />;
      if (activeNav === "my-courses")  return <InstructorMyCourses   {...instrProps} />;
      if (activeNav === "materials")   return <InstructorMaterials   {...instrProps} />;
      if (activeNav === "enrollments") return <InstructorEnrollments {...instrProps} />;
      if (activeNav === "commission")  return <InstructorCommission  {...instrProps} />;
      if (activeNav === "profile")     return <InstructorProfilePage account={instrAccount} />;
    }
    return null;
  }

  return (
    <DashboardShell role={role} activeNav={activeNav} setActiveNav={setActiveNav} instrId={instrId}>
      {renderContent()}
    </DashboardShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
function pathForNav(nav: Nav): string {
  switch (nav.page) {
    case "landing":
      return "/";
    case "login":
      return "/login";
    case "register":
      return "/register";
    case "verification-status":
      return "/instructor/status";
    case "dashboard":
      switch (nav.role) {
        case "student":
          return "/student/dashboard";
        case "instructor":
          return "/instructor/dashboard";
        case "admin":
          return "/admin/dashboard";
        default:
          return "/dashboard";
      }
  }
}

function App() {
  const routerNavigate = useNavigate();

  const navigate = useCallback((n: Nav) => {
    routerNavigate(pathForNav(n));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [routerNavigate]);

  return (
    <Routes>
      <Route path="/" element={<PublicLandingPage navigate={navigate} />} />
      <Route path="/login" element={<LoginPage navigate={navigate} />} />
      <Route path="/register" element={<AuthRegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<CanonicalDashboardRedirect />} />
        <Route element={<RoleRoute role="student" />}>
          <Route path="/student/dashboard" element={<DashboardPage role="student" />} />
        </Route>
        <Route element={<RoleRoute role="instructor" verification="verified" />}>
          <Route path="/instructor/dashboard" element={<DashboardPage role="instructor" />} />
        </Route>
        <Route element={<RoleRoute role="instructor" verification="unverified" />}>
          <Route path="/instructor/status" element={<VerificationStatusPage />} />
        </Route>
        <Route element={<RoleRoute role="admin" />}>
          <Route path="/admin/dashboard" element={<DashboardPage role="admin" />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
