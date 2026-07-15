<?= $this->extend('layouts/main') ?>
<?= $this->section('content') ?>
<nav class="public-navbar">
    <div class="container py-3 d-flex justify-content-between align-items-center gap-3">
        <div class="d-flex align-items-center gap-3">
            <div class="brand-mark">
    <img src="<?= base_url('assets/img/logo-coursehub.png') ?>" alt="CourseHub logo"></div>
            <div>
                <div class="fw-bold">CourseHub</div>
                <div class="small text-muted">Learning platform & course management</div>
            </div>
        </div>
        <div class="d-none d-md-flex align-items-center gap-4 small fw-semibold">
            <a href="#fitur" class="text-dark">Fitur</a>
            <a href="#parallax-demo" class="text-dark">Platform</a>
            <a href="#kursus" class="text-dark">Kursus</a>
            <a href="#alur" class="text-dark">Alur</a>
        </div>
        <div class="d-flex gap-2">
            <a href="<?= site_url('login') ?>" class="btn btn-outline-primary">Masuk</a>
            <a href="<?= site_url('register') ?>" class="btn btn-primary">Daftar</a>
        </div>
    </div>
</nav>

<section class="hero-landing parallax-hero">
    <div class="parallax-orb orb-blue" data-parallax data-speed="-0.34" data-x="0.06"></div>
    <div class="parallax-orb orb-cyan" data-parallax data-speed="0.26" data-x="-0.05"></div>
    <div class="parallax-grid-layer" data-parallax data-speed="0.16"></div>

    <div class="container position-relative">
        <div class="hero-grid">
            <div class="hero-copy" data-parallax data-speed="-0.08">
                <span class="badge badge-soft mb-3">Platform pembelajaran berbasis CodeIgniter 4</span>
                <h1 class="hero-title mb-3">Belajar lebih terarah dengan <span class="text-primary">landing page parallax</span> yang benar-benar bergerak.</h1>
                <p class="hero-subtitle mb-4">
                    CourseHub membantu admin, instruktur, dan siswa mengelola kursus, materi, enrolmen, dan progress belajar dalam satu sistem yang rapi, responsif, dan nyaman digunakan.
                </p>
                <div class="d-flex flex-wrap gap-3 mb-4">
                    <a href="<?= site_url('register') ?>" class="btn btn-primary btn-lg">Mulai Belajar Sekarang</a>
                    <a href="<?= site_url('login') ?>" class="btn btn-outline-secondary btn-lg">Masuk ke Sistem</a>
                </div>
                <div class="hero-metrics">
                    <div class="hero-metric" data-parallax data-speed="0.05">
                        <div class="small text-muted mb-1">Kursus Tersedia</div>
                        <div class="fs-3 fw-bold"><?= esc($stats['courses']) ?>+</div>
                    </div>
                    <div class="hero-metric" data-parallax data-speed="0.09">
                        <div class="small text-muted mb-1">Materi Aktif</div>
                        <div class="fs-3 fw-bold"><?= esc($stats['lessons']) ?>+</div>
                    </div>
                    <div class="hero-metric" data-parallax data-speed="0.13">
                        <div class="small text-muted mb-1">Enrolmen</div>
                        <div class="fs-3 fw-bold"><?= esc($stats['enrollments']) ?>+</div>
                    </div>
                </div>
            </div>

            <div class="parallax-device-wrap">
                <div class="hero-panel glass-card parallax-device" data-parallax data-speed="0.22" data-x="-0.04" data-rotate="-0.025">
                    <div class="device-glow" data-parallax data-speed="-0.18"></div>
                    <div class="hero-panel__inner d-flex flex-column justify-content-between">
                        <div class="hero-dashboard-card" data-parallax data-speed="-0.12">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="badge rounded-pill text-bg-light text-primary">Live Dashboard</span>
                                <span class="small opacity-75">CourseHub</span>
                            </div>
                            <h3 class="fw-bold display-6 mb-3">Dashboard pembelajaran yang informatif dan profesional.</h3>
                            <p class="opacity-75 mb-0">Kartu, grafik mini, data kursus, dan monitoring progress terlihat lebih modern.</p>
                        </div>
                        <div class="floating-card medium one" data-parallax data-speed="-0.42" data-x="0.09" data-rotate="0.03">
                            <div class="small opacity-75">Monitoring progress</div>
                            <div class="fs-4 fw-bold">87% siswa aktif</div>
                            <div class="small">Kartu ini bergerak lebih cepat saat halaman discroll.</div>
                        </div>
                        <div class="floating-card small two" data-parallax data-speed="0.38" data-x="-0.08" data-rotate="-0.04">
                            <div class="small opacity-75">Materi</div>
                            <div class="fw-bold fs-5">Terstruktur</div>
                        </div>
                        <div class="floating-card small three" data-parallax data-speed="-0.30" data-x="-0.05" data-rotate="0.025">
                            <div class="small opacity-75">REST API</div>
                            <div class="fw-bold fs-5">Siap diuji</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="scroll-cue" data-parallax data-speed="0.26">
            <span></span>
            <i class="bi bi-arrow-down"></i>
        </div>
    </div>
