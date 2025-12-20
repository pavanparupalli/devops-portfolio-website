/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Download resume button - attempt direct PDF download, fallback to print dialog
    const downloadBtn = document.getElementById('downloadResumeBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            // 0) Try to fetch a named PDF first (several filename variants)
            const pdfCandidates = [
                'assets/Pavan%20Parupalli%20Resume.pdf',
                'assets/Pavan_Parupalli_Resume.pdf',
                'assets/PavanParupalli_Resume.pdf',
                'assets/Resume.pdf'
            ];
            for (const pdfCandidate of pdfCandidates) {
                try {
                    const r = await fetch(pdfCandidate, { cache: 'no-store' });
                    if (r.ok) {
                        const blob = await r.blob();
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        // Use a friendly filename when saving
                        a.download = 'Pavan Parupalli Resume.pdf';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        URL.revokeObjectURL(url);
                        return;
                    }
                } catch (err) {
                    // ignore and try next candidate
                }
            }

            // 1) Try to fetch a specific Untitled HTML and create a PDF from it
            const htmlUrl = 'assets/Untitled.html';
            try {
                const resp = await fetch(htmlUrl, { cache: 'no-store' });
                if (resp.ok) {
                    const htmlText = await resp.text();
                    // Create a temporary container for the fetched HTML
                    const container = document.createElement('div');
                    container.style.position = 'relative';
                    container.style.width = '100%';
                    container.style.background = '#fff';
                    container.style.padding = '20px';
                    container.style.boxSizing = 'border-box';
                    container.innerHTML = htmlText;
                    container.style.display = 'block';
                    container.id = 'tmp-untitled-export';
                    document.body.appendChild(container);

                    if (window.html2pdf) {
                        try {
                            const opt = {
                                margin:       0.5,
                                filename:     'Resume-from-Untitled.pdf',
                                image:        { type: 'jpeg', quality: 0.98 },
                                html2canvas:  { scale: 2 },
                                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                            };
                            await html2pdf().set(opt).from(container).save();
                            container.remove();
                            return;
                        } catch (err) {
                            console.error('html2pdf export failed:', err);
                            container.remove();
                        }
                    } else {
                        // If html2pdf missing, try print the container
                        window.print();
                        container.remove();
                        return;
                    }
                }
            } catch (e) {
                // ignore and continue to other fallbacks
            }

            // 2) Previous behavior: try to download an existing PDF
            const pdfUrl = 'assets/Resume.pdf';
            try {
                const resp2 = await fetch(pdfUrl, { cache: 'no-store' });
                if (resp2.ok) {
                    const blob = await resp2.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Resume.pdf';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                    return;
                }
            } catch (e) {
                // ignore and fallback
            }

            // 3) Final fallback: export current page with html2pdf or open print dialog
            if (window.html2pdf) {
                try {
                    const element = document.querySelector('.container-fluid') || document.body;
                    const opt = {
                        margin:       0.5,
                        filename:     'Resume.pdf',
                        image:        { type: 'jpeg', quality: 0.98 },
                        html2canvas:  { scale: 2 },
                        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                    };
                    await html2pdf().set(opt).from(element).save();
                    return;
                } catch (err) {
                    // fall through to print dialog
                }
            }
            window.print();
        });
    }

});

/* Snowfall background script */
(function() {
  // Respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('snowCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let flakes = [];
  let resizeTimer = null;

  function setSize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  // Sprite cache and helpers to draw snowflake-like shapes efficiently
  const spriteCache = new Map();
  function makeSprite(r) {
    // Regular circular soft-glow snowflake sprite (small & sharp)
    const key = `circle_${Math.round(r)}`;
    if (spriteCache.has(key)) return spriteCache.get(key);
    const size = Math.ceil(r * 6) + 6; // smaller canvas for smaller flakes
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const cx = c.getContext('2d');
    cx.translate(size / 2, size / 2);

    // radial gradient with bright center and stronger visible edge
    const grad = cx.createRadialGradient(0, 0, 0, 0, 0, Math.max(1, r * 2));
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.98)');
    grad.addColorStop(1, 'rgba(220,230,245,0.95)');

    // slightly stronger outer shadow and outline to make flakes pop on light backgrounds
    cx.shadowBlur = Math.max(1, r * 1.1);
    cx.shadowColor = 'rgba(0,0,0,0.2)';

    cx.beginPath();
    cx.fillStyle = grad;
    cx.arc(0, 0, Math.max(1.0, r * 1.2), 0, Math.PI * 2);
    cx.fill();

    // faint dark outline for contrast
    cx.beginPath();
    cx.lineWidth = Math.max(1, r * 0.25);
    cx.strokeStyle = 'rgba(0,0,0,0.22)';
    cx.arc(0, 0, Math.max(1.0, r * 1.2) + 0.3, 0, Math.PI * 2);
    cx.stroke();

    // small bright center highlight
    cx.beginPath();
    cx.fillStyle = 'rgba(255,255,255,0.98)';
    cx.arc(0, 0, Math.max(0.5, r * 0.45), 0, Math.PI * 2);
    cx.fill();

    spriteCache.set(key, c);
    return c;
  }

  function makeFlake(small = false) {
    // Smaller, more regular round flakes
    const rRaw = small ? (Math.random() * 0.5 + 0.5) : (Math.random() * 0.8 + 0.8);
    const r = Math.max(0.5, rRaw * 0.85); // slightly reduced size
    const sprite = makeSprite(Math.round(r * 1.6));
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r,
      d: Math.random() * 0.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: Math.random() * 0.6 + 0.3,
      o: Math.random() * 0.15 + 0.7, // narrow opacity range for uniform look
      sprite,
      rot: 0,
      omega: 0
    };
  }

  function createFlakes() {
    flakes = [];
    const area = width * height;
    // higher density for smaller, regular flakes
    const count = Math.max(80, Math.min(700, Math.floor(area / 9000)));
    for (let i = 0; i < count; i++) {
      flakes.push(makeFlake());
    }
  }

  function update() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.x += f.vx * f.d;
      f.y += f.vy * (f.r / 3);

      if (f.y > height + 5) {
        f.y = -10;
        f.x = Math.random() * width;
      }
      if (f.x > width + 5) f.x = -5;
      if (f.x < -5) f.x = width + 5;

      // draw flake sprite with rotation
      const alpha = Math.max(0.85, f.o); // enforce a stronger visible minimum
      if (f.sprite) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rot);
        const s = f.sprite;
        ctx.drawImage(s, -s.width / 2, -s.height / 2);
        ctx.restore();
        f.rot += f.omega;
      } else {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(update);
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setSize();
      // On very small screens limit the flake count
      if (window.innerWidth < 600) {
        flakes = [];
        const count = Math.max(20, Math.min(120, Math.floor((width * height) / 30000)));
        for (let i = 0; i < count; i++) {
          flakes.push(makeFlake(true));
        }
      } else {
        createFlakes();
      }
    }, 200);
  }

  // initialization
  setSize();
  if (width < 600) {
    // fewer flakes on small / mobile devices
    flakes = [];
    const count = Math.max(20, Math.min(120, Math.floor((width * height) / 30000)));
    for (let i = 0; i < count; i++) {
      flakes.push(makeFlake(true));
    }
  } else {
    createFlakes();
  }

  window.addEventListener('resize', onResize);
  requestAnimationFrame(update);
})();
