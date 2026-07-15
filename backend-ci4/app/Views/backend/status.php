<?= $this->extend('layouts/backend') ?>

<?= $this->section('content') ?>
<section class="panel">
    <span class="eyebrow">CodeIgniter 4 Backend</span>
    <h1><?= esc($status['appName']) ?> API Status</h1>
    <p>
        Halaman ini menampilkan status backend CourseHub, koneksi database secara aman,
        endpoint utama, versi aplikasi, dan tautan menuju frontend React.
    </p>

    <div class="grid">
        <div class="metric">
            <strong>API</strong>
            <span class="ok"><?= esc($status['api']['status']) ?></span>
        </div>
        <div class="metric">
            <strong>Database</strong>
            <span class="<?= $status['database']['connected'] ? 'ok' : 'bad' ?>">
                <?= esc($status['database']['status']) ?>
            </span>
            <p><?= esc($status['database']['message']) ?></p>
        </div>
        <div class="metric">
            <strong>Versi</strong>
            <span><?= esc($status['version']) ?></span>
        </div>
    </div>

    <p>
        Frontend React:
        <a href="<?= esc($status['frontendUrl'], 'attr') ?>"><?= esc($status['frontendUrl']) ?></a>
    </p>

    <h2>Endpoint Utama</h2>
    <table>
        <thead>
            <tr>
                <th>Method</th>
                <th>Path</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($status['endpoints'] as $endpoint): ?>
            <tr>
                <td><code><?= esc($endpoint['method']) ?></code></td>
                <td><code><?= esc($endpoint['path']) ?></code></td>
                <td><?= esc($endpoint['description']) ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</section>
<?= $this->endSection() ?>