</section>

<section id="fitur" class="parallax-section landing-section-soft">
    <div class="section-orb left" data-parallax data-speed="-0.24" data-x="0.08"></div>
    <div class="section-orb right" data-parallax data-speed="0.28" data-x="-0.06"></div>
    <div class="container position-relative">
        <div class="text-center mb-5" data-parallax data-speed="-0.10">
            <span class="badge badge-soft mb-3">Fitur unggulan</span>
            <h2 class="section-title">Dirancang untuk manajemen kursus yang lengkap</h2>
            <p class="text-muted mx-auto" style="max-width: 760px;">Sistem dibuat dengan struktur UI yang lebih estetik agar nyaman saat presentasi maupun digunakan langsung.</p>
        </div>
        <div class="row g-4">
            <div class="col-lg-4 col-md-6" data-parallax data-speed="0.10">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-collection-play-fill"></i></div>
                    <h5 class="fw-bold">Manajemen kursus</h5>
                    <p class="text-muted mb-0">Kelola judul kursus, kategori, level, harga, thumbnail, status, dan instruktur.</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6" data-parallax data-speed="0.16">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-journal-code"></i></div>
                    <h5 class="fw-bold">Kelola materi</h5>
                    <p class="text-muted mb-0">Materi dapat diatur berdasarkan urutan, konten, dan tautan video.</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6" data-parallax data-speed="0.22">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-speedometer2"></i></div>
                    <h5 class="fw-bold">Monitoring progress</h5>
                    <p class="text-muted mb-0">Siswa memperbarui progress, admin dan instruktur memantau enrolmen.</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6" data-parallax data-speed="-0.10">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-shield-lock-fill"></i></div>
                    <h5 class="fw-bold">Autentikasi & otorisasi</h5>
                    <p class="text-muted mb-0">Akses dibedakan antara admin, instruktur, dan siswa.</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6" data-parallax data-speed="-0.16">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-cloud-check-fill"></i></div>
                    <h5 class="fw-bold">REST API</h5>
                    <p class="text-muted mb-0">API GET, POST, PUT, dan DELETE siap diuji menggunakan Postman.</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6" data-parallax data-speed="-0.22">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-phone-fill"></i></div>
                    <h5 class="fw-bold">Responsif</h5>
                    <p class="text-muted mb-0">Tampilan menyesuaikan layar desktop maupun mobile.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="parallax-demo" class="deep-parallax-section">
    <div class="deep-layer deep-back" data-parallax data-speed="-0.36"></div>
    <div class="deep-layer deep-middle" data-parallax data-speed="0.30" data-x="-0.04"></div>
    <div class="deep-layer deep-front" data-parallax data-speed="-0.50" data-x="0.06"></div>
    <div class="container position-relative">
        <div class="row align-items-center g-5">
            <div class="col-lg-6" data-parallax data-speed="-0.12">
                <span class="badge rounded-pill text-bg-light text-primary mb-3">Platform kursus digital</span>
                <h2 class="section-title text-white">Kelola kursus, materi, dan progress belajar dalam satu web app.</h2>
                <p class="text-white-50 mb-4">Bagian ini dibuat khusus agar efek parallax terlihat jelas. Background, orb, kartu sistem, dan card statistik bergerak naik-turun saat scroll.</p>
                <a href="<?= site_url('register') ?>" class="btn btn-light text-primary">Daftar Kursus</a>
            </div>
            <div class="col-lg-6">
                <div class="parallax-stack">
                    <div class="stack-card stack-main" data-parallax data-speed="0.32" data-x="-0.05" data-rotate="-0.02">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <div class="small text-muted">Kursus aktif</div>
                                <h3 class="fw-bold mb-0"><?= esc($stats['courses']) ?> Course</h3>
                            </div>
                            <div class="feature-icon mb-0"><i class="bi bi-mortarboard-fill"></i></div>
                        </div>
                        <div class="progress mb-3"><div class="progress-bar" style="width: 72%;">72%</div></div>
                        <p class="text-muted mb-0">Efek bergerak terlihat ketika section ini masuk ke viewport.</p>
                    </div>
                    <div class="stack-card stack-left" data-parallax data-speed="-0.46" data-x="0.12" data-rotate="0.05">
                        <span class="badge badge-soft badge-soft-success">Materi</span>
                        <div class="fw-bold mt-2"><?= esc($stats['lessons']) ?> Modul</div>
                    </div>
                    <div class="stack-card stack-right" data-parallax data-speed="0.48" data-x="-0.10" data-rotate="-0.05">
                        <span class="badge badge-soft">API</span>
                        <div class="fw-bold mt-2">CRUD Ready</div>
                    </div>
                    <div class="stack-card stack-bottom" data-parallax data-speed="-0.34" data-x="-0.08" data-rotate="0.04">
                        <span class="badge badge-soft badge-soft-warning">Progress</span>
                        <div class="fw-bold mt-2">Realtime Update</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="kursus" class="parallax-section landing-section-soft">
    <div class="container">
        <div class="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4" data-parallax data-speed="-0.12">
            <div>
                <span class="badge badge-soft mb-3">Preview konten</span>
                <h2 class="section-title mb-1">Contoh kursus unggulan</h2>
                <p class="text-muted mb-0">Daftar kursus ini diambil langsung dari database aplikasi.</p>
            </div>
            <a href="<?= site_url('login') ?>" class="btn btn-outline-primary">Masuk untuk melihat semua</a>
        </div>
        <div class="row g-4">
            <?php foreach ($featuredCourses as $index => $course) : ?>
                <div class="col-lg-4 col-md-6" data-parallax data-speed="<?= esc(0.14 + ($index * 0.08)) ?>">
                    <div class="course-card">
                        <div class="course-thumb">
                            <?php if (!empty($course['thumbnail'])) : ?>
                                <img src="<?= esc($course['thumbnail']) ?>" alt="<?= esc($course['title']) ?>">
                            <?php endif; ?>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge badge-soft"><?= esc(ucfirst($course['level'])) ?></span>
                            <span class="small text-muted"><?= esc($course['category']) ?></span>
                        </div>
                        <h5 class="fw-bold"><?= esc($course['title']) ?></h5>
                        <p class="text-muted mb-3"><?= esc(character_limiter($course['description'], 110)) ?></p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <div class="small text-muted">Instruktur</div>
                                <div class="fw-semibold"><?= esc($course['instructor_name'] ?? '-') ?></div>
                            </div>
                            <div class="text-end">
                                <div class="small text-muted">Harga</div>
                                <div class="fw-bold text-primary">Rp<?= number_format((float) $course['price'], 0, ',', '.') ?></div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
            <?php if ($featuredCourses === []) : ?>
                <div class="col-12">
                    <div class="feature-card text-center">
                        <p class="mb-0 text-muted">Belum ada kursus unggulan yang ditampilkan.</p>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<section id="alur" class="py-5 flow-section">
    <div class="flow-line" data-parallax data-speed="-0.30" data-x="0.08"></div>
    <div class="container position-relative">
        <div class="text-center mb-5" data-parallax data-speed="-0.12">
            <span class="badge badge-soft mb-3">Alur penggunaan</span>
            <h2 class="section-title">Proses penggunaan sistem</h2>
            <p class="text-muted mx-auto" style="max-width: 720px;">Alur ini cocok untuk menjelaskan aplikasi saat presentasi final project kepada dosen.</p>
        </div>
        <div class="row g-4">
            <div class="col-lg-3 col-md-6" data-parallax data-speed="0.10">
                <div class="step-card text-center">
                    <div class="feature-icon mx-auto"><i class="bi bi-person-plus-fill"></i></div>
                    <h6 class="fw-bold">1. Daftar</h6>
                    <p class="text-muted mb-0">Siswa membuat akun baru melalui halaman registrasi.</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-6" data-parallax data-speed="0.18">
                <div class="step-card text-center">
                    <div class="feature-icon mx-auto"><i class="bi bi-box-arrow-in-right"></i></div>
                    <h6 class="fw-bold">2. Login</h6>
                    <p class="text-muted mb-0">Pengguna masuk sesuai role masing-masing.</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-6" data-parallax data-speed="0.26">
                <div class="step-card text-center">
                    <div class="feature-icon mx-auto"><i class="bi bi-book-half"></i></div>
                    <h6 class="fw-bold">3. Ikuti Kursus</h6>
                    <p class="text-muted mb-0">Siswa mendaftar ke kursus dan mempelajari materi.</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-6" data-parallax data-speed="0.34">
                <div class="step-card text-center">
                    <div class="feature-icon mx-auto"><i class="bi bi-graph-up-arrow"></i></div>
                    <h6 class="fw-bold">4. Pantau Progress</h6>
                    <p class="text-muted mb-0">Progress belajar dapat diperbarui dan dipantau.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="kontak" class="cta-parallax-section">
    <div class="cta-orb cta-one" data-parallax data-speed="-0.38" data-x="0.14"></div>
    <div class="cta-orb cta-two" data-parallax data-speed="0.40" data-x="-0.12"></div>
    <div class="container position-relative">
        <div class="cta-card content-card text-center" data-parallax data-speed="-0.12">
            <span class="badge badge-soft mb-3">Siap digunakan</span>
            <h2 class="section-title mb-3">Masuk ke CourseHub dan coba sistemnya.</h2>
            <p class="text-muted mx-auto mb-4" style="max-width: 720px;">Gunakan akun demo atau daftar sebagai siswa untuk mencoba pengalaman antarmuka yang sudah diperbarui.</p>
            <div class="d-flex flex-wrap justify-content-center gap-3">
                <a href="<?= site_url('login') ?>" class="btn btn-primary btn-lg">Masuk Sekarang</a>
                <a href="<?= site_url('register') ?>" class="btn btn-outline-secondary btn-lg">Daftar Akun Siswa</a>
            </div>
        </div>
    </div>
