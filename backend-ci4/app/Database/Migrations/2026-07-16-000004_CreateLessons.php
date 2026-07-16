<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateLessons extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'course_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'title' => ['type' => 'VARCHAR', 'constraint' => 180],
            'content' => ['type' => 'MEDIUMTEXT'],
            'video_url' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'order_no' => ['type' => 'INT', 'constraint' => 10, 'unsigned' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['course_id', 'order_no']);
        $this->forge->addKey('course_id');
        $this->forge->addForeignKey('course_id', 'courses', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('lessons');
    }

    public function down()
    {
        $this->forge->dropTable('lessons', true);
    }
}
