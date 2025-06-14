// Modern YouTube Channel Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initializeWebsite();
    initializeNavigation();
    initializeContactForm();
    initializeVideoGallery();
    initializeSmoothScrolling();
});

function initializeWebsite() {
    console.log('Initializing Tech Creator Channel website...');
    
    // Update dynamic content with real channel data
    updateChannelData();
    
    // Add loading animations
    addLoadingAnimations();
    
    // Initialize intersection observer for animations
    initializeScrollAnimations();
}

function updateChannelData() {
    // Update all dynamic elements with channel information
    const channelData = {
        name: 'Tech Creator Channel',
        logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=face',
        subscribers: '125K',
        description: 'Creative content creator making amazing videos!',
        url: 'https://www.youtube.com/@MATHANGOWRI'
    };
    
    // Update multiple elements with channel data
    updateElementsWithData(channelData);
}

function updateElementsWithData(data) {
    const elements = {
        'channel-name': data.name,
        'subscriber-count': data.subscribers + ' subscribers',
        'subscriber-display': data.subscribers,
        'stats-subscribers': data.subscribers,
        'channel-description': data.description,
        'about-description': data.description
    };
    
    Object.entries(elements).forEach(([id, content]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    });
    
    // Update images
    const logoElements = document.querySelectorAll('#channel-logo, #about-image');
    logoElements.forEach(img => {
        if (img) img.src = data.logo;
    });
    
    // Update links
    const linkElements = document.querySelectorAll('#subscribe-btn');
    linkElements.forEach(link => {
        if (link) link.href = data.url;
    });
}

function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', handleHeaderScroll);
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (header) {
        header.style.background = scrolled ? 
            'rgba(255, 255, 255, 0.95)' : 
            'var(--background-primary)';
        header.style.backdropFilter = scrolled ? 'blur(10px)' : 'none';
    }
}

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
    
    console.log('Contact form submitted:', data);
}

function initializeVideoGallery() {
    const loadMoreBtn = document.getElementById('load-more-videos');
    const videoGrid = document.getElementById('video-grid');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreVideos);
    }
    
    // Add click handlers to video cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', handleVideoCardClick);
    });
}

function loadMoreVideos() {
    const videoGrid = document.getElementById('video-grid');
    const loadMoreBtn = document.getElementById('load-more-videos');
    
    // Simulate loading more videos
    showNotification('Loading more videos...', 'info');
    
    setTimeout(() => {
        // Add more video cards (simulation)
        const newVideos = generateVideoCards(3);
        newVideos.forEach(video => videoGrid.appendChild(video));
        
        showNotification('More videos loaded!', 'success');
    }, 1000);
}

function generateVideoCards(count) {
    const cards = [];
    
    for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="assets/images/video-thumb-${i + 4}.jpg" alt="Video thumbnail" loading="lazy">
                <div class="video-duration">${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}</div>
            </div>
            <div class="video-info">
                <h3 class="video-title">Amazing Content Video ${i + 4}</h3>
                <p class="video-description">Check out this incredible new video!</p>
                <div class="video-meta">
                    <span class="view-count">${Math.floor(Math.random() * 100)}K views</span>
                    <span class="upload-date">${Math.floor(Math.random() * 30) + 1} days ago</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', handleVideoCardClick);
        cards.push(card);
    }
    
    return cards;
}

function handleVideoCardClick(e) {
    const videoCard = e.currentTarget;
    const videoTitle = videoCard.querySelector('.video-title').textContent;
    
    showNotification(`Opening video: ${videoTitle}`, 'info');
    
    // In a real implementation, this would open the video player or navigate to YouTube
    console.log('Video clicked:', videoTitle);
}

function initializeSmoothScrolling() {
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function addLoadingAnimations() {
    // Add fade-in animation to elements as they load
    const elements = document.querySelectorAll('.video-card, .stat-item, .hero-content');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initializeScrollAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.section-title, .video-card, .about-content, .contact-content').forEach(el => {
        observer.observe(el);
    });
}

function showNotification(message, type = 'info') {
    // Create and show notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        font-family: var(--font-primary);
        font-weight: 500;
    }
`;
document.head.appendChild(style);