</section>

<footer class="footer-public">
    <div class="container d-flex flex-column flex-md-row justify-content-between gap-3 align-items-start align-items-md-center">
        <div>
            <div class="fw-bold text-dark">CourseHub</div>
            <div class="small">Sistem Manajemen Kursus Online berbasis CodeIgniter 4.</div>
        </div>
        <div class="small">Landing page sudah memakai scroll parallax aktif.</div>
    </div>
</footer>

<script>
(function () {
    const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'));
    const navbar = document.querySelector('.public-navbar');
    let ticking = false;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function updateParallax() {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 10);
        }

        parallaxItems.forEach(function (el) {
            const rect = el.getBoundingClientRect();
            const speed = parseFloat(el.dataset.speed || '0');
            const xSpeed = parseFloat(el.dataset.x || '0');
            const rotateSpeed = parseFloat(el.dataset.rotate || '0');
            const isVisible = rect.bottom > -200 && rect.top < viewportHeight + 200;

            if (!isVisible) {
                return;
            }

            const sectionProgress = clamp((viewportHeight - rect.top) / (viewportHeight + Math.max(rect.height, 1)), 0, 1);
            const distanceFromCenter = rect.top + (rect.height / 2) - (viewportHeight / 2);
            const y = distanceFromCenter * speed;
            const x = distanceFromCenter * xSpeed;
            const rotate = distanceFromCenter * rotateSpeed;
            const opacity = 0.88 + (sectionProgress * 0.12);

            el.style.setProperty('transform', 'translate3d(' + x.toFixed(2) + 'px, ' + y.toFixed(2) + 'px, 0) rotate(' + rotate.toFixed(2) + 'deg)', 'important');
            el.style.opacity = opacity.toFixed(2);
        });

        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    updateParallax();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('load', requestUpdate);
})();
</script>
<?= $this->endSection() ?>
