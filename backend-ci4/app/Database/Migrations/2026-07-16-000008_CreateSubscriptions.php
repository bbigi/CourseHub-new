<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateSubscriptions extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'user_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'package_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'payment_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'start_date' => ['type' => 'DATETIME', 'null' => true],
            'end_date' => ['type' => 'DATETIME', 'null' => true],
            'status' => ['type' => 'VARCHAR', 'constraint' => 32, 'default' => 'pending'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['user_id', 'status', 'end_date']);
        $this->forge->addKey('package_id');
        $this->forge->addKey('payment_id');
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('package_id', 'packages', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('payment_id', 'payments', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('subscriptions');
    }

    public function down()
    {
        $this->forge->dropTable('subscriptions', true);
    }
}
