const contactsURL =
  "https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

const colorClasses = [
  "orange",
  "purple",
  "blue",
  "pink",
  "yellow",
  "green",
  "red",
];
let currentContact = 0;

async function initializePage() {
  includeHTML();
  await fetchContacts();
  await assignColorsToContacts(contacts);
  showContacts();
  setBg();
  hoverSidebar();
}

//Randomize colours
async function assignColorsToContacts(contacts) {
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const colorClass = colorClasses[i % colorClasses.length];
    contact.colorClass = colorClass;

    await putData(contact.id, contact);
  }
}

function setBg() {
  const elements = document.querySelectorAll(
    ".contactInitials, .contactDetailsInitials, .overlayInitialsContainer"
  );

  elements.forEach((element) => {
    const initials = element.textContent.trim();
    const contact = contacts.find((c) => getInitials(c.name) === initials);
    if (contact && contact.colorClass) {
      element.classList.add(contact.colorClass);
    }
  });
}

async function fetchContacts(path = "") {
  try {
    const response = await fetch(contactsURL + path + ".json");
    const data = await response.json();
    contacts = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];
    contacts.forEach((contact) => {
      if (!contact.colorClass) {
        contact.colorClass =
          colorClasses[contacts.indexOf(contact) % colorClasses.length];
      }
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Kontakte:", error);
  }
}

async function postData(path = "", data = "") {
  let response = await fetch(contactsURL + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJSON = await response.json());
}

async function deleteData(path = "") {
  let response = await fetch(contactsURL + path + ".json", {
    method: "DELETE",
  });
  return (responseToJSON = await response.json());
}

async function putData(path = "", data = {}) {
  let response = await fetch(contactsURL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

//Contact sidebar
function getInitials(name) {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");
  return initials;
}

// Main function to generate the contacts sidebar
function contactsSidebar(contacts) {
  let { html, addedLetters } = initializeHtmlAndLetters();

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    processFirstLetter(contact, addedLetters, html);
    addContactToHtml(contact, html);
  }

  return html.value;
}

// Initialize HTML string and Set for added letters
function initializeHtmlAndLetters() {
  let html = { value: "" };
  let addedLetters = new Set();
  return { html, addedLetters };
}

function processFirstLetter(contact, addedLetters, html) {
  const firstLetter = contact.name.charAt(0).toUpperCase();
  if (!addedLetters.has(firstLetter)) {
    html.value += `
      <div class="letter">${firstLetter}</div>
      <div class="lineContactSidebar"></div>
    `;
    addedLetters.add(firstLetter);
  }
}

// Add contact details to the HTML string
function addContactToHtml(contact, html) {
  html.value += `
    <div class="contactListInner">
        <div class="contactInitials">${getInitials(contact.name)}</div>
        <div>
            <div class="contactName">${contact.name}</div>
            <div class="contactEmail">${contact.email}</div>
        </div>
    </div>
  `;
}

// Get initials from the contact's name
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
}

// Functions to Initialize, Sort, Display, and Manage Click Events for the Contact List

// Main function to display contacts
async function showContacts() {
  const contactListDiv = initializeContactListDiv();

  if (contacts.length > 0) {
    sortContacts(contacts);
    displayContacts(contactListDiv, contacts);
    addContactClickListeners();
  } else {
    displayNoContactsMessage(contactListDiv);
  }
}

// Initialize and clear the contact list div
function initializeContactListDiv() {
  const contactListDiv = document.getElementById("contactList");
  contactListDiv.innerHTML = "";
  return contactListDiv;
}

// Sort contacts by name
function sortContacts(contacts) {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

// Display the contacts in the contact list div
function displayContacts(contactListDiv, contacts) {
  const contactsHTML = contactsSidebar(contacts);
  contactListDiv.innerHTML = contactsHTML;
}

// Add click listeners to contact elements
function addContactClickListeners() {
  const contactDivs = document.querySelectorAll(".contactListInner");
  contactDivs.forEach((contactDiv, index) => {
    contactDiv.addEventListener("click", () => {
      showContactDetails(index);
      currentContact = index;
    });
  });
}

// Display a message when no contacts are available
function displayNoContactsMessage(contactListDiv) {
  contactListDiv.innerHTML = "Keine Kontakte vorhanden.";
}

contacts.sort();

//Layout changing screen width

// Adjusts layout based on the screen width
function adjustLayoutForScreenWidth() {
  if (window.innerWidth <= 768) {
    hideContactsSidebar();
    showHeadlinesContainer();
    showContactsArrow();
  } else {
    resetLayoutForLargerScreens();
  }
}

// Hides the contacts sidebar element
function hideContactsSidebar() {
  const contactsSidebar = document.querySelector(".contactsSidebar");
  contactsSidebar.style.display = "none";
}

// Displays the headlines container element
function showHeadlinesContainer() {
  const headlinesContainer = document.querySelector(".headlinesContainer");
  headlinesContainer.style.display = "block";
}

// Displays the contacts arrow element and adds click event to navigate to contacts page
function showContactsArrow() {
  const contactsArrow = document.querySelector(".contactsArrow");
  contactsArrow.style.display = "block";
  contactsArrow.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link click
    window.location.href = "../html/contacts.html"; // Go to the Contacts page
  });
}

// Resets layout for larger screens by displaying contacts sidebar and hiding contacts arrow
function resetLayoutForLargerScreens() {
  const contactsSidebar = document.querySelector(".contactsSidebar");
  contactsSidebar.style.display = "block";

  const contactsArrow = document.querySelector(".contactsArrow");
  contactsArrow.style.display = "none";
}


function updateContactDetailsUI(index) {
  document.getElementById("contactsFullscreen").classList.remove("out");
  document.getElementById("contactsFullscreen").classList.add("in");

  let contactDivs = document.querySelectorAll(".contactListInner");
  contactDivs.forEach((contactDiv, i) => {
    if (i === index) {
      contactDiv.classList.add("active");
      contactDiv.classList.add("nohover");
      contactDiv.querySelector(".contactName").style.color = "#ffffff";
    } else {
      contactDiv.classList.remove("active");
      contactDiv.classList.remove("nohover");
      contactDiv.querySelector(".contactName").style.color = "#000000";
    }
  });
}

function showContactDetails(index) {
  let contact = 0;
  if (index == null) {
    contact = contacts[currentContact];
  } else {
    contact = contacts[index];
  }
  createContactDetailsHTML(contact);
  adjustLayoutForScreenWidth();
  updateContactDetailsUI(index);
  const editButton = document.querySelector(".editContactButton");
  editButton.onclick = function () {
    editContact(contact);
  };
  showDotIcon();
}

//Show dot icon
function showDotIcon() {
  if (window.innerWidth <= 768) {
    const dotIcon = document.getElementById("dotIcon");
    dotIcon.style.display = "flex";
  }
}

//Hide dotIcon
function hideDotIcon() {
  const dotIcon = document.getElementById("dotIcon");
  dotIcon.style.display = "none";
}

// Event listener to control the visibility of the dotIcon
document.addEventListener("DOMContentLoaded", function () {
  const contactsFullscreen = document.getElementById("contactsFullscreen");

  // Check if contactsFullscreen is visible when the page loads
  if (contactsFullscreen.classList.contains("in")) {
    showDotIcon();
  } else {
    hideDotIcon();
  }

  // Event listener for changes in the contactsFullscreen class
  contactsFullscreen.addEventListener("transitionend", function () {
    if (contactsFullscreen.classList.contains("in")) {
      showDotIcon();
    } else {
      hideDotIcon();
    }
  });
});