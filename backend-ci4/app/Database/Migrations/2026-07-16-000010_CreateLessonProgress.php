<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateLessonProgress extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'enrollment_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'lesson_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'completed_at' => ['type' => 'DATETIME', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['enrollment_id', 'lesson_id']);
        $this->forge->addKey('lesson_id');
        $this->forge->addForeignKey('enrollment_id', 'enrollments', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('lesson_id', 'lessons', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('lesson_progress');
    }

    public function down()
    {
        $this->forge->dropTable('lesson_progress', true);
    }
}
