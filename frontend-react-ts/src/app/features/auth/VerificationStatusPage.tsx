import { AlertCircle, Clock, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function VerificationStatusPage() {
  const { user, logout } = useAuth();
  if (!user || user.role !== 'instructor') return null;

  const rejected = user.instructor_verification_status === 'rejected';
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#F7F5EF]">
      <section className="w-full max-w-md rounded-2xl border border-[#D9D4C7] bg-white p-8 text-center shadow-sm">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#E6F3EB] text-[#2F8F5B]">
          <GraduationCap size={24} />
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-[#F3F0E8] text-[#D9A93E]">
          {rejected ? <AlertCircle size={28} /> : <Clock size={28} />}
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#D9A93E] mb-3">
          Status: {rejected ? 'Ditolak' : 'Menunggu verifikasi'}
        </p>
        <h1 className="text-xl font-bold text-[#1F2A24] mb-3">Halo, {user.name}</h1>
        <p className="text-sm leading-relaxed text-[#657166] mb-6">
          {rejected
            ? user.rejection_reason || 'Pendaftaran instruktur belum dapat disetujui. Hubungi admin untuk informasi lebih lanjut.'
            : 'Akun instruktur sedang ditinjau admin. Kamu dapat login dan melihat status ini, tetapi belum dapat mengelola kursus.'}
        </p>
        <button
          type="button"
          onClick={() => { void logout(); }}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 bg-[#2F8F5B] hover:bg-[#27784C]"
        >
          <LogOut size={16} /> Keluar
        </button>
      </section>
    </main>
  );
}
