// Dark mode detection
function initDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// 3D effect on mousemove with performance optimization
function init3DEffect() {
    const loginContainer = document.getElementById('loginContainer');
    let rafId = null;
    
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return; // Disable on mobile
        
        if (rafId) {
            window.cancelAnimationFrame(rafId);
        }
        
        rafId = window.requestAnimationFrame(() => {
            const rect = loginContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const angleX = (mouseY - centerY) / 30;
            const angleY = (mouseX - centerX) / 30;
            
            loginContainer.style.transform = `
                perspective(1000px)
                rotateX(${-angleX}deg)
                rotateY(${angleY}deg)
                translateZ(10px)
            `;
        });
    });
    
    // Reset transform when mouse leaves
    document.addEventListener('mouseleave', () => {
        loginContainer.style.transform = `
            perspective(1000px)
            rotateX(0)
            rotateY(0)
            translateZ(0)
        `;
    });
}

// Password toggle functionality
function togglePassword(button) {
    const input = button.parentElement.querySelector('input');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Loading state management
function showLoading() {
    const button = document.getElementById('loginButton');
    button.disabled = true;
    button.querySelector('.button-text').classList.add('d-none');
    button.querySelector('.loading-spinner').classList.remove('d-none');
}

function hideLoading() {
    const button = document.getElementById('loginButton');
    button.disabled = false;
    button.querySelector('.button-text').classList.remove('d-none');
    button.querySelector('.loading-spinner').classList.add('d-none');
}

// Success and error handling
function showSuccess() {
    gsap.to("#loginContainer", {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
            gsap.to("#loginContainer", {
                scale: 1,
                duration: 0.2
            });
        }
    });
}

function showError(message) {
    gsap.to("#loginContainer", {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: "power2.out"
    });
    // You can add more error handling here
}

// Dark mode toggle
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Form validation and submission
function initFormValidation() {
    const form = document.getElementById('loginForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                showError('Please check your inputs.');
                return;
            }
            
            showLoading();
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                showSuccess();
                // Add your actual login logic here
            } catch (error) {
                showError('Login failed. Please try again.');
            } finally {
                hideLoading();
            }
        });
    }
}

// Handle system theme changes
function initThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    init3DEffect();
    initFormValidation();
    initThemeListener();
});
