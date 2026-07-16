<?php

namespace App\Filters;

use App\Libraries\AuthContext;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Domain;

final class RoleFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $user = AuthContext::user();
        $allowedRoles = is_array($arguments) ? $arguments : [];

        if (! is_array($user) || ! in_array($user['role'] ?? null, $allowedRoles, true)) {
            return $this->forbidden('Anda tidak memiliki izin untuk mengakses resource ini.');
        }

        if (($user['role'] ?? null) === Domain::ROLE_INSTRUCTOR
            && ($user['instructor_verification_status'] ?? null) !== Domain::INSTRUCTOR_VERIFIED) {
            return $this->forbidden('Instruktur harus terverifikasi untuk mengelola kursus.');
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }

    private function forbidden(string $message): ResponseInterface
    {
        return service('response')->setStatusCode(403)->setJSON([
            'success' => false,
            'message' => $message,
            'errors' => [],
        ]);
    }
}
