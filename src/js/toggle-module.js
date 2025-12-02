document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los módulos
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        const header = card.querySelector('.module-header');
        const toggleBtn = card.querySelector('.toggle-btn');
        const content = card.querySelector('.module-content');
        
        // Verificar que existen todos los elementos necesarios
        if (!header || !toggleBtn || !content) return;
        
        // Función para toggle del módulo
        const toggleModule = () => {
            const isExpanded = card.classList.contains('expanded');
            
            if (isExpanded) {
                // Cerrar el módulo
                card.classList.remove('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // Forzar reflow para que la transición funcione
                setTimeout(() => {
                    content.style.maxHeight = '0px';
                }, 10);
                
                // Cambiar aria-expanded para accesibilidad
                header.setAttribute('aria-expanded', 'false');
            } else {
                // Abrir el módulo
                card.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // Cambiar aria-expanded para accesibilidad
                header.setAttribute('aria-expanded', 'true');
                
                // Después de la transición, establecer maxHeight a none para permitir contenido dinámico
                content.addEventListener('transitionend', function handler() {
                    if (card.classList.contains('expanded')) {
                        content.style.maxHeight = 'none';
                    }
                    content.removeEventListener('transitionend', handler);
                });
            }
        };
        
        // Event listeners
        header.addEventListener('click', toggleModule);
        
        // Mejorar accesibilidad con teclado
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleModule();
            }
        });
        
        // Hacer el header focusable
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', card.classList.contains('expanded'));
        
        // Establecer estado inicial
        if (card.classList.contains('expanded')) {
            content.style.maxHeight = 'none';
        } else {
            content.style.maxHeight = '0px';
            content.style.overflow = 'hidden';
        }
    });
    
    // Función opcional para cerrar todos los módulos excepto uno
    window.openOnlyOneModule = function(targetCard) {
        moduleCards.forEach(card => {
            if (card !== targetCard && card.classList.contains('expanded')) {
                card.querySelector('.module-header').click();
            }
        });
    };
});