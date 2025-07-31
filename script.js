// Parent-Teacher Portal JavaScript

// DOM Elements
const loginModal = document.getElementById('loginModal');
const loginTriggers = document.querySelectorAll('.login-trigger');
const closeModal = document.querySelector('.close');
const dashboard = document.getElementById('dashboard');
const mainContent = document.getElementById('mainContent');
const parentDashboard = document.getElementById('parentDashboard');
const teacherDashboard = document.getElementById('teacherDashboard');
const welcomeMessage = document.getElementById('welcomeMessage');

// Login Forms
const parentLoginForm = document.getElementById('parentLogin');
const teacherLoginForm = document.getElementById('teacherLogin');
const tabButtons = document.querySelectorAll('.tab-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeAnimations();
});

// Event Listeners
function initializeEventListeners() {
    // Login modal triggers
    loginTriggers.forEach(trigger => {
        trigger.addEventListener('click', openLoginModal);
    });

    // Close modal
    closeModal.addEventListener('click', closeLoginModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeLoginModal();
        }
    });

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabType = this.textContent.toLowerCase().includes('parent') ? 'parent' : 'teacher';
            showTab(tabType);
        });
    });

    // Form submissions
    parentLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin('parent');
    });

    teacherLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin('teacher');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dashboard cards hover effects
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Modal Functions
function openLoginModal() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideIn 0.3s ease';
}

function closeLoginModal() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideOut 0.3s ease';
    
    setTimeout(() => {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Tab Switching
function showTab(tabType) {
    // Update tab buttons
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(tabType)) {
            btn.classList.add('active');
        }
    });

    // Update forms
    document.querySelectorAll('.login-form').forEach(form => {
        form.classList.remove('active');
    });

    if (tabType === 'parent') {
        parentLoginForm.classList.add('active');
    } else {
        teacherLoginForm.classList.add('active');
    }
}

// Login Handling
function handleLogin(userType) {
    // Show loading state
    const loginBtn = document.querySelector(`#${userType}Login .login-btn`);
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;

    // Simulate login process
    setTimeout(() => {
        // Reset button
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
        
        // Close modal and show dashboard
        closeLoginModal();
        showDashboard(userType);
        
        // Show success message
        showNotification(`Successfully logged in as ${userType}!`, 'success');
    }, 1500);
}

// Dashboard Functions
function showDashboard(userType) {
    // Hide main content and show dashboard
    mainContent.style.display = 'none';
    dashboard.classList.remove('hidden');
    
    // Update welcome message
    const userName = userType === 'parent' ? 'Parent' : 'Teacher';
    welcomeMessage.textContent = `Welcome to Your ${userName} Dashboard`;
    
    // Show appropriate dashboard section
    parentDashboard.style.display = userType === 'parent' ? 'block' : 'none';
    teacherDashboard.style.display = userType === 'teacher' ? 'block' : 'none';
    
    // Animate dashboard cards
    animateDashboardCards();
    
    // Update progress bars (for parent dashboard)
    if (userType === 'parent') {
        animateProgressBars();
    }
}

function logout() {
    // Show confirmation
    if (confirm('Are you sure you want to logout?')) {
        // Hide dashboard and show main content
        dashboard.classList.add('hidden');
        mainContent.style.display = 'block';
        
        // Show logout message
        showNotification('Successfully logged out!', 'info');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Animation Functions
function initializeAnimations() {
    // Add CSS for modal slide out animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalSlideOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-50px); }
        }
    `;
    document.head.appendChild(style);
}

function animateDashboardCards() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease';
            bar.style.width = width;
        }, 500 + (index * 200));
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Feature Interactions
function initializeFeatureInteractions() {
    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Stats counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        const isPercentage = finalNumber.includes('%');
        const isPlus = finalNumber.includes('+');
        const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
        
        let currentNumber = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= numericValue) {
                currentNumber = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(currentNumber).toLocaleString();
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';
            
            stat.textContent = displayValue;
        }, 40);
    });
}

// Initialize feature interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFeatureInteractions);

// Responsive navigation toggle (for mobile)
function initializeMobileNav() {
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('header');
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block;
        }
    `;
    
    header.querySelector('.header-content').appendChild(mobileToggle);
    
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-nav-open');
    });
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', initializeMobileNav);

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && loginModal.style.display === 'block') {
        closeLoginModal();
    }
    
    // Tab navigation for modal
    if (e.key === 'Tab' && loginModal.style.display === 'block') {
        const focusableElements = loginModal.querySelectorAll(
            'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }
});

// Loading states for buttons
function addLoadingState(button, loadingText = 'Loading...') {
    const originalText = button.textContent;
    const originalDisabled = button.disabled;
    
    button.textContent = loadingText;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = originalDisabled;
    };
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const inputGroup = input.closest('.input-group');
        
        // Remove existing error states
        inputGroup.classList.remove('error');
        
        if (!value) {
            inputGroup.classList.add('error');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(value)) {
            inputGroup.classList.add('error');
            isValid = false;
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add error styles for form validation
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .input-group.error input {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
    }
    
    .input-group.error::after {
        content: 'This field is required';
        position: absolute;
        bottom: -20px;
        left: 0;
        color: #dc3545;
        font-size: 0.8rem;
    }
`;
document.head.appendChild(errorStyles);

// Export functions for global access
window.showTab = showTab;
window.logout = logout;
window.scrollToSection = scrollToSection;