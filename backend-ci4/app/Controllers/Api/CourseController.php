<?php

namespace App\Controllers\Api;

use App\Models\CourseModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

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
        $status = $this->request->getGet('status');
        $category = $this->request->getGet('category');

        $builder = $this->courseModel
            ->select('courses.*, users.name AS instructor_name')
            ->join('users', 'users.id = courses.instructor_id', 'left')
            ->orderBy('courses.id', 'DESC');

        if ($status) {
            $builder->where('courses.status', $status);
        }

        if ($category) {
            $builder->where('courses.category', $category);
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
            ->select('courses.*, users.name AS instructor_name')
            ->join('users', 'users.id = courses.instructor_id', 'left')
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

    public function create()
    {
        $payload = $this->request->getJSON(true) ?? $this->request->getPost();

        $data = [
            'title' => trim($payload['title'] ?? ''),
            'slug' => trim($payload['slug'] ?? url_title($payload['title'] ?? '', '-', true)),
            'category' => trim($payload['category'] ?? ''),
            'description' => trim($payload['description'] ?? ''),
            'level' => $payload['level'] ?? 'pemula',
            'price' => $payload['price'] ?? 0,
            'status' => $payload['status'] ?? 'draft',
            'instructor_id' => $payload['instructor_id'] ?? $payload['instructorId'] ?? null,
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
        if (!$this->courseModel->find($id)) {
            return $this->failNotFound('Course not found.');
        }

        $payload = $this->request->getJSON(true) ?? $this->request->getRawInput();

        $data = array_filter([
            'title' => isset($payload['title']) ? trim($payload['title']) : null,
            'slug' => isset($payload['slug']) ? trim($payload['slug']) : null,
            'category' => isset($payload['category']) ? trim($payload['category']) : null,
            'description' => isset($payload['description']) ? trim($payload['description']) : null,
            'level' => $payload['level'] ?? null,
            'price' => $payload['price'] ?? null,
            'status' => $payload['status'] ?? null,
            'instructor_id' => $payload['instructor_id'] ?? $payload['instructorId'] ?? null,
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
        if (!$this->courseModel->find($id)) {
            return $this->failNotFound('Course not found.');
        }

        $this->courseModel->delete($id);

        return $this->respondDeleted([
            'status' => true,
            'message' => 'Course deleted successfully.',
        ]);
    }
}
