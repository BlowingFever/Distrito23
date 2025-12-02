// ===== CONFIGURACIÓN =====
const fullText = "Ready to "; // Texto fijo inicial
const words = ['code ?', 'grow ?', 'learn ?', 'start ?', 'build ?', 'create ?'];

let typeSpeed = 80;        
let deleteSpeed = 50;      
let pauseTime = 2000;      

let wordIndex = 0;         
let charIndex = 0;         
let isDeleting = false;    
let isFirstTime = true;    

const typingText = document.getElementById('typingText');

// ===== FUNCIÓN PRINCIPAL =====
function typeWriter() {
    const currentWord = words[wordIndex];
    
    // FASE 1: Primera vez - escribir texto completo con color desde el inicio
    if (isFirstTime) {
        // Si estamos escribiendo el texto fijo "Ready to "
        if (charIndex < fullText.length) {
            typingText.textContent = fullText.substring(0, charIndex);
            charIndex++;
        } 
        // Si estamos escribiendo la primera palabra con color
        else if (charIndex < fullText.length + currentWord.length) {
            const wordCharIndex = charIndex - fullText.length;
            typingText.innerHTML = fullText + '<span class="rotating-word">' + 
                                   currentWord.substring(0, wordCharIndex) + '</span>';
            charIndex++;
        }
        // Cuando termina de escribir todo por primera vez
        else {
            isFirstTime = false;
            charIndex = currentWord.length;
            typingText.classList.add('cursor-blink');
            setTimeout(typeWriter, pauseTime);
            return;
        }
        
        setTimeout(typeWriter, typeSpeed);
        return;
    }
    
    // FASE 2: Después - solo modificar la última palabra
    if (!isDeleting) {
        // Escribir palabra nueva con color
        typingText.innerHTML = fullText + '<span class="rotating-word">' + 
                               currentWord.substring(0, charIndex) + '</span>';
        charIndex++;
        
        if (charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseTime);
            return;
        }
    } else {
        // Borrar palabra actual
        typingText.innerHTML = fullText + '<span class="rotating-word">' + 
                               currentWord.substring(0, charIndex) + '</span>';
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWriter, 500);
            return;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
}

// ===== INICIAR AL CARGAR LA PÁGINA =====
window.addEventListener('DOMContentLoaded', () => {
    typeWriter();
});