 document.getElementById('contacto-submit').addEventListener('click', async function () {
            const nombre  = document.getElementById('c-nombre').value.trim();
            const email   = document.getElementById('c-email').value.trim();
            const asunto  = document.getElementById('c-asunto').value.trim();
            const mensaje = document.getElementById('c-mensaje').value.trim();

            // Ocultar mensajes previos
            document.getElementById('contacto-ok').style.display     = 'none';
            document.getElementById('contacto-error').style.display  = 'none';
            document.getElementById('contacto-campos').style.display = 'none';

            // Validar campos
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!nombre || !email || !asunto || !mensaje || !emailRegex.test(email)) {
                document.getElementById('contacto-campos').style.display = 'block';
                return;
            }

            // Estado cargando
            document.getElementById('contacto-btn-text').style.display    = 'none';
            document.getElementById('contacto-btn-loading').style.display = 'inline';
            this.disabled = true;

            try {
                const formData = new FormData();
                formData.append('nombre',  nombre);
                formData.append('email',   email);
                formData.append('asunto',  asunto);
                formData.append('mensaje', mensaje);

                const response = await fetch('/enviar.php', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    document.getElementById('contacto-ok').style.display = 'block';
                    // Limpiar campos
                    document.getElementById('c-nombre').value  = '';
                    document.getElementById('c-email').value   = '';
                    document.getElementById('c-asunto').value  = '';
                    document.getElementById('c-mensaje').value = '';
                } else {
                    document.getElementById('contacto-error').style.display = 'block';
                }
            } catch (e) {
                document.getElementById('contacto-error').style.display = 'block';
            }

            // Restaurar botón
            document.getElementById('contacto-btn-text').style.display    = 'inline';
            document.getElementById('contacto-btn-loading').style.display = 'none';
            this.disabled = false;
        });