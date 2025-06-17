document.addEventListener('DOMContentLoaded', function() {
    // Enhanced scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Social dimension interactions
    const socialDimensions = document.querySelectorAll('.social-dimension');
    
    socialDimensions.forEach(dimension => {
        const core = dimension.querySelector('.dimension-core');
        const atmosphere = dimension.querySelector('.dimension-atmosphere');
        const essence = dimension.querySelector('.essence-icon');
        
        // Enhanced hover interactions
        dimension.addEventListener('mouseenter', function() {
            core.style.transform = 'translateY(-20px) rotateX(5deg) scale(1.02)';
            atmosphere.style.opacity = '1';
            essence.style.transform = 'scale(1.1) rotateY(10deg)';
            
            // Add dynamic lighting effect
            const lighting = document.createElement('div');
            lighting.className = 'dynamic-lighting';
            lighting.style.cssText = `
                position: absolute;
                top: -20px;
                left: -20px;
                right: -20px;
                bottom: -20px;
                background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1), transparent 70%);
                border-radius: 50px;
                pointer-events: none;
                animation: lightingPulse 2s ease-in-out infinite;
            `;
            core.appendChild(lighting);
        });
        
        dimension.addEventListener('mouseleave', function() {
            core.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
            atmosphere.style.opacity = '0.6';
            essence.style.transform = 'scale(1) rotateY(0deg)';
            
            // Remove lighting effect
            const lighting = core.querySelector('.dynamic-lighting');
            if (lighting) {
                lighting.remove();
            }
        });
        
        // Click interactions with enhanced animations
        dimension.addEventListener('click', function(e) {
            e.preventDefault();
            
            const social = this.dataset.social;
            let url = '';
            
            switch(social) {
                case 'instagram':
                    url = 'https://www.instagram.com/phoenixrovers.mc?igsh=MW9ndnA1NDVvMjl4bA==';
                    break;
                case 'youtube':
                    url = 'https://www.youtube.com/@PhoenixRoversM.C';
                    break;
                case 'tiktok':
                    url = 'https://tiktok.com/@phoenixrovers';
                    break;
            }
            
            if (url) {
                // Create ripple effect
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: rippleExpand 0.6s ease-out;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                core.appendChild(ripple);
                
                // Scale animation
                core.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    core.style.transform = 'translateY(-20px) rotateX(5deg) scale(1.02)';
                    window.open(url, '_blank');
                    ripple.remove();
                }, 200);
            }
        });
    });
    
    // Dynamic island interactions
    const islandCore = document.querySelector('.island-core');
    const logoAvatar = document.querySelector('.logo-avatar');
    const orbitalRings = document.querySelectorAll('.orbital-ring');
    
    if (islandCore) {
        islandCore.addEventListener('mouseenter', function() {
            logoAvatar.style.transform = 'scale(1.1) rotateY(10deg)';
            orbitalRings.forEach((ring, index) => {
                ring.style.animationDuration = (8 - index * 2) + 's';
            });
        });
        
        islandCore.addEventListener('mouseleave', function() {
            logoAvatar.style.transform = 'scale(1) rotateY(0deg)';
            orbitalRings.forEach((ring, index) => {
                ring.style.animationDuration = (12 + index * 6) + 's';
            });
        });
    }
    
    // Advanced parallax with momentum
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function updateParallax() {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        // Apply to floating elements
        const ambientOrbs = document.querySelectorAll('.ambient-orb');
        ambientOrbs.forEach((orb, index) => {
            const intensity = (index + 1) * 10;
            orb.style.transform = `translate(${targetX * intensity}px, ${targetY * intensity}px)`;
        });
        
        // Apply to essence icons
        const essenceIcons = document.querySelectorAll('.essence-icon');
        essenceIcons.forEach((icon, index) => {
            const rotation = targetX * 5 + targetY * 5;
            icon.style.transform += ` rotateY(${rotation}deg)`;
        });
        
        requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add staggered animation for constellation
                if (entry.target.classList.contains('social-dimension')) {
                    const index = Array.from(socialDimensions).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe dimensions for scroll animations
    socialDimensions.forEach(dimension => {
        dimension.style.opacity = '0';
        dimension.style.transform = 'translateY(50px) scale(0.9)';
        dimension.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(dimension);
    });
    
    // Dynamic color temperature based on time
    function updateColorTemperature() {
        const hour = new Date().getHours();
        const temperature = Math.sin((hour / 24) * Math.PI * 2) * 0.1;
        
        document.documentElement.style.setProperty(
            '--dynamic-temperature', 
            `hue-rotate(${temperature * 30}deg) saturate(${1 + temperature * 0.2})`
        );
        
        // Apply to mesh gradient
        const meshGradient = document.querySelector('.mesh-gradient');
        if (meshGradient) {
            meshGradient.style.filter = `hue-rotate(${temperature * 15}deg)`;
        }
    }
    
    updateColorTemperature();
    setInterval(updateColorTemperature, 60000); // Update every minute
    
    // Touch optimizations for mobile
    if ('ontouchstart' in window) {
        socialDimensions.forEach(dimension => {
            dimension.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            dimension.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // Disable hover effects on touch devices
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) {
                .social-dimension:hover .dimension-core {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Performance optimization
    let ticking = false;
    
    function optimizeAnimations() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Pause non-visible animations
                const visibleDimensions = Array.from(socialDimensions).filter(dim => {
                    const rect = dim.getBoundingClientRect();
                    return rect.top < window.innerHeight && rect.bottom > 0;
                });
                
                socialDimensions.forEach(dim => {
                    const animations = dim.querySelectorAll('*');
                    animations.forEach(el => {
                        if (visibleDimensions.includes(dim)) {
                            el.style.animationPlayState = 'running';
                        } else {
                            el.style.animationPlayState = 'paused';
                        }
                    });
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', optimizeAnimations);
    window.addEventListener('resize', optimizeAnimations);
    
    // Add CSS animation for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleExpand {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes lightingPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        
        .dynamic-lighting {
            animation: lightingPulse 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(rippleStyle);
});