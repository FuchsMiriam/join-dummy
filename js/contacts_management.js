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
/*async function createContact() {
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
  }*/

async function createContact() {
  let nameInput = document.getElementById("createNameInput");
  let emailInput = document.getElementById("createEmailInput");
  let phoneInput = document.getElementById("createPhoneInput");
  let errorMessageContacts = document.getElementById("errorMessageContacts");

  try {
    await checkAndSaveContact(
      nameInput.value,
      emailInput.value,
      phoneInput.value
    );
    clearInputs(nameInput, emailInput, phoneInput);
    hideContactOverlay();
    await fetchAndShowContacts();
  } catch (error) {
    if (error.message === "Duplicate email") {
      displayErrorContacts(
        errorMessageContacts,
        "Email address is already registered."
      );
    } else {
      displayErrorContacts(
        errorMessageContacts,
        "An error occurred while creating the contact."
      );
    }
  }
}

function displayErrorContacts(element, message) {
  element.textContent = message;
  element.style.display = "block";
  //setTimeout(function () {
    //element.style.display = "none";
  //}, 3000);
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
  inputs.forEach((input) => (input.value = ""));
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
