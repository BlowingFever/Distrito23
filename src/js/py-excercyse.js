        // Solution
        const SOLUTION =  "Hello World"
        
        // Update line numbers
        const codeInput = document.getElementById('codeInput');
        const lineNumbers = document.getElementById('lineNumbers');

        codeInput.addEventListener('input', updateLineNumbers);
        codeInput.addEventListener('scroll', syncScroll);

        function updateLineNumbers() {
            const lines = codeInput.value.split('\n').length;
            lineNumbers.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('\n');
        }

        function syncScroll() {
            lineNumbers.scrollTop = codeInput.scrollTop;
        }

        // Clear console
        function clearConsole() {
            document.getElementById('consoleOutput').innerHTML = '<div class="empty-console">Consola limpia...</div>';
        }

        // Add to console
        function addToConsole(message, type = 'output') {
            const consoleOutput = document.getElementById('consoleOutput');
            
            // Remove empty message if exists
            const emptyMsg = consoleOutput.querySelector('.empty-console');
            if (emptyMsg) emptyMsg.remove();
            
            const line = document.createElement('div');
            line.className = `console-line ${type}`;
            line.textContent = message;
            consoleOutput.appendChild(line);
            
            // Auto scroll to bottom
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }

        // Run code
        function runCode() {
            clearConsole();
            const code = codeInput.value.trim();
            
            if (!code) {
                addToConsole('No hay código mostro', 'error');
                return;
            }

            try {
                // Simple Python print() simulator
                const printRegex = /print\s*\(\s*['"](.+?)['"]\s*\)/g;
                let match;
                let hasOutput = false;

                while ((match = printRegex.exec(code)) !== null) {
                    addToConsole(match[1], 'output');
                    hasOutput = true;
                }

                if (!hasOutput) {
                    addToConsole('No hay nada que compilar, usa el print() huevos!', 'info');
                }
            } catch (error) {
                addToConsole(`Error: ${error.message}`, 'error');
            }
        }

        // Check solution
        function checkSolution() {
            const code = codeInput.value.trim();
            
            if (!code) {
                showResultModal(false, 'Noup!', 'La de escribir te la sabes?');
                return;
            }

            // Extract what the code would print
            const printRegex = /print\s*\(\s*['"](.+?)['"]\s*\)/;
            const match = code.match(printRegex);
            
            if (!match) {
                showResultModal(false, 'Casi!', 'Asegurate de que el print() tira.');
                return;
            }

            const output = match[1];
            
            if (output === SOLUTION) {
                showResultModal(true, 'VAMOOOOO!', 'Hermano lo has clavado! Pa ti mi rey 5 XP.');
            } else {
                showResultModal(false, 'Uff por que poco', `Has escrito: "${output}".\nY era: "${SOLUTION}".\n\nCambialo corre yo no he visto nada`);
            }
        }

        // Show hint
        function showHint() {
            addToConsole('💡 Por si eres cortito: Usa print("Hello World") para hacer que funcione', 'info');
        }

        // Show result modal
        function showResultModal(success, title, message) {
            const modal = document.getElementById('resultModal');
            const modalContent = document.getElementById('modalContent');
            const modalIcon = document.getElementById('modalIcon');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');

            if (success) {
                modalContent.className = 'modal-content success';
                modalIcon.textContent = '✅';
            } else {
                modalContent.className = 'modal-content error';
                modalIcon.textContent = '❌';
            }

            modalTitle.textContent = title;
            modalMessage.textContent = message;
            modal.classList.add('active');
        }

        // Close modal
        function closeModal() {
            document.getElementById('resultModal').classList.remove('active');
        }

        // Next exercise
        function nextExercise() {
            alert('Nuevos ejercicios proximamente (No seas impaciente)!');
            window.location.href = '/src/pages/cursos/Python/python.html';
        }

        // Initialize
        updateLineNumbers();