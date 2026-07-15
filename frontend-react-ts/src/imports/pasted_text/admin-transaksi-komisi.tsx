Buat sesuai perintah di bawah ini, jangan merubah desain yang lain yang tidak disuruh.

Fokus perbaikan hanya pada halaman role Admin: "Transaksi & Komisi". Jangan redesign total dari awal. Pertahankan layout utama, sidebar, topbar, struktur card, tab, table, modal, icon, dan gaya umum halaman yang sudah ada. Perbaiki dengan jelas agar AI tidak salah arah.

TUJUAN PERBAIKAN:
Halaman Admin "Transaksi & Komisi" saat ini baru menampilkan:
1. data transaksi langganan siswa
2. data pencairan instruktur

Masalahnya:
- belum ada data khusus komisi instruktur yang jelas
- belum ada data khusus pendapatan admin
- belum ada data pencairan dana/pendapatan admin
- warna desain masih belum benar-benar berubah, masih terasa template AI
- hubungan antar data belum terasa jelas

PERBAIKI HALAMAN INI MENJADI LEBIH LENGKAP DENGAN 4 BAGIAN DATA YANG JELAS:

1. Transaksi Langganan Siswa
2. Komisi Instruktur
3. Pencairan Dana Instruktur
4. Pendapatan Admin

ARTI MASING-MASING BAGIAN:
1. Transaksi Langganan Siswa = data pembayaran Paket Bulanan dari siswa
2. Komisi Instruktur = bagian komisi yang menjadi hak instruktur dari transaksi siswa yang berhasil
3. Pencairan Dana Instruktur = data penarikan/pencairan komisi instruktur
4. Pendapatan Admin = bagian pendapatan/admin fee yang masuk ke admin dari transaksi siswa yang berhasil

GUNAKAN KONSEP PERHITUNGAN YANG SEDERHANA DAN KONSISTEN:
- Harga Paket Bulanan: Rp99.000
- Jika transaksi siswa BERHASIL:
  - Komisi instruktur = 40% = Rp39.600
  - Pendapatan admin = 60% = Rp59.400
- Jika transaksi DITUNDA atau DIBATALKAN:
  - tidak masuk ke komisi instruktur
  - tidak masuk ke pendapatan admin
- Data ini hanya untuk dummy data tampilan, tetapi harus terlihat saling terhubung

STRUKTUR HALAMAN YANG DIINGINKAN:
Tetap gunakan halaman "Transaksi & Komisi" dengan tab di dalamnya.
Buat 4 tab berikut:
- Transaksi Langganan
- Komisi Instruktur
- Pencairan Dana
- Pendapatan Admin

RINGKASAN CARD DI ATAS HALAMAN:
Perbaiki card statistik di atas agar mewakili data yang benar dan lengkap.
Gunakan 6 card:
1. Transaksi Berhasil
2. Transaksi Ditunda
3. Transaksi Dibatalkan
4. Total Pendapatan Admin
5. Total Komisi Instruktur
6. Total Pencairan Berhasil

CONTOH ANGKA CARD:
- Transaksi Berhasil: 2
- Transaksi Ditunda: 1
- Transaksi Dibatalkan: 1
- Total Pendapatan Admin: Rp118.800
- Total Komisi Instruktur: Rp79.200
- Total Pencairan Berhasil: Rp39.600

TAB 1 — TRANSAKSI LANGGANAN
Tampilkan 3 data transaksi langganan siswa.
Kolom table:
- Tanggal Transaksi
- Nama Siswa
- NIS/NISN
- Langganan
- VA Number
- Bank
- Nominal
- Status
- Aksi

Gunakan 3 data berikut:
1.
Tanggal: 8 Jan 2025
Nama Siswa: Ahmad Fauzi
NIS/NISN: 1234567890
Langganan: Paket Bulanan
VA Number: 8808 1234567890 001
Bank: BCA
Nominal: Rp99.000
Status: Berhasil

2.
Tanggal: 10 Jan 2025
Nama Siswa: Siti Rahma
NIS/NISN: 1234567891
Langganan: Paket Bulanan
VA Number: 7777 1234567891 002
Bank: BRI
Nominal: Rp99.000
Status: Berhasil

3.
Tanggal: 12 Jan 2025
Nama Siswa: Budi Raharjo
NIS/NISN: 1234567892
Langganan: Paket Bulanan
VA Number: 8899 1234567892 003
Bank: Mandiri
Nominal: Rp99.000
Status: Ditunda

Aksi:
- Detail
- Export PDF

Klik Detail membuka modal detail transaksi:
- Tanggal transaksi
- Nama siswa
- NIS/NISN
- Paket
- Bank
- Nomor virtual account
- Nominal
- Status transaksi
- Catatan sistem

