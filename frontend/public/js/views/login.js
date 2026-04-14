export const Login = {
    render: function() {
        return `
            <h2>Iniciar Sesión</h2>
            <form id="form-login" style="background: white; padding: 20px; border-radius: 8px;">
                <input type="email" id="email" placeholder="Correo electrónico" required style="display:block; margin-bottom: 10px; padding: 5px;">
                <input type="password" id="password" placeholder="Contraseña" required style="display:block; margin-bottom: 10px; padding: 5px;">
                <button type="submit">Entrar</button>
            </form>
        `;
    },

    init: function() {
        const formulario = document.getElementById('form-login');
        if (!formulario) return;

        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault(); // Evita que la página recargue de golpe
            
            const email = document.getElementById('email').value;
            console.log("Intentando acceder con:", email);
            alert("Prueba de login para: " + email);
            // Más adelante aquí llamaremos a tu AuthController.php
        });
    }
};