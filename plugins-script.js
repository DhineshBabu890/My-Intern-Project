// Plugins Marketplace Interactive JavaScript
// Sample plugin data
const pluginsData = [
    {
        id: 1,
        name: "Advanced Analytics Pro",
        description: "Get deep insights into your store performance with advanced analytics, custom reports, and real-time tracking.",
        category: "analytics",
        price: 2999,
        rating: 4.8,
        downloads: 15420,
        icon: "📊",
        tags: ["analytics", "reports", "dashboard"],
        features: ["Real-time tracking", "Custom reports", "Revenue analytics", "Customer insights"],
        isFeatured: true,
        isPopular: true
    },
    {
        id: 2,
        name: "Social Media Manager",
        description: "Manage all your social media accounts from one place. Schedule posts, track engagement, and grow your audience.",
        category: "social",
        price: 1999,
        rating: 4.6,
        downloads: 12350,
        icon: "📱",
        tags: ["social media", "marketing", "automation"],
        features: ["Multi-platform posting", "Engagement tracking", "Content calendar", "Auto-posting"],
        isFeatured: false,
        isPopular: true
    },
    {
        id: 3,
        name: "Payment Gateway Plus",
        description: "Accept payments through multiple gateways with advanced security and fraud protection.",
        category: "payments",
        price: 0,
        rating: 4.9,
        downloads: 28750,
        icon: "💳",
        tags: ["payments", "security", "gateway"],
        features: ["Multiple gateways", "Fraud protection", "Recurring payments", "Mobile payments"],
        isFeatured: true,
        isPopular: true
    },
    {
        id: 4,
        name: "Email Marketing Suite",
        description: "Create beautiful email campaigns, automate sequences, and track performance with detailed analytics.",
        category: "marketing",
        price: 3499,
        rating: 4.7,
        downloads: 9850,
        icon: "📧",
        tags: ["email", "marketing", "automation"],
        features: ["Email templates", "Automation", "A/B testing", "Analytics"],
        isFeatured: false,
        isPopular: false
    },
    {
        id: 5,
        name: "Smart Inventory Manager",
        description: "Manage your inventory with AI-powered forecasting, automated reordering, and real-time tracking.",
        category: "inventory",
        price: 2499,
        rating: 4.5,
        downloads: 7200,
        icon: "📦",
        tags: ["inventory", "AI", "automation"],
        features: ["AI forecasting", "Auto-reordering", "Real-time tracking", "Multi-location"],
        isFeatured: false,
        isPopular: false
    },
    {
        id: 6,
        name: "SEO Optimizer Pro",
        description: "Boost your search rankings with advanced SEO tools, keyword tracking, and competitor analysis.",
        category: "seo",
        price: 1899,
        rating: 4.4,
        downloads: 11500,
        icon: "🎯",
        tags: ["SEO", "optimization", "keywords"],
        features: ["Keyword tracking", "Competitor analysis", "Site audit", "Meta optimization"],
        isFeatured: false,
        isPopular: true
    },
    {
        id: 7,
        name: "Customer Support Chat",
        description: "Provide instant support with live chat, chatbots, and ticket management system.",
        category: "customer",
        price: 0,
        rating: 4.6,
        downloads: 18920,
        icon: "👥",
        tags: ["support", "chat", "tickets"],
        features: ["Live chat", "Chatbots", "Ticket system", "Knowledge base"],
        isFeatured: true,
        isPopular: true
    },
    {
        id: 8,
        name: "Shipping Calculator",
        description: "Calculate accurate shipping costs with multiple carriers, real-time rates, and delivery tracking.",
        category: "shipping",
        price: 1299,
        rating: 4.3,
        downloads: 6850,
        icon: "🚚",
        tags: ["shipping", "calculator", "tracking"],
        features: ["Multi-carrier", "Real-time rates", "Tracking", "Label printing"],
        isFeatured: false,
        isPopular: false
    },
    {
        id: 9,
        name: "Review Management",
        description: "Collect, manage, and display customer reviews with automated follow-ups and sentiment analysis.",
        category: "marketing",
        price: 1599,
        rating: 4.7,
        downloads: 8300,
        icon: "⭐",
        tags: ["reviews", "feedback", "marketing"],
        features: ["Review collection", "Automated follow-ups", "Sentiment analysis", "Review widgets"],
        isFeatured: false,
        isPopular: false
    },
    {
        id: 10,
        name: "Multi-Currency Support",
        description: "Sell globally with automatic currency conversion, localized pricing, and geo-targeting.",
        category: "payments",
        price: 999,
        rating: 4.5,
        downloads: 12750,
        icon: "💰",
        tags: ["currency", "global", "localization"],
        features: ["Auto conversion", "Geo-targeting", "Localized pricing", "Multiple currencies"],
        isFeatured: false,
        isPopular: true
    },
    {
        id: 11,
        name: "Loyalty Program Manager",
        description: "Build customer loyalty with points, rewards, referrals, and gamification features.",
        category: "marketing",
        price: 2199,
        rating: 4.6,
        downloads: 5200,
        icon: "🎁",
        tags: ["loyalty", "rewards", "gamification"],
        features: ["Points system", "Rewards catalog", "Referral program", "Gamification"],
        isFeatured: false,
        isPopular: false
    },
    {
        id: 12,
        name: "Advanced Search & Filter",
        description: "Enhance your store search with AI-powered suggestions, filters, and autocomplete.",
        category: "seo",
        price: 1799,
        rating: 4.4,
        downloads: 9100,
        icon: "🔍",
        tags: ["search", "filter", "AI"],
        features: ["AI suggestions", "Advanced filters", "Autocomplete", "Search analytics"],
        isFeatured: false,
        isPopular: false
    }
];

