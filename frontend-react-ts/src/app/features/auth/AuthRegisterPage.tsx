import { AlertCircle, Briefcase, CheckCircle2, Clock, Eye, EyeOff, GraduationCap, Lock, Mail, User } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { AuthApiError, type UserRole } from './types';

type PublicRegistrationRole = Extract<UserRole, 'student' | 'instructor'>;

const ROLE_OPTIONS = [
  { value: 'student', label: 'Siswa', description: 'Pelajar yang ingin belajar', icon: User },
  { value: 'instructor', label: 'Instruktur', description: 'Pengajar yang ingin berbagi ilmu', icon: Briefcase },
] as const satisfies readonly {
  readonly value: PublicRegistrationRole;
  readonly label: string;
  readonly description: string;
  readonly icon: typeof User;
}[];

function messageFromError(error: AuthApiError): string {
  const messages = Object.values(error.errors);
  return messages.length > 0 ? messages.join(' ') : error.message;
}

export function AuthRegisterPage() {
  const navigate = useNavigate();
  const { registerInstructor, registerStudent } = useAuth();
  const [role, setRole] = useState<PublicRegistrationRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registeredInstructor, setRegisteredInstructor] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (password !== confirmation) {
      setError('Konfirmasi password tidak sama.');
      return;
    }

    setSubmitting(true);
    const payload = {
      name: name.trim(),
      email: email.trim(),
      password,
      password_confirmation: confirmation,
    };
    try {
      if (role === 'student') {
        await registerStudent(payload);
        navigate('/login', { replace: true });
      } else {
        await registerInstructor(payload);
        setRegisteredInstructor(true);
      }
    } catch (caughtError) {
      if (!(caughtError instanceof AuthApiError)) throw caughtError;
      setError(messageFromError(caughtError));
    } finally {
      setSubmitting(false);
    }
  }

  if (registeredInstructor) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-[#F7F5EF]">
        <section className="w-full max-w-md rounded-2xl border border-[#D9D4C7] bg-white p-9 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-[#F3F0E8] text-[#D9A93E]">
            <Clock size={30} />
          </div>
          <p className="text-xs font-semibold text-[#D9A93E] mb-3">Status Verifikasi: Pending</p>
          <h1 className="text-xl font-extrabold text-[#1F2A24] mb-3">Pendaftaran Diterima</h1>
          <p className="text-sm leading-relaxed text-[#657166] mb-6">
            Akun instruktur berhasil dibuat dan sedang menunggu verifikasi admin.
          </p>
          <div className="flex items-center gap-3 text-left text-xs text-[#657166] mb-7">
            <CheckCircle2 size={18} className="text-[#2F8F5B]" /> Data tersimpan di CourseHub
          </div>
          <button type="button" onClick={() => navigate('/login')} className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-[#2F8F5B] hover:bg-[#27784C]">
            Kembali ke Halaman Login
          </button>
        </section>
      </main>
    );
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-[#D9D4C7] bg-white text-sm text-[#1F2A24] outline-none focus:border-[#2F8F5B]';
  return (
    <main className="min-h-screen bg-[#F7F5EF] px-4 py-10">
      <div className="max-w-lg mx-auto">
        <button type="button" onClick={() => navigate('/')} className="text-sm text-[#657166] mb-8 hover:text-[#2F8F5B]">Kembali ke beranda</button>
        <header className="text-center mb-7">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#2F8F5B] text-white">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1F2A24] mb-1">Buat Akun Baru</h1>
          <p className="text-sm text-[#657166]">Bergabung dan mulai belajar bersama CourseHub</p>
        </header>

        <section className="rounded-2xl border border-[#D9D4C7] bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold text-[#657166] mb-3">DAFTAR SEBAGAI</p>
          <div className="grid grid-cols-2 gap-2 mb-7">
            {ROLE_OPTIONS.map(({ value, label, description, icon: Icon }) => (
              <button key={value} type="button" onClick={() => setRole(value)} className="flex flex-col items-center gap-1.5 py-4 rounded-xl border text-xs font-semibold" style={{ borderColor: role === value ? '#2F8F5B' : '#D9D4C7', background: role === value ? '#2F8F5B' : '#FAFAF8', color: role === value ? '#FFFFFF' : '#657166' }}>
                <Icon size={20} />
                <span>{label}</span>
                <span className="font-normal opacity-80">{description}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-xs font-semibold text-[#657166]">NAMA LENGKAP
              <span className="relative block mt-2"><User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B948D]" /><input className={`${inputClass} pl-10`} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required minLength={3} /></span>
            </label>
            <label className="text-xs font-semibold text-[#657166]">EMAIL
              <span className="relative block mt-2"><Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B948D]" /><input className={`${inputClass} pl-10`} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></span>
            </label>
            <label className="text-xs font-semibold text-[#657166]">PASSWORD
              <span className="relative block mt-2"><Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B948D]" /><input className={`${inputClass} pl-10 pr-10`} type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required minLength={8} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#657166]" aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}>{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></span>
            </label>
            <label className="text-xs font-semibold text-[#657166]">KONFIRMASI PASSWORD
              <input className={`${inputClass} mt-2`} type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" required minLength={8} />
            </label>
            {error && <p className="flex items-center gap-2 text-xs text-[#D95C5C]" role="alert"><AlertCircle size={14} />{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-[#2F8F5B] hover:bg-[#27784C] disabled:opacity-60">
              {submitting ? 'Memproses...' : role === 'student' ? 'Daftar sebagai Siswa' : 'Kirim Pendaftaran Instruktur'}
            </button>
          </form>
          <p className="text-center text-xs text-[#657166] mt-5">Sudah punya akun? <button type="button" onClick={() => navigate('/login')} className="font-semibold text-[#2F8F5B]">Masuk</button></p>
        </section>
      </div>
    </main>
  );
}
