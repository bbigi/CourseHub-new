<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePackages extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'name' => ['type' => 'VARCHAR', 'constraint' => 120],
            'price' => ['type' => 'DECIMAL', 'constraint' => '12,2', 'default' => 0],
            'duration_days' => ['type' => 'INT', 'constraint' => 10, 'unsigned' => true, 'default' => 30],
            'description' => ['type' => 'TEXT', 'null' => true],
            'status' => ['type' => 'VARCHAR', 'constraint' => 32, 'default' => 'active'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('status');
        $this->forge->createTable('packages');
    }

    public function down()
    {
        $this->forge->dropTable('packages', true);
    }
}
