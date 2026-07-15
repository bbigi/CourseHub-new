STRUKTUR PROJECT COURSEHUB

Project ini sengaja dipisah menjadi 2 program agar mudah maintenance.

1. backend-ci4
   - Framework: CodeIgniter 4
   - Fungsi: API, database, model, controller, validation, CORS, API key
   - Tidak dipakai untuk tampilan utama React
   - Jalankan: php spark serve --port 8080

2. frontend-react-ts
   - Framework: React + TypeScript + Vite
   - Fungsi: tampilan/landing page/dashboard dan konsumsi API menggunakan axios
   - Tampilan utama ada di:
     src/app/App.tsx
     src/app/components/PublicLandingPage.tsx
     src/styles/
   - Integrasi API axios ada di:
     src/app/api/http.ts
     src/app/api/courseService.ts
     src/app/api/enrollmentService.ts
   - Jalankan: npm install lalu npm run dev

Alur kerja:
React frontend -> axios -> CodeIgniter 4 API -> MySQL/MariaDB

Frontend tidak boleh konek langsung ke database.
Backend tidak perlu memuat tampilan React di Views CI4.
