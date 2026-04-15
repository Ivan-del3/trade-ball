const API_URL = 'http://localhost/trade-ball/backend/public/products';

export const Home = {
    render: function() {
        return `
            <h2 id="titulo-pagina">Productos Disponibles</h2>
            <ul id="lista-productos" class="product-grid"></ul>
        `;
    },

    init: async function(categoria) {
        if (categoria === undefined) categoria = ''; // Por si viene vacío

        try {
            const contenedor = document.getElementById('lista-productos');
            if (!contenedor) return; // Si no existe, no hacemos nada

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

            // Usamos function(p) en lugar de p =>
            let htmlContent;
            productos.forEach(function(p) {
                if(p){
                htmlContent += `
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
                }


            });
            contenedor.innerHTML = htmlContent;

        } catch (error) {
            console.error("Error al cargar productos:", error);
            document.getElementById('lista-productos').innerHTML = 
                '<p class="error">Lo sentimos, no pudimos cargar los productos en este momento.</p>';
        }
    }
};