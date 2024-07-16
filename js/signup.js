let contactBase = [];
//Function to redirect to the Privacy Policy page

function redirectToPrivacyPage() {
  window.location.href = "./privacy_policy.html";
}

//Function to redirect to the Legal Notice page
function redirectToLegalPage() {
  window.location.href = "./legal_notice.html";
}

// Function to redirect to the Login page
function redirectToLoginPage() {
  window.location.href = "../index.html";
}

// Sign up button

document.addEventListener("DOMContentLoaded", () => {
  buttonDisabled();
  checkboxToggle();
});

function buttonDisabled() {
  const signupButton = document.querySelector("#signupButton");
  signupButton.disabled = true;
}

//Checkbox toggle functionality

function checkboxToggle() {
  const checkbox = document.querySelector("#rememberMe");
  const signupButton = document.querySelector("#signupButton");

  checkbox.addEventListener("change", () => {
    signupButton.disabled = !checkbox.checked;
  });
}

//Functions for toggling password visibility - icons and text input

document.addEventListener("DOMContentLoaded", () => {
  setupPasswordVisibilityToggle("signupPasswordInput", "signupLockIcon");
  setupPasswordVisibilityToggle(
    "signupConfirmPassword",
    "signupValidationLockIcon"
  );
});

// Function to set up password visibility toggle
function setupPasswordVisibilityToggle(passwordInputId, lockIconId) {
  const passwordInput = document.getElementById(passwordInputId);
  const lockIcon = document.getElementById(lockIconId);

  passwordInput.addEventListener("input", () =>
    updateLockIcon(passwordInput, lockIcon)
  );
  lockIcon.addEventListener("click", () =>
    togglePasswordVisibility(passwordInput, lockIcon)
  );
}

// Function to update lock icon based on input
function updateLockIcon(passwordInput, lockIcon) {
  lockIcon.src =
    passwordInput.value.length > 0
      ? "../assets/img/visibility_off.png"
      : "../assets/img/lockIcon.png";
}

// Function to toggle password visibility
function togglePasswordVisibility(passwordInput, lockIcon) {
  const passwordVisible = passwordInput.type === "password";
  lockIcon.src = passwordVisible
    ? "../assets/img/visibility_on.png"
    : "../assets/img/visibility_off.png";
  passwordInput.type = passwordVisible ? "text" : "password";
}

//Database for signup

const databaseURL =
  "https://users-f61ab-default-rtdb.europe-west1.firebasedatabase.app/";

async function onloadDatabase(path = "") {
  let response = await fetch(databaseURL + path + ".json");
  let responseToJson = await response.json();
  contactBase = responseToJson;
  return responseToJson;
}

// Function to post data to the Firebase database

async function postData(path = "", data = {}) {
  try {
    let response = await fetch(`${databaseURL}${path}.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let responseToJson = await response.json();
    return responseToJson;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

//Function for signup

async function signup() {
  const name = document.getElementById("signupNameInput").value;
  const email = document.getElementById("signupEmailInput").value;
  const password = document.getElementById("signupPasswordInput").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword"
  ).value;

  if (!validateSignupForm(name, email, password, confirmPassword)) return;

  resetErrorMessages();

  try {
    await handleEmailCheckAndUserCreation(name, email, password);
  } catch (error) {
    handleSignupError(error);
  }
}

// Function to display custom error message
function displayCustomErrorMessage(message) {
  const customErrorMessage = document.getElementById("customErrorMessage");
  customErrorMessage.textContent = message;
  customErrorMessage.style.display = "block";
  setTimeout(() => {
    customErrorMessage.style.display = "none";
  }, 3000);
}

async function handleEmailCheckAndUserCreation(name, email, password) {
  const emailExists = await checkEmailExists(email);
  if (emailExists) {
    displayCustomErrorMessage("Email address is already registered.");
    return;
  }

  const newUser = createNewUser(name, email, password);
  const response = await postData("users", newUser);

  if (response) {
    handleSuccessfulSignup();
  } else {
    console.error("Error saving user to database:", response);
  }
}

// Function to validate the signup form
function validateSignupForm(name, email, password, confirmPassword) {
  if (!areFieldsFilled(name, email, password, confirmPassword)) {
    displayCustomErrorMessage("Please fill in all fields.");
    return false;
  }

  if (!isEmailValid(email)) {
    displayCustomErrorMessage("Please enter a valid email address.");
    return false;
  }

  if (!arePasswordsMatching(password, confirmPassword)) {
    showError();
    return false;
  }

  return true;
}

// Function to check if all fields are filled
function areFieldsFilled(name, email, password, confirmPassword) {
  return name && email && password && confirmPassword;
}

// Function to validate the email pattern
function isEmailValid(email) {
  const emailPattern =
    /^[^\s@]+@[^\s@]+\.(com|de|org|net|edu|gov|mil|info|io|co)$/;
  return emailPattern.test(email);
}

// Function to check if passwords match
function arePasswordsMatching(password, confirmPassword) {
  return password === confirmPassword;
}

// Function to show error message for password mismatch
function showError() {
  document.getElementById("errorMessage").style.display = "block";
  document.getElementById("signupConfirmPassword").classList.add("error");
}

function resetErrorMessages() {
  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("signupConfirmPassword").classList.remove("error");
}

function createNewUser(name, email, password) {
  return {
    name: name,
    email: email,
    password: password,
    login: false,
  };
}

function handleSuccessfulSignup() {
  const overlay = document.getElementById("overlay");
  overlay.classList.add("show");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
}

function handleSignupError(error) {
  console.error("Error creating user:", error.message);
  alert("Error creating user: " + error.message);
}

//Check if email address exists

async function checkEmailExists(email) {
  try {
    const response = await fetch(`${databaseURL}users.json`);
    const data = await response.json();

    if (data) {
      const users = Object.values(data);
      return users.some((user) => user.email === email);
    }
    return false;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
}
