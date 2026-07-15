Buat sesuai perintah di bawah ini, jangan merubah desain yang lain yang tidak disuruh.

Lakukan FINAL POLISHING UI/UX pada desain CourseHub. Jangan redesign total dari awal. Pertahankan fitur, alur, halaman, dan isi konten yang sudah ada. Fokus perbaikan kali ini adalah KONSISTENSI VISUAL, ACTIVE STATE, NAVBAR, SIDEBAR, KETERBACAAN TEKS, LOGO, DAN KERAPIHAN KOMPONEN.

==================================================
1. FOKUS PERBAIKAN UTAMA
==================================================

Perbaiki masalah berikut:
1. Pada landing page dan seluruh role dashboard, penanda halaman aktif masih belum jelas.
2. Sidebar siswa, instruktur, dan admin belum punya tanda visual yang kuat saat user sedang berada di halaman tertentu.
3. Navbar publik masih belum konsisten sebagai satu bar navigasi penuh dari kiri ke kanan.
4. Logo di kiri atas belum konsisten tampil di semua halaman.
5. Beberapa tombol dan tab pada login/daftar masih memiliki sudut terlalu tajam dan tidak konsisten dengan komponen lain.
6. Teks pada bagian “Aktivitas Terbaru” dan beberapa card masih kurang terbaca karena kontras warna kurang baik.
7. Komponen antar halaman belum benar-benar konsisten: card, table, loader, toast, badge, pilihan aksi, dan tombol.
8. Desain harus terasa lebih rapi, profesional, mudah dipahami, dan nyaman dilihat.

Jangan menambah fitur baru yang tidak diminta. Hanya rapikan, konsistenkan, dan aktifkan penanda visual yang diperlukan.

==================================================
2. ACTIVE STATE NAVBAR PUBLIK
==================================================

Navbar publik HARUS menjadi satu bar horizontal utuh dari ujung kiri ke kanan, menyatu sebagai pembatas/header halaman.

Navbar tetap berisi:
- Beranda
- Untuk Siswa
- Untuk Instruktur
- Paket Bulanan
- Kursus
- Kontak
- Masuk
- Daftar

Aturan navbar publik:
1. Navbar tampil sebagai satu strip/header penuh dengan background putih/off-white.
2. Logo CourseHub harus muncul di kiri atas secara konsisten.
3. Menu navigasi di tengah harus rapi dan sejajar.
4. Tombol Masuk dan Daftar tetap di kanan.
5. Saat user klik menu navbar, harus ada ACTIVE STATE yang jelas.

Gunakan acuan gaya active state seperti contoh gambar navbar kedua:
- menu yang aktif harus terlihat jelas berbeda dari menu lain,
- tampil seperti tab aktif / kapsul aktif di dalam bar,
- bukan hanya beda warna tipis.

Aturan active state navbar:
- item aktif memiliki background hijau tua atau hijau solid yang elegan,
- teks item aktif berwarna putih,
- radius membulat konsisten,
- beri sedikit shadow / border halus agar menonjol,
- item nonaktif tetap netral,
- hover item nonaktif lembut,
- jangan gunakan active state samar.

Tujuan:
User harus langsung tahu menu navbar mana yang sedang dibuka.

==================================================
3. ACTIVE STATE SIDEBAR SEMUA ROLE
==================================================

Ini WAJIB diperbaiki.

Terapkan pada:
- Role Siswa
- Role Instruktur
- Role Admin

Masalah saat ini:
Sidebar terlihat hampir sama semua, sehingga user tidak tahu sedang berada di halaman mana.

Perbaikan active state sidebar:
1. Setiap item sidebar yang aktif harus memiliki penanda visual yang sangat jelas.
2. Gunakan pola penanda seperti referensi navbar: item aktif tampak sebagai menu yang sedang dipilih.
3. Jangan hanya beda tipis warna background.

