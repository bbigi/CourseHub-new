<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateEnrollments extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'user_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'course_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'status' => ['type' => 'VARCHAR', 'constraint' => 32, 'default' => 'active'],
            'enrolled_at' => ['type' => 'DATETIME', 'null' => true],
            'completed_at' => ['type' => 'DATETIME', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['user_id', 'course_id']);
        $this->forge->addKey(['user_id', 'status']);
        $this->forge->addKey(['course_id', 'status']);
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('course_id', 'courses', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('enrollments');
    }

    public function down()
    {
        $this->forge->dropTable('enrollments', true);
    }
}
