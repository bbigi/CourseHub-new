<?php

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\DatabaseTestTrait;
use CodeIgniter\Test\FeatureTestTrait;
use Firebase\JWT\JWT;
use PHPUnit\Framework\Attributes\DataProvider;

final class AuthApiTest extends CIUnitTestCase
{
    use DatabaseTestTrait;
    use FeatureTestTrait;

    protected $migrate = true;
    protected $refresh = true;
    protected $namespace = 'App';

    private string $jwtSecret;

    protected function setUp(): void
    {
        parent::setUp();

        $this->jwtSecret = bin2hex(random_bytes(32));
        putenv('JWT_SECRET=' . $this->jwtSecret);
        putenv('JWT_ISSUER=coursehub-backend');
        putenv('JWT_AUDIENCE=coursehub-frontend');
        putenv('JWT_TTL_SECONDS=7200');

        $now = date('Y-m-d H:i:s');
        db_connect()->table('users')->insertBatch([
            [
                'name' => 'Student Test',
                'email' => 'student.auth@test.local',
                'password_hash' => password_hash('password123', PASSWORD_DEFAULT),
                'role' => 'student',
                'account_status' => 'active',
                'instructor_verification_status' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Instructor Verified',
                'email' => 'verified.auth@test.local',
                'password_hash' => password_hash('password123', PASSWORD_DEFAULT),
                'role' => 'instructor',
                'account_status' => 'active',
                'instructor_verification_status' => 'verified',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Instructor Pending',
                'email' => 'pending.auth@test.local',
                'password_hash' => password_hash('password123', PASSWORD_DEFAULT),
                'role' => 'instructor',
                'account_status' => 'active',
                'instructor_verification_status' => 'pending',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Admin Test',
                'email' => 'admin.auth@test.local',
                'password_hash' => password_hash('password123', PASSWORD_DEFAULT),
                'role' => 'admin',
                'account_status' => 'active',
                'instructor_verification_status' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Inactive Test',
                'email' => 'inactive.auth@test.local',
                'password_hash' => password_hash('password123', PASSWORD_DEFAULT),
                'role' => 'student',
                'account_status' => 'inactive',
                'instructor_verification_status' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }

    protected function tearDown(): void
    {
        putenv('JWT_SECRET');
        putenv('JWT_ISSUER');
        putenv('JWT_AUDIENCE');
        putenv('JWT_TTL_SECONDS');

        parent::tearDown();
    }

    public function testStudentRegistrationUsesServerControlledRoleAndHidesPassword(): void
    {
        $response = $this->jsonRequest('POST', 'api/auth/register-student', [
            'name' => 'Student Baru',
            'email' => 'student.baru@test.local',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'admin',
            'account_status' => 'inactive',
        ]);

        $response->assertStatus(201);
        $body = $this->decode($response);
        $this->assertTrue($body['success']);
        $this->assertSame('student', $body['data']['user']['role']);
        $this->assertSame('active', $body['data']['user']['account_status']);
        $this->assertNull($body['data']['user']['instructor_verification_status']);
        $this->assertArrayNotHasKey('password_hash', $body['data']['user']);

        $stored = db_connect()->table('users')->where('email', 'student.baru@test.local')->get()->getRowArray();
        $this->assertSame('student', $stored['role']);
        $this->assertTrue(password_verify('password123', $stored['password_hash']));
    }

    public function testInstructorRegistrationIsAlwaysPending(): void
    {
        $response = $this->jsonRequest('POST', 'api/auth/register-instructor', [
            'name' => 'Instructor Baru',
            'email' => 'instructor.baru@test.local',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'admin',
            'instructor_verification_status' => 'verified',
        ]);

        $response->assertStatus(201);
        $user = $this->decode($response)['data']['user'];
        $this->assertSame('instructor', $user['role']);
        $this->assertSame('pending', $user['instructor_verification_status']);
    }

    public function testDuplicateEmailReturnsConflict(): void
    {
        $response = $this->jsonRequest('POST', 'api/auth/register-student', [
            'name' => 'Student Duplikat',
            'email' => 'student.auth@test.local',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(409);
        $body = $this->decode($response);
        $this->assertFalse($body['success']);
        $this->assertArrayHasKey('email', $body['errors']);
    }

    public function testRegistrationValidationReturnsStructuredErrors(): void
    {
        $response = $this->jsonRequest('POST', 'api/auth/register-student', [
            'name' => 'A',
            'email' => 'bukan-email',
            'password' => 'pendek',
            'password_confirmation' => 'berbeda',
        ]);

        $response->assertStatus(422);
        $body = $this->decode($response);
        $this->assertFalse($body['success']);
        $this->assertSame('Validasi gagal', $body['message']);
        $this->assertNotEmpty($body['errors']);
    }

    #[DataProvider('activeLoginProvider')]
    public function testActiveRolesCanLogin(string $email, string $role, ?string $verification): void
    {
        $response = $this->login($email, 'password123');

        $response->assertStatus(200);
        $data = $this->decode($response)['data'];
        $this->assertNotEmpty($data['access_token']);
        $this->assertSame('Bearer', $data['token_type']);
        $this->assertSame(7200, $data['expires_in']);
        $this->assertSame($role, $data['user']['role']);
        $this->assertSame($verification, $data['user']['instructor_verification_status']);
        $this->assertArrayNotHasKey('password_hash', $data['user']);
    }

    public static function activeLoginProvider(): array
    {
        return [
            'student' => ['student.auth@test.local', 'student', null],
            'verified instructor' => ['verified.auth@test.local', 'instructor', 'verified'],
            'pending instructor' => ['pending.auth@test.local', 'instructor', 'pending'],
            'admin' => ['admin.auth@test.local', 'admin', null],
        ];
    }

    public function testWrongPasswordAndInactiveAccountReturnGenericUnauthorized(): void
    {
        $wrongPassword = $this->login('student.auth@test.local', 'salah-password');
        $wrongPassword->assertStatus(401);
        $wrongMessage = $this->decode($wrongPassword)['message'];

        $inactive = $this->login('inactive.auth@test.local', 'password123');

        $inactive->assertStatus(401);
        $this->assertSame($wrongMessage, $this->decode($inactive)['message']);
    }

    public function testProtectedProfileRejectsMissingMalformedAndWrongSignatureTokens(): void
    {
        $missing = $this->get('api/me');
        $missing->assertStatus(401);

        $malformed = $this->withHeaders(['Authorization' => 'Bearer token-rusak'])->get('api/me');
        $malformed->assertStatus(401);

        $wrongSignature = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->tokenFor(
                $this->userId('student.auth@test.local'),
                time() + 3600,
                bin2hex(random_bytes(32)),
            ),
        ])->get('api/me');

        $wrongSignature->assertStatus(401);
    }

    public function testProtectedProfileRejectsExpiredMissingUserAndInactiveUserTokens(): void
    {
        $expired = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->tokenFor($this->userId('student.auth@test.local'), time() - 60),
        ])->get('api/me');
        $expired->assertStatus(401);

        $missingUser = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->tokenFor(999999, time() + 3600),
        ])->get('api/me');
        $missingUser->assertStatus(401);

