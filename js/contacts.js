const contactsURL =
  "https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

let contactColors = {};
let currentContact = 0;

async function initializePage() {
  includeHTML();
  await fetchContacts();
  showContacts();

  /*const contactDivs = document.querySelectorAll(".contactListInner");
  contactDivs.forEach((contactDiv, index) => {
    contactDiv.addEventListener("click", () => {
      showContactDetails(index);
    });
  });*/
  setBg();
}

/*Randomize colours*/

const setBg = () => {
  const elements = document.querySelectorAll(
    ".contactInitials, .contactDetailsInitials, .overlayInitialsContainer"
  );
  elements.forEach((element) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    element.style.backgroundColor = "#" + randomColor;
  });
};

function addContactWithColor(contact) {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  contactColors[contact.id] = randomColor;
}

/*Fetch, add, delete, update contacts*/

async function fetchContacts(path = "") {
  try {
    const response = await fetch(contactsURL + path + ".json");
    const data = await response.json();
    contacts = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];
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

/*Open Add contact overlay*/

function openOverlay() {
  document.querySelector(".addNewContactOverlay").classList.remove("hidden");
  document.querySelector(".addNewContactOverlay").classList.add("visible");
}

/*Close Add contact overlay*/

document.getElementById("closeOverlay").addEventListener("click", function () {
  document.getElementById("contactOverlay").classList.add("hidden");
  document.getElementById("contactOverlay").classList.remove("visible");
});

/*Contact view on the right side*/

function createContactDetailsHTML(contact, index) {
  document.getElementById("contactsFullscreen").innerHTML = `
    <div class="fullContactDetails">
      <div class="fullContactHeader">
        <div class="contactDetailsInitials">${getInitials(contact.name)}</div>
        <div class="contactNameButtons"><div class="contactDetailsName">${
          contact.name
        }</div>
        <div class="contactDetailsButtons">
          <button class="editContactButton" onclick="editContact()">
            <img class="editImg" src="../assets/img/edit.svg" alt="Edit" /> Edit
          </button>
          <button class="deleteContactButton" onclick="deleteContact('${
            contact.id
          }')">
            <img class="deleteImg" src="../assets/img/delete.svg" alt="Delete" /> Delete
          </button>
        </div>
        </div>
      </div>
      <div class="contactInfoHeader">Contact Information</div>
      <div class="contactInfoDetails">
        <div class="contactInfoEmail">
          <div class="contactInfoLabelEmail">Email</div>
          <div class="contactInfoValueEmail">${contact.email}</div>
        </div>
        <div class="contactInfoPhone">
          <div class="contactInfoLabelPhone">Phone</div>
          <div class="contactInfoValuePhone">${contact.phone}</div>
        </div>
      </div>
    </div>
  `;
  setBg();
}

function showContactDetails(index) {
  let contact = 0;
  if (index == null) {
    contact = contacts[currentContact];
  } else {
    contact = contacts[index];
  }
  createContactDetailsHTML(contact);
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

  let nameInput = document.getElementById("editNameInput");
  let emailInput = document.getElementById("editEmailInput");
  let phoneInput = document.getElementById("editPhoneInput");

  nameInput.value = contact.name || "";
  emailInput.value = contact.email || "";
  phoneInput.value = contact.phone || "";

  document.querySelector(".editContactOverlay").classList.remove("hidden");
  document.querySelector(".editContactOverlay").classList.add("visible");

  const deleteButton = document.getElementById("editDeleteButton");
  deleteButton.setAttribute("onclick", `deleteContact('${contact.id}')`);
}
document
  .getElementById("closeEditOverlay")
  .addEventListener("click", function () {
    document.querySelector(".editContactOverlay").classList.add("hidden");
    document.querySelector(".editContactOverlay").classList.remove("visible");
  });

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
