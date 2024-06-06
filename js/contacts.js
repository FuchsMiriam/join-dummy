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

/*Fetch, add, delete, update contacts*/

async function fetchContacts(path = "") {
  let response = await fetch(contactsURL + path + ".json");
  let data = await response.json();
  contacts = data ? Object.values(data) : [];
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
  } else {
    contactListDiv.innerHTML = "Keine Kontakte vorhanden.";
  }
}

contacts.sort();

/*Open overlay*/

function openOverlay() {
  document.querySelector(".addNewContactOverlay").classList.remove("hidden");
  document.querySelector(".addNewContactOverlay").classList.add("visible");
}

/*Close overlay*/

document.getElementById("closeOverlay").addEventListener("click", function () {
  document.getElementById("contactOverlay").classList.add("hidden");
  document.getElementById("contactOverlay").classList.remove("visible");
});

/*Contact view on the right side*/

function createContactDetailsHTML(contact) {
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
          <button class="deleteContactButton" onclick="deleteContact()">
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
}

function showContactDetails(index) {
  const contact = contacts[index];
  createContactDetailsHTML(contact);
  document.getElementById("contactsFullscreen").classList.remove("out");
  document.getElementById("contactsFullscreen").classList.add("in");

  let contactDivs = document.querySelectorAll(".contactListInner");
  contactDivs.forEach((contactDiv, i) => {
    if (i === index) {
      contactDiv.classList.add("active");
    } else {
      contactDiv.classList.remove("active");
    }
  });

  let contactName = document.querySelector(".contactName");
  let contactEmail = document.querySelector(".contactEmail");
  contactName.style.color = "#ffffff";
  contactEmail.style.color = "#007CEE";
}

/*Edit contact*/
function editContact() {}

/*Delete contact*/
function deleteContact() {}

/*Create contact*/

/*function createContact() {
  let name = document.getElementById("createNameInput");
  let email = document.getElementById("createEmailInput");
  let phone = document.getElementById("createPhoneInput");

  let contact = {
    Name: name.value,
    Email: email.value,
    Phone: phone.value,
  };

  putData("", contact)
    .then((response) => {
      console.log("Contact successfully added to Firebase:", response);
      const newID = response.name;
      contact.id = newID;
      contacts.push(contact);
      showContacts();
    })
    .catch((error) => {
      console.error("Error adding contact to Firebase:", error);
    });

  name.value = "";
  email.value = "";
  phone.value = "";
}*/

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
    window.location.href = "contacts.html";

    setTimeout(() => {
      document
        .querySelector(".contactCreatedOverlay")
        .classList.remove("contactCreatedOverlayHidden");
        setTimeout(() => {
          document.querySelector(".contactCreatedOverlay").classList.add("in");
        }, 10);
    }, 2000);

    setTimeout(() => {
      document.querySelector(".contactCreatedOverlay").classList.remove("in");
      document.querySelector(".contactCreatedOverlay").classList.add("out");
    }, 4000);
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
