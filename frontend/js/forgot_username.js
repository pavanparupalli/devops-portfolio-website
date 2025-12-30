// frontend/js/forgot_username.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forgotUsernameForm");
  const errorBox = document.getElementById("forgotUsernameError");
  const successBox = document.getElementById("forgotUsernameSuccess");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.style.display = "none";
    successBox.style.display = "none";

    const email = document.getElementById("email").value.trim().toLowerCase();
    if (!email) {
      errorBox.textContent = "Please enter your email address.";
      errorBox.style.display = "block";
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      errorBox.textContent = "Email address must end with @gmail.com.";
      errorBox.style.display = "block";
      return;
    }

    // Simulate backend call (replace with real API call in production)
    // For demo, only one user is supported
    if (email === "admin@gmail.com") {
      // Simulate sending email
      successBox.textContent = "Your username has been sent to your email address.";
      successBox.style.display = "block";
    } else {
      errorBox.textContent = "No account found with that email address.";
      errorBox.style.display = "block";
    }
  });
});
