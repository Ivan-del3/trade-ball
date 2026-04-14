## ESTRUCUTRA
```
trade-ball/
│
├── backend/                  # API REST en PHP puro
│   ├── public/               # Document Root del servidor
│   │   └── index.php         # Front Controller: intercepta peticiones
│   │   └── .htaccess         # Redirección de peticiones a public/index.php
│   │
│   ├── config/               
│   │   └── config.php        # Credenciales BD y constantes globales unificadas
│   │
│   ├── core/                 # Motor de la API
│   │   ├── Router.php        # Enrutador personalizado
│   │   ├── Database.php      # Conexión PDO Singleton
│   │   ├── Request.php       # Manejador de la petición HTTP
│   │   └── Response.php      # Formateador de salidas JSON
│   │
│   ├── middlewares/          # Interceptores de peticiones
│   │   ├── AuthMiddleware.php # Valida JWT y sesión
│   │   └── RoleMiddleware.php # Valida roles (admin vs customer)
│   │
│   ├── controllers/          # Lógica de negocio (MVC)
│   │   ├── AuthController.php
│   │   ├── UserController.php
│   │   ├── ProductController.php
│   │   ├── OrderController.php
│   │   ├── ChatController.php
│   │   ├── WalletController.php
│   │   ├── ReviewController.php
│   │   └── NotificationController.php
│   │
│   ├── models/               # Interacción con la Base de Datos (MVC)
│   │   ├── User.php
│   │   ├── Product.php
│   │   ├── Order.php
│   │   ├── Message.php       
│   │   ├── Transaction.php   
│   │   ├── Review.php
│   │   └── Favorite.php
│   │
│   ├── utils/                # Funciones de ayuda compartidas
│   │   ├── JwtHandler.php    # Generación y validación de tokens
│   │   ├── Validator.php     # Sanitización y validación de inputs
│   │   └── FileUploader.php  # Subida de imágenes de productos/avatars
│   │
│   └── logs/                 # Directorio para registrar errores de PHP (Recomendado)
│
└── frontend/                 # Aplicación cliente (Vanilla JS puro)
    └── public/               # Todo el contenido accesible por el navegador
        ├── index.html        # SPA principal (Single Page Application)
        │
        ├── assets/           # Imágenes estáticas, iconos, etc.
        │
        ├── css/              # Carpeta de Estilos
        │   └── style.css     # Hoja de estilos principal
        │
        └── js/               # Carpeta de Lógica (JavaScript)
            ├── config.js     # Archivo con la URL de tu API (Sustituye al .env)
            ├── main.js       # Punto de entrada de JS
            ├── router.js     # Enrutador del frontend (Navegación sin recargar)
            ├── api.js        # Servicio centralizado para llamadas fetch()
            │
            ├── views/        # Lógica de renderizado por pantalla
            │   ├── home.js
            │   ├── login.js
            │   ├── productDetail.js
            │   └── dashboard.js
            │
            └── components/   # Fragmentos de UI reutilizables
                ├── navbar.js
                ├── productCard.js
                └── chatBox.js
```