        $inactive = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->tokenFor($this->userId('inactive.auth@test.local'), time() + 3600),
        ])->get('api/me');

        $inactive->assertStatus(401);
    }

    public function testProfileUsesJwtIdentityAndNeverRequestUserId(): void
    {
        $studentId = $this->userId('student.auth@test.local');
        $adminId = $this->userId('admin.auth@test.local');
        $token = $this->tokenFor($studentId, time() + 3600);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->get('api/me?user_id=' . $adminId);

        $response->assertStatus(200);
        $user = $this->decode($response)['data']['user'];
        $this->assertSame($studentId, $user['id']);
        $this->assertSame('student.auth@test.local', $user['email']);
    }

    public function testProfileUpdateAllowsNameAndEmailButIgnoresPrivilegedFields(): void
    {
        $studentId = $this->userId('student.auth@test.local');
        $token = $this->tokenFor($studentId, time() + 3600);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->withBodyFormat('json')
            ->call('PUT', 'api/me', [
                'name' => 'Student Diperbarui',
                'email' => 'student.updated@test.local',
                'id' => $this->userId('admin.auth@test.local'),
                'role' => 'admin',
                'account_status' => 'inactive',
                'instructor_verification_status' => 'verified',
                'password_hash' => 'tidak-boleh-disimpan',
            ]);

        $response->assertStatus(200);
        $stored = db_connect()->table('users')->where('id', $studentId)->get()->getRowArray();
        $this->assertSame('Student Diperbarui', $stored['name']);
        $this->assertSame('student.updated@test.local', $stored['email']);
        $this->assertSame('student', $stored['role']);
        $this->assertSame('active', $stored['account_status']);
        $this->assertTrue(password_verify('password123', $stored['password_hash']));
    }

    public function testStatelessLogoutRequiresAuthenticationAndReturnsSuccess(): void
    {
        $missing = $this->jsonRequest('POST', 'api/auth/logout', []);
        $missing->assertStatus(401);

        $token = $this->tokenFor($this->userId('student.auth@test.local'), time() + 3600);
        $success = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->withBodyFormat('json')
            ->post('api/auth/logout', []);

        $success->assertStatus(200);
        $this->assertTrue($this->decode($success)['success']);
    }

    private function login(string $email, string $password)
    {
        return $this->jsonRequest('POST', 'api/auth/login', compact('email', 'password'));
    }

    private function jsonRequest(string $method, string $path, array $payload)
    {
        return $this->withBodyFormat('json')->call($method, $path, $payload);
    }

    private function decode($response): array
    {
        return json_decode($response->getJSON(), true, 512, JSON_THROW_ON_ERROR);
    }

    private function userId(string $email): int
    {
        return (int) db_connect()->table('users')->select('id')->where('email', $email)->get()->getRow('id');
    }

    private function tokenFor(int $userId, int $expiresAt, ?string $secret = null): string
    {
        $now = time();

        return JWT::encode([
            'iss' => 'coursehub-backend',
            'aud' => 'coursehub-frontend',
            'iat' => $now,
            'nbf' => $now,
            'exp' => $expiresAt,
            'sub' => (string) $userId,
        ], $secret ?? $this->jwtSecret, 'HS256');
    }
}
