// Smooth scroll implementation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll reveal animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
};

const scrollObserver = new IntersectionObserver(revealOnScroll, observerOptions);

// Apply reveal classes to sections
document.addEventListener('DOMContentLoaded', () => {
    // About section
    const aboutSection = document.querySelector('#about');
    aboutSection.classList.add('reveal');
    scrollObserver.observe(aboutSection);

    // Projects section
    const projectsSection = document.querySelector('#projects');
    projectsSection.classList.add('reveal-fade');
    scrollObserver.observe(projectsSection);

    // Individual project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
        scrollObserver.observe(card);
    });

    // Skills section
    const skillsSection = document.querySelector('#skills');
    skillsSection.classList.add('reveal');
    scrollObserver.observe(skillsSection);

    // Individual skill categories
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.classList.add('reveal');
        category.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(category);
    });

    // Contact section
    const contactSection = document.querySelector('#contact');
    contactSection.classList.add('reveal-fade');
    scrollObserver.observe(contactSection);
});

// Mobile navigation toggle
const createMobileNav = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    if (window.innerWidth <= 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        if (!navbar.querySelector('.mobile-menu-btn')) {
            navbar.insertBefore(mobileMenuBtn, navbar.firstChild);
        }
    }
};

window.addEventListener('resize', createMobileNav);
createMobileNav();