const contactsURL =
  "https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";

/*Kontakte abrufen, hinzufügen löschen, aktualisieren*/

async function fetchContacts() {
  let response = await fetch(contactsURL + ".json");
  return await response.json();
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

/*function getInitials(name) {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");
  return initials;
}*/

function getInitials(name) {
  console.log("Generating initials for:", name);
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");
  console.log("Initials generated:", initials);
  return initials;
}

function contactsSidebar(contacts) {
  let html = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    html += `
      <div class="letter">${contact.name.charAt(0)}</div>
      <div class="lineContactSidebar"></div>
      <div class="contactListInner">
          <div>${getInitials(contact.name)}</div>
          <div>
              <div>${contact.name}</div>
              <div>${contact.email}</div>
          </div>
      </div>
    `;
  }

  return html;
}

async function showContacts() {
  const contactListDiv = document.getElementById("contactList");
  contactListDiv.innerHTML = "";

  const contacts = await fetchContacts();
  const contactsHTML = contactsSidebar(contacts);
  contactListDiv.innerHTML = contactsHTML;
}

function initializePage() {
  includeHTML();
  showContacts();
}
