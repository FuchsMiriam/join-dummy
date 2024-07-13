function onloadFunc() {
  onloadDatabase();
  loadDataFromLocalStorage();
  showAnimation();
  getLoginName("");
}

//Database for Login

const databaseURL =
  "https://users-f61ab-default-rtdb.europe-west1.firebasedatabase.app/";

async function onloadDatabase(path = "") {
  let response = await fetch(databaseURL + path + ".json");
  let responseToJson = await response.json();
  return responseToJson;
}

 //Animation beginning

  document.addEventListener("DOMContentLoaded", function() {
    const animatedLogo = document.getElementById("animatedLogo");
    const contentMainpage = document.getElementById("contentMainpage");
  
    animatedLogo.addEventListener("animationend", function () {
      contentMainpage.classList.add("visibleMainpage");
      contentMainpage.classList.remove("hiddenMainpage");
    });
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

function redirectToSummary(){
  let test = 0;
  getLoginName(null);
  if(window.innerWidth > 1200)
    window.location.href = "./html/summary.html";
  else{
    window.location.href = "./html/greetingMobil.html";
  }
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

  // Event listener for the input event
  passwordInput.addEventListener("input", handlePasswordInput);

  // Event listener for clicking on the lock icon
  lockIcon.addEventListener("click", handleLockIconClick);

  // Function to update the lock icon based on password visibility
  function updateLockIcon(passwordVisible) {
    lockIcon.src = passwordVisible ? "./assets/img/visibility_on.svg" : "./assets/img/visibility_off.svg";
    passwordInput.type = passwordVisible ? "text" : "password";
  }

  // Handler for the input event
  function handlePasswordInput() {
    if (passwordInput.value.length > 0) {
      lockIcon.src = "./assets/img/visibility_off.svg";
    } else {
      lockIcon.src = "./assets/img/lockIcon.svg";
    }
  }

  // Handler for clicking on the lock icon
  function handleLockIconClick() {
    passwordVisible = !passwordVisible;
    updateLockIcon(passwordVisible);
  }

  // Initialize password visibility
  let passwordVisible = false;
  updateLockIcon(passwordVisible);
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
  let email = getEmailInputValue();
  let password = getPasswordInputValue();
  try {
    let usersData = await fetchUserData();
    let user = findUser(usersData, email, password);

    if (user) {
      handleSuccessfulLogin(user);
      return true;
    }
  } catch (error) {
    handleLoginError(error);
  }
}

function getEmailInputValue() {
  return document.getElementById("loginEmailInput").value;
}

function getPasswordInputValue() {
  return document.getElementById("loginPasswordInput").value;
}

async function fetchUserData() {
  return await onloadDatabase("users");
}

function findUser(usersData, email, password) {
  return Object.values(usersData).find(
    (u) => u.email === email && u.password === password
  );
}

function handleSuccessfulLogin(user) {
  getLoginName(user.name);
  window.location.href = "./html/summary.html";
}

function handleLoginError(error) {
  console.error("Fehler beim Abrufen der Benutzerdaten:", error);
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

document.getElementById("rememberMe").addEventListener("click", function() {
  const rememberMe = this.checked;

  localStorage.setItem("rememberMe", rememberMe);
  if (rememberMe) {
    localStorage.setItem("username", document.getElementById("loginEmailInput").value);
    localStorage.setItem("pass", document.getElementById("loginPasswordInput").value);
  } else {
    localStorage.removeItem("username");
    localStorage.removeItem("pass");
  }
});

//Animation media query

function showAnimation() {
  const bodyAnimation = document.getElementById("contentMainpage");
  const img = document.getElementById("animatedLogo");
  const mediaQuery = window.matchMedia("(max-width: 670px)");

  if (mediaQuery.matches) {
    handleSmallScreenAnimation(bodyAnimation, img);
  } else {
    handleLargeScreenAnimation(bodyAnimation);
  }

  img.style.animation = "slide-tl 1s forwards";
  addAnimationEndListener(img);
}

function handleSmallScreenAnimation(bodyAnimation, img) {
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
  }, 500);
}

function handleLargeScreenAnimation(bodyAnimation) {
  setTimeout(() => {
    bodyAnimation.style.display = "none";
  }, 0);
  setTimeout(() => {
    bodyAnimation.style.display = "block";
  }, 500);
}

function addAnimationEndListener(img) {
  img.addEventListener("animationend", () => {
    const contentMainpage = document.getElementById("contentMainpage");
    contentMainpage.classList.add("visibleMainpage");
    contentMainpage.classList.remove("hiddenMainpage");
  });
}

function defineLoginName() {
  return loginName;
}
