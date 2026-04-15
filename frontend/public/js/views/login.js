export const Login = {
    render: function() {
        return `
            <h2>Iniciar Sesión</h2>
            <form id="form-login" style="background: white; padding: 20px; border-radius: 8px;">
                <input type="email" id="email" placeholder="Correo electrónico" required style="display:block; margin-bottom: 10px; padding: 5px;">
                <input type="password" id="password" placeholder="Contraseña" required style="display:block; margin-bottom: 10px; padding: 5px;">
                <button type="submit" id="btn-submit">Entrar</button>
            </form>
            <p id="login-error" style="color: red; display: none;"></p>
            <a href="/" data-link>Volver al inicio</a>
        `;
    },

    init: function() {
        const formulario = document.getElementById('form-login');
        const errorMsg = document.getElementById('login-error');
        
        if (!formulario) return;

        formulario.addEventListener('submit', async function(evento) {
            evento.preventDefault(); 
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                // Hacemos la llamada al backend
                const response = await fetch('http://localhost/trade-ball/backend/public/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: password })
                });

                const data = await response.json();

                if (response.ok) {

                    localStorage.setItem('tradeball_token', data.token);
                    
                    history.pushState({}, "", "/tu");
                    

                    window.dispatchEvent(new Event('popstate')); 
                } else {

                    errorMsg.textContent = data.error;
                    errorMsg.style.display = 'block';
                }

            } catch (error) {
                console.error("Error conectando con el servidor:", error);
                errorMsg.textContent = "Error de conexión.";
                errorMsg.style.display = 'block';
            }
        });
    }
};