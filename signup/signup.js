const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form');
const name_error = document.getElementById('name_error');
const email_error = document.getElementById('email_error');
const password_error = document.getElementById('password_error');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    let emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    // Validation checks
    if (username.value === '' || username.value === null) {
        name_error.innerHTML = "Name is required";
    } else {
        name_error.innerHTML = "";
    }

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
    if (username.value && email.value.match(emailRegex) && password.value.length > 5) {
        saveData(username.value, email.value, password.value);
    }
});

/* ----- Function to save input data via API ----- */
async function saveData(username, email, password) {
    try {
        const response = await fetch('https://backend-brand-production.up.railway.app/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, username })
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('User data saved:', responseData);
        } else {
            throw new Error('Failed to save user data');
        }
    } catch (error) {
        console.error('Error saving user data:', error.message);
    }
}
