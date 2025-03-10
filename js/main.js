// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Smooth cursor movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-card, .hover3d');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// Cursor click animation
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(0.5)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// Smooth animation loop
function animate() {
    // Smooth cursor movement with lerp
    cursorX = lerp(cursorX, mouseX, 0.1);
    cursorY = lerp(cursorY, mouseY, 0.1);
    
    // Smoother follower movement
    followerX = lerp(followerX, mouseX, 0.15);
    followerY = lerp(followerY, mouseY, 0.15);
    
    // Apply transforms
    cursor.style.transform = `translate3d(${cursorX - cursor.clientWidth / 2}px, ${cursorY - cursor.clientHeight / 2}px, 0)`;
    cursorFollower.style.transform = `translate3d(${followerX - cursorFollower.clientWidth / 2}px, ${followerY - cursorFollower.clientHeight / 2}px, 0)`;
    
    // Add subtle rotation based on movement
    const angle = Math.atan2(mouseY - cursorY, mouseX - cursorX) * 180 / Math.PI;
    cursor.style.transform += ` rotate(${angle}deg)`;
    
    requestAnimationFrame(animate);
}

// Linear interpolation function
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Start animation loop
animate();

// Add magnetic effect to buttons with cursor interaction
document.querySelectorAll('.cta-button, .service-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Move button
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        
        // Scale cursor
        cursor.style.transform = `translate3d(${cursorX - cursor.clientWidth / 2}px, ${cursorY - cursor.clientHeight / 2}px, 0) scale(1.5)`;
        cursorFollower.style.transform = `translate3d(${followerX - cursorFollower.clientWidth / 2}px, ${followerY - cursorFollower.clientHeight / 2}px, 0) scale(0.5)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const fullMenu = document.querySelector('.full-menu');
const hamburger = document.querySelector('.hamburger');
const menuItems = document.querySelectorAll('.menu-items li');

menuToggle.addEventListener('click', () => {
    fullMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = fullMenu.classList.contains('active') ? 'hidden' : '';
    
    // Animate menu items
    if (fullMenu.classList.contains('active')) {
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    } else {
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
    }
});

// Close menu when clicking menu items
document.querySelectorAll('.menu-items a').forEach(item => {
    item.addEventListener('click', () => {
        fullMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
        
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
    });
});

// Close menu when clicking outside
fullMenu.addEventListener('click', (e) => {
    if (e.target === fullMenu) {
        fullMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from('.hero-text .line', {
    opacity: 1,
    y: 30,
    duration: 1,
    stagger: 0.3,
    ease: 'power3.out'
});

gsap.from('.hero-text p', {
    opacity: 1,
    y: 20,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out'
});

gsap.from('.feature', {
    opacity: 1,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    delay: 1,
    ease: 'power3.out'
});

gsap.from('.cta-container', {
    opacity: 1,
    y: 20,
    duration: 0.8,
    delay: 1.4,
    ease: 'power3.out'
});

gsap.from('.hero-image', {
    opacity: 0,
    x: 50,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
});

gsap.from('.badge', {
    opacity: 1,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    delay: 1.6,
    ease: 'power3.out'
});

// Service Cards Animation
gsap.utils.toArray('.service-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        fullMenu.classList.remove('active');
        hamburger.classList.remove('active');

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax Effect
document.addEventListener('mousemove', parallax);

function parallax(e) {
    document.querySelectorAll('.parallax').forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// Parallax effect for shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach(shape => {
        const speed = shape.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// About Section Animations
gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about-text',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    gsap.to(stat, {
        scrollTrigger: {
            trigger: stat,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        textContent: target,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        stagger: {
            each: 0.2
        }
    });
});

// Feature Items Animation
gsap.from('.feature-item', {
    scrollTrigger: {
        trigger: '.features-grid',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Service Section Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const serviceCards = document.querySelectorAll('.service-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Animate cards
        serviceCards.forEach(card => {
            if (category === card.dataset.category) {
                card.style.display = 'block';
                gsap.from(card, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Service Cards Animation
serviceCards.forEach(card => {
    const listItems = card.querySelectorAll('.service-list li');
    
    card.addEventListener('mouseenter', () => {
        listItems.forEach((item, index) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                delay: index * 0.1
            });
        });
    });
    
    card.addEventListener('mouseleave', () => {
        listItems.forEach(item => {
            gsap.to(item, {
                opacity: 0,
                y: 20,
                duration: 0.3
            });
        });
    });
});

// Prevent menu popup on long press
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

// Enhanced Testimonial Functionality
const track = document.querySelector('.testimonial-track');
const cards = document.querySelectorAll('.testimonial-card');
let isScrolling = false;
let startX;
let scrollLeft;
let momentumID;
let velocity = 0;
const friction = 0.95;
const springiness = 0.2;

function activateCard(card) {
    // Remove active class from all cards
    cards.forEach(c => c.classList.remove('active'));
    // Add active class to current card
    card.classList.add('active');
}

function updateCardsOpacity() {
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;

    cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerX - cardCenterX);
        const maxDistance = trackRect.width / 2;
        const opacity = 1 - (distance / maxDistance) * 0.5;
        const scale = 0.95 + (1 - distance / maxDistance) * 0.07;

        card.style.opacity = Math.max(0.5, opacity);
        card.style.transform = `scale(${scale})`;
    });
}

function applyMomentum() {
    if (Math.abs(velocity) > 0.1) {
        track.classList.add('smooth-scroll');
        track.scrollLeft += velocity;
        velocity *= friction;
        updateCardsOpacity();
        momentumID = requestAnimationFrame(applyMomentum);
    } else {
        track.classList.remove('smooth-scroll');
        snapToClosestCard();
    }
}

function snapToClosestCard() {
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;
    let closestCard = null;
    let minDistance = Infinity;

    cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerX - cardCenterX);

        if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
        }
    });

    if (closestCard) {
        track.classList.add('smooth-scroll');
        const targetScroll = closestCard.offsetLeft - (track.offsetWidth - closestCard.offsetWidth) / 2;
        track.scrollLeft = targetScroll;
        activateCard(closestCard);
        setTimeout(() => track.classList.remove('smooth-scroll'), 600);
    }
}

// Touch and Mouse Event Handlers
track.addEventListener('mousedown', (e) => {
    isScrolling = true;
    track.classList.remove('smooth-scroll');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    cancelAnimationFrame(momentumID);
    
    track.dataset.lastX = e.pageX;
    track.dataset.lastTime = Date.now();
});

track.addEventListener('mousemove', (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
    
    const now = Date.now();
    const dt = now - track.dataset.lastTime;
    const dx = e.pageX - track.dataset.lastX;
    velocity = dx / dt * 20;
    
    track.dataset.lastX = e.pageX;
    track.dataset.lastTime = now;
    
    updateCardsOpacity();
});

track.addEventListener('mouseup', () => {
    isScrolling = false;
    momentumID = requestAnimationFrame(applyMomentum);
});

track.addEventListener('mouseleave', () => {
    if (isScrolling) {
        isScrolling = false;
        momentumID = requestAnimationFrame(applyMomentum);
    }
});

// Touch Events
track.addEventListener('touchstart', (e) => {
    isScrolling = true;
    track.classList.remove('smooth-scroll');
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    
    track.dataset.lastX = e.touches[0].pageX;
    track.dataset.lastTime = Date.now();
});

track.addEventListener('touchmove', (e) => {
    if (!isScrolling) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
    
    const now = Date.now();
    const dt = now - track.dataset.lastTime;
    const dx = e.touches[0].pageX - track.dataset.lastX;
    velocity = dx / dt * 20;
    
    track.dataset.lastX = e.touches[0].pageX;
    track.dataset.lastTime = now;
    
    updateCardsOpacity();
});

track.addEventListener('touchend', () => {
    isScrolling = false;
    momentumID = requestAnimationFrame(applyMomentum);
});

// Initialize
updateCardsOpacity();
// Activate first card
activateCard(cards[0]);

// Update on scroll
// track.addEventListener('scroll', () => {
//     if (!isScrolling) {
//         updateCardsOpacity();
//     }
// }); 


// new
// Add particle animation
function createParticles() {
    const particles = document.querySelector('.particles');
    const numberOfParticles = 20;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particles.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Add scroll reveal animation for contact items
gsap.from('.info-item', {
    scrollTrigger: {
        trigger: '.contact-info',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Enhanced hours item animation
const hoursItem = document.querySelector('.hours-item');

// Add hover effect for depth
hoursItem.addEventListener('mousemove', (e) => {
    const rect = hoursItem.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    hoursItem.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
});

// Reset transform on mouse leave
hoursItem.addEventListener('mouseleave', () => {
    hoursItem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
});

// Add scroll trigger animation for hours item
gsap.from('.hours-item', {
    scrollTrigger: {
        trigger: '.hours-item',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
});


// new

// Add scroll event listener for navigation background


document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        console.log("Scrolling detected");
    });
});