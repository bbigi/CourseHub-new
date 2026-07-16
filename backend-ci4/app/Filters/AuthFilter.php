<?php

namespace App\Filters;

use App\Libraries\AuthContext;
use App\Libraries\JwtService;
use App\Models\UserModel;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use LogicException;
use Throwable;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        AuthContext::clear();
        $authorization = trim($request->getHeaderLine('Authorization'));

        if (! preg_match('/^Bearer\s+(\S+)$/i', $authorization, $matches)) {
            return $this->unauthorized();
        }

        try {
            $userId = (new JwtService())->subject($matches[1]);
        } catch (LogicException) {
            return service('response')->setStatusCode(500)->setJSON([
                'success' => false,
                'message' => 'Konfigurasi autentikasi tidak tersedia.',
                'errors' => [],
            ]);
        } catch (Throwable) {
            return $this->unauthorized();
        }

        try {
            $user = (new UserModel())->find($userId);
        } catch (Throwable $exception) {
            log_message('error', 'Authentication user lookup failed: {type}', ['type' => $exception::class]);

            return $this->serverFailure();
        }

        if (! is_array($user) || ($user['account_status'] ?? null) !== 'active') {
            return $this->unauthorized();
        }

        AuthContext::setUser([
            'id' => (int) $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role'],
            'account_status' => $user['account_status'],
            'instructor_verification_status' => $user['instructor_verification_status'],
            'rejection_reason' => $user['rejection_reason'] ?? null,
        ]);
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        AuthContext::clear();
    }

    private function unauthorized(): ResponseInterface
    {
        return service('response')->setStatusCode(401)->setJSON([
            'success' => false,
            'message' => 'Autentikasi diperlukan.',
            'errors' => [],
        ]);
    }

    private function serverFailure(): ResponseInterface
    {
        return service('response')->setStatusCode(500)->setJSON([
            'success' => false,
            'message' => 'Terjadi kesalahan pada server.',
            'errors' => [],
        ]);
    }
}
