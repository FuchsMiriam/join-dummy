//Datenbank für Login

function onloadFunc() {
  onloadDatabase();
}

//Datenbank für Login

const databaseURL =
  "https://users-f61ab-default-rtdb.europe-west1.firebasedatabase.app/";

async function onloadDatabase(path = "") {
  let response = await fetch(databaseURL + path + ".json");
  let responseToJson = await response.json();
  console.log(responseToJson);
  return responseToJson;
}

// Funktion für die Animation auf der Login-Seite

window.onload = function () {
  const logo = document.getElementById("animatedLogo");
  const content = document.getElementById("contentMainpage");

  setTimeout(() => {
    logo.style.width = "100.03px";
    logo.style.height = "121.97px";
    logo.style.top = "80px";
    logo.style.left = "77px";
  }, 500);

  function onTransitionEnd() {
    logo.removeEventListener("transitionend", onTransitionEnd);
    content.classList.remove("hiddenMainpage");
    content.classList.add("visibleMainpage");
  }

  logo.addEventListener("transitionend", onTransitionEnd);
};

// Funktion für Weiterleitungen

function redirectToSignUpPage() {
  window.location.href = "./html/signup.html";
}

function redirectToPrivacyPage() {
  window.location.href = "./html/privacy_policy.html";
}

function redirectToLegalPage() {
  window.location.href = "./html/legal_notice.html";
}

function redirectToBoard() {
  window.location.href = "./html/board.html";
}

//Zurücksetzen des Formulars

function resetForm() {
  document.getElementById("loginEmailInput").value = "";
  document.getElementById("loginPasswordInput").value = "";
  document.getElementById("rememberMe").checked = false;
}

window.addEventListener("pageshow", resetForm);

//Funktionen für das Wechseln der Anzeigeart - Icons und Texteingabe

document.addEventListener("DOMContentLoaded", () => {
  resetForm();
  const passwordInput = document.getElementById("loginPasswordInput");
  const lockIcon = document.getElementById("lockIcon");

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length > 0) {
      lockIcon.src = "./assets/img/visibility_off.svg";
    } else {
      lockIcon.src = "./assets/img/lockIcon.svg";
    }
  });

  let passwordVisible = false;
  lockIcon.addEventListener("click", () => {
    passwordVisible = !passwordVisible;
    if (passwordVisible) {
      lockIcon.src = "./assets/img/visibility_on.svg";
      passwordInput.type = "text";
    } else {
      lockIcon.src = "./assets/img/visibility_off.svg";
      passwordInput.type = "password"; //
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".mainpageLoginButton");
  loginButton.addEventListener("click", async () => {
    const loginSuccess = await loginUser();
    if (!loginSuccess) {
      const errorMessage = document.getElementById("errorMessage");
      const passwordInput = document.getElementById("loginPasswordInput");
      errorMessage.style.display = "block";
      passwordInput.classList.add("error");
    }
  });
});

//Funktion für den Login

async function loginUser() {
  let email = document.getElementById("loginEmailInput").value;
  let password = document.getElementById("loginPasswordInput").value;

  try {
    let usersData = await onloadDatabase("users");
    let user = Object.values(usersData).find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      window.location.href = "./html/board.html";
      return true;
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Benutzerdaten:", error);
  }
}
