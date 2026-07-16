<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateCertificates extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'user_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'course_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'enrollment_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'certificate_code' => ['type' => 'VARCHAR', 'constraint' => 80],
            'issued_at' => ['type' => 'DATETIME', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('certificate_code');
        $this->forge->addUniqueKey('enrollment_id');
        $this->forge->addKey(['user_id', 'course_id']);
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('course_id', 'courses', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('enrollment_id', 'enrollments', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('certificates');
    }

    public function down()
    {
        $this->forge->dropTable('certificates', true);
    }
}
