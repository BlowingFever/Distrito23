// dropdown-menu.js - Funcionalidad para menús desplegables

document.addEventListener('DOMContentLoaded', function() {
    // Solo necesario para móvil - en desktop funciona con CSS :hover
    if (window.innerWidth <= 768) {
        initMobileDropdowns();
    }
    
    // Reiniciar en caso de cambio de tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            initMobileDropdowns();
        } else {
            removeMobileDropdowns();
        }
    });
});

function initMobileDropdowns() {
    const dropdownLinks = document.querySelectorAll('.nav-links > li > a.has-dropdown');
    
    dropdownLinks.forEach(link => {
        // Remover listeners anteriores si existen
        link.replaceWith(link.cloneNode(true));
    });
    
    // Obtener los nuevos elementos después de clonar
    const newDropdownLinks = document.querySelectorAll('.nav-links > li > a.has-dropdown');
    
    newDropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const parentLi = this.parentElement;
            const wasActive = parentLi.classList.contains('dropdown-active');
            
            // Cerrar todos los dropdowns
            document.querySelectorAll('.nav-links > li').forEach(li => {
                li.classList.remove('dropdown-active');
            });
            
            // Abrir el clickeado si no estaba activo
            if (!wasActive) {
                parentLi.classList.add('dropdown-active');
            }
        });
    });
    
    // Cerrar dropdowns al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links')) {
            document.querySelectorAll('.nav-links > li').forEach(li => {
                li.classList.remove('dropdown-active');
            });
        }
    });
}

function removeMobileDropdowns() {
    // Limpiar clases activas
    document.querySelectorAll('.nav-links > li').forEach(li => {
        li.classList.remove('dropdown-active');
    });
}