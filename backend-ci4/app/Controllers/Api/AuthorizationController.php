<?php

namespace App\Controllers\Api;

use App\Libraries\AuthContext;
use CodeIgniter\RESTful\ResourceController;

final class AuthorizationController extends ResourceController
{
    protected $format = 'json';

    public function check()
    {
        $user = AuthContext::user();

        return $this->respond([
            'success' => true,
            'message' => 'Akses diizinkan.',
            'data' => [
                'role' => $user['role'] ?? null,
                'instructor_verification_status' => $user['instructor_verification_status'] ?? null,
            ],
        ]);
    }
}
