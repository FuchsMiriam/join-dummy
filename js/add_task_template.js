function displayContactsTemplate(i, contact) {
    const nameParts = contact.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');
    return `
    <div class="display-contacts-dropdown"  id='contacts${i}'>
            <div class="contact-list">
                <span class="initials-contacts">${initials}</span>
                <span class="contact-span">${contact} </span>
                <input type="checkbox" class="contacts-checkbox" onclick="addInitials(${i}, '${contact}')">
            </div>
    </div>
    `;
}

function showSubtaskTemplate(i, tasks) {
    return `
        <li class="subtask-span" id="subtask${i}">
            <span onmouseover="hoverValueFromSubtask(${i})" contenteditable="true">${tasks}</span>
            <div id='images-subtask${i}' class="d-none">
                <img src="../assets/img/close.png" onclick="deleteTask(${i})"></img>
                <img src="../assets/img/edit.png" onclick="editSubtask(${i})"></img>
            </div>
        </li>
`;
}