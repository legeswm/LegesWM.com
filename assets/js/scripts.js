// Footer year
(function(){
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

// Hamburger menu toggle
(function(){
  const hamburger = document.querySelector('.hamburger') || document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;
  hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    }
  });
})();

// Floating contact bubble
(function(){
  const toggle = document.getElementById('bubble-toggle');
  const panel = document.getElementById('contact-panel');
  const close = document.getElementById('bubble-close');
  const bubble = document.getElementById('contact-bubble');
  const form = document.getElementById('bubble-form');
  if (!toggle || !panel || !close || !bubble) return;

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    setTimeout(() => document.addEventListener('click', outsideClick), 0);
  }
  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', outsideClick);
  }
  function outsideClick(e) {
    if (!bubble.contains(e.target)) closePanel();
  }

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    panel.hidden ? openPanel() : closePanel();
  });
  close.addEventListener('click', (e) => { e.preventDefault(); closePanel(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thanks for reaching out! We will be in touch soon.');
      closePanel();
    });
  }
})();
