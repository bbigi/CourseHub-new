<?php

namespace App\Controllers\Api;

use App\Libraries\AuthContext;
use App\Models\CourseModel;
use App\Models\EnrollmentModel;
use CodeIgniter\RESTful\ResourceController;
use Config\Domain;

class EnrollmentController extends ResourceController
{
    protected $format = 'json';
    private CourseModel $courseModel;
    private EnrollmentModel $enrollmentModel;

    public function __construct()
    {
        $this->courseModel = new CourseModel();
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
        $user = AuthContext::user();
        $courseId = (int) ($payload['course_id'] ?? $payload['courseId'] ?? 0);
        $course = $this->courseModel->find($courseId);

        if (! is_array($course) || ($course['status'] ?? null) !== Domain::COURSE_PUBLISHED) {
            return $this->failNotFound('Course not found.');
        }

        $data = [
            'user_id' => (int) ($user['id'] ?? 0),
            'course_id' => $courseId,
            'status' => 'active',
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
            'completed_at' => ($payload['status'] ?? null) === 'completed' ? date('Y-m-d H:i:s') : null,
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
