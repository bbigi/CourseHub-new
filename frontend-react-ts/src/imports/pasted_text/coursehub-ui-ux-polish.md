Buat sesuai perintah di bawah ini, jangan merubah desain yang lain yang tidak disuruh.

FOKUS:
Lakukan final polishing UI/UX pada seluruh tampilan CourseHub agar lebih rapi, nyaman dilihat, konsisten, dan jelas secara navigasi. Jangan redesign total dari awal. Pertahankan fitur, isi halaman, alur sistem, dan struktur halaman yang sudah ada. Fokus hanya pada:
1. perapihan warna,
2. perapihan layout,
3. konsistensi visual,
4. active state navbar dan sidebar,
5. perbaikan halaman login/daftar,
6. perbaikan kenyamanan tampilan seluruh role.

JANGAN UBAH:
- alur sistem siswa, instruktur, admin
- fitur yang sudah aktif
- data dummy yang sudah ada
- isi konten utama landing page
- halaman navbar yang sudah dibuat
- halaman dashboard masing-masing role
- transaksi, komisi, paket, sertifikat, kursus, materi, profil
- jangan tambah fitur baru yang tidak diminta
- jangan bikin halaman kosong
- jangan bikin dark neon yang menyakitkan mata
- jangan bikin warna hijau terlalu pekat pada card besar
- jangan bikin navbar terpisah-pisah seperti tombol mengambang

==================================================
A. MASALAH YANG HARUS DIPERBAIKI
==================================================

Saat ini masih ada beberapa masalah:
1. Landing page isinya sudah benar, tetapi warna dan spacing masih belum halus.
2. Navbar publik masih terlihat seperti kumpulan tombol terpisah, belum terasa seperti satu bar navigasi yang utuh dari kiri ke kanan.
3. Belum ada penanda posisi halaman yang benar-benar jelas saat user sedang membuka menu tertentu.
4. Sidebar pada dashboard siswa, instruktur, dan admin belum memberi petunjuk visual yang kuat bahwa user sedang berada di halaman mana.
5. Beberapa card dashboard masih terlalu gelap/terlalu pekat, sehingga kurang nyaman dilihat.
6. Halaman login dan daftar masih terasa seperti campuran warna gelap yang belum konsisten dengan tema baru.
7. Visual keseluruhan harus lebih lembut, profesional, ringan di mata, dan tidak terasa “template AI”.

==================================================
B. ARAH DESAIN FINAL
==================================================

Gunakan gaya visual:
- bersih
- modern
- akademik
- ringan di mata
- profesional
- cocok untuk sistem kursus online siswa

Tema warna final:
Gunakan LIGHT MODE NATURAL, bukan dark neon.

Palet warna final:
- Background utama: #F7F5EF
- Background section: #F3F0E8
- Navbar / topbar / sidebar: #FFFFFF
- Card: #FFFFFF
- Surface soft: #F8FAF7
- Border: #D9D4C7
- Primary hijau: #2F8F5B
- Primary hover: #27784C
- Primary soft: #E6F3EB
- Accent amber: #D9A93E
- Accent soft amber: #F8EBCB
- Text utama: #1F2A24
- Text sekunder: #657166
- Text muted: #8B948D
- Danger: #D95C5C
- Danger soft: #FBE9E9

Aturan warna:
1. Background halaman mayoritas terang, hangat, dan netral.
2. Card wajib putih atau off-white, jangan hijau pekat penuh.
3. Hijau hanya dipakai untuk tombol utama, active state, badge aktif, icon penting, dan CTA.
4. Amber dipakai untuk highlight pencapaian, sertifikat, paket, rating, komisi.
5. Hindari biru neon, ungu neon, hijau pekat gelap, dan gradient tajam.
6. Pastikan seluruh teks memiliki kontras yang jelas dan nyaman dibaca.

==================================================
C. PERBAIKAN NAVBAR PUBLIK
==================================================

Perbaiki navbar publik agar menjadi SATU BAR NAVIGASI UTUH dari kiri ke kanan, bukan kumpulan tombol yang terpisah.

Navbar final:
- logo CourseHub di kiri
- menu di tengah:
  Beranda
  Untuk Siswa
  Untuk Instruktur
  Paket Bulanan
  Kursus
  Kontak
- tombol kanan:
  Masuk
  Daftar

Aturan navbar:
1. Navbar dibuat sebagai satu horizontal bar penuh.
2. Navbar memiliki background putih bersih, border bawah lembut, dan tinggi yang konsisten.
3. Menu navbar tidak tampil seperti tombol besar terpisah-pisah.
4. Default menu tampil sebagai text link yang rapi.
5. Saat menu aktif / sedang dibuka:
   - tampilkan active state berupa kapsul lembut / underline capsule / tab indicator
   - warna aktif: hijau soft
   - teks aktif: hijau tua
   - background aktif: #E6F3EB
   - border tipis halus
6. Saat menu tidak aktif, tampilkan sebagai teks netral tanpa terlalu ramai.
7. Berikan hover state halus.
8. Tombol Masuk: outline putih dengan border hijau lembut.
9. Tombol Daftar: tombol utama hijau.
10. Navbar harus terasa menyatu dari ujung kiri ke kanan.

==================================================
D. HALAMAN LANDING PAGE
==================================================

Landing page isinya SUDAH BENAR, jadi jangan ganti struktur isi utamanya. Hanya rapikan visual dan layout.

