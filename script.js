// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');    // Handle dropdown clicks for mobile
    function setupDropdownInteractions(container) {
        const dropdowns = container.querySelectorAll('.dropdown'); // Changed to querySelectorAll
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            
            if (dropdownLink && dropdownContent) {
                // Remove any existing event listeners by cloning the element
                const newDropdownLink = dropdownLink.cloneNode(true);
                dropdownLink.parentNode.replaceChild(newDropdownLink, dropdownLink);
                
                // For mobile, convert hover to click
                newDropdownLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Dropdown clicked!'); // Debug log
                    
                    // Close other dropdowns first
                    container.querySelectorAll('.dropdown').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                            const otherContent = otherDropdown.querySelector('.dropdown-content');
                            if (otherContent) {
                                otherContent.classList.remove('show');
                            }
                        }
                    });
                    
                    // Toggle current dropdown visibility
                    if (dropdownContent.classList.contains('show')) {
                        console.log('Closing dropdown'); // Debug log
                        dropdownContent.classList.remove('show');
                        dropdown.classList.remove('active');
                    } else {
                        console.log('Opening dropdown'); // Debug log
                        dropdownContent.classList.add('show');
                        dropdown.classList.add('active');
                    }
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!dropdown.contains(e.target)) {
                        dropdownContent.classList.remove('show');
                        dropdown.classList.remove('active');
                    }
                });
            }
        });
    }
    
    // Setup dropdown for desktop nav
    setupDropdownInteractions(navLinks);
    
    menuToggle.addEventListener('click', function() {        // Create mobile menu
        if (!document.querySelector('.mobile-menu')) {
            const mobileMenu = document.createElement('div');
            mobileMenu.classList.add('mobile-menu');
            
            // Create simple mobile navigation structure
            const mobileNav = document.createElement('div');
            mobileNav.innerHTML = `
                <div class="mobile-nav-item">
                    <a href="#" class="mobile-nav-link">Home</a>
                </div>
                <div class="mobile-nav-item mobile-dropdown">
                    <a href="#" class="mobile-nav-link mobile-dropdown-toggle">Demos <i class="fas fa-chevron-down"></i></a>
                    <div class="mobile-dropdown-content">
                        <a href="#" class="mobile-dropdown-item">Restaurant</a>
                        <a href="#" class="mobile-dropdown-item">Grocery</a>
                        <a href="#" class="mobile-dropdown-item">Clothing</a>
                        <a href="#" class="mobile-dropdown-item">Beauty</a>
                        <a href="#" class="mobile-dropdown-item">Jewelry</a>
                        <a href="#" class="mobile-dropdown-item">Pets</a>
                        <a href="#" class="mobile-dropdown-item">Furniture</a>
                        <a href="#" class="mobile-dropdown-item">Electronics</a>
                        <a href="#" class="mobile-dropdown-item">Toys</a>
                        <a href="#" class="mobile-dropdown-item">Bakery</a>
                        <a href="#" class="mobile-dropdown-item">Pharmacy</a>
                    </div>
                </div>
                <div class="mobile-nav-item">
                    <a href="features.html" class="mobile-nav-link">Features</a>
                </div>
                <div class="mobile-nav-item">
                    <a href="#" class="mobile-nav-link">Pricing</a>
                </div>
                <div class="mobile-nav-item">
                    <a href="#" class="mobile-nav-link">Plugins</a>
                </div>
            `;
            
            // Add login and try for free buttons
            const mobileButtons = document.createElement('div');
            mobileButtons.classList.add('mobile-buttons');
            mobileButtons.innerHTML = `
                <a href="#" class="btn btn-secondary">Login</a>
                <a href="#" class="btn btn-primary">Try for free →</a>
            `;
            
            mobileMenu.appendChild(mobileNav);
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
            
            // Setup mobile dropdown functionality
            const dropdownToggle = mobileMenu.querySelector('.mobile-dropdown-toggle');
            const dropdownContent = mobileMenu.querySelector('.mobile-dropdown-content');
            
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Mobile dropdown clicked');
                
                if (dropdownContent.style.display === 'none' || !dropdownContent.style.display) {
                    dropdownContent.style.display = 'block';
                    dropdownToggle.querySelector('i').style.transform = 'rotate(180deg)';
                } else {
                    dropdownContent.style.display = 'none';
                    dropdownToggle.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Style mobile navigation
            mobileNav.style.display = 'flex';
            mobileNav.style.flexDirection = 'column';
            mobileNav.style.gap = '0';
            
            // Style mobile buttons
            mobileButtons.style.display = 'flex';
            mobileButtons.style.flexDirection = 'column';
            mobileButtons.style.gap = '12px';
            mobileButtons.style.marginTop = '20px';
              // Close menu when clicking close button
            closeButton.addEventListener('click', function() {
                document.body.removeChild(mobileMenu);
            });
            
            // Close menu when clicking non-dropdown links
            const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link:not(.mobile-dropdown-toggle)');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    document.body.removeChild(mobileMenu);
                });
            });
            
            // Close menu when clicking dropdown items
            const mobileDropdownItems = mobileMenu.querySelectorAll('.mobile-dropdown-item');
            mobileDropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevent default for demo
                    console.log('Selected:', item.textContent);
                    document.body.removeChild(mobileMenu);
                });
            });
        } else {
            document.body.removeChild(document.querySelector('.mobile-menu'));
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation for app showcase
    const appSlider = document.querySelector('.app-slider');
    if (appSlider) {
        // Auto scroll the app showcase
        let scrollAmount = 0;
        const scrollSpeed = 0.5;
        let scrollInterval = setInterval(() => {
            appSlider.scrollLeft += scrollSpeed;
            scrollAmount += scrollSpeed;
            
            // Reset scroll position when reaching the end
            if (scrollAmount >= (appSlider.scrollWidth - appSlider.clientWidth)) {
                appSlider.scrollLeft = 0;
                scrollAmount = 0;
            }
        }, 30);
        
        // Removed hover pause functionality
    }
      // Add animation for plugins showcase
    const pluginsSlider = document.querySelector('.plugins-slider');
    if (pluginsSlider) {
        // Auto scroll the plugins showcase at the same speed as app showcase
        let pluginsScrollAmount = 0;
        const pluginsScrollSpeed = 0.5; // Same speed as app showcase
        
        setInterval(() => {
            pluginsSlider.scrollLeft += pluginsScrollSpeed;
            pluginsScrollAmount += pluginsScrollSpeed;
            
            // When we reach the end, jump back to start
            if (pluginsScrollAmount >= (pluginsSlider.scrollWidth - pluginsSlider.clientWidth)) {
                pluginsSlider.scrollLeft = 0;
                pluginsScrollAmount = 0;
            }
        }, 30);
    }
  
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hero-content, .app-slide');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.hero-content, .app-slide').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});



