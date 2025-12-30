// frontend/js/forgot_password.js

document.addEventListener("DOMContentLoaded", () => {
  const forgotForm = document.getElementById("forgotPasswordForm");
  const otpForm = document.getElementById("otpForm");
  const errorBox = document.getElementById("forgotPasswordError");
  const otpErrorBox = document.getElementById("otpError");
  const successBox = document.getElementById("forgotPasswordSuccess");

  let generatedOTP = null;
  let userEmail = null;

  forgotForm.addEventListener("submit", (e) => {
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
    // Simulate user check
    if (email === "admin@gmail.com") {
      // Generate OTP (demo: 6-digit random)
      generatedOTP = (Math.floor(100000 + Math.random() * 900000)).toString();
      userEmail = email;
      // Simulate sending OTP (show in alert for demo)
      alert("OTP sent to your email: " + generatedOTP);
      forgotForm.style.display = "none";
      otpForm.style.display = "block";
    } else {
      errorBox.textContent = "No account found with that email address.";
      errorBox.style.display = "block";
    }
  });

  otpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    otpErrorBox.style.display = "none";
    successBox.style.display = "none";
    const otp = document.getElementById("otp").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    if (!otp || !newPassword) {
      otpErrorBox.textContent = "Please enter OTP and new password.";
      otpErrorBox.style.display = "block";
      return;
    }
    if (otp !== generatedOTP) {
      otpErrorBox.textContent = "Invalid OTP. Please check your email.";
      otpErrorBox.style.display = "block";
      return;
    }
    // Simulate password change
    successBox.textContent = "Your password has been changed successfully.";
    successBox.style.display = "block";
    otpForm.style.display = "none";
  });
});
