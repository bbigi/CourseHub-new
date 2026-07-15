Buat sesuai perintah di bawah ini, jangan merubah desain yang lain yang tidak disuruh.

Lakukan audit final dan perbaikan UI/UX CourseHub agar desain tidak terlihat seperti template AI berwarna biru, serta pastikan seluruh alur role, card, tombol, modal, notifikasi, transaksi, komisi, dan halaman saling terhubung.

Jangan redesign total dari awal. Pertahankan struktur layout, sidebar, topbar, posisi halaman, grid, card, tabel, modal, dan komponen utama yang sudah ada. Fokus pada perbaikan warna, konsistensi visual, alur klik, fitur yang belum aktif, notifikasi, serta penambahan fitur transaksi dan komisi pada role Admin.

Konsep sistem:
CourseHub adalah Sistem Manajemen Kursus Online untuk siswa. Siswa membeli 1 Paket Bulanan untuk mengakses semua kursus dan semua materi. Instruktur membuat kursus dan materi. Admin mengatur sistem, siswa, instruktur, kursus, enrolmen, Paket Bulanan, sertifikat, transaksi langganan siswa, komisi instruktur, dan pencairan dana.

Jangan gunakan konsep banyak paket seperti Pro, Premium, 3 bulan, atau 6 bulan. Gunakan hanya istilah:
- Paket Bulanan
- Harga Rp99.000
- Durasi 1 bulan
- Akses seluruh kursus dan seluruh materi

Ganti arah warna desain:
- Kurangi dominasi biru neon dan ungu yang terlalu terasa seperti desain AI.
- Gunakan palette yang lebih natural, hangat, dan cocok untuk sistem kursus online siswa.
- Gunakan warna utama hijau sage/emerald lembut untuk aksi utama dan status aktif.
- Gunakan amber/kuning hangat untuk pencapaian, sertifikat, peringatan, dan komisi.
- Gunakan merah lembut hanya untuk error, hapus, gagal, dibatalkan, atau aksi berbahaya.

Rekomendasi warna:
- Background utama: #0F1713
- Sidebar/topbar: #101913
- Card/surface: #16221C
- Surface lebih terang: #1D2A22
- Border: #26352E
- Primary action: #2FA66A
- Primary hover: #3BBF7A
- Accent achievement/komisi: #F2B84B
- Text utama: #F3F5EF
- Text sekunder: #A8B5AA
- Danger: #E15B64

Aturan warna:
1. Jangan semua elemen dibuat hijau. Gunakan hijau hanya untuk tombol utama, status aktif, sukses, dan elemen penting.
2. Gunakan amber untuk sertifikat, pencapaian, komisi, peringatan ringan, dan highlight.
3. Gunakan warna netral gelap untuk card dan table agar tetap profesional.
4. Hindari warna biru neon sebagai warna dominan.
5. Jika masih memakai biru, gunakan hanya sebagai info kecil, bukan warna utama sistem.
6. Pastikan kontras teks tetap jelas dan mudah dibaca.

Audit kekurangan sistem:
Pastikan tidak ada fitur yang terlihat bisa diklik tetapi tidak memiliki tujuan. Semua card, tombol, baris tabel, icon, dan CTA yang mengarah ke halaman/detail harus aktif.

Aktifkan alur umum:
Admin mengatur Paket Bulanan → siswa membeli paket → pembayaran tercatat → transaksi masuk ke Admin → paket aktif → siswa bisa mengakses semua kursus → instruktur membuat kursus dan materi → admin menyetujui kursus → kursus tampil di Jelajahi Kursus siswa → siswa mengikuti kursus → siswa belajar materi → progress tercatat → sertifikat otomatis tersedia jika progress 100% → instruktur melihat enrolmen dan komisi → instruktur mengajukan pencairan dana → admin memproses pencairan dana → status pencairan tercatat.

Role Siswa:
Pastikan sidebar siswa aktif:
- Beranda
- Jelajahi Kursus
- Kursus Saya
- Progress
- Paket Saya
- Sertifikat
- Profil

