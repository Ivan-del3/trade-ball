<?php
require_once __DIR__ . '/../core/Database.php';

class Product {
    public function findAll() {
        $db = Database::getInstance();
        $stmt = $db->prepare("SELECT * FROM Product WHERE Visible = 1");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}