// App Slider Infinite Loop
document.addEventListener('DOMContentLoaded', function() {
    const appSlider = document.querySelector('.app-slider');
    const slides = document.querySelectorAll('.app-slider .app-slide:not(.clone)');
    const totalSlides = slides.length;
    
    let currentPosition = 0;
    let slideWidth = 0;
    let animationId;
    
    // Calculate slide width based on viewport
    function calculateSlideWidth() {
        if (window.innerWidth > 1200) {
            slideWidth = 300; // Desktop width
        } else if (window.innerWidth > 768) {
            slideWidth = 250; // Tablet width
        } else {
            slideWidth = 200; // Mobile width
        }
    }
    
    // Initialize slider
    function initSlider() {
        calculateSlideWidth();
        
        // Set initial position to show first slide
        currentPosition = 0;
        updateSliderPosition();
        
        // Start animation
        startAnimation();
    }
    
    // Update slider position
    function updateSliderPosition() {
        appSlider.style.transform = `translateX(${-currentPosition}px)`;
    }
    
    // Animate slider
    function animateSlider() {
        currentPosition += 1; // Move 1px at a time for smooth animation
        
        // If we've moved a full slide width, check if we need to reset
        if (currentPosition % slideWidth === 0) {
            const currentSlideIndex = currentPosition / slideWidth;
            
            // If we've reached the end of original slides, reset to beginning
            if (currentSlideIndex >= totalSlides) {
                currentPosition = 0;
            }
        }
        
        updateSliderPosition();
        animationId = requestAnimationFrame(animateSlider);
    }
    
    // Start animation
    function startAnimation() {
        animationId = requestAnimationFrame(animateSlider);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        calculateSlideWidth();
    });
    
    // Initialize the slider
    initSlider();
});



// Stats Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-value');
    const counterSection = document.querySelector('.stats-counter-section');
    
    let counted = false;
    
    function startCounting() {
        if (counted) return;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds for the animation
            const increment = target / (duration / 16); // 60fps
            
            let currentCount = 0;
            
            const updateCounter = () => {
                currentCount += increment;
                
                if (currentCount < target) {
                    // For large numbers, show with commas and no decimals
                    if (target > 1000) {
                        counter.textContent = Math.floor(currentCount).toLocaleString();
                    } else {
                        counter.textContent = Math.floor(currentCount);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    // Ensure we end exactly at the target value
                    if (target > 1000) {
                        counter.textContent = target.toLocaleString();
                    } else {
                        counter.textContent = target;
                    }
                }
            };
            
            updateCounter();
        });
        
        counted = true;
    }
    
    // Check if the counter section is in viewport
    function checkIfInView() {
        const rect = counterSection.getBoundingClientRect();
        const isInViewport = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
        
        if (isInViewport) {
            startCounting();
            window.removeEventListener('scroll', checkIfInView);
        }
    }
    
    // Initial check and add scroll listener
    checkIfInView();
    window.addEventListener('scroll', checkIfInView);
});

