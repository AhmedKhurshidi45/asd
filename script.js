document.addEventListener('DOMContentLoaded', () => {
    // Page Loader
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        // Hide loader immediately
        pageLoader.classList.add('hidden');
        pageLoader.style.display = 'none';
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Add transition class before changing theme
        document.documentElement.classList.add('theme-transition');
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        if (navCta) {
            navCta.classList.toggle('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                if (navCta) {
                    navCta.classList.remove('active');
                }
            }
        });
    });

    // Server status indicator
    const updateServerStatus = () => {
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            // Simulate server check - replace with actual server status check
            const isOnline = Math.random() > 0.1; // 90% chance of being online for demo
            statusDot.className = `status-dot ${isOnline ? 'online' : 'offline'}`;
            statusDot.setAttribute('data-tooltip', `Server is ${isOnline ? 'Online' : 'Offline'}`);
        }
    };

    // Update server status every 30 seconds
    updateServerStatus();
    setInterval(updateServerStatus, 30000);

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.reveal, .feature-card, .plan-card, .stat-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial animation state
    document.querySelectorAll('.reveal, .feature-card, .plan-card, .stat-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();

    // Update stats counters
    const updateStats = () => {
        document.querySelectorAll('.stat-number span[data-target]').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.textContent) || 0;
            // Slower increment (changed from 20 to 50 for smoother animation)
            const increment = target / 50;
            
            if (current < target) {
                stat.textContent = Math.ceil(current + increment);
                // Increased timeout from 50ms to 100ms for slower animation
                setTimeout(() => updateStats(), 100);
            } else {
                stat.textContent = target;
            }
        });
    };

    // Start stats animation when in view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateStats();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(statsSection);
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }
}); 
