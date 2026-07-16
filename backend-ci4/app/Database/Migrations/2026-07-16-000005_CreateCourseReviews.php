<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateCourseReviews extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'course_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'instructor_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'admin_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'null' => true],
            'status' => ['type' => 'VARCHAR', 'constraint' => 32, 'default' => 'pending'],
            'submitted_at' => ['type' => 'DATETIME', 'null' => true],
            'reviewed_at' => ['type' => 'DATETIME', 'null' => true],
            'reason' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['course_id', 'status']);
        $this->forge->addKey('instructor_id');
        $this->forge->addKey('admin_id');
        $this->forge->addForeignKey('course_id', 'courses', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('instructor_id', 'users', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('admin_id', 'users', 'id', 'CASCADE', 'SET NULL');
        $this->forge->createTable('course_reviews');
    }

    public function down()
    {
        $this->forge->dropTable('course_reviews', true);
    }
}
