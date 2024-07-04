function displayContactsTemplate(i, contact) {
  const nameParts = contact.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");
  return `
    <div class="display-contacts-dropdown"  id='contacts${i}'>
            <div class="contact-list">
                <span class="initials-contacts" id="initials-bg${i}">${initials}</span>
                <span class="contact-span" id="contact-span-name${i}">${contact} </span>
                <input type="checkbox" id="checkbox-contacts${i}" class="contacts-checkbox" onclick="addInitials(${i}, '${contact}'); checkContactsInList(${i}, event, 1)">
            </div>
    </div>
    `;
}

function showSubtaskTemplate(i, tasks) {
  return `
        <li class="subtask-span" id="subtask${i}" onmouseover="hoverValueFromSubtask(${i})">
            ${tasks}
            <div id='images-subtask${i}' class="d-none">
                <img src="../assets/img/close.png" class="subtask-button" onclick="deleteTask(${i})" class="d-none" id="images-subtask-value"></img>
                <img src="../assets/img/edit.png" class="subtask-button" onclick="editSubtask(${i})" class="d-none" id="images-subtask-value"></img>
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

  function closeButtonForShowContactsTemplate() {
  return `
            <div>
            <span id="close-contacts" onclick="closeContacts(event, 1)">-</span>
            </div>
        `;
  }