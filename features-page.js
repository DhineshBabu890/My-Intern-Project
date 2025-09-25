// Features Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality (same as main site)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    // Handle dropdown clicks for mobile
    function setupDropdownInteractions(container) {
        const dropdown = container.querySelector('.dropdown');
        if (dropdown) {
            const dropdownLink = dropdown.querySelector('a');
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            
            // For mobile, convert hover to click
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle dropdown visibility
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                } else {
                    dropdownContent.classList.add('show');
                }
            });
        }
    }
    
    // Setup dropdown for desktop nav
    setupDropdownInteractions(navLinks);
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Create mobile menu
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone nav links and buttons
                const mobileLinks = navLinks.cloneNode(true);
                const mobileButtons = navButtons.cloneNode(true);
                
                mobileMenu.appendChild(mobileLinks);
                mobileMenu.appendChild(mobileButtons);
                
                // Add close button
                const closeButton = document.createElement('div');
                closeButton.classList.add('close-menu');
                closeButton.innerHTML = '<i class="fas fa-times"></i>';
                mobileMenu.appendChild(closeButton);
                
                document.body.appendChild(mobileMenu);
                
                // Add styles
                mobileMenu.style.position = 'fixed';
                mobileMenu.style.top = '0';
                mobileMenu.style.left = '0';
                mobileMenu.style.width = '100%';
                mobileMenu.style.height = '100vh';
                mobileMenu.style.backgroundColor = 'white';
                mobileMenu.style.zIndex = '2000';
                mobileMenu.style.padding = '60px 20px';
                mobileMenu.style.display = 'flex';
                mobileMenu.style.flexDirection = 'column';
                mobileMenu.style.gap = '30px';
                mobileMenu.style.overflowY = 'auto';
                
                // Style close button
                closeButton.style.position = 'absolute';
                closeButton.style.top = '20px';
                closeButton.style.right = '20px';
                closeButton.style.fontSize = '24px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.padding = '10px';
                closeButton.style.backgroundColor = '#f8f9fa';
                closeButton.style.borderRadius = '50%';
                closeButton.style.width = '44px';
                closeButton.style.height = '44px';
                closeButton.style.display = 'flex';
                closeButton.style.alignItems = 'center';
                closeButton.style.justifyContent = 'center';
                
                // Style mobile links
                mobileLinks.style.display = 'flex';
                mobileLinks.style.flexDirection = 'column';
                mobileLinks.style.gap = '20px';
                
                // Style mobile buttons
                mobileButtons.style.display = 'flex';
                mobileButtons.style.flexDirection = 'column';
                mobileButtons.style.gap = '12px';
                
                // Setup dropdown interactions for mobile menu
                setupDropdownInteractions(mobileLinks);
                
                // Close menu when clicking close button
                closeButton.addEventListener('click', function() {
                    document.body.removeChild(mobileMenu);
                });
                
                // Close menu when clicking a non-dropdown link
                mobileLinks.querySelectorAll('a:not(.dropdown a)').forEach(link => {
                    link.addEventListener('click', function() {
                        document.body.removeChild(mobileMenu);
                    });
                });
                
                // Close menu when clicking dropdown items
                const dropdownItems = mobileLinks.querySelectorAll('.dropdown-item');
                dropdownItems.forEach(item => {
                    item.addEventListener('click', function() {
                        document.body.removeChild(mobileMenu);
                    });
                });
            } else {
                document.body.removeChild(document.querySelector('.mobile-menu'));
            }
        });
    }

    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hero elements on page load
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    })
    .from('.features-hero h1', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.features-hero p', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-stats .stat-item', {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.feature-card', {
        duration: 1,
        scale: 0,
        rotation: 180,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.6');

    // Animate category cards on scroll
    gsap.fromTo('.category-card', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.feature-categories',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate feature showcase items
    document.querySelectorAll('.feature-showcase').forEach((showcase, index) => {
        gsap.fromTo(showcase.querySelector('.feature-content'), {
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: showcase,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.fromTo(showcase.querySelector('.feature-visual'), {
            x: index % 2 === 0 ? 50 : -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: showcase,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate feature grid items
    gsap.fromTo('.feature-item', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
        }
    });

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const featureItems = document.querySelectorAll('.feature-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items with animation
            featureItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(item, {
                        duration: 0.4,
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        display: 'block',
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(item, {
                        duration: 0.4,
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                        ease: 'power2.in',
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // Category card interactions
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.category-icon'), {
                duration: 0.3,
                rotation: 360,
                scale: 1.1,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.category-icon'), {
                duration: 0.3,
                rotation: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Setup demo animation
    const setupSteps = document.querySelectorAll('.step');
    if (setupSteps.length > 0) {
        let currentStep = 0;
        
        setInterval(() => {
            setupSteps.forEach(step => step.classList.remove('active'));
            setupSteps[currentStep].classList.add('active');
            currentStep = (currentStep + 1) % setupSteps.length;
        }, 2000);
    }

    // Chart animation
    const chartBars = document.querySelectorAll('.bar');
    if (chartBars.length > 0) {
        ScrollTrigger.create({
            trigger: '.analytics-demo',
            start: 'top 80%',
            onEnter: () => {
                chartBars.forEach((bar, index) => {
                    gsap.fromTo(bar, {
                        height: 0
                    }, {
                        height: bar.style.height,
                        duration: 1,
                        delay: index * 0.2,
                        ease: 'power2.out'
                    });
                });
            }
        });
    }

    // Parallax effect for floating cards
    gsap.to('.feature-card', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.features-hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // CTA section animation
    gsap.fromTo('.cta-content > *', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.features-cta',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Add hover effects to feature items
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('.feature-icon'), {
                duration: 0.3,
                scale: 1.1,
                rotation: 5,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.feature-icon'), {
                duration: 0.3,
                scale: 1,
                rotation: 0,
                ease: 'power2.out'
            });
        });
    });

    // Add click ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
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
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Counter animation for hero stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Trigger counter animations when hero comes into view
    ScrollTrigger.create({
        trigger: '.hero-stats',
        start: 'top 90%',
        onEnter: () => {
            document.querySelectorAll('.hero-stats .stat-number').forEach((counter, index) => {
                const text = counter.textContent;
                const number = parseFloat(text.replace(/[^\d.]/g, ''));
                if (!isNaN(number)) {
                    animateCounter(counter, number, 2000 + index * 200);
                }
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Hide any loading spinner if present
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            duration: 0.5,
            opacity: 0,
            onComplete: () => loader.remove()
        });
    }
});
