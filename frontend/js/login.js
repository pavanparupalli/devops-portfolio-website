// login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page refresh

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple frontend validation (demo purpose)
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    // Simulated login success
    alert("Login successful!");

    // Redirect to portfolio home page
    window.location.href = "index.html";
  });
});
