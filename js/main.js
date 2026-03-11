/**
 * Wrinkled Brain LLC — Main JavaScript
 * Handles: scroll animations, sticky nav, mobile menu, smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initStickyNav();
  initMobileMenu();
  initSmoothScroll();
});

/* ==========================================
   Scroll-Triggered Animations
   ========================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ==========================================
   Sticky Navigation
   ========================================== */
function initStickyNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Don't add scroll behavior on legal pages (already has scrolled class)
  if (document.body.classList.contains('legal-page')) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ==========================================
   Mobile Menu
   ========================================== */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================
   Smooth Scroll for Anchor Links
   ========================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.querySelector('.navbar')?.offsetHeight || 72;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
}

/* ==========================================
   Contact Form Handler
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    // Show sending state
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      Sending...
    `;
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Message Sent!
      `;

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        form.reset();
      }, 2500);
    }, 1500);
  });
}

/* Add spin animation */
const style = document.createElement('style');
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);
