<?php

namespace App\Models;

use CodeIgniter\Database\Exceptions\DatabaseException;
use Config\Database;
use Throwable;

class SystemStatusModel
{
    public function getStatus(): array
    {
        return [
            'appName' => 'CourseHub',
            'version' => getenv('COURSEHUB_APP_VERSION') ?: '0.1.0-final-project',
            'environment' => ENVIRONMENT,
            'api' => [
                'status' => 'online',
            ],
            'database' => $this->checkDatabase(),
            'frontendUrl' => getenv('COURSEHUB_FRONTEND_URL') ?: 'http://localhost:5173',
            'endpoints' => $this->mainEndpoints(),
        ];
    }

    private function checkDatabase(): array
    {
        try {
            $db = Database::connect();
            $db->initialize();
            $db->query('SELECT 1');
            $db->close();

            return [
                'connected' => true,
                'status' => 'connected',
                'message' => 'Database terhubung',
            ];
        } catch (DatabaseException | Throwable) {
            return [
                'connected' => false,
                'status' => 'disconnected',
                'message' => 'Database belum terhubung. Periksa konfigurasi .env.',
            ];
        }
    }

    private function mainEndpoints(): array
    {
        return [
            ['method' => 'GET', 'path' => '/api/health', 'description' => 'Status API dan koneksi database'],
            ['method' => 'GET', 'path' => '/api/courses', 'description' => 'Daftar kursus'],
            ['method' => 'GET', 'path' => '/api/courses/{id}', 'description' => 'Detail kursus'],
            ['method' => 'POST', 'path' => '/api/enroll', 'description' => 'Endpoint enrolment legacy'],
            ['method' => 'GET', 'path' => '/backend-status', 'description' => 'Halaman status backend'],
        ];
    }
}