Aktifkan interaksi siswa:
1. Card Kursus Diikuti di Beranda klik ke Kursus Saya.
2. Card Materi Selesai klik ke Progress.
3. Card Rata-rata Progress klik ke Progress.
4. Card Sertifikat klik ke halaman Sertifikat.
5. Tombol Lanjut Belajar klik ke halaman Belajar/Materi terakhir.
6. Card kursus aktif klik ke Detail Kursus.
7. Tombol Perpanjang Paket klik ke modal pembayaran paket.
8. Card kursus di Jelajahi Kursus klik ke Detail Kursus.
9. Tombol Ikuti Kursus:
   - Jika paket aktif, kursus masuk ke Kursus Saya.
   - Jika paket belum aktif, arahkan ke Paket Saya.
10. Baris riwayat pembayaran klik ke modal Detail Pembayaran.
11. Tombol Lihat Sertifikat dan Download Sertifikat harus aktif jika progress kursus 100%.
12. Jika belum ada kursus selesai 100%, halaman Sertifikat menampilkan empty state yang jelas.

Perbaiki modal pembayaran siswa:
- Metode pembayaran harus berupa dropdown.
- Dropdown berisi:
  1. Transfer Bank - BCA
  2. Transfer Bank - BRI
  3. Transfer Bank - Mandiri
- Sebelum bank dipilih, tampilkan teks:
  “Pilih metode pembayaran untuk melihat nomor virtual account.”
- Setelah bank dipilih, tampilkan virtual account khusus siswa.
- Nomor virtual account harus berbeda sesuai bank dan siswa.
- Format dummy:
  BCA: 8808 + NIS siswa + 3 digit unik
  BRI: 7777 + NIS siswa + 3 digit unik
  Mandiri: 8899 + NIS siswa + 3 digit unik
- Tambahkan tombol Salin Nomor Virtual Account.
- Tombol Konfirmasi Bayar menampilkan toast sukses, mengubah status paket menjadi Aktif, dan menambah riwayat pembayaran.
- Data pembayaran yang berhasil harus masuk ke halaman Admin > Transaksi & Komisi.

Role Instruktur:
Pastikan sidebar instruktur aktif:
- Beranda
- Kursus Saya
- Materi
- Enrolmen
- Komisi
- Profil

Aktifkan interaksi instruktur:
1. Card Total Kursus klik ke Kursus Saya.
2. Card Total Materi klik ke Materi.
3. Card Total Siswa klik ke Enrolmen.
4. Card Komisi Bulan Ini klik ke Komisi.
5. Tombol Buat Kursus Baru membuka modal tambah kursus.
6. Kursus baru masuk status Pending Review.
7. Tombol Detail kursus membuka modal/detail kursus.
8. Tombol Edit kursus membuka modal edit.
9. Tombol Kelola Materi mengarah ke halaman Materi yang terfilter sesuai kursus.
10. Tombol Tambah Materi membuka modal tambah materi.
11. Dropdown Pilih Kursus di modal materi hanya menampilkan kursus milik instruktur yang sedang login.
12. Baris Enrolmen klik ke modal Detail Siswa.
13. Tombol Ajukan Penarikan di Komisi membuka modal penarikan.
14. Setelah penarikan diajukan, tampilkan toast sukses dan status menjadi Menunggu.
15. Data pengajuan penarikan instruktur harus masuk ke Admin > Transaksi & Komisi pada bagian Pencairan Dana.

Aturan akun instruktur:
- instruktur1.com / kursus123
- instruktur2.com / kursus123
- Satu instruktur boleh memiliki beberapa kursus.
- Instruktur hanya bisa mengelola kursus dan materi miliknya sendiri.
- Jangan beri akses edit/hapus untuk kursus milik instruktur lain.

Role Admin:
Pastikan sidebar admin aktif:
- Beranda
- Kelola Kursus
- Kelola Pengguna
- Instruktur
- Enrolmen
- Paket
- Sertifikat
- Transaksi & Komisi

Tambahkan menu baru di sidebar Admin:
- Transaksi & Komisi

