<?php
class Database {
    private static $instance = null;
    public static function getInstance() {
        if (!self::$instance) {
            $config = require __DIR__ . '/../config/config.php';
            self::$instance = new PDO(
                "mysql:host={$config['host']};port={$config['port']};dbname={$config['db_name']};charset=utf8",
                $config['user'], $config['pass']
            );
        }
        return self::$instance;
    }
}