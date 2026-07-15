<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUsers extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'name' => ['type' => 'VARCHAR', 'constraint' => 120],
            'email' => ['type' => 'VARCHAR', 'constraint' => 180],
            'password_hash' => ['type' => 'VARCHAR', 'constraint' => 255],
            'role' => ['type' => 'VARCHAR', 'constraint' => 32],
            'account_status' => ['type' => 'VARCHAR', 'constraint' => 32, 'default' => 'active'],
            'instructor_verification_status' => ['type' => 'VARCHAR', 'constraint' => 32, 'null' => true],
            'rejection_reason' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('email');
        $this->forge->addKey(['role', 'account_status']);
        $this->forge->addKey('instructor_verification_status');
        $this->forge->createTable('users');
    }

    public function down()
    {
        $this->forge->dropTable('users', true);
    }
}
