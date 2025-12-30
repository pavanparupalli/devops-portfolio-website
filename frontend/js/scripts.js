/*!
* Start Bootstrap - Resume v7.0.6
* UI scripts only (no login logic)
*/

window.addEventListener('DOMContentLoaded', () => {
  // Logout button (if exists)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = '/frontend/login.html';
    });
  }
});

/* Snowfall background script */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('snowCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let flakes = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createFlake() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      vy: Math.random() * 1 + 0.5
    };
  }

  function init() {
    flakes = [];
    const count = Math.min(200, Math.floor((width * height) / 10000));
    for (let i = 0; i < count; i++) flakes.push(createFlake());
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    flakes.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
      f.y += f.vy;
      if (f.y > height) {
        f.y = -5;
        f.x = Math.random() * width;
      }
    });
    requestAnimationFrame(draw);
  }

  resize();
  init();
  window.addEventListener('resize', () => {
    resize();
    init();
  });
  draw();
})();
