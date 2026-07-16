<?php

namespace App\Controllers\Api;

use App\Libraries\AuthContext;
use App\Models\CourseModel;
use App\Policies\CourseOwnershipPolicy;
use CodeIgniter\RESTful\ResourceController;
use Config\Domain;

class CourseController extends ResourceController
{
    protected $format = 'json';
    private CourseModel $courseModel;

    public function __construct()
    {
        $this->courseModel = new CourseModel();
    }

    public function index()
    {
        $categoryId = $this->request->getGet('category_id');

        $builder = $this->courseModel
            ->select('courses.*, users.name AS instructor_name, categories.name AS category_name')
            ->join('users', 'users.id = courses.instructor_id', 'left')
            ->join('categories', 'categories.id = courses.category_id', 'left')
            ->where('courses.status', Domain::COURSE_PUBLISHED)
            ->orderBy('courses.id', 'DESC');

        if ($categoryId !== null && $categoryId !== '') {
            $builder->where('courses.category_id', $categoryId);
        }

        return $this->respond([
            'status' => true,
            'message' => 'Course list retrieved successfully.',
            'data' => $builder->findAll(),
        ]);
    }

    public function show($id = null)
    {
        $course = $this->courseModel
            ->select('courses.*, users.name AS instructor_name, categories.name AS category_name')
            ->join('users', 'users.id = courses.instructor_id', 'left')
            ->join('categories', 'categories.id = courses.category_id', 'left')
            ->where('courses.status', Domain::COURSE_PUBLISHED)
            ->find($id);

        if (!$course) {
            return $this->failNotFound('Course not found.');
        }

        return $this->respond([
            'status' => true,
            'message' => 'Course detail retrieved successfully.',
            'data' => $course,
        ]);
    }

    public function owned()
    {
        $user = AuthContext::user();
        $courses = $this->courseModel
            ->where('instructor_id', (int) ($user['id'] ?? 0))
            ->orderBy('id', 'DESC')
            ->findAll();

        return $this->respond([
            'status' => true,
            'message' => 'Owned course list retrieved successfully.',
            'data' => $courses,
        ]);
    }

    public function create()
    {
        $payload = $this->request->getJSON(true) ?? $this->request->getPost();
        $user = AuthContext::user();

        $data = [
            'title' => trim($payload['title'] ?? ''),
            'slug' => trim($payload['slug'] ?? url_title($payload['title'] ?? '', '-', true)),
            'category_id' => $payload['category_id'] ?? null,
            'description' => trim($payload['description'] ?? ''),
            'level' => $payload['level'] ?? 'beginner',
            'status' => Domain::COURSE_DRAFT,
            'instructor_id' => (int) ($user['id'] ?? 0),
            'thumbnail' => $payload['thumbnail'] ?? null,
        ];

        if (!$this->courseModel->insert($data)) {
            return $this->failValidationErrors($this->courseModel->errors());
        }

        return $this->respondCreated([
            'status' => true,
            'message' => 'Course created successfully.',
            'data' => $this->courseModel->find($this->courseModel->getInsertID()),
        ]);
    }

    public function update($id = null)
    {
        $course = $this->courseModel->find($id);

        if (!$course) {
            return $this->failNotFound('Course not found.');
        }

        if (!(new CourseOwnershipPolicy())->allows($course)) {
            return $this->failForbidden('You do not own this course.');
        }

        $payload = $this->request->getJSON(true) ?? $this->request->getRawInput();

        $data = array_filter([
            'title' => isset($payload['title']) ? trim($payload['title']) : null,
            'slug' => isset($payload['slug']) ? trim($payload['slug']) : null,
            'category_id' => $payload['category_id'] ?? null,
            'description' => isset($payload['description']) ? trim($payload['description']) : null,
            'level' => $payload['level'] ?? null,
            'thumbnail' => $payload['thumbnail'] ?? null,
        ], static fn ($value) => $value !== null);

        if ($data === []) {
            return $this->failValidationErrors(['payload' => 'No data provided.']);
        }

        if (!$this->courseModel->update($id, $data)) {
            return $this->failValidationErrors($this->courseModel->errors());
        }

        return $this->respond([
            'status' => true,
            'message' => 'Course updated successfully.',
            'data' => $this->courseModel->find($id),
        ]);
    }

    public function delete($id = null)
    {
        $course = $this->courseModel->find($id);

        if (!$course) {
            return $this->failNotFound('Course not found.');
        }

        if (!(new CourseOwnershipPolicy())->allows($course)) {
            return $this->failForbidden('You do not own this course.');
        }

        $this->courseModel->delete($id);

        return $this->respondDeleted([
            'status' => true,
            'message' => 'Course deleted successfully.',
        ]);
    }
}
