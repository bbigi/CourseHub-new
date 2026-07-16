<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateCourses extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'instructor_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'category_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'title' => ['type' => 'VARCHAR', 'constraint' => 180],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 220],
            'description' => ['type' => 'TEXT'],
            'level' => ['type' => 'VARCHAR', 'constraint' => 32, 'default' => 'beginner'],
            'thumbnail' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'status' => ['type' => 'VARCHAR', 'constraint' => 32, 'default' => 'draft'],
            'rejection_reason' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->addKey(['instructor_id', 'status']);
        $this->forge->addKey(['category_id', 'status']);
        $this->forge->addForeignKey('instructor_id', 'users', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('category_id', 'categories', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('courses');
    }

    public function down()
    {
        $this->forge->dropTable('courses', true);
    }
}
