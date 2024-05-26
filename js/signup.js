//Funktion zur Weiterleitung auf die Privacy Policy Seite
function redirectToPrivacyPage() {
  window.location.href = "./privacy_policy.html";
}

//Funktion zur Weiterleitung auf die Privacy Policy Seite
function redirectToLegalPage() {
  window.location.href = "./legal_notice.html";
}

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

  // Simple form validation
  if (!email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
  // Create user with Firebase
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created:", user);
      alert("User successfully created!");
      // Optional: Save additional user data (e.g., name) to Firestore or Realtime Database
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
      alert(errorMessage);
    });
}
