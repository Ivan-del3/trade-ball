<?php
class Database {
    private static $instance = null;
    private $connection; 
    
    private function __construct() {
        $config = require __DIR__ . '/../config/config.php';
        
        $this->connection = new PDO(
            "mysql:host={$config['host']};port={$config['port']};dbname={$config['db_name']};charset=utf8",
            $config['user'], $config['pass']
        );
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
}