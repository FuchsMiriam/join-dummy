//Datenbank für Login

/*function onloadFunc() {
  onloadDatabase();
}

const databaseURL =
  "https://users-f61ab-default-rtdb.europe-west1.firebasedatabase.app/";

async function onloadDatabase(path = "") {
  let response = await fetch(databaseURL + path + '.json');
  return responseToJson = await response.json();
  console.log(response);
}*/

//Template einbinden
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
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

// Funktion zur Weiterleitung auf die Sign up Seite

function redirectToSignUpPage() {
  window.location.href = "./html/signup.html";
}

//Funktion zur Weiterleitung auf die Privacy Policy Seite
function redirectToPrivacyPage() {
  window.location.href = "./html/privacy_policy.html";
}

//Funktion zur Weiterleitung auf die Legal Notice Seite
function redirectToLegalPage() {
  window.location.href = "./html/legal_notice.html";
}

//Funktion zur Weiterleitung auf das Board
function redirectToBoard() {
  window.location.href = "./html/board.html";
}

//Funktionen für den Login

let users = [{ email: "miriam@test.de", password: "test123" }]; //muss in Firebase

function loginUser() {
  let email = document.getElementById("loginEmailInput");
  let password = document.getElementById("loginPasswordInput");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );

  if (user) {
    console.log("Login successful");
    window.location.href = "./html/board.html";
  } else {
    console.log("Invalid email or password");
    alert("Invalid email or password");
  }
}