// Global variables
let currentPlugins = [...pluginsData];
let currentCategory = 'all';
let currentSort = 'featured';
let currentPage = 1;
let pluginsPerPage = 9;
let isLoading = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after initialization
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);

    // Initialize all components
    initThemeToggle();
    initSearch();
    initFilters();
    initPluginGrid();
    initModal();
    initMobileMenu();
    initAnimations();
    initNewsletterForm();
    
    // Initial render
    renderPlugins();
    updateResultsCount();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = savedTheme + '-theme';
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.className = newTheme + '-theme';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length > 0) {
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(query);
            }, 300);
        } else {
            hideSearchSuggestions();
            currentPlugins = [...pluginsData];
            renderPlugins();
        }
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
            hideSearchSuggestions();
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            hideSearchSuggestions();
        }
    });
}

function showSearchSuggestions(query) {
    const suggestions = document.getElementById('searchSuggestions');
    const matches = pluginsData.filter(plugin => 
        plugin.name.toLowerCase().includes(query) ||
        plugin.description.toLowerCase().includes(query) ||
        plugin.tags.some(tag => tag.toLowerCase().includes(query))
    ).slice(0, 5);
    
    if (matches.length > 0) {
        suggestions.innerHTML = matches.map(plugin => `
            <div class="suggestion-item" onclick="selectSuggestion('${plugin.name}')">
                <strong>${plugin.name}</strong>
                <div style="font-size: 0.875rem; color: var(--text-light);">${plugin.description.substring(0, 60)}...</div>
            </div>
        `).join('');
        suggestions.style.display = 'block';
    } else {
        hideSearchSuggestions();
    }
}

function hideSearchSuggestions() {
    document.getElementById('searchSuggestions').style.display = 'none';
}

function selectSuggestion(pluginName) {
    document.getElementById('searchInput').value = pluginName;
    performSearch(pluginName);
    hideSearchSuggestions();
}

function performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
        currentPlugins = [...pluginsData];
    } else {
        currentPlugins = pluginsData.filter(plugin => 
            plugin.name.toLowerCase().includes(searchTerm) ||
            plugin.description.toLowerCase().includes(searchTerm) ||
            plugin.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            plugin.category.toLowerCase().includes(searchTerm)
        );
    }
    
    renderPlugins();
    updateResultsCount();
}

// Filter Functionality
function initFilters() {
    // Category filters
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            applyFilters();
        });
    });
    
    // Price filters
    const priceInputs = document.querySelectorAll('input[name="price"]');
    priceInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });
    
    // Rating filters
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });
    
    // Sort functionality
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        applySort();
    });
}

function applyFilters() {
    let filtered = [...pluginsData];
    
    // Apply category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(plugin => plugin.category === currentCategory);
    }
    
    // Apply price filter
    const priceFilter = document.querySelector('input[name="price"]:checked').value;
    if (priceFilter === 'free') {
        filtered = filtered.filter(plugin => plugin.price === 0);
    } else if (priceFilter === 'paid') {
        filtered = filtered.filter(plugin => plugin.price > 0);
    }
    
    // Apply rating filter
    const ratingFilter = document.querySelector('input[name="rating"]:checked').value;
    if (ratingFilter !== 'all') {
        filtered = filtered.filter(plugin => plugin.rating >= parseFloat(ratingFilter));
    }
    
    // Apply search if exists
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    if (searchQuery) {
        filtered = filtered.filter(plugin => 
            plugin.name.toLowerCase().includes(searchQuery) ||
            plugin.description.toLowerCase().includes(searchQuery) ||
            plugin.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
    }
    
    currentPlugins = filtered;
    applySort();
    updateResultsCount();
}

