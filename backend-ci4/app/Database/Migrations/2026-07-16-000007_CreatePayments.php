<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePayments extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'user_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'package_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'transaction_number' => ['type' => 'VARCHAR', 'constraint' => 80],
            'payment_method' => ['type' => 'VARCHAR', 'constraint' => 80],
            'payment_date' => ['type' => 'DATETIME', 'null' => true],
            'amount' => ['type' => 'DECIMAL', 'constraint' => '12,2'],
            'status' => ['type' => 'VARCHAR', 'constraint' => 32, 'default' => 'pending'],
            'confirmed_by' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'null' => true],
            'confirmed_at' => ['type' => 'DATETIME', 'null' => true],
            'rejection_reason' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('transaction_number');
        $this->forge->addKey(['user_id', 'status']);
        $this->forge->addKey(['package_id', 'status']);
        $this->forge->addKey('confirmed_by');
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('package_id', 'packages', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('confirmed_by', 'users', 'id', 'CASCADE', 'SET NULL');
        $this->forge->createTable('payments');
    }

    public function down()
    {
        $this->forge->dropTable('payments', true);
    }
}
