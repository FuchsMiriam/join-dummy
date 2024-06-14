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

/*Close Edit contact overlay*/

document
  .getElementById("closeEditOverlay")
  .addEventListener("click", function () {
    document.querySelector(".editContactOverlay").classList.add("hidden");
  });

/*Close small edit contact overlay*/

document
  .getElementById("whiteCloseEditOverlay")
  .addEventListener("click", function () {
    document.querySelector(".editContactOverlay").classList.add("hidden");
  });
