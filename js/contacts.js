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
}

/*Randomize colours*/

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

/*Contact sidebar*/

function getInitials(name) {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");
  return initials;
}

function contactsSidebar(contacts) {
  let html = "";
  let addedLetters = new Set();

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!addedLetters.has(firstLetter)) {
      html += `
        <div class="letter">${firstLetter}</div>
        <div class="lineContactSidebar"></div>
      `;
      addedLetters.add(firstLetter);
    }

    html += `
      <div class="contactListInner">
          <div class="contactInitials">${getInitials(contact.name)}</div>
          <div>
              <div class="contactName">${contact.name}</div>
              <div class="contactEmail">${contact.email}</div>
          </div>
      </div>
    `;
  }

  return html;
}

async function showContacts() {
  const contactListDiv = document.getElementById("contactList");
  contactListDiv.innerHTML = "";

  if (contacts.length > 0) {
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    const contactsHTML = contactsSidebar(contacts);
    contactListDiv.innerHTML = contactsHTML;

    const contactDivs = document.querySelectorAll(".contactListInner");
    contactDivs.forEach((contactDiv, index) => {
      contactDiv.addEventListener("click", () => {
        showContactDetails(index);
        currentContact = index;
      });
    });
  } else {
    contactListDiv.innerHTML = "Keine Kontakte vorhanden.";
  }
}

contacts.sort();

//Show dot icon
function showDotIcon() {
  if (window.innerWidth <= 768) {
    const dotIcon = document.getElementById("dotIcon");
    dotIcon.style.display = "flex";
  }
}

// Function to hide the dotIcon
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

function showContactDetails(index) {
  let contact = 0;
  if (index == null) {
    contact = contacts[currentContact];
  } else {
    contact = contacts[index];
  }

  createContactDetailsHTML(contact);

  // Adjustments for display based on screen width
  if (window.innerWidth <= 768) {
    // Hide the contactsSidebar when showContactDetails is called
    const contactsSidebar = document.querySelector(".contactsSidebar");
    contactsSidebar.style.display = "none";

    // Show the headlinesContainer above the contactsSidebar only when needed
    const headlinesContainer = document.querySelector(".headlinesContainer");
    headlinesContainer.style.display = "block"; // Zeige den Container nur hier an

    // Show the arrow (contactsArrow) and ensure it returns to the Contacts page
    const contactsArrow = document.querySelector(".contactsArrow");
    contactsArrow.style.display = "block";
    contactsArrow.addEventListener("click", function (event) {
      event.preventDefault(); // Verhindere den Standard-Link-Klick
      window.location.href = "../html/contacts.html"; // Gehe zur Contacts-Seite
    });
  } else {
    // For larger screen widths, reset to the normal layout
    const contactsSidebar = document.querySelector(".contactsSidebar");
    contactsSidebar.style.display = "block";

    const headlinesContainer = document.querySelector(".headlinesContainer");
    headlinesContainer.style.display = "block";

    const contactsArrow = document.querySelector(".contactsArrow");
    contactsArrow.style.display = "none";
  }

  // Additional logic for displaying contact information, etc.
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

  const editButton = document.querySelector(".editContactButton");
  editButton.onclick = function () {
    editContact(contact);
  };
  showDotIcon();
}

/*Delete contact*/

async function deleteContact(id) {
  try {
    /*await fetchContacts();*/
    await deleteData(id);
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      contacts.splice(index, 1);
      showContacts();
      document.getElementById("contactsFullscreen").innerHTML = "";

      document.querySelector(".editContactOverlay").classList.add("hidden");
      document.querySelector(".editContactOverlay").classList.remove("visible");

      setBg();
    } else {
      console.error("Kontakt nicht gefunden:", id);
    }
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts aus Firebase:", error);
  }
}

/*Display Initials Edit function*/

function displayContactInitials(contact) {
  const contactInitialsEdit = document.getElementById("contactInitialsEdit");
  contactInitialsEdit.textContent = getInitials(contact.name);
  setBg();
}

/*Edit contact*/

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

async function saveContact() {
  const editedContact = {
    name: document.getElementById("editNameInput").value,
    email: document.getElementById("editEmailInput").value,
    phone: document.getElementById("editPhoneInput").value,
  };

  if (currentContact === null) {
    console.error("Keine gültige Kontakt-ID gefunden");
    return;
  }

  const contactId = contacts[currentContact]?.id;

  if (!contactId) {
    console.error("Keine gültige Kontakt-ID gefunden");
    return;
  }

  try {
    await putData(`${contactId}`, editedContact);
  } catch (error) {
    console.error("Error updating contact in Firebase:", error);
    return;
  }

  try {
    await fetchContacts();
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }

  showContacts();

  showContactDetails(currentContact);

  document.querySelector(".editContactOverlay").classList.add("hidden");
  document.querySelector(".editContactOverlay").classList.remove("visible");
}

/*Create contact*/

async function createContact() {
  let name = document.getElementById("createNameInput");
  let email = document.getElementById("createEmailInput");
  let phone = document.getElementById("createPhoneInput");

  let newID = await generateCustomID();

  let contact = {
    name: name.value,
    email: email.value,
    phone: phone.value,
  };

  try {
    await putData(newID, contact);
    contacts.push({ id: newID, ...contact });
    showContacts();

    document.getElementById("contactOverlay").classList.add("hidden");

    const overlay = document.querySelector(".contactCreatedOverlay");

    overlay.classList.remove("contactCreatedOverlayHidden");

    void overlay.offsetWidth;

    overlay.classList.add("in");

    window.location.href = "contacts.html#contactCreatedOverlay";

    setTimeout(() => {
      overlay.classList.remove("in");
      overlay.classList.add("out");
    }, 2000);
  } catch (error) {
    console.error("Error adding contact to Firebase:", error);
  }

  name.value = "";
  email.value = "";
  phone.value = "";
}

async function generateCustomID() {
  await fetchContacts();

  const nextID = contacts.length + 1;
  return `contact${nextID}`;
}
