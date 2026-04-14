export const Error404 = {
 render: () => `
    <section class="error-page">
        <div class="error-container">
            <h1 class="error-code">404</h1>

            <a href="/">
                <button id="btn-home" class="error-button">
                    Ver productos
                </button>
            </a>
        </div>

        <h2 class="error-title">¡Oops! Página no encontrada</h2>
        <p class="error-message">
            Parece que te has perdido buscando un Pokémon salvaje 🐾.
        </p>
    </section>
    `,
    init: () => {
        console.warn("Ruta no encontrada");
    }
};