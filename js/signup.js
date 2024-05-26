//Funktion zur Weiterleitung auf die Privacy Policy Seite
function redirectToPrivacyPage() {
  window.location.href = "./privacy_policy.html";
}

//Funktion zur Weiterleitung auf die Privacy Policy Seite
function redirectToLegalPage() {
  window.location.href = "./legal_notice.html";
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
  setupPasswordVisibilityToggle("signupConfirmPassword", "signupValidationLockIcon");
});


//Funktionen Sign up und Firebase

let users = [
  {
    name: "Miriam Fuchs",
    email: "miriam@test.de",
    password: "test123",
    confirmPassword: "",
  },
]; //muss in Firebase

function signup() {
  const name = document.getElementById("signupNameInput").value;
  const email = document.getElementById("signupEmailInput").value;
  const password = document.getElementById("signupPasswordInput").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword"
  ).value;

  // Formularüberprüfung
  if (!email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
  // User mit Firebase erstellen
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created:", user);
      alert("User successfully created!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
      alert(errorMessage);
    });
}
