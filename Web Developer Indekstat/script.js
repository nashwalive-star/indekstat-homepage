// Scroll Progress Indicator & Back to Top
const scrollIndicator = document.getElementById('scrollIndicator');
const scrollToTopBtn = document.getElementById('scrollToTop');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.width = scrolled + "%";
    
    // Show/hide back to top button
    if (winScroll > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    
    // Navbar scroll effect
    if (winScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to Top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Modal functionality
const contactModal = document.getElementById('contactModal');
const contactButtons = document.querySelectorAll('a[href="#contact"]');
const closeModal = document.querySelector('.close-modal');

contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.getAttribute('href') === '#contact') {
            e.preventDefault();
            contactModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Add animation
            setTimeout(() => {
                contactModal.querySelector('.contact-modal-content').style.transform = 'scale(1)';
                contactModal.querySelector('.contact-modal-content').style.opacity = '1';
            }, 10);
        }
    });
});

const closeModalFunction = () => {
    const modalContent = contactModal.querySelector('.contact-modal-content');
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
};

closeModal.addEventListener('click', closeModalFunction);

window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeModalFunction();
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Simulate form submission
    setTimeout(() => {
        alert('Terima kasih! Pesan Anda telah berhasil dikirim. Tim ahli kami akan menghubungi Anda dalam waktu maksimal 24 jam untuk memberikan konsultasi lebih lanjut.');
        contactForm.reset();
        closeModalFunction();
        
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }, 2000);
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.stat-card, .feature-card, .service-card, .activity-card, .value-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-100px 0px -100px 0px'
});

sections.forEach(section => {
    navObserver.observe(section);
});

// Counter animation for statistics
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : (element.textContent.includes('+') ? '+' : ''));
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : (element.textContent.includes('+') ? '+' : ''));
        }
    }, 30);
};

// Trigger counter animation when stat numbers are visible
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            if (!target.classList.contains('animated')) {
                target.classList.add('animated');
                animateCounter(target);
            }
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// Function for smooth scrolling to sections (for feature cards)
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Mobile menu toggle (placeholder for mobile implementation)
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        // Mobile menu implementation would go here
        console.log('Mobile menu toggle clicked');
    });
}

// Initialize modal content styles
const modalContent = document.querySelector('.contact-modal-content');
if (modalContent) {
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    modalContent.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
}