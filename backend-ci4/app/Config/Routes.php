<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('backend-status', 'Home::backendStatus');

$routes->group('api', ['filter' => 'corsapi'], static function ($routes) {
    $routes->options('(:any)', static function () {
        return service('response')->setStatusCode(204);
    });

    $routes->get('health', 'Api\HealthController::index');

    // Courses REST API
    $routes->get('courses', 'Api\CourseController::index');
    $routes->get('courses/(:num)', 'Api\CourseController::show/$1');
    $routes->post('courses', 'Api\CourseController::create', ['filter' => 'apikey']);
    $routes->put('courses/(:num)', 'Api\CourseController::update/$1', ['filter' => 'apikey']);
    $routes->delete('courses/(:num)', 'Api\CourseController::delete/$1', ['filter' => 'apikey']);

    // Enrollments REST API
    $routes->get('enrollments', 'Api\EnrollmentController::index', ['filter' => 'apikey']);
    $routes->get('enrollments/(:num)', 'Api\EnrollmentController::show/$1', ['filter' => 'apikey']);
    $routes->post('enroll', 'Api\EnrollmentController::create', ['filter' => 'apikey']);
    $routes->post('enrollments', 'Api\EnrollmentController::create', ['filter' => 'apikey']);
    $routes->put('enrollments/(:num)', 'Api\EnrollmentController::update/$1', ['filter' => 'apikey']);
    $routes->delete('enrollments/(:num)', 'Api\EnrollmentController::delete/$1', ['filter' => 'apikey']);
});
