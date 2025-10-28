// Basic interactive behavior: nav toggle, reveal on scroll, modals, simple contact mock.

document.addEventListener('DOMContentLoaded', function () {

  // 1. Set the current year in the footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // 2. Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (navToggle && nav) {
      navToggle.addEventListener('click', () => {
          // CSS classes 'open' handle the display and animation for mobile menu
          nav.classList.toggle('open');
          navToggle.classList.toggle('open');
      });
  }

  // 3. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Close nav after clicking a link on mobile
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          if (navToggle) navToggle.classList.remove('open');
        }
      }
    });
  });

  // 4. Reveal on scroll using IntersectionObserver (for the .reveal class)
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        // Stop observing once visible to prevent re-triggering
        obs.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.18 });
  reveals.forEach(r => obs.observe(r));

  // 5. Modal / Popup handling
  // Open modal
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(id);
      if (modal) modal.setAttribute('aria-hidden', 'false');
    });
  });
  // Close modal (via close button or clicking outside)
  document.querySelectorAll('[data-close], .modal').forEach(el => {
    el.addEventListener('click', (e) => {
      // Check if the click is directly on the modal backdrop or the close button/icon
      if (e.target.closest('.modal-body') && !e.target.closest('[data-close]') && e.target !== el) return;
      
      const modal = el.closest('.modal') || el;
      if (modal) modal.setAttribute('aria-hidden', 'true');
    });
  });

  // 6. Contact form (mock send functionality)
  const sendBtn = document.getElementById('send-btn');
  const status = document.getElementById('form-status');
  const contactForm = document.getElementById('contact-form');

  if (sendBtn && status && contactForm) {
      sendBtn.addEventListener('click', () => {
          // Simple validation check
          const name = document.getElementById('name').value.trim();
          const email = document.getElementById('email').value.trim();
          const message = document.getElementById('message').value.trim();

          if (!name || !email || !message) {
              status.textContent = 'Please fill all fields.';
              status.style.color = 'red';
              return;
          }

          sendBtn.disabled = true;
          sendBtn.textContent = 'Sending...';

          // Simulate network request delay
          setTimeout(() => {
              status.textContent = 'Message sent! I will reply soon.';
              status.style.color = 'var(--accent2)'; // Use neon green for success
              
              sendBtn.disabled = false;
              sendBtn.textContent = 'Send Message';
              contactForm.reset();
              
              // Reset status message after a few seconds
              setTimeout(() => {
                  status.textContent = '';
                  status.style.color = '';
              }, 5000);

          }, 1200);
      });
  }

});
