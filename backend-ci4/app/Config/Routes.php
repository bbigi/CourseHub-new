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

    $routes->group('auth', static function ($routes) {
        $routes->post('register-student', 'Api\AuthController::registerStudent');
        $routes->post('register-instructor', 'Api\AuthController::registerInstructor');
        $routes->post('login', 'Api\AuthController::login');
        $routes->post('logout', 'Api\AuthController::logout', ['filter' => 'auth']);
    });

    $routes->get('me', 'Api\AuthController::me', ['filter' => 'auth']);
    $routes->put('me', 'Api\AuthController::updateMe', ['filter' => 'auth']);

    // Public course catalogue: published courses only.
    $routes->get('courses', 'Api\CourseController::index');
    $routes->get('courses/(:num)', 'Api\CourseController::show/$1');

    // Legacy course mutation routes remain available, but require a verified instructor.
    $routes->group('courses', ['filter' => 'auth'], static function ($routes) {
        $routes->post('', 'Api\CourseController::create', ['filter' => 'role:instructor']);
        $routes->put('(:num)', 'Api\CourseController::update/$1', ['filter' => 'role:instructor']);
        $routes->delete('(:num)', 'Api\CourseController::delete/$1', ['filter' => 'role:instructor']);
    });

    $routes->group('student', ['filter' => 'auth'], static function ($routes) {
        $routes->get('check', 'Api\AuthorizationController::check', ['filter' => 'role:student']);
    });

    $routes->group('instructor', ['filter' => 'auth'], static function ($routes) {
        $routes->group('', ['filter' => 'role:instructor'], static function ($routes) {
            $routes->get('check', 'Api\AuthorizationController::check');
            $routes->get('courses', 'Api\CourseController::owned');
            $routes->post('courses', 'Api\CourseController::create');
            $routes->put('courses/(:num)', 'Api\CourseController::update/$1');
            $routes->delete('courses/(:num)', 'Api\CourseController::delete/$1');
        });
    });

    $routes->group('admin', ['filter' => 'auth'], static function ($routes) {
        $routes->group('', ['filter' => 'role:admin'], static function ($routes) {
            $routes->get('check', 'Api\AuthorizationController::check');
            $routes->get('enrollments', 'Api\EnrollmentController::index');
            $routes->get('enrollments/(:num)', 'Api\EnrollmentController::show/$1');
            $routes->put('enrollments/(:num)', 'Api\EnrollmentController::update/$1');
            $routes->delete('enrollments/(:num)', 'Api\EnrollmentController::delete/$1');
        });
    });

    // Legacy enrollment routes: students may only create their own enrollment.
    $routes->group('', ['filter' => 'auth'], static function ($routes) {
        $routes->post('enroll', 'Api\EnrollmentController::create', ['filter' => 'role:student']);
        $routes->post('enrollments', 'Api\EnrollmentController::create', ['filter' => 'role:student']);
    });

    // Legacy enrollment administration remains admin-only.
    $routes->group('enrollments', ['filter' => 'auth'], static function ($routes) {
        $routes->get('', 'Api\EnrollmentController::index', ['filter' => 'role:admin']);
        $routes->get('(:num)', 'Api\EnrollmentController::show/$1', ['filter' => 'role:admin']);
        $routes->put('(:num)', 'Api\EnrollmentController::update/$1', ['filter' => 'role:admin']);
        $routes->delete('(:num)', 'Api\EnrollmentController::delete/$1', ['filter' => 'role:admin']);
    });
});
