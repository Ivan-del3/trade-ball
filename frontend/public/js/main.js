const API_URL = 'http://localhost/trade-ball/backend/public/products';

async function cargarProductos(categoria = '') {
    try {
        const contenedor = document.getElementById('lista-productos');
        contenedor.innerHTML = '<p class="loading">Cargando productos...</p>';

        let urlFinal = API_URL;
        if (categoria) {
            urlFinal += `?category=${encodeURIComponent(categoria)}`;
        }

        const response = await fetch(urlFinal);
        if (!response.ok) throw new Error(`Error en el servidor: ${response.status}`);

        const productos = await response.json();
        contenedor.innerHTML = ''; 

        if (productos.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron productos en esta sección.</p>';
            return;
        }

        productos.forEach(p => {
            contenedor.innerHTML += `
                <li class="product-card">
                    <div class="product-info">
                        <h3>${p.Name}</h3>
                        <p>${p.Description}</p>
                        <span class="price">${p.Price}€</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn-detail">Ver detalle</button>
                    </div>
                </li>
            `;
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
        document.getElementById('lista-productos').innerHTML = 
            '<p class="error">Lo sentimos, no pudimos cargar los productos en este momento.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    cargarProductos(); 

    const btnToggle = document.getElementById('btn-toggle-categories');
    const btnClose = document.getElementById('btn-close-categories');
    const dropdown = document.getElementById('category-dropdown');
    const nav = document.getElementById('category-nav');

    btnToggle.addEventListener('click', (evento) => {
        evento.stopPropagation();
        dropdown.classList.add('is-open');
    });

    const cerrarMenu = () => {
        dropdown.classList.remove('is-open');
    };

    btnClose.addEventListener('click', cerrarMenu);

    document.addEventListener('click', (evento) => {
        if (!dropdown.contains(evento.target) && !btnToggle.contains(evento.target)) {
            cerrarMenu();
        }
    });

    if (nav) {
        nav.addEventListener('click', (evento) => {

            const boton = evento.target.closest('.category-link');
            
            if (boton) {
                const categoria = boton.getAttribute('data-cat');    
                console.log("Filtrando por:", categoria || "Todas");
                
                cargarProductos(categoria);
            }
        });
    }
});