Aturan active state sidebar:
- item aktif memiliki background hijau solid / hijau tua yang jelas,
- teks item aktif putih atau sangat kontras,
- icon item aktif ikut berubah warnanya agar lebih menonjol,
- tambahkan indikator visual di sisi kiri atau bawah, misalnya:
  - border kiri tegas 3px,
  - atau kapsul aktif penuh,
  - atau outline aktif yang jelas.
- item nonaktif tampil netral.
- hover item nonaktif lembut.
- semua role harus memakai pola active state yang sama.

Contoh penerapan:
- jika user ada di halaman Progress siswa, maka sidebar “Progress” harus terlihat aktif jelas.
- jika user ada di halaman Materi instruktur, maka sidebar “Materi” harus terlihat aktif jelas.
- jika user ada di halaman Transaksi & Komisi admin, maka sidebar “Transaksi & Komisi” harus terlihat aktif jelas.

Tujuan:
Tanpa membaca judul halaman pun, user langsung tahu dia sedang ada di menu mana.

==================================================
4. LOGO DAN IDENTITAS HEADER
==================================================

Perbaiki area identitas merek:
1. Logo CourseHub di kiri atas wajib tampil konsisten.
2. Jangan ada halaman yang kehilangan logo.
3. Logo harus proporsional, tidak gepeng, tidak terlalu kecil.
4. Gunakan lockup yang rapi:
   - icon/logo
   - teks “CourseHub”
   - subteks kecil “Learning platform” bila perlu
5. Pada dashboard role, identitas role tetap tampil rapi:
   - siswa
   - instruktur
   - admin

==================================================
5. KONSISTENSI BENTUK KOMPONEN
==================================================

Perbaiki konsistensi bentuk UI.

Masalah:
Pada login dan daftar, beberapa komponen masih memiliki sudut tajam/persegi panjang kaku, padahal komponen lain sudah membulat lembut.

Aturan konsistensi bentuk:
1. Gunakan satu radius konsisten untuk:
   - button
   - input
   - tab role
   - kapsul status
   - toast
   - dropdown
   - card
2. Khusus area login dan daftar:
   - tombol pilihan role siswa/instruktur jangan lancip tajam,
   - gunakan ujung sedikit membulat seperti komponen lain,
   - tombol CTA utama juga konsisten radius-nya,
   - input dan select harus seragam.
3. Jangan ada campuran rounded lembut dan kotak tajam dalam satu halaman.

==================================================
6. KETERBACAAN TEKS DAN KONTRAS
==================================================

Perbaiki keterbacaan teks di semua halaman.

Masalah yang harus diperbaiki:
- teks pada “Aktivitas Terbaru” susah dibaca,
- beberapa teks di atas latar hijau terlalu redup,
- kontras beberapa badge dan card kurang baik.

Aturan:
1. Judul aktivitas harus gelap dan jelas.
2. Isi aktivitas harus cukup kontras.
3. Tanggal/waktu boleh lebih kecil, tapi tetap terbaca.
4. Jangan gunakan teks abu terlalu pucat di atas hijau.
5. Card hijau tidak boleh membuat isi teks tenggelam.
6. Jika background card berwarna hijau, gunakan warna teks yang jauh lebih kontras.
7. Jika perlu, ubah card aktivitas agar lebih netral/lebih terang supaya keterbacaan lebih baik.
8. Pastikan semua heading, label, angka statistik, badge, isi tabel, dan isi form nyaman dibaca.

==================================================
7. KONSISTENSI UI/UX GLOBAL
==================================================

Wajib konsisten di seluruh halaman.

UI/UX (Konsistensi):
1. Gunakan satu jenis card yang sama di seluruh halaman.
2. Gunakan satu jenis table yang sama di seluruh halaman.
3. Gunakan satu desain loader yang sama di seluruh halaman.
4. Notifikasi sukses/gagal harus konsisten dan berbentuk kapsul.
5. Tombol pilihan seperti True/False atau pilihan status harus konsisten dan berbentuk kapsul.
6. Semua badge status harus satu sistem desain yang sama.
7. Pastikan alur visual tetap konsisten pada setiap halaman.

