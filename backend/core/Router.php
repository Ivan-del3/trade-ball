<?php
class Router {
    private $routes = [];

    public function add($method, $path, $handler) {
        $this->routes[] = ['method' => $method, 'path' => $path, 'handler' => $handler];
    }

    public function run() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        // Ajuste por si tu proyecto está en una subcarpeta
        $path = str_replace('/market-ball/backend/public', '', $path);

        foreach ($this->routes as $route) {
            if ($route['method'] === $method && $route['path'] === $path) {
                list($controller, $action) = explode('@', $route['handler']);
                $obj = new $controller();
                $obj->$action();
                return;
            }
        }
        echo json_encode(["error" => "Ruta $path no encontrada"]);
    }
}