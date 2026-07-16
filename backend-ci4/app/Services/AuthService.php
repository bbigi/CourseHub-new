<?php

namespace App\Services;

use App\Libraries\JwtService;
use App\Models\UserModel;
use CodeIgniter\Database\Exceptions\DatabaseException;
use Config\Domain;
use Throwable;

final class AuthService
{
    private UserModel $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function register(array $payload, string $role): array
    {
        $errors = $this->validate($payload, [
            'name' => 'required|min_length[3]|max_length[120]',
            'email' => 'required|valid_email|max_length[180]',
            'password' => 'required|min_length[8]|max_length[72]',
            'password_confirmation' => 'required|matches[password]',
        ]);

        if ($errors !== []) {
            return $this->failure(422, 'Validasi gagal', $errors);
        }

        $email = strtolower(trim((string) $payload['email']));
        if ($this->userModel->where('email', $email)->first() !== null) {
            return $this->failure(409, 'Data sudah digunakan.', ['email' => 'Email sudah digunakan.']);
        }

        $data = [
            'name' => trim((string) $payload['name']),
            'email' => $email,
            'password_hash' => password_hash((string) $payload['password'], PASSWORD_DEFAULT),
            'role' => $role,
            'account_status' => Domain::ACCOUNT_ACTIVE,
            'instructor_verification_status' => $role === Domain::ROLE_INSTRUCTOR
                ? Domain::INSTRUCTOR_PENDING
                : null,
            'rejection_reason' => null,
        ];

        try {
            $userId = $this->userModel->insert($data, true);
        } catch (DatabaseException) {
            return $this->failure(409, 'Data sudah digunakan.', ['email' => 'Email sudah digunakan.']);
        } catch (Throwable $exception) {
            log_message('error', 'User registration failed: {type}', ['type' => $exception::class]);

            return $this->serverFailure();
        }

        if ($userId === false) {
            return $this->failure(422, 'Validasi gagal', $this->userModel->errors());
        }

        return $this->success(201, 'Registrasi berhasil.', [
            'user' => $this->safeUser($this->userModel->find($userId)),
        ]);
    }

    public function login(array $payload): array
    {
        $errors = $this->validate($payload, [
            'email' => 'required|valid_email|max_length[180]',
            'password' => 'required|max_length[72]',
        ]);

        if ($errors !== []) {
            return $this->failure(422, 'Validasi gagal', $errors);
        }

        $email = strtolower(trim((string) $payload['email']));
        $user = $this->userModel->where('email', $email)->first();

        if (! is_array($user)
            || ($user['account_status'] ?? null) !== Domain::ACCOUNT_ACTIVE
            || ! password_verify((string) $payload['password'], (string) ($user['password_hash'] ?? ''))
        ) {
            return $this->failure(401, 'Email atau password salah.');
        }

        try {
            $token = (new JwtService())->issue((int) $user['id']);
        } catch (Throwable $exception) {
            log_message('error', 'JWT issue failed: {type}', ['type' => $exception::class]);

            return $this->serverFailure();
        }

        return $this->success(200, 'Login berhasil.', [
            'access_token' => $token['access_token'],
            'token_type' => 'Bearer',
            'expires_in' => $token['expires_in'],
            'user' => $this->safeUser($user),
        ]);
    }

    public function profile(?array $user): array
    {
        if ($user === null) {
            return $this->failure(401, 'Autentikasi diperlukan.');
        }

        return $this->success(200, 'Profil pengguna berhasil diambil.', [
            'user' => $this->safeUser($user),
        ]);
    }

    public function updateProfile(?array $user, array $payload): array
    {
        if ($user === null) {
            return $this->failure(401, 'Autentikasi diperlukan.');
        }

        $data = [];
        $rules = [];

        if (array_key_exists('name', $payload)) {
            $data['name'] = trim((string) $payload['name']);
            $rules['name'] = 'required|min_length[3]|max_length[120]';
        }

        if (array_key_exists('email', $payload)) {
            $data['email'] = strtolower(trim((string) $payload['email']));
            $rules['email'] = 'required|valid_email|max_length[180]';
        }

        if ($data === []) {
            return $this->failure(422, 'Validasi gagal', ['payload' => 'Nama atau email harus diisi.']);
        }

        $errors = $this->validate($data, $rules);
        if ($errors !== []) {
            return $this->failure(422, 'Validasi gagal', $errors);
        }

        if (isset($data['email'])) {
            $duplicate = $this->userModel
                ->where('email', $data['email'])
                ->where('id !=', (int) $user['id'])
                ->first();

            if ($duplicate !== null) {
                return $this->failure(409, 'Data sudah digunakan.', ['email' => 'Email sudah digunakan.']);
            }
        }

        try {
            $updated = $this->userModel->skipValidation(true)->update((int) $user['id'], $data);
        } catch (DatabaseException) {
            return $this->failure(409, 'Data sudah digunakan.', ['email' => 'Email sudah digunakan.']);
        } catch (Throwable $exception) {
            log_message('error', 'Profile update failed: {type}', ['type' => $exception::class]);

            return $this->serverFailure();
        }

        if (! $updated) {
            return $this->serverFailure();
        }

        return $this->success(200, 'Profil pengguna berhasil diperbarui.', [
            'user' => $this->safeUser($this->userModel->find((int) $user['id'])),
        ]);
    }

    private function validate(array $payload, array $rules): array
    {
        $validation = service('validation');
        $validation->reset()->setRules($rules);

        return $validation->run($payload) ? [] : $validation->getErrors();
    }

    private function safeUser(?array $user): array
    {
        if ($user === null) {
            return [];
        }

        return [
            'id' => (int) $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role'],
            'account_status' => $user['account_status'],
            'instructor_verification_status' => $user['instructor_verification_status'],
            'rejection_reason' => $user['rejection_reason'] ?? null,
        ];
    }

    private function success(int $status, string $message, array $data): array
    {
        return [
            'status' => $status,
            'body' => [
                'success' => true,
                'message' => $message,
                'data' => $data,
            ],
        ];
    }

    private function failure(int $status, string $message, array $errors = []): array
    {
        return [
            'status' => $status,
            'body' => [
                'success' => false,
                'message' => $message,
                'errors' => $errors,
            ],
        ];
    }

    private function serverFailure(): array
    {
        return $this->failure(500, 'Terjadi kesalahan pada server.');
    }
}
