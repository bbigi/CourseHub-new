<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CourseHub API</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <main class="container py-5">
        <div class="card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
                <span class="badge text-bg-success mb-3">CodeIgniter 4 API</span>
                <h1 class="fw-bold">CourseHub Backend API</h1>
                <p class="text-muted">Backend berjalan. Gunakan React TypeScript frontend untuk mengambil data melalui axios.</p>
                <div class="table-responsive">
                    <table class="table table-bordered align-middle">
                        <thead><tr><th>Method</th><th>Endpoint</th><th>Keterangan</th></tr></thead>
                        <tbody>
                            <tr><td>GET</td><td><code>/api/courses</code></td><td>Daftar kursus</td></tr>
                            <tr><td>POST</td><td><code>/api/enroll</code></td><td>Daftar/enroll kursus</td></tr>
                            <tr><td>GET</td><td><code>/api/enrollments</code></td><td>Daftar enrolmen, perlu X-API-KEY</td></tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-0"><strong>Header mutasi data:</strong> <code>X-API-KEY: coursehub-local-api-key</code></p>
            </div>
        </div>
    </main>
</body>
</html>
