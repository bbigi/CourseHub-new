<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateNotifications extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'user_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'type' => ['type' => 'VARCHAR', 'constraint' => 64],
            'title' => ['type' => 'VARCHAR', 'constraint' => 160],
            'message' => ['type' => 'TEXT'],
            'read_at' => ['type' => 'DATETIME', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['user_id', 'read_at']);
        $this->forge->addKey('type');
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('notifications');
    }

    public function down()
    {
        $this->forge->dropTable('notifications', true);
    }
}
