<?php
// 1. Cabeceras CORS SIEMPRE arriba del todo
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Si es una petición de comprobación (OPTIONS), salimos sin hacer nada más
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// 2. Resto de tu código intacto
require_once __DIR__ . '/../core/Router.php';
require_once __DIR__ . '/../controllers/ProductController.php';

$router = new Router();

// Definimos la ruta de la API
$router->add('GET', '/products', 'ProductController@index');

$router->run();