function applySort() {
    switch (currentSort) {
        case 'popular':
            currentPlugins.sort((a, b) => b.downloads - a.downloads);
            break;
        case 'newest':
            currentPlugins.sort((a, b) => b.id - a.id);
            break;
        case 'rating':
            currentPlugins.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            currentPlugins.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentPlugins.sort((a, b) => b.price - a.price);
            break;
        case 'featured':
        default:
            currentPlugins.sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                if (a.isPopular && !b.isPopular) return -1;
                if (!a.isPopular && b.isPopular) return 1;
                return b.rating - a.rating;
            });
            break;
    }
    
    renderPlugins();
}

// Plugin Grid Rendering
function initPluginGrid() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', loadMorePlugins);
}

function renderPlugins() {
    const grid = document.getElementById('pluginsGrid');
    const startIndex = 0;
    const endIndex = Math.min(currentPage * pluginsPerPage, currentPlugins.length);
    const pluginsToShow = currentPlugins.slice(startIndex, endIndex);
    
    grid.innerHTML = pluginsToShow.map(plugin => createPluginCard(plugin)).join('');
    
    // Update load more button
    updateLoadMoreButton();
    
    // Add animations
    animatePluginCards();
}

function createPluginCard(plugin) {
    const formattedPrice = plugin.price === 0 ? 'Free' : `₹${plugin.price.toLocaleString()}`;
    const priceClass = plugin.price === 0 ? 'free' : '';
    
    return `
        <div class="plugin-card" data-plugin-id="${plugin.id}">
            <div class="plugin-header">
                <div class="plugin-icon">${plugin.icon}</div>
                <h3 class="plugin-title">${plugin.name}</h3>
                <p class="plugin-description">${plugin.description}</p>
                <div class="plugin-tags">
                    ${plugin.tags.map(tag => `<span class="plugin-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="plugin-body">
                <div class="plugin-stats">
                    <div class="plugin-rating">
                        ${generateStars(plugin.rating)}
                        <span class="rating-text">(${plugin.rating})</span>
                    </div>
                    <div class="plugin-downloads">
                        <i class="fas fa-download"></i> ${plugin.downloads.toLocaleString()}
                    </div>
                </div>
                <div class="plugin-price ${priceClass}">${formattedPrice}</div>
                <div class="plugin-actions">
                    <button class="btn-install" onclick="installPlugin(${plugin.id})">
                        <i class="fas fa-download"></i> Install
                    </button>
                    <button class="btn-preview" onclick="showPluginDetails(${plugin.id})">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star empty"></i>';
    }
    
    return stars;
}

