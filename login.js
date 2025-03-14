document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let contact = document.getElementById("contact").value.trim();
    let password = document.getElementById("password").value;
    let contactError = document.getElementById("contactError");
    let passwordError = document.getElementById("passwordError");
    let valid = true;
    
    contactError.textContent = "";
    passwordError.textContent = "";

    // Validate if it's a phone number (digits only, 10+ characters) or an email
    let isEmail = contact.includes("@") && contact.includes(".");
    let isPhoneNumber = /^[0-9]{10,}$/.test(contact);

    if (!isEmail && !isPhoneNumber) {
        contactError.textContent = "Enter a valid Email or Phone Number.";
        valid = false;
    }
    
    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long.";
        valid = false;
    }

    if (!valid) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find user by email or phone number
    let user = users.find(user => (user.contact === contact || user.phone === contact) && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = 'index.html';
    } else {
        alert("Invalid email/phone number or password!");
    }
});
