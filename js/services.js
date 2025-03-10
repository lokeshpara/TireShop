// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Text Animation
const heroText = document.querySelector('.service-hero h1');
gsap.to(heroText, {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    duration: 1,
    ease: 'power4.out',
    delay: 0.5
});

// Service List Items Animation
document.querySelectorAll('.service-list li').forEach((item, index) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Timeline Animation
document.querySelectorAll('.timeline-content').forEach((item, index) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
    });
});

// 3D Hover Effect for Feature Cards
document.querySelectorAll('.hover3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = (x - rect.width / 2) / 10;
        const yc = (y - rect.height / 2) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${-yc}deg) rotateY(${xc}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Magnetic Effect for Service Buttons
document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
}); 