Fungsi Transaksi & Komisi:
Halaman ini digunakan admin untuk memonitor transaksi langganan Paket Bulanan siswa, komisi yang masuk dari langganan, dan pencairan dana instruktur.

Aktifkan interaksi admin:
1. Card Total Siswa klik ke Kelola Pengguna.
2. Card Total Instruktur klik ke Instruktur.
3. Card Total Kursus klik ke Kelola Kursus.
4. Card Total Enrolmen klik ke Enrolmen.
5. Card Paket Aktif klik ke Paket.
6. Card Sertifikat klik ke Sertifikat.
7. Card Transaksi/Komisi klik ke Transaksi & Komisi.
8. Aktivitas terbaru klik ke modal detail singkat.
9. Di Kelola Kursus, tombol Review membuka detail review kursus.
10. Tombol Setujui mengubah status kursus menjadi Aktif dan kursus tampil ke siswa.
11. Tombol Tolak membuka modal alasan penolakan.
12. Di Kelola Pengguna, tombol Detail membuka detail siswa.
13. Di Instruktur, tombol Detail membuka detail instruktur.
14. Tombol Verifikasi/Tolak/Nonaktifkan harus aktif dan menampilkan toast.
15. Di Enrolmen, baris tabel klik ke detail enrolmen.
16. Di Paket, tombol Edit Paket membuka modal edit Paket Bulanan.
17. Di Sertifikat, tombol Detail, Validasi, Download, dan Batalkan Validasi harus aktif.
18. Di Transaksi & Komisi, tombol Detail, Export PDF, Proses Pencairan, Tandai Berhasil, dan Batalkan harus aktif.

Halaman Admin > Transaksi & Komisi:
Buat halaman dengan 2 tab:
1. Transaksi Langganan
2. Pencairan Dana

Tambahkan ringkasan card di bagian atas:
- Total Transaksi Berhasil
- Total Transaksi Ditunda
- Total Transaksi Dibatalkan
- Total Pendapatan Bulan Ini
- Total Komisi Instruktur
- Total Pencairan Berhasil

Tab 1: Transaksi Langganan
Tampilkan data siswa yang berlangganan Paket Bulanan.

Kolom tabel:
- Tanggal Transaksi
- Nama Siswa
- NIS/NISN
- Langganan
- Nomor Virtual Account
- Bank
- Nominal
- Status Transaksi
- Aksi

Gunakan status kapsul:
- Berhasil
- Ditunda
- Dibatalkan

Contoh data:
1. 8 Jan 2025 - Ahmad Fauzi - 1234567890 - Paket Bulanan - 8808 1234567890 001 - BCA - Rp99.000 - Berhasil
2. 10 Jan 2025 - Siti Rahma - 1234567891 - Paket Bulanan - 7777 1234567891 002 - BRI - Rp99.000 - Berhasil
3. 12 Jan 2025 - Budi Raharjo - 1234567892 - Paket Bulanan - 8899 1234567892 003 - Mandiri - Rp99.000 - Ditunda
4. 14 Jan 2025 - Eka Putri - 1234567893 - Paket Bulanan - 8808 1234567893 004 - BCA - Rp99.000 - Dibatalkan

Aksi Transaksi Langganan:
- Detail
- Ubah Status
- Export PDF

Klik Detail membuka modal Detail Transaksi:
- Tanggal transaksi
- Jam transaksi
- Nama siswa
- NIS/NISN
- Paket/langganan
- Masa aktif paket
- Bank
- Nomor virtual account
- Nominal
- Status transaksi
- ID transaksi
- Catatan sistem

Tombol Export PDF:
- Tambahkan tombol Export PDF di atas tabel.
- Export PDF digunakan untuk mengunduh laporan transaksi langganan.
- Saat diklik, tampilkan toast kapsul sukses:
  “Laporan transaksi berhasil disiapkan dalam format PDF.”
- Tidak perlu membuat file PDF asli, cukup tampilkan interaksi desain dan status berhasil.

Filter Transaksi Langganan:
Tambahkan filter sederhana:
- Semua Status
- Berhasil
- Ditunda
- Dibatalkan
- Bank
- Rentang tanggal
- Search nama siswa

