const passwordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("confirm-signup-password");

function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
}

function confirmPasswordVisibility() {
    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
    } else {
        confirmPasswordInput.type = "password";
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//CHECK LOGIN STATUS
const checkLoggedIn = () => {
    const welcomeTag = document.getElementById('welcomeTag');
    const username = localStorage.getItem('user_id');

    if (username) {
        // User is logged in
        welcomeTag.innerHTML = `Welcome ${username}`;
        document.querySelector(".my-books").style.display = "inline-block";
        document.querySelector(".logout-btn").style.display = "inline-block"; // Show logout button
        document.getElementById("loginLink").style.display = "none"; // Hide login link
        document.getElementById("registerLink").style.display = "none"; // Hide register button
    } else {
        welcomeTag.style.display = "none"
        document.querySelector(".logout-btn").style.display = "none"; // Hide logout button
        document.getElementById("loginLink").style.display = "inline-block"; // Show login link
        document.getElementById("registerLink").style.display = "inline-block";
        document.querySelector(".book-actions").style.visibility = "hidden"
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//LOGGING IN
let userLogin = () => {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    // Check if entered credentials match stored credentials
    if (localStorage.getItem('user_id') === username && localStorage.getItem('user_pass') === password) {
        // Redirect to landing page
        window.location.href = "landing.html";
    } else {
        // Display an error message if credentials don't match
        alert("Invalid Username or Password");
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//STORING USER DETAILS
let registration = () => {
    let newUsername = document.getElementById("signup-username").value;
    let newPassword = document.getElementById("signup-password").value;
    let confirmPassword = document.getElementById("confirm-signup-password").value;

    // Storing the data in localStorage
    localStorage.setItem('user_id', newUsername);
    localStorage.setItem('user_pass', newPassword);
    localStorage.setItem('confirm_pass', confirmPassword);

    // Alert Registration Complete
    alert(`Your account has been created ${newUsername}, please log into your account.`)

    // Redirect to login after successful registration
    window.location.href = 'login.html'
}

const register = () => {
    let confirmPasswordFunc = () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("Your password does not match");
        } else if (document.getElementById("signup-username").value === "") {
            alert("Please enter a username");
        } else {
            registration();
        }
    }

    confirmPasswordFunc();
}



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//LOGGING OUT
const logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_pass");
    localStorage.removeItem("confirm_pass");
    checkLoggedIn();
    window.location.reload();
}



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//CHECK LOGIN STATUS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    checkLoggedIn();
    document.getElementById("search-word").value = ""
});




