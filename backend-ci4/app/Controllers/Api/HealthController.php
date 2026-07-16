<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\SystemStatusModel;

class HealthController extends BaseController
{
    public function index()
    {
        $status = (new SystemStatusModel())->getStatus();
        $databaseStatus = $status['database']['connected'] ? 'connected' : 'disconnected';
        $httpStatus = $status['database']['connected'] ? 200 : 503;

        return $this->response
            ->setStatusCode($httpStatus)
            ->setJSON([
                'success' => $status['database']['connected'],
                'message' => $status['database']['connected']
                    ? 'CourseHub API berjalan'
                    : 'CourseHub API berjalan, tetapi database tidak terhubung',
                'data' => [
                    'api' => 'online',
                    'database' => $databaseStatus,
                ],
            ]);
    }
}
