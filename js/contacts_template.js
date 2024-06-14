//Contact view on the right side

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

//Open Add contact overlay

function openOverlay() {
  document.querySelector(".addNewContactOverlay").classList.remove("hidden");
  document.querySelector(".addNewContactOverlay").classList.add("visible");
}

//Close Add contact overlay

document.getElementById("closeOverlay").addEventListener("click", function () {
  document.getElementById("contactOverlay").classList.add("hidden");
  document.getElementById("contactOverlay").classList.remove("visible");
});

//Close Edit contact overlay

document
  .getElementById("closeEditOverlay")
  .addEventListener("click", function () {
    document.querySelector(".editContactOverlay").classList.add("hidden");
  });

//Close small edit contact overlay

document
  .getElementById("whiteCloseEditOverlay")
  .addEventListener("click", function () {
    document.querySelector(".editContactOverlay").classList.add("hidden");
  });

  //Popup overlay Event listener

function togglePopup(event) {
  const popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.classList.toggle("hidden");
  event.stopPropagation(); 
}

// Funktion zum Bearbeiten eines Kontakts
function editContactFromPopup() {
  const contact = contacts[currentContact];
  editContact(contact);
  closePopup();
}

// Funktion zum Löschen eines Kontakts
async function deleteContactFromPopup() {
  try {
    const contactId = contacts[currentContact].id;
    await deleteContact(contactId);
    closePopup();
    window.location.href = 'contacts.html';
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
  }
}


// Funktion zum Schließen des Popups
function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.classList.add("hidden");
}