TAB 2 — KOMISI INSTRUKTUR
Tambahkan tab baru khusus "Komisi Instruktur".
Tab ini harus berbeda dari tab Pencairan Dana.
Tab ini menampilkan hak komisi instruktur dari transaksi siswa yang BERHASIL.

Kolom table:
- Tanggal
- Nama Instruktur
- Nama Siswa
- Kursus
- Sumber Transaksi
- Nominal Transaksi
- Persentase Komisi
- Komisi Instruktur
- Status
- Aksi

Gunakan 3 data berikut:
1.
Tanggal: 8 Jan 2025
Nama Instruktur: Bu Ratna Dewi
Nama Siswa: Ahmad Fauzi
Kursus: Matematika Kelas 10
Sumber Transaksi: Paket Bulanan
Nominal Transaksi: Rp99.000
Persentase Komisi: 40%
Komisi Instruktur: Rp39.600
Status: Siap Dicairkan

2.
Tanggal: 10 Jan 2025
Nama Instruktur: Pak Hendra Wijaya
Nama Siswa: Siti Rahma
Kursus: Bahasa Indonesia - Menulis & Membaca
Sumber Transaksi: Paket Bulanan
Nominal Transaksi: Rp99.000
Persentase Komisi: 40%
Komisi Instruktur: Rp39.600
Status: Siap Dicairkan

3.
Tanggal: 12 Jan 2025
Nama Instruktur: Pak Hendra Wijaya
Nama Siswa: Budi Raharjo
Kursus: IPS - Sejarah, Geografi & Ekonomi
Sumber Transaksi: Paket Bulanan
Nominal Transaksi: Rp99.000
Persentase Komisi: 40%
Komisi Instruktur: Rp39.600
Status: Ditunda

Catatan:
- Baris ke-3 harus ditandai bahwa statusnya Ditunda karena transaksi siswa belum berhasil
- Jika transaksi siswa ditunda, komisi belum bisa dicairkan

Aksi:
- Detail
- Tandai Siap Dicairkan
- Export PDF

Klik Detail membuka modal detail komisi:
- Nama instruktur
- Nama siswa
- Kursus
- Transaksi sumber
- Nominal transaksi
- Persentase komisi
- Nominal komisi
- Status komisi

TAB 3 — PENCAIRAN DANA
Tab ini menampilkan data pencairan dana instruktur.
Ini adalah data penarikan dana oleh instruktur, bukan data komisi mentah.

Kolom table:
- Tanggal Pengajuan
- Nama Instruktur
- Nominal Pencairan
- Bank
- Nomor Rekening
- Atas Nama
- Tanggal Pencairan
- Status
- Aksi

Gunakan 3 data berikut:
1.
Tanggal Pengajuan: 13 Jan 2025
Nama Instruktur: Bu Ratna Dewi
Nominal Pencairan: Rp39.600
Bank: Mandiri
Nomor Rekening: 9876543210
Atas Nama: Ratna Dewi
Tanggal Pencairan: 14 Jan 2025
Status: Berhasil

2.
Tanggal Pengajuan: 13 Jan 2025
Nama Instruktur: Pak Hendra Wijaya
Nominal Pencairan: Rp39.600
Bank: BCA
Nomor Rekening: 1234567890
Atas Nama: Hendra Wijaya
Tanggal Pencairan: 14 Jan 2025
Status: Diproses

3.
Tanggal Pengajuan: 14 Jan 2025
Nama Instruktur: Pak Hendra Wijaya
Nominal Pencairan: Rp39.600
Bank: BRI
Nomor Rekening: 1122334455
Atas Nama: Hendra Wijaya
Tanggal Pencairan: -
Status: Menunggu

Aksi:
- Detail
- Proses
- Tandai Berhasil
- Tandai Gagal
- Export PDF

TAB 4 — PENDAPATAN ADMIN
Tambahkan tab baru khusus "Pendapatan Admin".
Tab ini menampilkan bagian pendapatan/admin fee dari transaksi siswa yang BERHASIL.
Ini harus terpisah dari komisi instruktur.

Kolom table:
- Tanggal
- Nama Siswa
- Langganan
- Nominal Transaksi
- Persentase Pendapatan Admin
- Pendapatan Admin
- Sumber
- Status
- Aksi

Gunakan 3 data berikut:
1.
Tanggal: 8 Jan 2025
Nama Siswa: Ahmad Fauzi
Langganan: Paket Bulanan
Nominal Transaksi: Rp99.000
Persentase Pendapatan Admin: 60%
Pendapatan Admin: Rp59.400
Sumber: Transaksi Langganan
Status: Masuk

