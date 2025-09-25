// Pricing Page Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initBillingToggle();
    initFAQ();
    initScrollAnimations();
    initMobileMenu();
    initPricingCardAnimations();
    initSmoothScrolling();
    
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    }
});

// Billing Toggle Functionality
function initBillingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const monthlyLabels = document.querySelectorAll('.toggle-label.monthly');
    const yearlyLabels = document.querySelectorAll('.toggle-label.yearly');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    const yearlySavings = document.querySelectorAll('.yearly-savings');
    
    // Pricing data
    const pricingData = {
        basic: { monthly: 2999, yearly: 2399 },
        standard: { monthly: 5999, yearly: 4799 },
        premium: { monthly: 9999, yearly: 7999 }
    };
    
    toggle.addEventListener('change', function() {
        const isYearly = toggle.checked;
        
        // Update toggle labels
        monthlyLabels.forEach(label => {
            label.classList.toggle('active', !isYearly);
        });
        yearlyLabels.forEach(label => {
            label.classList.toggle('active', isYearly);
        });
        
        // Update prices with animation
        updatePrices(isYearly, monthlyPrices, yearlyPrices, yearlySavings);
    });
}

function updatePrices(isYearly, monthlyPrices, yearlyPrices, yearlySavings) {
    const cards = document.querySelectorAll('.pricing-card');
    
    cards.forEach((card, index) => {
        const monthlyPrice = card.querySelector('.monthly-price');
        const yearlyPrice = card.querySelector('.yearly-price');
        const savings = card.querySelector('.yearly-savings');
        
        // Add transition effect
        card.style.transform = 'scale(0.98)';
        card.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            if (isYearly) {
                monthlyPrice.classList.add('hidden');
                yearlyPrice.classList.remove('hidden');
                savings.classList.remove('hidden');
            } else {
                monthlyPrice.classList.remove('hidden');
                yearlyPrice.classList.add('hidden');
                savings.classList.add('hidden');
            }
            
            // Reset transform
            card.style.transform = 'scale(1)';
        }, 100);
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.transition = '';
        }, 300);
    });
}

// FAQ Accordion Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Add smooth animation
            if (!isActive) {
                // Opening
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                // Closing
                answer.style.maxHeight = '0px';
            }
        });
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Pricing Card Hover Effects
function initPricingCardAnimations() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('most-popular')) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('most-popular')) {
                card.style.transform = '';
                card.style.boxShadow = '';
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for pricing cards
                if (entry.target.classList.contains('pricing-grid')) {
                    const cards = entry.target.querySelectorAll('.pricing-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.pricing-cards, .feature-comparison, .faq-section, .trust-signals');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// GSAP Animations (if GSAP is loaded)
function initGSAPAnimations() {
    // Hero section animation
    gsap.timeline()
        .from('.pricing-hero-content h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.pricing-hero-content p', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.billing-toggle', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5');
    
    // Pricing cards animation
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from('.pricing-card', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.pricing-cards',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Feature comparison table animation
    gsap.from('.comparison-table', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.feature-comparison',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // FAQ items animation
    gsap.from('.faq-item', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.faq-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Trust signals animation
    gsap.from('.trust-stats .stat', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.trust-signals',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Button Click Effects
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-btn') || e.target.classList.contains('btn-primary')) {
        // Add ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.8s ease;
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            gap: 1rem;
            border-radius: 0 0 0.5rem 0.5rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounced scroll handler
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(function() {
        // Add navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(12px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }, 10);
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Allow Enter key to trigger FAQ questions
    if (e.key === 'Enter' && e.target.classList.contains('faq-question')) {
        e.target.click();
    }
    
    // Allow Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading states
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.classList.remove('loading'));
});

// Error handling for external resources
window.addEventListener('error', function(e) {
    console.warn('Resource loading error:', e.target.src || e.target.href);
});

// Console welcome message
console.log('%c🚀 Asraaz Pricing Page Loaded Successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
