// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

// Validate form inputs
function validateForm(username, email, password) {
    if (!username || !email || !password) {
        return "All fields are required!";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address.";
    }

    return null; // Validation passed
}

// Handle form submission and API call
document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate inputs
    const validationError = validateForm(username, email, password);
    if (validationError) {
        showError(validationError);
        return; // Stop execution if validation fails
    }

    // Check if the user already exists by sending an API request (email or username check)
    const userExists = await checkIfUserExists(email, username);
    if (userExists) {
        // If the user already exists, show an error message and redirect to the login page
        showError("This account already exists. Redirecting to login...");
        setTimeout(() => {
            window.location.href = "../login/login.html"; // Redirect to login page
        }, 2000); // Wait 2 seconds before redirecting
        return;
    }

    // API endpoint (replace this with your actual API endpoint)
    const apiEndpoint = "https://snapsafevj.onrender.com/signup";

    // Prepare request payload
    const requestPayload = {
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestPayload)
        });

        const data = await response.json();

        // If the response is successful (e.g., status code 200)
        if (response.ok) {
            // Handle successful signup (e.g., redirect to login page)
            window.location.href = "../login/login.html"; // Redirect to login page (replace with your URL)
        } else {
            // Display error message from API (if any)
            showError(data.message || "An error occurred, please try again.");
        }
    } catch (error) {
        // Handle errors (e.g., network failure)
        showError("An error occurred while communicating with the server.");
    }
});

// Function to display error messages
function showError(message) {
    const errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.textContent = message;

    // Optionally, you can add a class to style the error message if needed
    errorMessageElement.style.display = "block";
}

// Function to check if user already exists (by email or username)
async function checkIfUserExists(email, username) {
    const apiEndpoint = "https://snapsafevj.onrender.com/checkUserExists"; // Replace with your actual endpoint for checking user existence

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, username })
        });

        const data = await response.json();

        // Check if the user exists based on the response from the server
        if (response.ok && data.exists) {
            return true; // User exists
        }

        return false; // User does not exist
    } catch (error) {
        console.error("Error checking user existence:", error);
        showError("An error occurred while checking user existence.");
        return false; // Default to false if error occurs
    }
}