2.
Tanggal: 10 Jan 2025
Nama Siswa: Siti Rahma
Langganan: Paket Bulanan
Nominal Transaksi: Rp99.000
Persentase Pendapatan Admin: 60%
Pendapatan Admin: Rp59.400
Sumber: Transaksi Langganan
Status: Masuk

3.
Tanggal: 12 Jan 2025
Nama Siswa: Budi Raharjo
Langganan: Paket Bulanan
Nominal Transaksi: Rp99.000
Persentase Pendapatan Admin: 60%
Pendapatan Admin: Rp59.400
Sumber: Transaksi Langganan
Status: Tertunda

Catatan:
- Data pendapatan admin hanya benar-benar masuk jika transaksi siswa BERHASIL
- Jika transaksi masih ditunda, beri label Tertunda
- Jangan gabungkan tab ini dengan transaksi siswa, harus menjadi tab terpisah

Aksi:
- Detail
- Export PDF

Klik Detail membuka modal detail pendapatan admin:
- Tanggal
- Nama siswa
- Langganan
- Nominal transaksi
- Persentase pendapatan admin
- Pendapatan admin
- Status
- Catatan sistem

FILTER DAN TOMBOL:
Pada setiap tab, tambahkan:
- filter status
- search sederhana
- tombol Export PDF di kanan atas
- tidak perlu filter terlalu kompleks, cukup yang penting dan rapi

STATUS KAPSUL YANG DIGUNAKAN:
- Berhasil
- Ditunda
- Dibatalkan
- Siap Dicairkan
- Diproses
- Menunggu
- Gagal
- Masuk
- Tertunda

NOTIFIKASI ADMIN YANG TERHUBUNG:
Pastikan data di halaman ini juga terhubung dengan notifikasi admin.
Tambahkan notifikasi admin seperti:
- Pembayaran paket siswa berhasil dikonfirmasi
- Ada transaksi paket yang masih ditunda
- Komisi instruktur siap dicairkan
- Ada pengajuan pencairan dana instruktur
- Pencairan dana instruktur berhasil diproses
- Pendapatan admin bulan ini diperbarui

WARNA DESAIN — WAJIB DIPERBAIKI:
Saat ini warna halaman masih terlalu biru/AI dan belum benar-benar berubah.
Perbaiki warna agar lebih natural, hangat, dan nyaman dilihat.

Gunakan palette berikut:
- Background utama: #0F1713
- Sidebar/topbar: #101913
- Card/surface: #16221C
- Surface lebih terang: #1D2A22
- Border: #26352E
- Primary action: #2FA66A
- Primary hover: #3BBF7A
- Accent achievement/komisi/admin revenue: #F2B84B
- Text utama: #F3F5EF
- Text sekunder: #A8B5AA
- Danger: #E15B64

Aturan warna:
1. Jangan gunakan biru neon sebagai warna dominan.
2. Gunakan hijau untuk tombol utama, status aktif, sukses, dan interaksi penting.
3. Gunakan amber untuk nominal komisi, pendapatan admin, pencapaian, dan highlight.
4. Gunakan merah lembut untuk gagal, dibatalkan, atau error.
5. Gunakan latar card gelap natural, bukan hitam polos dan bukan biru pekat.
6. Table header, tab aktif, badge, dan tombol harus mengikuti palet baru.
7. Warna nominal uang boleh dibedakan:
   - komisi instruktur = amber/hangat
   - pendapatan admin = hijau atau amber yang konsisten
8. Pastikan seluruh halaman Admin Transaksi & Komisi konsisten dengan dark mode natural.

JANGAN UBAH:
- struktur sidebar admin
- nama menu sidebar
- role lain
- alur sistem yang sudah aktif
- data siswa/instruktur yang sudah ada
- halaman lain yang tidak terkait

HASIL AKHIR YANG DIHARAPKAN:
- Halaman Admin Transaksi & Komisi memiliki 4 tab yang jelas:
  1. Transaksi Langganan
  2. Komisi Instruktur
  3. Pencairan Dana
  4. Pendapatan Admin
- Masing-masing tab memiliki 3 data dummy
- Ada data pendapatan admin yang sebelumnya belum ada
- Ada data komisi instruktur yang sebelumnya belum jelas
- Ada data pencairan dana instruktur yang jelas
- Semua data terlihat saling terhubung
- Tombol Export PDF tersedia di setiap tab
- Warna desain benar-benar berubah menjadi lebih natural dan tidak terasa template AI
- Tidak perlu revisi berulang untuk bagian ini