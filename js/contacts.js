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

// Process the first letter of the contact's name and add it to HTML if not already added
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

// Functions to Initialize, Sort, Display, and Manage Click Events for a Contact List

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

//Delete contact

// Main function to delete a contact by ID
async function deleteContact(id) {
  try {
    await deleteData(id);
    handleContactDeletion(id);
  } catch (error) {
    handleDeleteError(error);
  }
}

// Handle contact deletion in local contacts array and UI
function handleContactDeletion(id) {
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    showContacts();
    clearFullscreenContacts();
    hideEditContactOverlay();
    setBg();
  } else {
    console.error("Contact not found:", id);
  }
}

// Handle error when deleting contact from Firebase
function handleDeleteError(error) {
  console.error("Error deleting contact from Firebase:", error);
}

// Function to clear fullscreen contact details
function clearFullscreenContacts() {
  document.getElementById("contactsFullscreen").innerHTML = "";
}

// Function to hide edit contact overlay
function hideEditContactOverlay() {
  const editContactOverlay = document.querySelector(".editContactOverlay");
  editContactOverlay.classList.add("hidden");
  editContactOverlay.classList.remove("visible");
}

//Display Initials Edit function
function displayContactInitials(contact) {
  const contactInitialsEdit = document.getElementById("contactInitialsEdit");
  contactInitialsEdit.textContent = getInitials(contact.name);
  setBg();
}

//Edit contact
function editContact(contact) {
  displayContactInitials(contact);

  document.getElementById("editNameInput").value = contact.name || "";
  document.getElementById("editEmailInput").value = contact.email || "";
  document.getElementById("editPhoneInput").value = contact.phone || "";

  currentContact = contacts.findIndex((c) => c.id === contact.id);

  document.querySelector(".editContactOverlay").classList.remove("hidden");
  document.querySelector(".editContactOverlay").classList.add("visible");

  const deleteButton = document.getElementById("editDeleteButton");
  deleteButton.setAttribute("onclick", `deleteContact('${contact.id}')`);
}

//Save edited contact

// Function to save edited contact details
async function saveContact() {
  const editedContact = getEditedContact();
  if (!editedContact) return;

  const contactId = getContactId();
  if (!contactId) return;

  try {
    await putData(`${contactId}`, editedContact);
    await fetchAndShowContacts();
    showContactDetails(currentContact);
    setBg();
  } catch (error) {
    console.error("Error:", error);
  }

  hideEditContactOverlay();
}

// Function to get edited contact details from input fields
function getEditedContact() {
  return {
    name: document.getElementById("editNameInput").value,
    email: document.getElementById("editEmailInput").value,
    phone: document.getElementById("editPhoneInput").value,
  };
}

// Function to get the ID of the current contact
function getContactId() {
  const contactId = contacts[currentContact]?.id;
  if (!contactId) {
    console.error("No valid contact ID found");
    return null;
  }
  return contactId;
}

// Function to fetch updated contacts and display them
async function fetchAndShowContacts() {
  try {
    await fetchContacts();
    showContacts();
    showContactDetails(currentContact);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
}

//Create contact
async function createContact() {
  let name = document.getElementById("createNameInput");
  let email = document.getElementById("createEmailInput");
  let phone = document.getElementById("createPhoneInput");

  try {
    await checkAndSaveContact(name.value, email.value, phone.value);
    clearInputs(name, email, phone);
    hideContactOverlay();
    await fetchAndShowContacts();
  } catch (error) {
    if (error.message === "Duplicate email") {
      alert("This email address is already registered.");
    } else {
      alert("An error occurred while creating the contact.");
    }
  }
}

async function checkAndSaveContact(name, email, phone) {
  const emailExists = await checkEmailExists(email);
  if (emailExists) throw new Error("Duplicate email");

  let newID = await generateCustomID();
  let contact = { name, email, phone };

  try {
    await saveContactToFirebase(newID, contact);
    await showContactCreationOverlay();
  } catch (error) {
    console.error("Error saving contact:", error);
    throw new Error("Error saving contact");
  }
}

async function saveContactToFirebase(id, contact) {
  try {
    await putData(id, contact);
    contacts.push({ id, ...contact });
  } catch (error) {
    console.error("Error adding contact to Firebase:", error);
    throw error;
  }
}

async function showContactCreationOverlay() {
  const overlay = document.querySelector(".contactCreatedOverlay");
  overlay.classList.remove("contactCreatedOverlayHidden");

  if (window.innerWidth >= 1290) {
    overlay.classList.add("slideInRight");
  } else {
    overlay.classList.add("slideInUp");
  }

  await animateOverlay(overlay);
}

async function animateOverlay(overlay) {
  void overlay.offsetWidth;
  overlay.classList.add("in");

  setTimeout(async () => {
    overlay.classList.remove("in");
    overlay.classList.add("out");

    setTimeout(() => {
      overlay.classList.remove("slideInRight", "slideInUp", "out");
    }, 800);

    await fetchAndShowContacts();
    setBg();
  }, 3000);
}

async function fetchAndShowContacts() {
  try {
    await fetchContacts();
    showContacts();
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
}

function clearInputs(...inputs) {
  inputs.forEach(input => (input.value = ""));
}

async function checkEmailExists(email) {
  await fetchContacts();
  return contacts.some((contact) => contact.email === email);
}

async function generateCustomID() {
  await fetchContacts();

  const nextID = contacts.length + 1;
  return `contact${nextID}`;
}

function hideContactOverlay() {
  const overlay = document.getElementById("contactOverlay");
  overlay.classList.add("hidden");
}