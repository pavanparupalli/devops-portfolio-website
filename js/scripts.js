/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
  // Forgot Username Modal Logic
  const forgotUsernameBtn = document.getElementById('forgotUsernameBtn');
  const forgotUsernameModal = document.getElementById('forgotUsernameModal');
  const closeForgotUsernameModal = document.getElementById('closeForgotUsernameModal');
  const forgotUsernameForm = document.getElementById('forgotUsernameForm');
  const forgotUsernameEmail = document.getElementById('forgotUsernameEmail');
  const forgotUsernameMsg = document.getElementById('forgotUsernameMsg');

  if (forgotUsernameBtn && forgotUsernameModal) {
    forgotUsernameBtn.onclick = () => {
      forgotUsernameModal.style.display = 'flex';
      forgotUsernameForm.reset();
      forgotUsernameMsg.textContent = '';
    };
    closeForgotUsernameModal.onclick = () => {
      forgotUsernameModal.style.display = 'none';
    };
    forgotUsernameForm.onsubmit = (e) => {
      e.preventDefault();
      const email = forgotUsernameEmail.value.trim();
      if (!email.match(/[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
        forgotUsernameMsg.textContent = 'Please enter a valid Gmail address.';
        forgotUsernameMsg.style.color = 'red';
        return;
      }
      // Send username to email using EmailJS
      forgotUsernameMsg.textContent = 'Sending username...';
      forgotUsernameMsg.style.color = 'black';
      // Replace with your actual username logic
      const username = 'admin@gmail.com'; // Demo username, replace as needed
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: email,
        message: `Your username is: ${username}`
      })
      .then(function(response) {
        forgotUsernameMsg.textContent = `Your username has been sent to ${email}`;
        forgotUsernameMsg.style.color = 'green';
        setTimeout(() => { forgotUsernameModal.style.display = 'none'; }, 1500);
      }, function(error) {
        forgotUsernameMsg.textContent = 'Failed to send email. Please try again.';
        forgotUsernameMsg.style.color = 'red';
      });
    };
  }

  // Simple Forgot Password Modal Logic
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const closeForgotModal = document.getElementById('closeForgotModal');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const forgotEmail = document.getElementById('forgotEmail');
  const forgotMsg = document.getElementById('forgotMsg');

  if (forgotPasswordBtn && forgotPasswordModal) {
    forgotPasswordBtn.onclick = () => {
      forgotPasswordModal.style.display = 'flex';
      forgotPasswordForm.reset();
      forgotMsg.textContent = '';
    };
    closeForgotModal.onclick = () => {
      forgotPasswordModal.style.display = 'none';
    };
    forgotPasswordForm.onsubmit = (e) => {
      e.preventDefault();
      const email = forgotEmail.value.trim();
      if (!email.match(/[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
        forgotMsg.textContent = 'Please enter a valid Gmail address.';
        forgotMsg.style.color = 'red';
        return;
      }
      // Send password to email using EmailJS
      forgotMsg.textContent = 'Sending password...';
      forgotMsg.style.color = 'black';
      // Replace with your actual password logic
      const password = 'password'; // Demo password, replace as needed
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: email,
        message: `Your password is: ${password}`
      })
      .then(function(response) {
        forgotMsg.textContent = `Your password has been sent to ${email}`;
        forgotMsg.style.color = 'green';
        setTimeout(() => { forgotPasswordModal.style.display = 'none'; }, 1500);
      }, function(error) {
        forgotMsg.textContent = 'Failed to send email. Please try again.';
        forgotMsg.style.color = 'red';
      });
    };
  }

  // Forgot Password Modal Logic
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const closeForgotModal = document.getElementById('closeForgotModal');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const forgotEmail = document.getElementById('forgotEmail');
  const forgotOtp = document.getElementById('forgotOtp');
  const newPassword = document.getElementById('newPassword');
  const confirmNewPassword = document.getElementById('confirmNewPassword');
  const sendForgotOtpBtn = document.getElementById('sendForgotOtpBtn');
  const verifyForgotOtpBtn = document.getElementById('verifyForgotOtpBtn');
  const resetPasswordBtn = document.getElementById('resetPasswordBtn');
  const otpSection = document.getElementById('otpSection');
  const newPasswordSection = document.getElementById('newPasswordSection');
  const forgotMsg = document.getElementById('forgotMsg');
  let forgotGeneratedOtp = '';

  if (forgotPasswordBtn && forgotPasswordModal) {
    function handleSendForgotOtp() {
      const email = forgotEmail.value.trim();
      if (!email.match(/[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
        forgotMsg.textContent = 'Please enter a valid Gmail address.';
        forgotMsg.style.color = 'red';
        return;
      }
      forgotGeneratedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      forgotMsg.textContent = `OTP sent to ${email} (Simulated: ${forgotGeneratedOtp})`;
      forgotMsg.style.color = 'green';
      otpSection.style.display = '';
      sendForgotOtpBtn.style.display = 'none';
      verifyForgotOtpBtn.style.display = '';
    }

    forgotPasswordBtn.onclick = () => {
      forgotPasswordModal.style.display = 'flex';
      forgotPasswordForm.reset();
      otpSection.style.display = 'none';
      newPasswordSection.style.display = 'none';
      sendForgotOtpBtn.style.display = '';
      verifyForgotOtpBtn.style.display = 'none';
      resetPasswordBtn.style.display = 'none';
      forgotMsg.textContent = '';
    };
    closeForgotModal.onclick = () => {
      forgotPasswordModal.style.display = 'none';
    };
    sendForgotOtpBtn.onclick = handleSendForgotOtp;

    // Simple Forgot Password Modal Logic
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeForgotModal = document.getElementById('closeForgotModal');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const forgotEmail = document.getElementById('forgotEmail');
    const forgotMsg = document.getElementById('forgotMsg');

    if (forgotPasswordBtn && forgotPasswordModal) {
      forgotPasswordBtn.onclick = () => {
        forgotPasswordModal.style.display = 'flex';
        forgotPasswordForm.reset();
        forgotMsg.textContent = '';
      };
      closeForgotModal.onclick = () => {
        forgotPasswordModal.style.display = 'none';
      };
      forgotPasswordForm.onsubmit = (e) => {
        e.preventDefault();
        const email = forgotEmail.value.trim();
        if (!email.match(/[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
          forgotMsg.textContent = 'Please enter a valid Gmail address.';
          forgotMsg.style.color = 'red';
          return;
        }
        // Simulate sending password to email
        forgotMsg.textContent = `Your password has been sent to ${email} (Simulated)`;
        forgotMsg.style.color = 'green';
        setTimeout(() => { forgotPasswordModal.style.display = 'none'; }, 1500);
      };
    }
            if (err) {
              if (!result.usernameCorrect) {
                err.textContent = 'Username is incorrect.';
              } else if (!result.passwordCorrect) {
                err.textContent = 'Password is incorrect.';
              } else {
                err.textContent = 'Invalid username or password.';
              }
              err.style.display = 'block';
            }
          }
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');
            window.location.href = 'login.html';
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
