<?php

namespace App\Controllers\Api;

use App\Libraries\AuthContext;
use App\Services\AuthService;
use CodeIgniter\RESTful\ResourceController;
use Config\Domain;

class AuthController extends ResourceController
{
    protected $format = 'json';

    private AuthService $authService;

    public function __construct()
    {
        $this->authService = new AuthService();
    }

    public function registerStudent()
    {
        return $this->respondResult($this->authService->register($this->payload(), Domain::ROLE_STUDENT));
    }

    public function registerInstructor()
    {
        return $this->respondResult($this->authService->register($this->payload(), Domain::ROLE_INSTRUCTOR));
    }

    public function login()
    {
        return $this->respondResult($this->authService->login($this->payload()));
    }

    public function logout()
    {
        return $this->respond([
            'success' => true,
            'message' => 'Logout berhasil.',
            'data' => [],
        ]);
    }

    public function me()
    {
        return $this->respondResult($this->authService->profile(AuthContext::user()));
    }

    public function updateMe()
    {
        return $this->respondResult($this->authService->updateProfile(AuthContext::user(), $this->payload()));
    }

    private function payload(): array
    {
        $json = $this->request->getJSON(true);

        if (is_array($json)) {
            return $json;
        }

        $post = $this->request->getPost();

        return is_array($post) ? $post : [];
    }

    private function respondResult(array $result)
    {
        return $this->respond($result['body'], $result['status']);
    }
}
