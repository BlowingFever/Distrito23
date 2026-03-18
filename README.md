# Distrito 23

> Plataforma educativa online para aprender a programar — inspirada en Codedex y Codecademy.

Demo de una página web con tutoriales de programación, sistema de ejercicios interactivos, tema claro/oscuro y formulario de contacto funcional con PHP.

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Estructura | HTML5 semántico |
| Estilos | CSS3 con variables, Grid y Flexbox |
| Interactividad | JavaScript vanilla |
| Backend | PHP + `mail()` |
| Entorno local | XAMPP + Fake Sendmail + Mailtrap |

---

## Estructura del proyecto

```
Distrito23/
├── index.html                          # Página principal
├── enviar.php                          # Procesamiento del formulario de contacto
├── assets/                             # Recursos estáticos varios
├── public/
│   └── assets/
│       ├── fonts/                      # Fira Code, Bebas Neue, Inter, Merriweather
│       ├── img/                        # Logos, iconos, fondos, GIFs
│       └── cursos/python/              # Imágenes del curso de Python
└── src/
    ├── styles/
    │   ├── common-styles/
    │   │   ├── global.css              # Variables CSS, reset, tipografía
    │   │   ├── main.css                # Estilos de index.html
    │   │   ├── header.css              # Navegación y menús
    │   │   ├── footer.css              # Pie de página
    │   │   └── resources.css           # Secciones de recursos, retos, comunidad
    │   ├── python/
    │   │   ├── python-course.css       # Estilos del curso de Python
    │   │   └── terminal-py.css         # Editor de ejercicios
    │   └── auth/
    │       └── login.css               # Página de login
    ├── pages/
    │   ├── cursos/Python/
    │   │   ├── python.html             # Página del curso
    │   │   └── ejercicios/
    │   │       └── hello-world-py.html # Ejercicio interactivo
    │   └── auth/
    │       └── login.html              # Formulario de login
    └── js/
        ├── write-machine.js            # Efecto máquina de escribir
        ├── toggle-elements.js          # Cambio de tema claro/oscuro
        ├── dropdown-movil.js           # Menús desplegables en móvil
        ├── login.js                    # Validación del formulario de login
        ├── py-excercyse.js             # Motor de ejercicios Python
        └── toggle-module.js            # Toggle de módulos del curso
```

---

## Puesta en marcha local (XAMPP)

### Requisitos previos

- [XAMPP](https://www.apachefriends.org/) instalado (incluye Apache + PHP)
- Cuenta gratuita en [Mailtrap](https://mailtrap.io) para capturar emails de prueba

---

### 1. Clonar el repositorio

Coloca el proyecto dentro de la carpeta `htdocs` de XAMPP:

```
C:\xampp\htdocs\Distrito23\
```

Puedes clonarlo directamente ahí:

```bash
cd C:\xampp\htdocs
git clone https://github.com/BlowingFever/Distrito23.git
```

---

### 2. Configurar Mailtrap

Mailtrap captura los emails enviados desde local para que no lleguen a nadie real.

1. Entra en [mailtrap.io](https://mailtrap.io) y crea una cuenta gratuita
2. Ve a **Email Testing → Inboxes → My Inbox → SMTP Settings**
3. En el desplegable de integración selecciona **PHP mail()**
4. Copia tu `auth_username` y `auth_password`

---

### 3. Configurar Fake Sendmail

Abre el archivo `C:\xampp\sendmail\sendmail.ini` **como Administrador** y edita estas líneas:

```ini
smtp_server=sandbox.smtp.mailtrap.io
smtp_port=2525
smtp_ssl=none                        ← importante: cambiar a none
auth_username=TU_USUARIO_MAILTRAP
auth_password=TU_PASSWORD_MAILTRAP
error_logfile=error.log
```

> ⚠️ `smtp_ssl=none` es clave. Con `auto` (valor por defecto) la autenticación falla en el puerto 2525.

---

### 4. Configurar php.ini

Abre `C:\xampp\php\php.ini` **como Administrador** (Notepad → clic derecho → Ejecutar como administrador).

Busca la sección `[mail function]` y déjala así:

```ini
[mail function]
sendmail_path = "C:\xampp\sendmail\sendmail.exe -t"
;SMTP=sandbox.smtp.mailtrap.io
;smtp_port=2525
;sendmail_from=test@distrito23.com
```

> Si los cambios en `php.ini` no se aplican, añade esta línea al principio de `enviar.php` para forzarlo por código:
> ```php
> ini_set('sendmail_path', 'C:\\xampp\\sendmail\\sendmail.exe -t');
> ```
> Esta línea ya viene incluida en el `enviar.php` del proyecto.

---

### 5. Editar el destinatario del email

Abre `enviar.php` y cambia esta línea con tu email real:

```php
$destinatario = "tuemail@gmail.com"; // ← pon aquí tu email
```

---

### 6. Reiniciar Apache y abrir el proyecto

1. Abre el panel de XAMPP
2. Haz clic en **Stop** y luego **Start** en Apache
3. Abre el navegador y ve a:

```
http://localhost/Distrito23/index.html
```

---

### 7. Verificar que el email funciona

Crea un archivo `test.php` en la raíz del proyecto:

```php
<?php
ini_set('sendmail_path', 'C:\\xampp\\sendmail\\sendmail.exe -t');

$resultado = mail("test@example.com", "Test Distrito23", "Funciona!");
echo $resultado ? "mail() funciona ✅" : "mail() falla ❌";
echo "<br>Sendmail path: " . ini_get("sendmail_path");
?>
```

Ábrelo en `http://localhost/Distrito23/test.php`.  
Si dice ✅, ve a tu inbox de Mailtrap y deberías ver el email capturado.

---

## Credenciales de demo

La página de login funciona con credenciales hardcodeadas para la demo:

| Campo | Valor |
|-------|-------|
| Email | `demo@demo.com` |
| Contraseña | `1234` |

---

## Funcionalidades implementadas

- **Tema claro/oscuro** — Toggle con persistencia en `localStorage`
- **Efecto máquina de escribir** — Texto rotatorio animado en el hero
- **Menús desplegables** — Funcionan con CSS en desktop y con JS en móvil
- **Curso de Python** — Módulos expandibles con barra lateral de progreso
- **Editor de ejercicios** — Simulación de `print()` con evaluación automática
- **Formulario de contacto** — Envío AJAX sin recargar la página, procesado con PHP
- **Login de demo** — Validación frontend con estados visuales (error, cargando, éxito)

---

## Solución de problemas comunes

| Problema | Causa | Solución |
|----------|-------|----------|
| `mail() falla` con error `530 Authentication required` | `php.ini` usando SMTP directo sin autenticación | Usar `sendmail_path` con Fake Sendmail en lugar de `SMTP=` |
| SMTP sigue siendo `localhost` después de editar `php.ini` | El archivo no se guardó con permisos de administrador | Abrir Notepad como administrador antes de editar |
| `smtp_ssl=auto` falla en puerto 2525 | SSL incompatible con el puerto de Mailtrap | Cambiar a `smtp_ssl=none` en `sendmail.ini` |
| El proyecto no carga en `localhost` | Está fuera de `htdocs` o Apache no está corriendo | Mover a `C:\xampp\htdocs\Distrito23\` y arrancar Apache |

---

## Autor

**Moisés Cuartero Collado**  
[GitHub](https://github.com/BlowingFever) · [LinkedIn](https://www.linkedin.com/in/moisés-cuartero-collado-954776392) · [Instagram](https://www.instagram.com/substance4moe/)

---

*Made with ♥ · © 2025 Distrito23*