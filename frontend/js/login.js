document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorBox = document.getElementById("loginError");

  const DEMO_EMAIL = "admin@gmail.com";
  const DEMO_PASSWORD = "Pavan@123!";

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      errorBox.style.display = "block";
      errorBox.textContent = "Please enter email and password";
      return;
    }

    if (email === DEMO_EMAIL.toLowerCase() && password === DEMO_PASSWORD) {
      sessionStorage.setItem('isLoggedIn', 'true');
      window.location.href = "/frontend/";
    } else {
      errorBox.style.display = "block";
      errorBox.textContent = "Check username or password";
    }
  });
});
