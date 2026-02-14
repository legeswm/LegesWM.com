// Footer year
(function(){
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

// Golden line cursor trail
(function(){
  const canvas = document.getElementById('cursor-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dot = document.getElementById('cursor-dot');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const trail = [];
  const maxTrailLength = 20;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trail.push({ x: mouseX, y: mouseY, age: 0 });
    if (trail.length > maxTrailLength) trail.shift();
    if (dot) {
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    }
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (trail.length < 2) {
      requestAnimationFrame(draw);
      return;
    }
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    for (let i = 1; i < trail.length; i++) {
      const prev = trail[i - 1];
      const curr = trail[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
    }
    if (trail.length > 0) {
      const last = trail[trail.length - 1];
      ctx.lineTo(last.x, last.y);
    }
    const gradient = ctx.createLinearGradient(
      trail[0].x, trail[0].y,
      trail[trail.length - 1].x, trail[trail.length - 1].y
    );
    gradient.addColorStop(0, 'rgba(211, 174, 98, 0)');
    gradient.addColorStop(0.5, 'rgba(211, 174, 98, 0.4)');
    gradient.addColorStop(1, 'rgba(211, 174, 98, 0.8)');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    trail.forEach(p => p.age++);
    while (trail.length > 0 && trail[0].age > 8) trail.shift();
    requestAnimationFrame(draw);
  }
  draw();
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
