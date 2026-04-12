/**
 * main.js - Lógica principal del Frontend de TradeBall
 */

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
        
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

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
                        <h3>${p.name}</h3>
                        <p>${p.description}</p>
                        <span class="price">${p.price}€</span>
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

    const nav = document.getElementById('main-nav');
    
    if (nav) {
        nav.addEventListener('click', (evento) => {
            if (evento.target.tagName === 'BUTTON' && evento.target.hasAttribute('data-cat')) {
                
                const categoria = evento.target.getAttribute('data-cat');    
                console.log("Categoría pulsada:", categoria || "Todas");
                
                cargarProductos(categoria);
            }
        });
    }
});