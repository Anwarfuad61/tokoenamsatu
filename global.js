// Global state
let isMenuOpen = false;
let menuAnimationTimeout = null;

// Toggle mobile menu
function toggleMobileMenu() {
    console.log('toggleMobileMenu called');
    
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const hamburger = document.querySelector('.hamburger');
    const closeBtn = document.querySelector('.menu-close');
    
    if (!menu || !overlay || !hamburger) {
        console.error('Menu elements not found');
        return;
    }
    
    if (isMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Open mobile menu with animation
function openMobileMenu() {
    console.log('Opening menu');
    
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const hamburger = document.querySelector('.hamburger');
    
    // Reset any existing timeouts
    if (menuAnimationTimeout) {
        clearTimeout(menuAnimationTimeout);
    }
    
    // Enable overlay first
    overlay.classList.add('active');
    
    // Small delay for overlay animation
    setTimeout(() => {
        // Open menu
        menu.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        
        // Lock body scroll
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
        
        isMenuOpen = true;
        console.log('Menu opened successfully');
        
        // Add click listener to close button
        const closeBtn = document.querySelector('.menu-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMobileMenu);
        }
        
    }, 50);
}

// Close mobile menu with animation
function closeMobileMenu() {
    console.log('Closing menu');
    
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const hamburger = document.querySelector('.hamburger');
    
    if (!menu || !overlay || !hamburger) {
        console.error('Menu elements not found for closing');
        return;
    }
    
    // Close menu first
    menu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    
    // Remove link animations
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.style.animation = 'none';
    });
    
    // Wait for menu slide-out animation
    menuAnimationTimeout = setTimeout(() => {
        // Then hide overlay
        overlay.classList.remove('active');
        
        // Restore body scroll
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        
        isMenuOpen = false;
        console.log('Menu closed successfully');
        
        // Remove close button listener
        const closeBtn = document.querySelector('.menu-close');
        if (closeBtn) {
            closeBtn.removeEventListener('click', closeMobileMenu);
        }
        
    }, 300); // Match this with CSS transition duration
}

// Setup mobile menu
function setupMobileMenu() {
    console.log('Setting up mobile menu...');
    
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    
    if (!hamburger) {
        console.error('Hamburger button not found');
        return;
    }
    
    console.log('Found hamburger:', hamburger);
    
    // Remove any existing listeners
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    // Get fresh reference
    const freshHamburger = document.querySelector('.hamburger');
    
    // Add click event to hamburger
    freshHamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Add touch event for mobile
    freshHamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    }, { passive: false });
    
    // Overlay close
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (isMenuOpen) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            }
        });
        
        overlay.addEventListener('touchstart', function(e) {
            if (isMenuOpen) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            }
        }, { passive: false });
    }
    
    // Close when clicking menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (isMenuOpen) {
                e.preventDefault();
                closeMobileMenu();
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = link.getAttribute('href');
                }, 300);
            }
        });
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('touchstart', function(e) {
        if (isMenuOpen && 
            !document.getElementById('mobileMenu').contains(e.target) && 
            !freshHamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    console.log('Mobile menu setup complete');
}

// Dark mode toggle
function toggleDarkMode() {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animate the toggle button
    const toggleBtn = document.querySelector('.toggle-darkmode');
    if (toggleBtn) {
        toggleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            toggleBtn.style.transform = '';
        }, 300);
    }
}

// Set active navigation
function setActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || 
            (currentPath.includes(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Load theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize everything
function init() {
    console.log('Initializing site...');
    
    // Load theme
    loadTheme();
    
    // Setup dark mode button
    const darkModeBtn = document.querySelector('.toggle-darkmode');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Set active nav
    setActiveNav();
    
    console.log('Site initialization complete');
}

// Export to global scope
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.toggleDarkMode = toggleDarkMode;
window.setActiveNav = setActiveNav;
window.setupMobileMenu = setupMobileMenu;

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}