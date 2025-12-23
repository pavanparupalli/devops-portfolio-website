// signup.js
// Simulate OTP sending and verification for Gmail signup

document.addEventListener('DOMContentLoaded', function() {
    const sendOtpBtn = document.getElementById('send-otp-btn');
    const verifyOtpBtn = document.getElementById('verify-otp-btn');
    const emailInput = document.getElementById('email');
    const otpSection = document.getElementById('otp-section');
    const passwordSection = document.getElementById('password-section');
    const signupForm = document.getElementById('signup-form');
    const signupMessage = document.getElementById('signup-message');

    // Pressing Enter in the email field triggers Send OTP
    emailInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendOtpBtn.click();
        }
    });

    let generatedOtp = '';

    sendOtpBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        // Simulate a list of non-existent/invalid emails for demo
        const invalidEmails = ['wrong@gmail.com', 'invalid@gmail.com', 'test@notgmail.com'];
        if (!email.match(/[a-zA-Z0-9._%+-]+@gmail\.com$/) || invalidEmails.includes(email)) {
            signupMessage.textContent = 'Incorrect email Address';
            signupMessage.style.color = 'red';
            return;
        }
        // Simulate OTP generation and sending
        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        signupMessage.textContent = `OTP sent to ${email} (Simulated: ${generatedOtp})`;
        signupMessage.style.color = 'green';
        otpSection.style.display = 'block';
        sendOtpBtn.disabled = true;
        emailInput.readOnly = true;
    });

    verifyOtpBtn.addEventListener('click', function() {
        const otpInput = document.getElementById('otp').value.trim();
        if (otpInput === generatedOtp) {
            signupMessage.textContent = 'OTP verified. Please set your password.';
            signupMessage.style.color = 'green';
            passwordSection.style.display = 'block';
            otpSection.style.display = 'none';
        } else {
            signupMessage.textContent = 'Invalid OTP. Please try again.';
            signupMessage.style.color = 'red';
        }
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Prevent submission if email is invalid or does not exist
        const email = emailInput.value.trim();
        const invalidEmails = ['wrong@gmail.com', 'invalid@gmail.com', 'test@notgmail.com'];
        if (!email.match(/[a-zA-Z0-9._%+-]+@gmail\.com$/) || invalidEmails.includes(email)) {
            signupMessage.textContent = 'Incorrect email Address';
            signupMessage.style.color = 'red';
            return;
        }
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        if (password.length < 6) {
            signupMessage.textContent = 'Password must be at least 6 characters.';
            signupMessage.style.color = 'red';
            return;
        }
        if (password !== confirmPassword) {
            signupMessage.textContent = 'Passwords do not match.';
            signupMessage.style.color = 'red';
            return;
        }
        signupMessage.textContent = 'Signup successful! (Simulated)';
        signupMessage.style.color = 'green';
        signupForm.reset();
        passwordSection.style.display = 'none';
        emailInput.readOnly = false;
        sendOtpBtn.disabled = false;
        otpSection.style.display = 'none';
    });
});
