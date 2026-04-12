<?php
require_once __DIR__ . '/../core/Database.php';

class Product {

    public function findAll() {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT * FROM product WHERE visible = 1");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findByCategory($cat) {
        $db = Database::getInstance()->getConnection();
        
        $sql = "SELECT p.* FROM product p 
                        INNER JOIN category c ON p.id_category = c.id_category 
                        WHERE c.name = ? AND p.visible = 1";        
        $stmt = $db->prepare($sql);
        $stmt->execute([$cat]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}