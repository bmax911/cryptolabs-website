document.addEventListener('DOMContentLoaded', function() {
    
    // --- MOBILE MENU TOGGLE ---
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    // Ensure elements exist before adding listeners
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
    
    // --- AI TYPEWRITER EFFECT ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const typewriter = new Typewriter(typewriterElement, {
            loop: true,
            delay: 75,
        });
        typewriter
            .typeString('Trade <span style="color:#67e8f9;">Smarter</span>, Not Harder.')
            .pauseFor(2000)
            .deleteAll()
            .typeString('AI-Powered <span style="color:#c084fc;">Analysis</span>.')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Your <span style="color:#67e8f9;">One-Stop</span> Trading Hub.')
            .pauseFor(2000)
            .start();
    }

    // --- HERO MOUSE PARALLAX EFFECT ---
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = heroSection;
            const x = (clientX / offsetWidth - 0.5) * -1;
            const y = (clientY / offsetHeight - 0.5) * -1;
            const parallaxElements = document.querySelectorAll('.hero-parallax');
            parallaxElements.forEach(el => {
                const depth = parseFloat(el.getAttribute('data-depth'));
                const moveX = x * (depth * 100);
                const moveY = y * (depth * 100);
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    // --- INTERACTIVE CARD GLOW EFFECT ---
    const featuresGrid = document.getElementById('features-grid');
    if (featuresGrid) {
        featuresGrid.addEventListener('mousemove', e => {
            const rect = featuresGrid.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            featuresGrid.style.setProperty('--mouse-x', `${x}px`);
            featuresGrid.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // --- CUSTOM SCROLL ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.scroll-animate');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: stop observing the element after it has animated in
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }

    // --- COOKIE CONSENT LOGIC ---
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');

    // Check if consent was already given
    if (!localStorage.getItem('cookie_consent')) {
        cookieConsent.classList.remove('hidden');
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'true');
        cookieConsent.classList.add('hidden');
    });

    declineCookies.addEventListener('click', () => {
        cookieConsent.classList.add('hidden');
    });
});