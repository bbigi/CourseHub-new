<?php

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\DatabaseTestTrait;
use CodeIgniter\Test\FeatureTestTrait;
use Firebase\JWT\JWT;

final class AuthorizationApiTest extends CIUnitTestCase
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
            $this->user('Student One', 'student.one@test.local', 'student', null, $now),
            $this->user('Student Two', 'student.two@test.local', 'student', null, $now),
            $this->user('Instructor One', 'instructor.one@test.local', 'instructor', 'verified', $now),
            $this->user('Instructor Two', 'instructor.two@test.local', 'instructor', 'verified', $now),
            $this->user('Instructor Pending', 'instructor.pending@test.local', 'instructor', 'pending', $now),
            $this->user('Instructor Rejected', 'instructor.rejected@test.local', 'instructor', 'rejected', $now),
            $this->user('Admin One', 'admin.one@test.local', 'admin', null, $now),
        ]);

        db_connect()->table('categories')->insert([
            'name' => 'Backend',
            'slug' => 'backend',
            'description' => 'Backend courses',
            'status' => 'active',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $categoryId = $this->categoryId();
        db_connect()->table('courses')->insertBatch([
            $this->course($this->userId('instructor.one@test.local'), $categoryId, 'Published Course', 'published-course', 'published', $now),
            $this->course($this->userId('instructor.one@test.local'), $categoryId, 'Draft One', 'draft-one', 'draft', $now),
            $this->course($this->userId('instructor.two@test.local'), $categoryId, 'Draft Two', 'draft-two', 'draft', $now),
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

    public function testPublicCourseAndAuthenticationRoutesRemainAvailable(): void
    {
        $courses = $this->get('api/courses');
        $courses->assertStatus(200);
        $body = $this->decode($courses);
        $this->assertTrue($body['status']);
        $this->assertNotEmpty($body['data']);

        $login = $this->withBodyFormat('json')->post('api/auth/login', []);
        $login->assertStatus(422);
    }

    public function testProtectedLegacyMutationRejectsMissingToken(): void
    {
        $response = $this->json('POST', 'api/courses', $this->validCoursePayload());

        $response->assertStatus(401);
        $this->assertFalse($this->decode($response)['success']);
    }

    public function testMalformedThreeSegmentTokenIsUnauthorizedNotConfigurationFailure(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer malformed.token.value',
        ])->get('api/admin/check');

        $response->assertStatus(401);
        $this->assertSame('Autentikasi diperlukan.', $this->decode($response)['message']);
    }

    public function testStudentRoleRouteAllowsStudentAndDeniesOtherRoles(): void
    {
        $student = $this->authorizedGet('api/student/check', 'student.one@test.local');
        $student->assertStatus(200);
        $this->assertSame('student', $this->decode($student)['data']['role']);

        $this->authorizedGet('api/student/check', 'instructor.one@test.local')->assertStatus(403);
        $this->authorizedGet('api/student/check', 'admin.one@test.local')->assertStatus(403);
    }

    public function testVerifiedInstructorRoleRouteAllowsOnlyVerifiedInstructor(): void
    {
        $verified = $this->authorizedGet('api/instructor/check', 'instructor.one@test.local');
        $verified->assertStatus(200);
        $this->assertSame('verified', $this->decode($verified)['data']['instructor_verification_status']);

        $this->authorizedGet('api/instructor/check', 'student.one@test.local')->assertStatus(403);
        $this->authorizedGet('api/instructor/check', 'admin.one@test.local')->assertStatus(403);
    }

    public function testPendingAndRejectedInstructorsAreForbidden(): void
    {
        $pending = $this->authorizedGet('api/instructor/check', 'instructor.pending@test.local');
        $pending->assertStatus(403);
        $this->assertFalse($this->decode($pending)['success']);

        $rejected = $this->authorizedGet('api/instructor/check', 'instructor.rejected@test.local');
        $rejected->assertStatus(403);
        $this->assertFalse($this->decode($rejected)['success']);
    }

    public function testAdminRoleRouteAllowsAdminAndDeniesOtherRoles(): void
    {
        $admin = $this->authorizedGet('api/admin/check', 'admin.one@test.local');
        $admin->assertStatus(200);
        $this->assertSame('admin', $this->decode($admin)['data']['role']);

        $this->authorizedGet('api/admin/check', 'student.one@test.local')->assertStatus(403);
        $this->authorizedGet('api/admin/check', 'instructor.one@test.local')->assertStatus(403);
    }

    public function testCourseCreateUsesAuthenticatedInstructorAndCategoryIdContract(): void
    {
        $payload = $this->validCoursePayload();
        $payload['instructor_id'] = $this->userId('admin.one@test.local');
        $payload['instructorId'] = $this->userId('student.two@test.local');

        $response = $this->authorizedJson('POST', 'api/courses', $payload, 'instructor.one@test.local');

        $response->assertStatus(201);
        $created = $this->decode($response)['data'];
        $this->assertSame($this->userId('instructor.one@test.local'), (int) $created['instructor_id']);
        $this->assertSame($this->categoryId(), (int) $created['category_id']);
        $stored = db_connect()->table('courses')->where('slug', 'new-course')->get()->getRowArray();
        $this->assertSame($this->userId('instructor.one@test.local'), (int) $stored['instructor_id']);
    }

    public function testInstructorCannotPublishCourseDirectly(): void
    {
        $payload = $this->validCoursePayload();
        $payload['slug'] = 'publish-bypass';
        $payload['status'] = 'published';

        $created = $this->authorizedJson('POST', 'api/courses', $payload, 'instructor.one@test.local');
        $created->assertStatus(201);
        $this->assertSame('draft', $this->decode($created)['data']['status']);

        $courseId = $this->courseId('publish-bypass');
        $updated = $this->authorizedJson('PUT', 'api/courses/' . $courseId, [
            'title' => 'Publish Bypass Updated',
            'status' => 'published',
        ], 'instructor.one@test.local');
        $updated->assertStatus(200);
        $stored = db_connect()->table('courses')->where('id', $courseId)->get()->getRowArray();
        $this->assertSame('draft', $stored['status']);
        $this->assertSame('Publish Bypass Updated', $stored['title']);
    }

    public function testCourseOwnedListsOnlyAuthenticatedInstructorCourses(): void
    {
        $response = $this->authorizedGet('api/instructor/courses', 'instructor.one@test.local');

        $response->assertStatus(200);
        $rows = $this->decode($response)['data'];
        $this->assertCount(2, $rows);
        foreach ($rows as $row) {
            $this->assertSame($this->userId('instructor.one@test.local'), (int) $row['instructor_id']);
        }
    }

    public function testCrossOwnerCourseUpdateAndDeleteAreForbiddenWithoutMutation(): void
    {
        $courseId = $this->courseId('draft-two');

        $update = $this->authorizedJson('PUT', 'api/courses/' . $courseId, [
            'title' => 'Stolen Course',
            'instructor_id' => $this->userId('instructor.one@test.local'),
        ], 'instructor.one@test.local');
        $update->assertStatus(403);
        $this->assertSame('Draft Two', db_connect()->table('courses')->where('id', $courseId)->get()->getRow('title'));

        $delete = $this->authorizedJson('DELETE', 'api/courses/' . $courseId, [], 'instructor.one@test.local');
        $delete->assertStatus(403);
        $this->assertNotNull(db_connect()->table('courses')->where('id', $courseId)->get()->getRowArray());
    }

    public function testPublicCatalogueHidesUnpublishedCoursesFromListAndShow(): void
    {
        $list = $this->get('api/courses');
        $list->assertStatus(200);
        $rows = $this->decode($list)['data'];
        $this->assertCount(1, $rows);
        $this->assertSame('published', $rows[0]['status']);

        $this->get('api/courses/' . $this->courseId('draft-one'))->assertStatus(404);
        $this->get('api/courses/' . $this->courseId('published-course'))->assertStatus(200);
    }

    public function testLegacyEnrollRequiresStudentAndBindsEnrollmentToAuthenticatedUser(): void
    {
        $payload = [
            'user_id' => $this->userId('student.two@test.local'),
            'course_id' => $this->courseId('published-course'),
            'status' => 'completed',
        ];

        $this->json('POST', 'api/enroll', $payload)->assertStatus(401);
        $this->authorizedJson('POST', 'api/enroll', $payload, 'instructor.one@test.local')->assertStatus(403);

        $created = $this->authorizedJson('POST', 'api/enroll', $payload, 'student.one@test.local');
        $created->assertStatus(201);
        $row = db_connect()->table('enrollments')->where('course_id', $payload['course_id'])->get()->getRowArray();
        $this->assertSame($this->userId('student.one@test.local'), (int) $row['user_id']);
        $this->assertSame('active', $row['status']);
    }

    public function testStudentCannotEnrollInUnpublishedCourse(): void
    {
        $response = $this->authorizedJson('POST', 'api/enroll', [
            'course_id' => $this->courseId('draft-one'),
        ], 'student.one@test.local');

        $response->assertStatus(404);
        $this->assertSame(0, db_connect()->table('enrollments')->countAllResults());
    }

    public function testEnrollmentAdministrationIsAdminOnlyForReadUpdateAndDelete(): void
    {
        $now = date('Y-m-d H:i:s');
        db_connect()->table('enrollments')->insert([
            'user_id' => $this->userId('student.one@test.local'),
            'course_id' => $this->courseId('published-course'),
            'status' => 'active',
            'enrolled_at' => $now,
            'completed_at' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ]);
        $enrollmentId = (int) db_connect()->insertID();

        $this->authorizedGet('api/enrollments', 'student.one@test.local')->assertStatus(403);

        $list = $this->authorizedGet('api/enrollments', 'admin.one@test.local');
        $list->assertStatus(200);
        $this->assertCount(1, $this->decode($list)['data']);

        $this->authorizedGet('api/enrollments/' . $enrollmentId, 'admin.one@test.local')->assertStatus(200);
        $updated = $this->authorizedJson('PUT', 'api/enrollments/' . $enrollmentId, ['status' => 'completed'], 'admin.one@test.local');
        $updated->assertStatus(200);
        $this->assertSame('completed', db_connect()->table('enrollments')->where('id', $enrollmentId)->get()->getRow('status'));

        $this->authorizedJson('DELETE', 'api/enrollments/' . $enrollmentId, [], 'admin.one@test.local')->assertStatus(200);
        $this->assertNull(db_connect()->table('enrollments')->where('id', $enrollmentId)->get()->getRowArray());
    }

    private function user(string $name, string $email, string $role, ?string $verification, string $now): array
    {
        return [
            'name' => $name,
            'email' => $email,
            'password_hash' => password_hash('password123', PASSWORD_DEFAULT),
            'role' => $role,
            'account_status' => 'active',
            'instructor_verification_status' => $verification,
            'rejection_reason' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }

    private function course(int $instructorId, int $categoryId, string $title, string $slug, string $status, string $now): array
    {
        return [
            'instructor_id' => $instructorId,
            'category_id' => $categoryId,
            'title' => $title,
            'slug' => $slug,
            'description' => $title . ' description',
            'level' => 'beginner',
            'thumbnail' => null,
            'status' => $status,
            'rejection_reason' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }

    private function validCoursePayload(): array
    {
        return [
            'category_id' => $this->categoryId(),
            'title' => 'New Course',
            'slug' => 'new-course',
            'description' => 'New course description',
            'level' => 'beginner',
            'status' => 'draft',
        ];
    }

    private function authorizedGet(string $path, string $email)
    {
        return $this->withHeaders(['Authorization' => 'Bearer ' . $this->tokenFor($this->userId($email))])->get($path);
    }

    private function authorizedJson(string $method, string $path, array $payload, string $email)
    {
        return $this->withHeaders(['Authorization' => 'Bearer ' . $this->tokenFor($this->userId($email))])
            ->withBodyFormat('json')
            ->call($method, $path, $payload);
    }

    private function json(string $method, string $path, array $payload)
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

    private function categoryId(): int
    {
        return (int) db_connect()->table('categories')->select('id')->where('slug', 'backend')->get()->getRow('id');
    }

    private function courseId(string $slug): int
    {
        return (int) db_connect()->table('courses')->select('id')->where('slug', $slug)->get()->getRow('id');
    }

    private function tokenFor(int $userId): string
    {
        $now = time();

        return JWT::encode([
            'iss' => 'coursehub-backend',
            'aud' => 'coursehub-frontend',
            'iat' => $now,
            'nbf' => $now,
            'exp' => $now + 3600,
            'sub' => (string) $userId,
        ], $this->jwtSecret, 'HS256');
    }
}
