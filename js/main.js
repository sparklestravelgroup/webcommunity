/* ============================================
   SPARKLES TRAVEL GROUP - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---------- Preloader ----------
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });
    // Fallback: hide preloader after 3s regardless
    setTimeout(() => preloader.classList.add('hidden'), 3000);

    // ---------- Navbar scroll effect ----------
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // ---------- Mobile menu toggle ----------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ---------- Active nav link on scroll ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
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
    };
    window.addEventListener('scroll', updateActiveLink);

    // ---------- Hero particles ----------
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = (50 + Math.random() * 50) + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            
            const colors = ['var(--teal)', 'var(--cyan)', 'var(--gold)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            
            particlesContainer.appendChild(particle);
        }
    }

    // ---------- Animated counter ----------
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ---------- Scroll reveal animations ----------
    const revealElements = document.querySelectorAll(
        '.dest-card, .service-card, .community-feature, .testimonial-card, .value, .booking-feature'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ---------- Form handling ----------
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                btn.innerHTML = '<span>Quote Requested!</span><i class="fas fa-check"></i>';
                btn.style.background = 'var(--teal)';
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    btn.style.background = '';
                    bookingForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ---------- Calendar time slot interaction ----------
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
        });
    });

    // ---------- Calendar day interaction ----------
    const calendarDays = document.querySelectorAll('.calendar-day.available');
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            calendarDays.forEach(d => d.style.background = 'rgba(0, 212, 170, 0.08)');
            day.style.background = 'var(--teal)';
            day.style.color = 'white';
        });
    });

    // ---------- Smooth scroll for anchor links ----------
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
});
