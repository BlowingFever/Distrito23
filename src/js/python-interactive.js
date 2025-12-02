// ===== PYTHON COURSE INTERACTIVE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // Toggle Module Expansion
    initModuleToggles();
    
    // Progress Animation on Scroll
    initProgressAnimation();
    
    // Exercise Button States
    initExerciseButtons();
    
    // Profile Avatar Animation Toggle
    initProfileAvatarToggle();
});

// Module Toggle Functionality
function initModuleToggles() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        const header = card.querySelector('.module-header');
        const toggleBtn = card.querySelector('.toggle-btn');
        
        if (header && toggleBtn) {
            header.addEventListener('click', () => {
                // Close other modules (optional - remove if you want multiple open)
                // moduleCards.forEach(otherCard => {
                //     if (otherCard !== card && otherCard.classList.contains('expanded')) {
                //         otherCard.classList.remove('expanded');
                //     }
                // });
                
                // Toggle current module
                card.classList.toggle('expanded');
            });
        }
    });
}

// Animate progress bars when visible
function initProgressAnimation() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                // Animate from 0 to target width
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Exercise Button Interaction
function initExerciseButtons() {
    const exerciseButtons = document.querySelectorAll('.exercise-btn');
    
    exerciseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.classList.contains('locked')) {
                // Show locked message
                showNotification('Complete previous exercises to unlock this one!');
                e.preventDefault();
            } else if (button.classList.contains('start')) {
                // Handle start button click
                const exerciseName = button.closest('.exercise-item')
                    .querySelector('.exercise-name').textContent;
                console.log(`Starting exercise: ${exerciseName}`);
                
                // You can add navigation logic here
                // window.location.href = `/exercise/${exerciseName}`;
            }
        });
    });
}

// Notification System
function showNotification(message, duration = 3000) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #1a2238;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        border: 1px solid #4d9fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Simulate Progress (for demo purposes)
function simulateProgress() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    // Exercise progress: 5/43
    if (progressFills[0]) {
        progressFills[0].style.width = '12%';
        document.querySelector('.progress-count').textContent = '5 / 43';
    }
    
    // Projects: 0/2
    if (progressFills[1]) {
        progressFills[1].style.width = '0%';
    }
    
    // XP: 150/685
    if (progressFills[2]) {
        progressFills[2].style.width = '22%';
        const xpCount = document.querySelectorAll('.progress-count')[2];
        if (xpCount) xpCount.textContent = '150 / 685';
    }
}

// Badge Unlock Animation
function unlockBadge(badgeIndex) {
    const badges = document.querySelectorAll('.badge-item');
    if (badges[badgeIndex]) {
        badges[badgeIndex].classList.remove('locked');
        badges[badgeIndex].style.animation = 'badgeUnlock 0.5s ease';
        badges[badgeIndex].style.borderColor = '#4d9fff';
        
        // Add unlock animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes badgeUnlock {
                0% { transform: scale(0.8) rotate(-10deg); opacity: 0; }
                50% { transform: scale(1.1) rotate(5deg); }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        showNotification('🎉 Badge Unlocked!');
    }
}

// Export functions for external use
window.pythonCourse = {
    simulateProgress,
    unlockBadge,
    showNotification
};

// Profile Avatar Animation Toggle
function initProfileAvatarToggle() {
    const profileAvatar = document.getElementById('profileAvatar');
    
    if (!profileAvatar) return;
    
    // Define the two GIF paths
    const idleGif = '/Distrito23/public/assets/img/gif 1.gif';
    const activeGif = '/Distrito23/public/assets/img/gif 2.gif';
    
    let isActive = false;
    
    profileAvatar.addEventListener('click', function() {
        isActive = !isActive;
        
        if (isActive) {
            // Switch to active GIF
            profileAvatar.src = activeGif;
            profileAvatar.style.borderColor = '#00d4aa';
        } else {
            // Switch back to idle GIF
            profileAvatar.src = idleGif;
            profileAvatar.style.borderColor = '#4d9fff';
        }
        
        // Add a small scale animation on click
        profileAvatar.style.transform = 'scale(0.9)';
        setTimeout(() => {
            profileAvatar.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Optional: Add hover effect
    profileAvatar.addEventListener('mouseenter', function() {
        if (!isActive) {
            profileAvatar.style.borderColor = '#6bb3ff';
        }
    });
    
    profileAvatar.addEventListener('mouseleave', function() {
        if (!isActive) {
            profileAvatar.style.borderColor = '#4d9fff';
        } else {
            profileAvatar.style.borderColor = '#00d4aa';
        }
    });
}