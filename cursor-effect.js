document.addEventListener('DOMContentLoaded', () => {
    // Only initialize custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    // 1. Custom Cursor Elements
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    // Listen to mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    // Animation loop for the trailing ring
    function render() {
        // Interpolation (spring effect) for the ring
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // Hover effects on interactables
    const interactables = document.querySelectorAll('a, button, input, select, .custom-select-trigger, .tab-btn, .plan-card, .feature-card, .mission-card');
    
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('hover');
            dot.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('hover');
            dot.classList.remove('hover');
        });
    });

    // Handle cursor leaving the window bounds
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        }
    });

    document.addEventListener('mouseover', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });

    // 2. Spotlight Glow Effect for Feature and Plan Cards
    const cards = document.querySelectorAll('.feature-card, .plan-card, .mission-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS variables for the spotlight pseudo-element
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
