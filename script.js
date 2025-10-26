// Basic interactive behavior: nav toggle, reveal on scroll, modals, simple contact mock.

document.addEventListener('DOMContentLoaded', function () {

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
    if (nav.classList.contains('open')) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
    } else {
      nav.style.display = '';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          nav.style.display = '';
          navToggle.classList.remove('open');
        }
      }
    });
  });

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.18 });
  reveals.forEach(r => obs.observe(r));

  // Modals
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(id);
      if (modal) modal.setAttribute('aria-hidden', 'false');
    });
  });
  document.querySelectorAll('[data-close], .modal').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target !== el && !el.hasAttribute('data-close')) return;
      const modal = el.closest('.modal') || el;
      if (modal) modal.setAttribute('aria-hidden', 'true');
    });
  });

  // contact form (mock send)
  const sendBtn = document.getElementById('send-btn');
  const status = document.getElementById('form-status');
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      status.textContent = 'Please fill all fields.';
      return;
    }
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = 'Message sent! I will reply soon.';
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send Message';
      document.getElementById('contact-form').reset();
    }, 900);
  });

});