document.querySelector(".contForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("tel").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const tos = document.getElementById("tos").checked;

    let errors = [];

    if (name.length < 3 || name.length > 16) {
        errors.push("Name must be between 3 and 16 characters.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    const phonePattern = /^\+?\d{8,15}$/;
    if (!phonePattern.test(phone)) {
        errors.push("Please enter a valid phone number (8-15 digits).");
    }

    if (subject.length < 3) {
        errors.push("Subject must be at least 3 characters long.");
    }

    if (message.length < 10) {
        errors.push("Message must be at least 10 characters long.");
    }

    if (!tos) {
        errors.push("You must agree to the Terms of Service.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        alert("Form submitted successfully!");
    }
});