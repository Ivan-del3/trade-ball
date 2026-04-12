<?php
require_once __DIR__ . '/../models/Product.php';

class ProductController {
    public function index() {
        $model = new Product();
        
        $category = $_GET['category'] ?? null;

        if ($category) {
            $data = $model->findByCategory($category);
        } else {
            $data = $model->findAll();
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}