// ===== SISTEMA DE LOGIN - FRONTEND ===== //

// Credenciales válidas (hardcodeadas)
const VALID_CREDENTIALS = {
    email: 'demo@demo.com',
    password: '1234'
};

// Elementos del DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword')
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const loginButton = document.querySelector('.login-button');
const buttonText = document.getElementById('buttonText');
const buttonLoader = document.getElementById('buttonLoader');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');

// Función para mostrar el mensaje de error
function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
    
    // Añadir clase de animación
    errorMessage.style.animation = 'none';
    setTimeout(() => {
        errorMessage.style.animation = 'shake 0.5s ease';
    }, 10);
}

// Función para ocultar el mensaje de error
function hideError() {
    errorMessage.style.display = 'none';
}

// Función para mostrar el loader en el botón
function showLoader() {
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'block';
    loginButton.disabled = true;
}

// Función para ocultar el loader del botón
function hideLoader() {
    buttonText.style.display = 'inline';
    buttonLoader.style.display = 'none';
    loginButton.disabled = false;
}

// Función para validar las credenciales
function validateCredentials(email, password) {
    return email === VALID_CREDENTIALS.email && 
           password === VALID_CREDENTIALS.password;
}

// Función para simular delay de autenticación (más realista)
function simulateAuthDelay() {
    return new Promise(resolve => setTimeout(resolve, 800));
}

// Función para mostrar el mensaje de éxito
function showSuccess(message) {
    successText.textContent = message;
    successMessage.style.display = 'flex';
    
    // Añadir clase de animación
    successMessage.style.animation = 'none';
    setTimeout(() => {
        successMessage.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Función para ocultar el mensaje de éxito
function hideSuccess() {
    successMessage.style.display = 'none';
}

// Manejador del evento submit del formulario
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Limpiar errores previos
    hideError();
    
    // Obtener valores de los inputs
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Validar que los campos no estén vacíos
    if (!email || !password) {
        showError('Por favor, completa todos los campos.');
        return;
    }
    
    // Mostrar loader
    showLoader();
    
    // Simular delay de autenticación
    await simulateAuthDelay();
    
    // Validar credenciales
    if (validateCredentials(email, password)) {
        // Login exitoso
        console.log('Login exitoso');
        hideLoader()
        showSuccess('Muy bien tio, nos vamos...');
        
        // Guardar sesión en localStorage (opcional)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        // Redirigir a la página de bienvenida
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 2500);
    } else {
        // Login fallido
        console.log('Credenciales incorrectas');
        hideLoader();
        showError('Mi alma tienes el loggin abajo.');
        
        // Limpiar campo de contraseña
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Ocultar error cuando el usuario empieza a escribir
emailInput.addEventListener('input', hideError);
passwordInput.addEventListener('input', hideError);

// Enfocar automáticamente el primer campo
window.addEventListener('load', () => {
    emailInput.focus();
});
