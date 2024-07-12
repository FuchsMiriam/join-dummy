function displayContactsTemplate(i, contact) {
  const nameParts = contact.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");
  return `
    <div class="display-contacts-dropdown"  id='contacts${i}' onclick="checkContacts(${i})">
            <div class="contact-list">
            <div class="contacts-ini-container">
                <span class="initials-contacts" id="initials-bg${i}">${initials}</span>
                <span class="contact-span" id="contact-span-name${i}">${contact} </span>
            </div>
                <input type="checkbox" id="checkbox-contacts${i}" class="contacts-checkbox" onclick="checkContacts(${i})">
            </div>
    </div>
    `;
}

function showSubtaskTemplate(i, tasks) {
  return `
        <li class="subtask-span" id="subtask${i}" onmouseover="hoverValueFromSubtask(${i})">
            ${tasks}
            <div id='images-subtask${i}' class="d-none subtasks-edit-delete-image">
            <img src="../assets/img/edit.svg" class="subtask-button" onclick="editSubtask(${i})" class="d-none" id="images-subtask-value"></img>
            |
            <img src="../assets/img/delete.svg" class="subtask-button" onclick="deleteTask(${i})" class="d-none" id="images-subtask-value"></img>
            </div>
        </li>
`;
}

function displayInitials(i, initials) {
  return `
          <div>
              <span class="initials" id="initials-span${i}">${initials}</span>
          </div>
      `;
}

function displayInitialsNumber(count) {
  return `
    <div>
        <span>+${count}</span>
    </div>
`;
}

function closeButtonForShowContactsTemplate() {
  return `
            <div>
            <span id="close-contacts" onclick="closeContacts(event, 1)">-</span>
            </div>
        `;
}
