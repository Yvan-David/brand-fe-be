const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form');

const email_error = document.getElementById('email_error');
const password_error = document.getElementById('password_error');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    let emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    // Validation checks
    if (!email.value.match(emailRegex)) {
        email_error.innerHTML = "Valid email address is required";
    } else {
        email_error.innerHTML = "";
    }

    if (password.value.length <= 5) {
        password_error.innerHTML = "Password must be more than 6 characters";
    } else {
        password_error.innerHTML = "";
    }

    // If all fields are valid, send data to the server
    if (email.value.match(emailRegex) && password.value.length > 5) {
        try {
            const response = await loginUser(email.value, password.value);
        } catch (error) {
            console.error('Error logging in:', error.message);
            alert("An error occurred while logging in");
        }
    }
});

/* ----- Function to log in user via API ----- */
async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            if (email === 'yvan@gmail.com') {
                window.location.href = "/admin/index.html";
            } else {
                window.location.href = "/users/index.html";
            }
            console.log(response.json())
        } else {
            throw new Error('Failed to log in user');
        }
    } catch (error) {
        throw error;
    }
}