Tab 2: Pencairan Dana
Tampilkan data pencairan dana untuk instruktur.

Kolom tabel:
- Tanggal Pengajuan
- Nama Instruktur
- Nominal Pencairan
- Bank Tujuan
- Nomor Rekening
- Atas Nama
- Tanggal Pencairan
- Status Pencairan
- Aksi

Gunakan status kapsul:
- Menunggu
- Diproses
- Berhasil
- Gagal
- Dibatalkan

Contoh data:
1. 12 Jan 2025 - Pak Hendra Wijaya - Rp1.100.000 - BCA - 1234567890 - Hendra Wijaya - 13 Jan 2025 - Berhasil
2. 12 Jan 2025 - Bu Ratna Dewi - Rp1.437.000 - Mandiri - 9876543210 - Ratna Dewi - 13 Jan 2025 - Diproses
3. 15 Jan 2025 - Pak Hendra Wijaya - Rp750.000 - BRI - 1122334455 - Hendra Wijaya - - Menunggu
4. 16 Jan 2025 - Bu Ratna Dewi - Rp500.000 - BCA - 5566778899 - Ratna Dewi - 17 Jan 2025 - Gagal

Aksi Pencairan Dana:
- Detail
- Proses
- Tandai Berhasil
- Tandai Gagal
- Batalkan
- Export PDF

Klik Detail membuka modal Detail Pencairan:
- Tanggal pengajuan
- Nama instruktur
- Email instruktur
- Nominal pencairan
- Bank tujuan
- Nomor rekening
- Atas nama
- Tanggal pencairan
- Status pencairan
- Catatan admin

Tombol Export PDF:
- Tambahkan tombol Export PDF pada tab Pencairan Dana.
- Saat diklik, tampilkan toast kapsul sukses:
  “Laporan pencairan dana berhasil disiapkan dalam format PDF.”

Filter Pencairan Dana:
Tambahkan filter sederhana:
- Semua Status
- Menunggu
- Diproses
- Berhasil
- Gagal
- Dibatalkan
- Bank
- Rentang tanggal
- Search nama instruktur

Hubungan data Admin Transaksi & Komisi:
- Data transaksi berasal dari pembayaran Paket Bulanan siswa.
- Nomor virtual account berasal dari metode pembayaran siswa.
- Transaksi berhasil membuat paket siswa aktif.
- Transaksi ditunda membuat paket belum aktif.
- Transaksi dibatalkan tidak mengaktifkan paket.
- Data pencairan berasal dari pengajuan penarikan komisi instruktur.
- Admin dapat memproses pencairan dan mengubah statusnya.

Notifikasi:
Aktifkan notifikasi pada semua role:
- Siswa
- Instruktur
- Admin

Perbaiki posisi panel notifikasi:
1. Panel/dropdown notifikasi harus selalu muncul di lapisan paling depan.
2. Panel notifikasi tidak boleh tertimpa card, tabel, sidebar, atau konten halaman.
3. Gunakan posisi fixed di kanan atas dekat icon lonceng.
4. Gunakan z-index/top layer paling tinggi dibanding card dan tabel.
5. Jika ada modal terbuka, modal tetap paling depan; tetapi jika tidak ada modal, notifikasi harus paling depan.
6. Panel notifikasi tidak boleh terpotong oleh container halaman.
7. Tambahkan shadow/border agar panel terlihat jelas di atas konten.
8. Maksimal tinggi panel dibuat scroll internal jika isi notifikasi banyak.

Aturan notifikasi:
1. Klik icon lonceng membuka dropdown/panel notifikasi.
2. Ada badge jumlah pesan belum dibaca.
3. Pesan belum dibaca tampil lebih tebal atau memiliki tanda “Baru”.
4. Klik pesan membuka detail singkat dan mengubah status menjadi terbaca.
5. Ada tombol “Tandai semua dibaca”.
6. Gunakan status kapsul kecil seperti Baru, Paket, Progress, Review, Komisi, Sertifikat, Transaksi, Pencairan.

