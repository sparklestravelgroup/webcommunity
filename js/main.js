/* ============================================
   SPARKLES TRAVEL GROUP — PREMIUM JS
   Maximum Pizzazz Edition ✦
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Preloader ----------
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 1000);
    });
    setTimeout(() => preloader.classList.add('hidden'), 3500);

    // ---------- Cursor Sparkle Trail ----------
    const cursor = document.getElementById('cursor-sparkle');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';

        // Spawn sparkle particles on move
        if (Math.random() > 0.85) {
            createSparkle(e.clientX, e.clientY);
        }
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX - 3 + 'px';
        cursor.style.top = cursorY - 3 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed; pointer-events: none; z-index: 9998;
            left: ${x}px; top: ${y}px;
            width: ${3 + Math.random() * 4}px;
            height: ${3 + Math.random() * 4}px;
            background: ${['#00d4aa', '#00c9ff', '#f0c27f', '#6c5ce7'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            opacity: 1;
            transition: all ${0.5 + Math.random() * 0.5}s ease-out;
        `;
        document.body.appendChild(sparkle);
        
        requestAnimationFrame(() => {
            sparkle.style.transform = `translate(${(Math.random() - 0.5) * 60}px, ${-20 - Math.random() * 40}px) scale(0)`;
            sparkle.style.opacity = '0';
        });
        
        setTimeout(() => sparkle.remove(), 1000);
    }

    // ---------- Navbar ----------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ---------- Mobile Menu ----------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ---------- Active Nav Link ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ---------- Hero Particles ----------
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = (40 + Math.random() * 60) + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (3 + Math.random() * 5) + 's';
            const colors = ['#00d4aa', '#00c9ff', '#f0c27f', '#6c5ce7', '#fc5c7d'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            const size = 2 + Math.random() * 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particlesContainer.appendChild(particle);
        }
    }

    // ---------- Animated Counter ----------
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const start = performance.now();

                const updateCounter = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const ease = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(ease * target);
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // ---------- Scroll Reveal ----------
    const revealElements = document.querySelectorAll(
        '.dest-card, .service-card, .community-feature, .testimonial-card, .value, .exp-feature, .contact-method'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Stagger based on sibling index
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children);
                const index = siblings.indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        revealObserver.observe(el);
    });

    // ---------- Tilt Effect on Destination Cards ----------
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (0.5 - y) * 8;
            const rotateY = (x - 0.5) * 8;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ---------- Booking Form ----------
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<span>Quote Requested! ✦</span><i class="fas fa-check"></i>';
                btn.style.background = '#00d4aa';
                
                // Create celebration sparkles
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const rect = btn.getBoundingClientRect();
                        createSparkle(
                            rect.left + Math.random() * rect.width,
                            rect.top + Math.random() * rect.height
                        );
                    }, i * 50);
                }

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    btn.style.background = '';
                    bookingForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ---------- Calendar Interactions ----------
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
        });
    });

    document.querySelectorAll('.calendar-day.available').forEach(day => {
        day.addEventListener('click', function() {
            document.querySelectorAll('.calendar-day.available').forEach(d => {
                d.style.background = ''; d.style.color = '';
            });
            this.style.background = '#00d4aa';
            this.style.color = 'white';
        });
    });

    // ---------- Smooth Scroll ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---------- Parallax on scroll for hero orbs ----------
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, i) => {
            const speed = 0.1 + i * 0.05;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});