Tetap pertahankan halaman:
- Beranda
- Untuk Siswa
- Untuk Instruktur
- Paket Bulanan
- Kursus
- Kontak

Aturan final landing page:
1. Beranda hanya menjelaskan:
   - apa itu CourseHub
   - manfaat sistem kursus online
   - alur penggunaan sistem
2. Section tidak terlalu lebar dan kosong.
3. Gunakan container yang rapi dengan max width konsisten.
4. Jarak antar section dibuat lebih proporsional.
5. Card informasi gunakan:
   - background putih
   - border tipis
   - radius lembut
   - shadow sangat halus
6. Hero heading tetap:
   “Belajar lebih terarah dalam satu platform kursus online.”
7. Pertegas tipografi:
   - heading besar tapi tidak terlalu memenuhi layar
   - subheading lebih rapi
   - CTA sejajar dan seimbang
8. Hindari area kosong berlebihan.
9. Footer dibuat lebih rapi dan menyatu dengan gaya sistem.

==================================================
E. ACTIVE STATE SIDEBAR MASING-MASING ROLE
==================================================

Ini sangat penting:
Setiap sidebar pada role siswa, instruktur, dan admin HARUS memiliki tanda jelas bahwa user sedang ada di halaman mana.

Aturan sidebar:
1. Item sidebar aktif wajib berbeda jelas dari item lain.
2. Gunakan active state seperti:
   - background soft green #E6F3EB
   - border kiri / accent kiri hijau #2F8F5B
   - icon aktif berwarna hijau
   - teks aktif lebih tegas
3. Item tidak aktif tetap netral.
4. Hover item sidebar dibuat halus.
5. Jangan semua item sidebar terlihat sama.
6. User harus langsung tahu dia sedang berada di menu mana.

Terapkan pada:
- Sidebar siswa
- Sidebar instruktur
- Sidebar admin

==================================================
F. PERBAIKAN DASHBOARD ROLE
==================================================

Perbaiki dashboard:
- siswa
- instruktur
- admin

Fokus:
1. Card statistik jangan full warna hijau gelap.
2. Gunakan card putih / surface putih.
3. Icon berada dalam chip kecil soft color.
4. Angka utama pakai text gelap.
5. Label card gunakan text sekunder.
6. Badge status gunakan kapsul kecil yang lembut.
7. Section aktivitas dibuat lebih rapi dan tidak terlalu kontras.
8. Table dibuat putih dengan header soft background.
9. Jangan terlalu banyak blok warna gelap besar.

==================================================
G. LOGIN DAN DAFTAR
==================================================

Perbaiki halaman login dan daftar agar konsisten dengan tema baru.

Aturan login/daftar:
1. Background terang natural, bukan dark blue/green pekat.
2. Form card putih dengan border lembut dan shadow halus.
3. Input field putih atau soft neutral.
4. Tab role siswa/instruktur dibuat lebih rapi:
   - role aktif diberi highlight soft green
   - role nonaktif netral
5. Tombol utama hijau.
6. Link “Daftar sekarang” / “Kembali ke beranda” dibuat lebih bersih.
7. Typography dan spacing dirapikan.
8. Jangan gunakan kombinasi background gelap + input putih kontras berlebihan.

==================================================
H. KONSISTENSI KOMPONEN
==================================================

Pastikan seluruh aplikasi memakai sistem visual yang sama:
1. Satu style card
2. Satu style table
3. Satu style navbar
4. Satu style sidebar
5. Satu style button
6. Satu style input
7. Satu style modal
8. Satu style toast
9. Satu style badge/status
10. Satu style empty state

Style status badge:
- Aktif / Berhasil / Tersedia / Terverifikasi = soft green
- Pending / Menunggu / Diproses / Ditunda = soft amber
- Gagal / Ditolak / Dibatalkan / Nonaktif = soft red
- Draft / Belum Tersedia / Kadaluarsa = soft neutral

==================================================
I. RAPIIKAN SPACING DAN HIERARCHY
==================================================

Perbaiki secara global:
1. Margin antar section
2. Padding dalam card
3. Jarak antar card
4. Jarak judul dan isi
5. Jarak navbar ke konten
6. Jarak sidebar ke konten
7. Ukuran heading
8. Ukuran subheading
9. Keseimbangan alignment kiri-kanan

Tujuan:
seluruh tampilan terasa rapi, stabil, profesional, dan enak dipandang.

==================================================
J. HASIL AKHIR YANG DIHARAPKAN
==================================================

Hasil akhir harus seperti ini:
1. Landing page tetap lengkap dan isinya tetap benar.
2. Warna seluruh aplikasi menjadi lebih halus, terang, natural, dan nyaman di mata.
3. Navbar publik menjadi satu bar utuh dari kiri ke kanan.
4. Setiap menu navbar yang dibuka memiliki active state yang jelas.
5. Sidebar pada siswa, instruktur, dan admin memiliki active state yang jelas.
6. User bisa langsung tahu sedang berada di halaman mana.
7. Login dan daftar tampil lebih bersih dan konsisten.
8. Card dashboard lebih ringan dan tidak terlalu pekat.
9. Seluruh UI terasa seperti aplikasi kursus online yang siap dipresentasikan.
10. Jangan ada bagian yang terlihat sakit di mata, terlalu kontras, atau membingungkan secara navigasi.