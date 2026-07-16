<?php

namespace App\Controllers;

use App\Models\SystemStatusModel;

class Home extends BaseController
{
    public function index(): string
    {
        return $this->backendStatus();
    }

    public function backendStatus(): string
    {
        $statusModel = new SystemStatusModel();

        return view('backend/status', [
            'title' => 'CourseHub Backend Status',
            'status' => $statusModel->getStatus(),
        ]);
    }
}
