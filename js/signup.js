//Funktion zur Weiterleitung auf die Privacy Policy Seite

function redirectToPrivacyPage() {
  window.location.href = "./privacy_policy.html";
}

//Funktion zur Weiterleitung auf die Privacy Policy Seite
function redirectToLegalPage() {
  window.location.href = "./legal_notice.html";
}

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

//Checkbox-Wechsel

function checkboxToggle() {
  const checkbox = document.querySelector("#rememberMe");
  const signupButton = document.querySelector("#signupButton");

  checkbox.addEventListener("change", () => {
    signupButton.disabled = !checkbox.checked;
  });
}

//Funktionen für das Wechseln der Anzeigeart - Icons und Texteingabe

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

//Datenbank für Signup

function onloadFunc() {
  onloadDatabase();
}

//Datenbank für Signup

const databaseURL =
  "https://users-f61ab-default-rtdb.europe-west1.firebasedatabase.app/";

async function onloadDatabase(path = "") {
  let response = await fetch(databaseURL + path + ".json");
  let responseToJson = await response.json();
  console.log(responseToJson);
  return responseToJson;
}

// Funktion zum Posten der Daten in die Firebase-Datenbank
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

//Funktion Sign up

async function signup() {
  const name = document.getElementById("signupNameInput").value;
  const email = document.getElementById("signupEmailInput").value;
  const password = document.getElementById("signupPasswordInput").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword"
  ).value;

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
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
    };

    const response = await postData("users", newUser);

    if (response) {
      alert("You signed up successfully");
    } else {
      console.error("Error saving user to database:", response);
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    alert("Error creating user: " + error.message);
  }
  postData();
  redirectToLoginPage();
}
