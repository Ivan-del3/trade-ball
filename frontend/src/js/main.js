async function cargarProductos() {
    try {
        // Llamamos al archivo index.php a través de la ruta que definimos
        const response = await fetch('http://localhost/market-ball/backend/public/products');
        
        if (!response.ok) throw new Error('Error en la red');

        const productos = await response.json();
        console.log("Productos recibidos:", productos);

        // Ejemplo de cómo pintarlos en el HTML
        const contenedor = document.getElementById('lista-productos');
        productos.forEach(p => {
            contenedor.innerHTML += `
                <li class="product-card">
                    <h3>${p.Name}</h3>
                    <p>${p.Description}</p>
                    <span class="price">${p.Price}€</span>
                    <br><br>
                    <button>Ver detalle</button>
                </li>
            `;
        });

    } catch (error) {
        console.error("Hubo un problema:", error);
    }
}

// Ejecutar al cargar la página
cargarProductos();