function loadMorePlugins() {
    if (isLoading) return;
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadText = loadMoreBtn.querySelector('.load-text');
    const loadSpinner = loadMoreBtn.querySelector('.load-spinner');
    
    isLoading = true;
    loadText.style.display = 'none';
    loadSpinner.classList.remove('hidden');
    
    // Simulate loading delay
    setTimeout(() => {
        currentPage++;
        renderPlugins();
        
        isLoading = false;
        loadText.style.display = 'inline';
        loadSpinner.classList.add('hidden');
    }, 1000);
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hasMore = currentPage * pluginsPerPage < currentPlugins.length;
    
    if (hasMore) {
        loadMoreBtn.style.display = 'inline-flex';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

function updateResultsCount() {
    const count = currentPlugins.length;
    const resultsText = count === 1 ? 'plugin found' : 'plugins found';
    document.getElementById('resultsCount').textContent = `${count} ${resultsText}`;
}

// Plugin Actions
function installPlugin(pluginId) {
    const plugin = pluginsData.find(p => p.id === pluginId);
    
    // Show loading state
    const installBtn = event.target.closest('.btn-install');
    const originalText = installBtn.innerHTML;
    installBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Installing...';
    installBtn.disabled = true;
    
    // Simulate installation
    setTimeout(() => {
        installBtn.innerHTML = '<i class="fas fa-check"></i> Installed';
        installBtn.style.background = 'var(--success-color)';
        
        // Show success message
        showNotification(`${plugin.name} installed successfully!`, 'success');
        
        // Reset after delay
        setTimeout(() => {
            installBtn.innerHTML = originalText;
            installBtn.disabled = false;
            installBtn.style.background = '';
        }, 2000);
    }, 1500);
}

function showPluginDetails(pluginId) {
    const plugin = pluginsData.find(p => p.id === pluginId);
    const modal = document.getElementById('pluginModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = plugin.name;
    modalBody.innerHTML = `
        <div class="plugin-detail-content">
            <div class="plugin-detail-header">
                <div class="plugin-icon large">${plugin.icon}</div>
                <div class="plugin-detail-info">
                    <h3>${plugin.name}</h3>
                    <p>${plugin.description}</p>
                    <div class="plugin-stats">
                        <div class="plugin-rating">
                            ${generateStars(plugin.rating)}
                            <span class="rating-text">(${plugin.rating})</span>
                        </div>
                        <div class="plugin-downloads">
                            <i class="fas fa-download"></i> ${plugin.downloads.toLocaleString()} downloads
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="plugin-features">
                <h4>Key Features</h4>
                <ul>
                    ${plugin.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="plugin-pricing">
                <div class="price-info">
                    <span class="price">${plugin.price === 0 ? 'Free' : `₹${plugin.price.toLocaleString()}`}</span>
                    ${plugin.price > 0 ? '<span class="price-note">One-time purchase</span>' : ''}
                </div>
                <button class="btn-install" onclick="installPlugin(${plugin.id})">
                    <i class="fas fa-download"></i> Install Plugin
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('pluginModal');
    const modalClose = document.getElementById('modalClose');
    
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function closeModal() {
    document.getElementById('pluginModal').classList.remove('active');
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const sidebar = document.querySelector('.plugins-sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !mobileFilterBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// Animations
function initAnimations() {
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

function initGSAPAnimations() {
    // Hero section animation
    gsap.timeline()
        .from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.search-container', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-stats .stat-item', {
            duration: 1,
            y: 20,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.3');
    
    // Sidebar animation
    gsap.from('.plugins-sidebar', {
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.plugins-main',
            start: 'top 80%'
        }
    });
}

function animatePluginCards() {
    const cards = document.querySelectorAll('.plugin-card');
    
    if (typeof gsap !== 'undefined') {
        gsap.from(cards, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out'
        });
    } else {
        // Fallback CSS animation
        cards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.6s ease forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show loading state
                newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                newsletterBtn.disabled = true;
                
                // Simulate subscription
                setTimeout(() => {
                    newsletterBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                    newsletterInput.value = '';
                    showNotification('Successfully subscribed to newsletter!', 'success');
                    
                    // Reset button
                    setTimeout(() => {
                        newsletterBtn.innerHTML = 'Subscribe';
                        newsletterBtn.disabled = false;
                    }, 2000);
                }, 1000);
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        color: var(--text-color);
        padding: 1rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        max-width: 400px;
        border-left: 4px solid ${getNotificationColor(type)};
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'var(--success-color)';
        case 'error': return 'var(--error-color)';
        case 'warning': return 'var(--warning-color)';
        default: return 'var(--info-color)';
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const optimizedScroll = debounce(() => {
    // Scroll-based animations
}, 16);

window.addEventListener('scroll', optimizedScroll);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .plugin-detail-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .plugin-detail-header {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
    }
    
    .plugin-icon.large {
        width: 80px;
        height: 80px;
        font-size: 2.5rem;
        flex-shrink: 0;
    }
    
    .plugin-detail-info h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    .plugin-features h4 {
        margin-bottom: 1rem;
        font-size: 1.25rem;
    }
    
    .plugin-features ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .plugin-features li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .plugin-features li i {
        color: var(--success-color);
    }
    
    .plugin-pricing {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: var(--secondary-color);
        border-radius: var(--radius);
    }
    
    .price-info .price {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
    }
    
    .price-info .price-note {
        display: block;
        font-size: 0.875rem;
        color: var(--text-light);
    }
    
    .notification {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-light);
        padding: 0.25rem;
    }
`;

document.head.appendChild(style);

// Console welcome message
console.log('%c🚀 Asraaz Plugins Marketplace Loaded Successfully!', 'color: #FFD700; font-size: 16px; font-weight: bold;');
console.log('%c📦 Total Plugins Available:', 'color: #333; font-weight: bold;', pluginsData.length);
