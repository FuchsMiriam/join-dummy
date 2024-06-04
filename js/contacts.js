const contactsURL =
  "https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

async function initializePage() {
  includeHTML();
  await fetchContacts();
  showContacts();

  const contactDivs = document.querySelectorAll(".contactListInner");
  contactDivs.forEach((contactDiv, index) => {
    contactDiv.addEventListener("click", function () {
      showContactDetails(index);
    });
  });
}

/*Kontakte abrufen, hinzufügen, löschen, aktualisieren*/

async function fetchContacts(path = "") {
  let response = await fetch(contactsURL + path + ".json");
  let data = await response.json();
  contacts = data ? Object.values(data) : [];
  contacts.sort((a, b) => a.name.localeCompare(b.name));
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

/*Kontaktseitenleiste*/

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
    const contactsHTML = contactsSidebar(contacts);
    contactListDiv.innerHTML = contactsHTML;
  } else {
    contactListDiv.innerHTML = "Keine Kontakte vorhanden.";
  }
}

contacts.sort();

/*Overlay öffnen*/

function openOverlay() {
  document.querySelector(".addNewContactOverlay").classList.remove("hidden");
  document.querySelector(".addNewContactOverlay").classList.add("visible");
}

/*Overlay schließen*/

document.getElementById("closeOverlay").addEventListener("click", function () {
  document.getElementById("contactOverlay").classList.add("hidden");
  document.getElementById("contactOverlay").classList.remove("visible");
});

/*Kontaktansicht rechte Seite*/

function createContactDetailsHTML(contact) {
  document.getElementById("contactsFullscreen").innerHTML = `
    <div class="fullContactDetails">
      <div class="fullContactHeader">
        <div class="contactDetailsInitials">${getInitials(contact.name)}</div>
        <div class="contactDetailsName">${contact.name}</div>
        <div class="contactDetailsButtons">
          <button class="editContactButton">
            <img src="../assets/img/edit.svg" alt="Edit" /> Edit
          </button>
          <button class="deleteContactButton">
            <img src="../assets/img/delete.svg" alt="Delete" /> Delete
          </button>
        </div>
      </div>
      <div class="contactInfoHeader">Contact Information</div>
      <div class="contactInfoDetails">
        <div class="contactInfoItem">
          <div class="contactInfoLabel">Email</div>
          <div class="contactInfoValue">${contact.email}</div>
        </div>
        <div class="contactInfoItem">
          <div class="contactInfoLabel">Phone</div>
          <div class="contactInfoValue">${contact.phone}</div>
        </div>
      </div>
    </div>
  `;
}

function showContactDetails(index) {
  const contact = contacts[index];
  createContactDetailsHTML(contact);
  document.getElementById("contactsFullscreen").style.display = "block";
}
