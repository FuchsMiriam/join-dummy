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
  const setupPasswordVisibilityToggle = (passwordInputId, lockIconId) => {
    const passwordInput = document.getElementById(passwordInputId);
    const lockIcon = document.getElementById(lockIconId);

    passwordInput.addEventListener("input", () => {
      if (passwordInput.value.length > 0) {
        lockIcon.src = "../assets/img/visibility_off.png";
      } else {
        lockIcon.src = "../assets/img/lockIcon.png";
      }
    });

    let passwordVisible = false;

    lockIcon.addEventListener("click", () => {
      passwordVisible = !passwordVisible;
      if (passwordVisible) {
        lockIcon.src = "../assets/img/visibility_on.png";
        passwordInput.type = "text";
      } else {
        lockIcon.src = "../assets/img/visibility_off.png";
        passwordInput.type = "password";
      }
    });
  };

  setupPasswordVisibilityToggle("signupPasswordInput", "signupLockIcon");
  setupPasswordVisibilityToggle(
    "signupConfirmPassword",
    "signupValidationLockIcon"
  );
});

//Database for signup

const databaseURL =
  "https://users-f61ab-default-rtdb.europe-west1.firebasedatabase.app/";

async function onloadDatabase(path = "") {
  let response = await fetch(databaseURL + path + ".json");
  let responseToJson = await response.json();
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
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password !== confirmPassword) {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("signupConfirmPassword").classList.add("error");
    return;
  }

  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("signupConfirmPassword").classList.remove("error");

  try {
    const newUser = {
      name: name,
      email: email,
      password: password,
      login: false,
    };

    const response = await postData("users", newUser);

    if (response) {
      const overlay = document.getElementById("overlay");
      overlay.classList.add("show");

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    } else {
      console.error("Error saving user to database:", response);
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    alert("Error creating user: " + error.message);
  }
}
