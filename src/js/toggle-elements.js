// Obtener elementos
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Cargar tema guardado o usar el del sistema
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const currentTheme = savedTheme || systemTheme;

// Aplicar tema inicial
htmlElement.setAttribute('data-theme', currentTheme);

// Función para cambiar tema
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Event listener
themeToggle.addEventListener('click', toggleTheme);

// Detectar cambios en el tema del sistema (opcional)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        htmlElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});