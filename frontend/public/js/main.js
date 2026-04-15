import { Home } from './views/home.js';
import { Login } from './views/login.js';
import { Error404 } from './views/Error404.js';

// --- 1. EL ENRUTADOR (Decide qué pantalla mostrar) ---
const routes = {
    '/': {
        component: Home,
        layout: 'full'
    },
    '/login': {
        component: Login,
        layout: 'minimal'
    },
    '/tu': {
        component: Home, //Aquí pondré el panel de Tú
        layout: 'personal-panel'
    }
};

function enrutador() {
    const app = document.getElementById('app');
    const path = window.location.pathname;
    const routeConfig = routes[path] || {component: Error404, layout: 'minimal'};

    document.body.setAttribute('data-view', routeConfig.layout)

    app.innerHTML = routeConfig.component.render();

    if (typeof routeConfig.component.init === "function") routeConfig.component.init();

}

// --- 2. LÓGICA GLOBAL (Se ejecuta al cargar la página) ---
document.addEventListener('DOMContentLoaded', function() {
    
    // Arrancamos el enrutador para que cargue la primera página
    enrutador();

    // Le decimos que si cambia la URL, vuelva a ejecutar el enrutador
    window.addEventListener('popstate', enrutador);

    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-link]');
        if(!link) return;

        e.preventDefault();

        history.pushState({}, "", link.getAttribute('href'));
        enrutador();
    })

    // Tu código exacto del menú lateral adaptado
    const btnToggle = document.getElementById('btn-toggle-categories');
    const btnClose = document.getElementById('btn-close-categories');
    const dropdown = document.getElementById('category-dropdown');
    const nav = document.getElementById('category-nav');

    btnToggle.addEventListener('click', function(evento) {
        evento.stopPropagation();
        dropdown.classList.add('is-open');
    });

    function cerrarMenu() {
        dropdown.classList.remove('is-open');
    }

    btnClose.addEventListener('click', cerrarMenu);

    document.addEventListener('click', function(evento) {
        if (!dropdown.contains(evento.target) && !btnToggle.contains(evento.target)) {
            cerrarMenu();
        }
    });

    if (nav) {
        nav.addEventListener('click', function(evento) {
            const boton = evento.target.closest('.category-link');
            
            if (boton) {
                const categoria = boton.getAttribute('data-cat');    
                console.log("Filtrando por:", categoria || "Todas");
                
                // Si estamos en la página principal, le decimos al Home que cargue esa categoría
                if (window.location.pathname === '/') {
                    Home.init(categoria);
                }
                
                cerrarMenu();
            }
        });
    }
});