function onloadFunc() {
  /*showAnimation();*/
  onloadDatabase();
  loadDataFromLocalStorage();
}

//Database for Login

const databaseURL =
  "https://users-f61ab-default-rtdb.europe-west1.firebasedatabase.app/";

async function onloadDatabase(path = "") {
  let response = await fetch(databaseURL + path + ".json");
  let responseToJson = await response.json();
  console.log(responseToJson);
  return responseToJson;
}

// Function for animation on the login page

/*window.onload = function () {
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
};*/

/*document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("animatedLogo");
  const content = document.getElementById("contentMainpage");

  logo.addEventListener("transitionend", function () {
    content.classList.remove("hiddenMainpage");
    content.classList.add("visibleMainpage");
  });
});*/

document
  .getElementById("animatedLogo")
  .addEventListener("animationend", function () {
    document.getElementById("contentMainpage").classList.add("visibleMainpage");
    document
      .getElementById("contentMainpage")
      .classList.remove("hiddenMainpage");
  });

// Function for redirects

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

//Reset form

function resetForm() {
  if (!document.getElementById("rememberMe").checked) {
    document.getElementById("loginEmailInput").value = "";
    document.getElementById("loginPasswordInput").value = "";
    document.getElementById("rememberMe").checked = false;
  }
}

window.addEventListener("pageshow", resetForm);

//Functions for toggling display type - icons and text input

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

//Function for login

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

//Remember me function

document.querySelector("form").addEventListener("submit", function (event) {
  if (document.getElementById("rememberMe").checked) {
    localStorage.setItem(
      "username",
      document.getElementById("loginEmailInput").value
    );
    localStorage.setItem(
      "pass",
      document.getElementById("loginPasswordInput").value
    );
  }
  event.preventDefault();
});

function loadDataFromLocalStorage() {
  var email = localStorage.getItem("username");
  var password = localStorage.getItem("pass");
  var rememberMe = localStorage.getItem("rememberMe");

  if (rememberMe === "true" && email && password) {
    document.getElementById("loginEmailInput").value = email;
    document.getElementById("loginPasswordInput").value = password;
    document.getElementById("rememberMe").checked = true;
  }
}

document.getElementById("rememberMe").addEventListener("click", function () {
  if (this.checked) {
    localStorage.setItem(
      "username",
      document.getElementById("loginEmailInput").value
    );
    localStorage.setItem(
      "pass",
      document.getElementById("loginPasswordInput").value
    );
    localStorage.setItem("rememberMe", true);
  } else {
    localStorage.removeItem("username");
    localStorage.removeItem("pass");
    localStorage.setItem("rememberMe", false);
  }
});

/*Animation media query*/

/*function showAnimation() {
  const bodyAnimation = document.getElementById("mainpage");
  const img = document.getElementById("animatedLogo");
  const mediaQuery = window.matchMedia("(max-width: 670px)");

  if (mediaQuery.matches) {
    setTimeout(() => {
      bodyAnimation.style.display = "none";
    }, 0);
    setTimeout(() => {
      document.body.style.backgroundColor = "#2b3646";
      img.src = "./assets/img/whiteLogoLarge.svg";
    }, 10);
    setTimeout(() => {
      document.body.style.backgroundColor = "#f6f7f8";
      img.src = "./assets/img/logoLarge.svg";
      bodyAnimation.style.display = "block";
    }, 1000);
  } else {
    setTimeout(() => {
      bodyAnimation.style.display = "none";
    }, 0);
    setTimeout(() => {
      // Hier musst du den entsprechenden Code hinzufügen, um die mainpage anzuzeigen.
    }, 1000);
    setTimeout(() => {
      bodyAnimation.style.display = "block";
    }, 1500);
  }
  img.addEventListener("animationend", function () {
    // Hier wird die Hauptseite angezeigt
    document.getElementById("contentMainpage").classList.add("visibleMainpage");
    document
      .getElementById("contentMainpage")
      .classList.remove("hiddenMainpage");
  });
}*/
