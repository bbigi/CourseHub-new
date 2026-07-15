<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= esc($title ?? 'CourseHub Backend') ?></title>
    <style>
        :root {
            color-scheme: light;
            --bg: #f6f5f0;
            --card: #ffffff;
            --border: #ded8ca;
            --text: #1f2a24;
            --muted: #66736a;
            --primary: #2f8f5b;
            --danger: #b42318;
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: var(--bg);
            color: var(--text);
        }
        .page {
            width: min(1080px, calc(100% - 32px));
            margin: 0 auto;
            padding: 48px 0;
        }
        .panel {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 28px;
            box-shadow: 0 12px 30px rgba(31, 42, 36, 0.08);
        }
        .eyebrow {
            display: inline-flex;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(47, 143, 91, 0.12);
            color: var(--primary);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: .02em;
        }
        h1 { margin: 16px 0 8px; font-size: clamp(28px, 4vw, 42px); }
        p { color: var(--muted); line-height: 1.6; }
        .grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
            margin: 24px 0;
        }
        .metric {
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 16px;
        }
        .metric strong { display: block; margin-bottom: 6px; }
        .ok { color: var(--primary); }
        .bad { color: var(--danger); }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 18px;
            overflow: hidden;
            border-radius: 8px;
        }
        th, td {
            text-align: left;
            border-bottom: 1px solid var(--border);
            padding: 12px;
            vertical-align: top;
        }
        th {
            background: #f2efe7;
            font-size: 13px;
            color: var(--muted);
        }
        code {
            background: #f2efe7;
            border-radius: 6px;
            padding: 2px 6px;
        }
        a { color: var(--primary); font-weight: 700; }
        @media (max-width: 760px) {
            .page { width: min(100% - 20px, 1080px); padding: 24px 0; }
            .panel { padding: 18px; }
            .grid { grid-template-columns: 1fr; }
            table { display: block; overflow-x: auto; }
        }
    </style>
</head>
<body>
    <main class="page">
        <?= $this->renderSection('content') ?>
    </main>
</body>
</html>
