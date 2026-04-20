/* ============================================
   SPARKLES TRAVEL GROUP — FUTURISTIC JS
   Sleek • Modern • Sci-Fi • Premium
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Preloader ──
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => setTimeout(() => preloader.classList.add('hidden'), 1200));
    setTimeout(() => preloader.classList.add('hidden'), 4000);

    // ── Cursor Glow (desktop only) ──
    const glow = document.getElementById('cursor-glow');
    if (window.innerWidth > 768) {
        let mx = 0, my = 0, gx = 0, gy = 0;
        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            glow.style.opacity = '1';
        });
        document.addEventListener('mouseleave', () => glow.style.opacity = '0');
        (function animGlow() {
            gx += (mx - gx) * 0.08;
            gy += (my - gy) * 0.08;
            glow.style.left = gx + 'px';
            glow.style.top = gy + 'px';
            requestAnimationFrame(animGlow);
        })();
    }

    // ── Typing Effect ──
    const typedEl = document.getElementById('typed-text');
    const words = ['Your Imagination', 'Ordinary', 'Boundaries', 'Expectations'];
    let wordIdx = 0, charIdx = 0, deleting = false;

    function typeLoop() {
        const current = words[wordIdx];
        if (!deleting) {
            typedEl.textContent = current.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                setTimeout(() => { deleting = true; typeLoop(); }, 2200);
                return;
            }
            setTimeout(typeLoop, 70 + Math.random() * 40);
        } else {
            typedEl.textContent = current.slice(0, charIdx);
            charIdx--;
            if (charIdx < 0) {
                deleting = false;
                charIdx = 0;
                wordIdx = (wordIdx + 1) % words.length;
                setTimeout(typeLoop, 400);
                return;
            }
            setTimeout(typeLoop, 35);
        }
    }
    typeLoop();

    // ── Navbar ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── Mobile Menu ──
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(l => {
        l.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    // ── Active Nav ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        const y = window.scrollY + 120;
        sections.forEach(s => {
            if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
                navLinks.forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === `#${s.id}`);
                });
            }
        });
    });

    // ── Hero Particles ──
    const pc = document.getElementById('particles');
    if (pc) {
        const colors = ['#00ffcc', '#00d4ff', '#8b5cf6', '#ffb347', '#ff4d8d'];
        for (let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            const size = 1.5 + Math.random() * 3;
            Object.assign(p.style, {
                left: Math.random() * 100 + '%',
                top: (30 + Math.random() * 70) + '%',
                width: size + 'px', height: size + 'px',
                background: colors[Math.floor(Math.random() * colors.length)],
                animationDelay: Math.random() * 6 + 's',
                animationDuration: (3 + Math.random() * 4) + 's',
                boxShadow: `0 0 ${4 + Math.random() * 8}px currentColor`
            });
            pc.appendChild(p);
        }
    }

    // ── Counter Animation ──
    const counters = document.querySelectorAll('.stat-number');
    const cObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target, target = +el.dataset.count, start = performance.now();
            (function update(now) {
                const p = Math.min((now - start) / 2000, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.floor(ease * target);
                if (p < 1) requestAnimationFrame(update);
                else el.textContent = target;
            })(start);
            cObs.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));

    // ── Scroll Reveal ──
    const revealEls = document.querySelectorAll(
        '.dest-card, .service-card, .community-card, .testimonial-card, .value-item, .exp-feature, .contact-card, .stat-card'
    );
    const rObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const siblings = Array.from(e.target.parentElement.children);
            const idx = siblings.indexOf(e.target);
            setTimeout(() => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }, idx * 80);
            rObs.unobserve(e.target);
        });
    }, { threshold: 0.06 });
    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        rObs.observe(el);
    });

    // ── Holographic Shine (mouse tracking) ──
    document.querySelectorAll('.holo-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const shine = card.querySelector('.holo-shine');
            if (shine) {
                shine.style.animation = 'none';
                shine.style.background = `linear-gradient(
                    105deg,
                    transparent ${x - 15}%,
                    rgba(0,255,204,0.06) ${x - 5}%,
                    rgba(0,212,255,0.06) ${x}%,
                    rgba(139,92,246,0.04) ${x + 5}%,
                    transparent ${x + 15}%
                )`;
            }
        });
        card.addEventListener('mouseleave', e => {
            const shine = card.querySelector('.holo-shine');
            if (shine) {
                shine.style.background = '';
                shine.style.animation = '';
            }
        });
    });

    // ── Booking Form ──
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = '<span>SENDING...</span><i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = '<span>QUOTE REQUESTED ✦</span><i class="fas fa-check"></i>';
                btn.style.boxShadow = '0 0 40px rgba(0,255,204,0.5)';
                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.disabled = false;
                    btn.style.boxShadow = '';
                    bookingForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ── Calendar Slots ──
    document.querySelectorAll('.time-slot').forEach(s => {
        s.addEventListener('click', () => {
            document.querySelectorAll('.time-slot').forEach(x => x.classList.remove('active'));
            s.classList.add('active');
        });
    });
    document.querySelectorAll('.calendar-day.available').forEach(d => {
        d.addEventListener('click', function() {
            document.querySelectorAll('.calendar-day.available').forEach(x => {
                x.style.background = ''; x.style.color = '';
            });
            this.style.background = '#00ffcc';
            this.style.color = '#050510';
        });
    });

    // ── Smooth Scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
        });
    });

    // ── Parallax grid lines ──
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay) {
        window.addEventListener('scroll', () => {
            gridOverlay.style.transform = `translateY(${window.scrollY * 0.15}px)`;
        });
    }
});