Isi notifikasi siswa:
- Paket Bulanan aktif sampai 7 Februari 2025.
- Pembayaran Paket Bulanan berhasil dikonfirmasi.
- Pembayaran masih ditunda, silakan cek kembali status transaksi.
- Materi berhasil diselesaikan.
- Progress kursus meningkat.
- Kursus berhasil ditambahkan ke Kursus Saya.
- Sertifikat tersedia jika kursus selesai 100%.

Isi notifikasi instruktur:
- Kursus baru sedang menunggu review admin.
- Kursus kamu telah disetujui admin.
- Siswa baru mengikuti kursus kamu.
- Materi berhasil ditambahkan.
- Komisi bulan ini diperbarui.
- Pengajuan penarikan dana berhasil dikirim.
- Pengajuan penarikan sedang diproses.
- Pencairan dana berhasil dikonfirmasi admin.
- Pencairan dana gagal, silakan cek data rekening.

Isi notifikasi admin:
- Ada kursus baru menunggu review.
- Ada instruktur baru menunggu verifikasi.
- Pembayaran paket siswa berhasil dikonfirmasi.
- Ada transaksi paket yang masih ditunda.
- Ada transaksi paket yang dibatalkan.
- Sertifikat baru berhasil diterbitkan.
- Ada pengajuan penarikan komisi instruktur.
- Pencairan dana instruktur berhasil diproses.
- Pencairan dana instruktur gagal dan perlu diperiksa.

Konsistensi UI/UX:
1. Gunakan satu style card di semua role.
2. Gunakan satu style table di semua role.
3. Gunakan satu style modal di semua role.
4. Gunakan satu style dropdown di semua role.
5. Gunakan satu style loader di semua role.
6. Gunakan satu style toast/notifikasi berbentuk kapsul.
7. Gunakan status berbentuk kapsul:
   Aktif, Nonaktif, Pending Review, Terverifikasi, Ditolak, Kadaluarsa, Valid, Belum Tersedia, Tersedia, Menunggu, Diproses, Dibayar, Berhasil, Ditunda, Dibatalkan, Gagal.
8. Tombol aksi harus konsisten:
   Tambah, Simpan, Edit, Hapus, Detail, Review, Setujui, Tolak, Verifikasi, Nonaktifkan, Lanjut Belajar, Ikuti Kursus, Perpanjang Paket, Konfirmasi Bayar, Download Sertifikat, Ajukan Penarikan, Proses, Tandai Berhasil, Tandai Gagal, Export PDF.
9. Semua tombol harus memiliki tujuan atau modal.
10. Jangan ada halaman kosong tanpa empty state.
11. Empty state harus menjelaskan kondisi dan aksi berikutnya.

Perbaiki copywriting agar lebih natural:
- Hindari kalimat yang terlalu promosi atau terlalu seperti AI.
- Gunakan bahasa singkat, jelas, dan sesuai konteks siswa, instruktur, dan admin.
- Contoh:
  “Paket aktif. Kamu bisa mengakses semua kursus bulan ini.”
  “Kursus menunggu review admin sebelum tampil ke siswa.”
  “Selesaikan semua materi untuk mendapatkan sertifikat.”
  “Transaksi berhasil. Paket siswa sudah aktif.”
  “Pencairan dana sedang diproses admin.”

Hasil akhir yang diharapkan:
- Warna desain lebih natural dan tidak dominan biru AI.
- Semua role saling terhubung.
- Semua sidebar aktif.
- Semua card dan tombol penting punya tujuan.
- Admin memiliki halaman Transaksi & Komisi yang terhubung dengan pembayaran siswa dan pencairan dana instruktur.
- Data langganan siswa masuk ke admin.
- Data pencairan dana instruktur masuk ke admin.
- Export PDF tersedia untuk laporan transaksi dan pencairan.
- Notifikasi masing-masing role aktif, sesuai konteks role, dan tampil paling depan tanpa tertimpa card lain.
- Semua modal, detail, toast, notifikasi, status, dan tabel konsisten.
- Sistem terlihat seperti aplikasi kursus online yang siap dipresentasikan untuk final project.