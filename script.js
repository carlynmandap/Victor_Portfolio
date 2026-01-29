// Smooth scroll behavior enhancement
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

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission with feedback
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '> TRANSMITTING...';
        submitBtn.disabled = true;
        
        // Simulate network delay
        setTimeout(() => {
            submitBtn.textContent = '✓ MESSAGE SENT!';
            submitBtn.style.borderColor = 'var(--primary-neon)';
            submitBtn.style.color = 'var(--primary-neon)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.borderColor = 'var(--accent-neon)';
                submitBtn.style.color = 'var(--accent-neon)';
            }, 3000);
        }, 1500);
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all video cards
document.querySelectorAll('.video-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(event) {
    // ESC key to scroll to top
    if (event.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const animatedBg = document.querySelector('.animated-bg');
    
    if (hero && animatedBg) {
        const scrollPosition = window.pageYOffset;
        animatedBg.style.transform = `translate(-50%, calc(-50% + ${scrollPosition * 0.5}px))`;
    }
});

// Dynamic text color based on scroll position
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Change navbar color based on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    }
});

// Video lazy loading
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target.querySelector('video');
                if (video && !video.src) {
                    video.src = video.dataset.src;
                    video.load();
                }
            }
        });
    }, { rootMargin: '50px' });

    document.querySelectorAll('.video-container').forEach(container => {
        videoObserver.observe(container);
    });
}

// Add interactive glow effect on mouse move
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.video-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - cardCenterY, e.clientX - cardCenterX);
        const distance = Math.hypot(e.clientX - cardCenterX, e.clientY - cardCenterY);
        
        // Only apply glow if mouse is near the card
        if (distance < 300) {
            const glowIntensity = Math.max(0, 1 - distance / 300);
            card.style.boxShadow = `
                0 0 ${20 + glowIntensity * 20}px rgba(0, 255, 136, ${0.2 + glowIntensity * 0.4}),
                inset 0 0 ${20 + glowIntensity * 20}px rgba(0, 255, 136, ${0.1 * glowIntensity})
            `;
        }
    });
});

// Cursor glow effect (optional enhancement)
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid rgba(0, 255, 136, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 15 + 'px';
    cursor.style.top = e.clientY - 15 + 'px';
    cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

// Console message
console.log('%c⚡ VICTOR KING PORTFOLIO ⚡', 'color: #00ff88; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff88;');
console.log('%c[ TECHNO RETRO EXPERIENCE v2.0 ]', 'color: #00d4ff; font-size: 14px; letter-spacing: 2px;');
console.log('%cWelcome to the archive...', 'color: #b0b0b0; font-size: 12px; font-style: italic;');