Terapkan konsistensi pada:
- Landing page
- Login
- Daftar
- Dashboard siswa
- Dashboard instruktur
- Dashboard admin
- Profil
- Paket
- Kursus
- Materi
- Enrolmen
- Sertifikat
- Transaksi & Komisi
- Modal
- Toast/notifikasi

==================================================
8. SISTEM WARNA FINAL
==================================================

Pertahankan arah warna natural yang sekarang, tetapi rapikan penggunaannya agar tidak saling bertabrakan dan tidak terlalu berat.

Gunakan palet konsisten:
- Background utama: #F7F5EF
- Background section: #F3F0E8
- Surface/card: #FFFFFF
- Border: #D9D4C7
- Text utama: #1F2A24
- Text sekunder: #657166
- Text muted: #8B948D
- Primary hijau: #2F8F5B
- Primary hover: #27784C
- Soft green: #E6F3EB
- Accent amber: #D9A93E
- Soft amber: #F8EBCB
- Danger: #D95C5C
- Soft danger: #FBE9E9

Aturan warna:
1. Jangan buat terlalu banyak blok hijau pekat besar.
2. Gunakan putih/off-white untuk surface utama.
3. Gunakan hijau untuk aksi utama, active state, badge aktif.
4. Gunakan amber untuk pencapaian, sertifikat, paket, komisi, peringatan ringan.
5. Gunakan merah lembut untuk gagal, error, dibatalkan.
6. Pastikan kontras antar elemen nyaman dan tidak menyakitkan mata.

==================================================
9. KONSISTENSI CARD, TABLE, TOAST, BADGE, DAN LOADER
==================================================

Gunakan satu sistem komponen:

Card:
- background putih
- border halus
- shadow sangat lembut
- radius konsisten
- jarak isi/padding konsisten

Table:
- header table seragam
- row hover lembut
- border halus
- isi tabel rata dan rapi
- badge status di table konsisten

Toast:
- kapsul
- sukses hijau soft
- gagal merah soft
- info netral / soft
- posisi dan bentuk konsisten

Badge / Status:
- semua status berbentuk kapsul
- gunakan style yang sama untuk:
  Aktif, Pending, Diproses, Ditolak, Gagal, Berhasil, Tersedia, Tidak aktif, dll.

Loader:
- satu style yang sama di semua halaman
- jangan beda-beda

==================================================
10. HALAMAN LOGIN DAN DAFTAR
==================================================

Perbaiki halaman login dan daftar agar konsisten dengan halaman lain.

Aturan:
1. Layout tetap dipertahankan.
2. Form card lebih rapi.
3. Tab role Siswa / Instruktur konsisten bentuknya.
4. Input, dropdown, dan tombol konsisten bentuk dan spacing.
5. Link “Masuk” / “Daftar sekarang” jangan terlihat seperti elemen kecil yang terpotong.
6. Pastikan semua sudut komponen sedikit membulat dan seragam.
7. Rapikan align label, field, dan tombol CTA.
8. Jangan ada elemen yang tampak terlalu sempit atau terlalu menempel.

==================================================
11. HASIL AKHIR YANG DIHARAPKAN
==================================================

Hasil akhir wajib seperti ini:
1. User langsung tahu halaman mana yang sedang aktif, baik di navbar publik maupun sidebar dashboard.
2. Active state navbar jelas dan konsisten.
3. Active state sidebar siswa, instruktur, dan admin jelas dan konsisten.
4. Logo tampil rapi di kiri atas.
5. Aktivitas terbaru mudah dibaca.
6. Login dan daftar lebih konsisten bentuknya.
7. Card, table, loader, toast, badge, dan tombol seragam di seluruh halaman.
8. Desain terasa rapi, profesional, nyaman dilihat, dan siap dipresentasikan.
9. Jangan ubah isi sistem, hanya rapikan visual, konsistensi, dan penanda navigasi.