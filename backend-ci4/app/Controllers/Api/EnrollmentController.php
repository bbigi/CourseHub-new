<?php

namespace App\Controllers\Api;

use App\Models\EnrollmentModel;
use CodeIgniter\RESTful\ResourceController;

class EnrollmentController extends ResourceController
{
    protected $format = 'json';
    private EnrollmentModel $enrollmentModel;

    public function __construct()
    {
        $this->enrollmentModel = new EnrollmentModel();
    }

    public function index()
    {
        $data = $this->enrollmentModel
            ->select('enrollments.*, users.name AS student_name, courses.title AS course_title')
            ->join('users', 'users.id = enrollments.user_id', 'left')
            ->join('courses', 'courses.id = enrollments.course_id', 'left')
            ->orderBy('enrollments.id', 'DESC')
            ->findAll();

        return $this->respond([
            'status' => true,
            'message' => 'Enrollment list retrieved successfully.',
            'data' => $data,
        ]);
    }

    public function show($id = null)
    {
        $data = $this->enrollmentModel
            ->select('enrollments.*, users.name AS student_name, courses.title AS course_title')
            ->join('users', 'users.id = enrollments.user_id', 'left')
            ->join('courses', 'courses.id = enrollments.course_id', 'left')
            ->find($id);

        if (!$data) {
            return $this->failNotFound('Enrollment not found.');
        }

        return $this->respond([
            'status' => true,
            'message' => 'Enrollment detail retrieved successfully.',
            'data' => $data,
        ]);
    }

    public function create()
    {
        $payload = $this->request->getJSON(true) ?? $this->request->getPost();

        $data = [
            'user_id' => $payload['user_id'] ?? $payload['userId'] ?? null,
            'course_id' => $payload['course_id'] ?? $payload['courseId'] ?? null,
            'status' => $payload['status'] ?? 'aktif',
            'progress' => $payload['progress'] ?? 0,
            'enrolled_at' => date('Y-m-d H:i:s'),
            'completed_at' => null,
        ];

        if (!$this->enrollmentModel->insert($data)) {
            return $this->failValidationErrors($this->enrollmentModel->errors());
        }

        return $this->respondCreated([
            'status' => true,
            'message' => 'Enrollment created successfully.',
            'data' => $this->enrollmentModel->find($this->enrollmentModel->getInsertID()),
        ]);
    }

    public function update($id = null)
    {
        if (!$this->enrollmentModel->find($id)) {
            return $this->failNotFound('Enrollment not found.');
        }

        $payload = $this->request->getJSON(true) ?? $this->request->getRawInput();

        $data = array_filter([
            'status' => $payload['status'] ?? null,
            'progress' => $payload['progress'] ?? null,
            'completed_at' => (($payload['progress'] ?? null) === 100 || ($payload['status'] ?? null) === 'selesai') ? date('Y-m-d H:i:s') : null,
        ], static fn ($value) => $value !== null);

        if ($data === []) {
            return $this->failValidationErrors(['payload' => 'No data provided.']);
        }

        if (!$this->enrollmentModel->update($id, $data)) {
            return $this->failValidationErrors($this->enrollmentModel->errors());
        }

        return $this->respond([
            'status' => true,
            'message' => 'Enrollment updated successfully.',
            'data' => $this->enrollmentModel->find($id),
        ]);
    }

    public function delete($id = null)
    {
        if (!$this->enrollmentModel->find($id)) {
            return $this->failNotFound('Enrollment not found.');
        }

        $this->enrollmentModel->delete($id);

        return $this->respondDeleted([
            'status' => true,
            'message' => 'Enrollment deleted successfully.',
        ]);
    }
}