// Stacking Cards Scroll Effect Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.stacking-card');
    
    if (cards.length === 0) return;
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * 0.2
        );
    }
    
    // Function to handle scroll effects
    function handleScroll() {
        cards.forEach((card, index) => {
            // Calculate how far the card is from its sticky position
            const rect = card.getBoundingClientRect();
            const stickyTop = parseInt(window.getComputedStyle(card).top);
            const distanceFromSticky = rect.top - stickyTop;
            
            // Apply subtle scale effect based on scroll position
            if (distanceFromSticky < 0 && index < cards.length - 1) {
                // Card is being pushed up by the next card
                const progress = Math.min(1, Math.abs(distanceFromSticky) / 200);
                card.style.transform = `scale(${1 - progress * 0.03})`;
                card.style.opacity = 1 - progress * 0.3;
            } else {
                // Card is at or approaching its sticky position
                card.style.transform = 'scale(1)';
                card.style.opacity = 1;
            }
            
            // Add visible class when card comes into view
            if (isInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});

// New Stacking Cards Scroll Effect - Optimized for Smooth Performance
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.new-stacking-card');
    const section = document.querySelector('.new-stacking-cards-section');
    
    if (cards.length === 0 || !section) return;
    
    // Cache DOM queries and calculations
    const viewportHeight = window.innerHeight;
    const stackPosition = 250;
    const cardAnimationDistance = viewportHeight * 0.3; // Reduced for faster animation
    let sectionTop = 0;
    let sectionBottom = 0;
    let ticking = false;
    let lastScrollY = 0;
    
    // Pre-calculate card properties
    const cardProperties = Array.from(cards).map((card, index) => ({
        element: card,
        startScroll: index * cardAnimationDistance,
        zIndex: 10 + index
    }));
    
    // Check if we should disable stacking on mobile/tablet
    function shouldDisableStacking() {
        return window.innerWidth <= 992;
    }
    
    // Reset cards to normal positioning (for mobile)
    function resetCards() {
        cardProperties.forEach(({ element }) => {
            element.style.position = 'relative';
            element.style.top = 'auto';
            element.style.left = 'auto';
            element.style.transform = 'translate3d(0, 0, 0)';
            element.style.opacity = '1';
            element.style.zIndex = 'auto';
            element.style.marginBottom = '20px';
            element.style.pointerEvents = 'auto';
        });
    }
    
    // Update section boundaries (called on resize)
    function updateSectionBoundaries() {
        const rect = section.getBoundingClientRect();
        sectionTop = rect.top + window.pageYOffset;
        sectionBottom = sectionTop + section.offsetHeight;
    }
    
    // Optimized stacking cards update function
    function updateStackingCards() {
        // Skip stacking animation on mobile/tablet
        if (shouldDisableStacking()) {
            resetCards();
            return;
        }
        
        const scrollY = window.pageYOffset;
        
        // Check if we're within the section bounds
        const isInSection = scrollY >= sectionTop - viewportHeight && scrollY <= sectionBottom;
        
        if (!isInSection) {
            // Hide all cards when outside the section
            cardProperties.forEach(({ element }) => {
                element.style.opacity = '0';
                element.style.pointerEvents = 'none';
            });
            return;
        }
        
        // Calculate how far we've scrolled into the section
        const scrollIntoSection = Math.max(0, scrollY - sectionTop + viewportHeight * 0.3);
        
        // Check if we're past the section - hide cards for smoother transition
        const shouldHide = scrollY > sectionBottom - viewportHeight * 0.8;
        
        cardProperties.forEach(({ element, startScroll, zIndex }, index) => {
            // Calculate progress for this specific card (0 = at bottom, 1 = stacked)
            let cardProgress = 0;
            if (scrollIntoSection > startScroll) {
                cardProgress = Math.min((scrollIntoSection - startScroll) / cardAnimationDistance, 1);
            }
            
            if (shouldHide) {
                element.style.opacity = '0';
                element.style.pointerEvents = 'none';
                return;
            }
            
            element.style.pointerEvents = 'auto';
            
            if (cardProgress === 0) {
                // Card hasn't started animating - hide it
                element.style.position = 'fixed';
                element.style.top = '100vh';
                element.style.left = '50%';
                element.style.transform = 'translate3d(-50%, 0, 0)';
                element.style.opacity = '0';
                element.style.zIndex = zIndex;
                
            } else if (cardProgress < 1) {
                // Card is animating from bottom to stack position
                const currentTop = viewportHeight - (cardProgress * (viewportHeight - stackPosition));
                
                element.style.position = 'fixed';
                element.style.top = `${currentTop}px`;
                element.style.left = '50%';
                element.style.transform = `translate3d(-50%, 0, 0)`;
                element.style.opacity = '1';
                element.style.zIndex = zIndex + 100; // Higher z-index while moving up
                
            } else {
                // Card has reached stack position - keep it there with transparency
                element.style.position = 'fixed';
                element.style.top = `${stackPosition}px`;
                element.style.left = '50%';
                element.style.transform = 'translate3d(-50%, 0, 0)';
                
                // Calculate opacity based on card position in stack
                // First card (index 0) is fully opaque, others have decreasing opacity
                const baseOpacity = 1;
                const opacityReduction = 0.15; // Each card below reduces opacity by 15%
                const calculatedOpacity = Math.max(0.3, baseOpacity - (index * opacityReduction));
                
                element.style.opacity = calculatedOpacity.toString();
                element.style.zIndex = zIndex; // Normal z-index when stacked
                
                // Add subtle scale effect for depth
                const scaleReduction = 0.02; // Each card below is slightly smaller
                const calculatedScale = Math.max(0.95, 1 - (index * scaleReduction));
                element.style.transform = `translate3d(-50%, 0, 0) scale(${calculatedScale})`;
            }
        });
    }
    
    // Optimized scroll handler with better throttling
    function handleScroll() {
        const currentScrollY = window.pageYOffset;
        
        // Only update if scroll position changed significantly
        if (Math.abs(currentScrollY - lastScrollY) < 5) {
            return;
        }
        
        lastScrollY = currentScrollY;
        
        if (!ticking) {
            requestAnimationFrame(() => {
                updateStackingCards();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Handle window resize with debouncing
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSectionBoundaries();
            if (shouldDisableStacking()) {
                resetCards();
            } else {
                updateStackingCards();
            }
        }, 100);
    }
    
    // Event listeners with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial setup
    updateSectionBoundaries();
    if (shouldDisableStacking()) {
        resetCards();
    } else {
        updateStackingCards();
    }
});

// Templates Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const templateModal = document.getElementById('templateModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
      // Template data
    const templateData = {
        portfolio: {
            name: 'Portfolio',
            description: 'Showcase your work with this elegant portfolio template. Perfect for creative professionals, designers, and freelancers.',
            image: 'img/8cce64b5f6c68e5c0202c240178ac5ba577f6377-1440x835.jpg'
        },
        event: {
            name: 'Event',
            description: 'Create stunning event websites with this dynamic template. Ideal for conferences, workshops, and special occasions.',
            image: 'img/2db849340bac150d6946cb5fb055a9e9748f7eeb-1440x8351536.jpg'
        },
        business: {
            name: 'Business',
            description: 'Professional business template perfect for corporate websites, consulting firms, and service providers.',
            image: 'img/303076a260143a13a0f12cb792a843d8817fa6bb-1440x835035.jpg'
        },
        store: {
            name: 'Store',
            description: 'Complete e-commerce solution with modern design. Perfect for online stores and retail businesses.',
            image: 'img/1360d9422620b63848dd841a8e346b58e702fec3-1440x835484.jpg'
        }
    };    
    // Modal Functionality
    function openModal(templateKey) {
        const template = templateData[templateKey];
        if (template && templateModal) {
            modalImage.src = template.image;
            modalImage.alt = template.name;
            modalTitle.textContent = template.name;
            modalDescription.textContent = template.description;
            
            templateModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Add smooth entrance animation
            setTimeout(() => {
                templateModal.style.opacity = '1';
            }, 10);
        }
    }
    
    function closeModal() {
        if (templateModal) {
            templateModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                modalImage.src = '';
            }, 300);
        }
    }
    
    // Event listeners for template cards and view buttons
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger modal if clicking the view button
            if (!e.target.closest('.view-template-btn')) {
                const templateKey = this.dataset.template;
                openModal(templateKey);
            }
        });
    });
    
    document.querySelectorAll('.view-template-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const templateKey = this.dataset.template;
            openModal(templateKey);
        });
    });
    
    // Modal close events
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && templateModal && templateModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Prevent modal content clicks from closing modal
    document.querySelector('.modal-content')?.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Debug pricing link
document.addEventListener('DOMContentLoaded', function() {
    const pricingLinks = document.querySelectorAll('a[href="pricing.html"]');
    console.log('Found pricing links:', pricingLinks.length);
    
    pricingLinks.forEach((link, index) => {
        console.log(`Pricing link ${index}:`, link);
        link.addEventListener('click', function(e) {
            console.log('Pricing link clicked!', this.href);
            // Don't prevent default - let the navigation happen
        });
    });
});