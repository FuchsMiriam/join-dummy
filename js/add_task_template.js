function displayContactsTemplate(i, contact) {
    const nameParts = contact.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');
    return `
    <div class="display-contacts-dropdown"  id='contacts${i}'>
            <div class="contact-list">
                <span class="initials-contacts" id="initials-bg${i}">${initials}</span>
                <span class="contact-span">${contact} </span>
                <input type="checkbox" id="checkbox-contacts${i}" class="contacts-checkbox" onclick="addInitials(${i}, '${contact}'); checkContactsInList(${i})">
            </div>
    </div>
    `;
}

function showSubtaskTemplate(i, tasks) {
    return `
        <li class="subtask-span" id="subtask${i}">
            <span onmouseover="hoverValueFromSubtask(${i})" contenteditable="true" id="task-edit">${tasks}</span>
            <div id='images-subtask${i}' class="d-none">
                <img src="../assets/img/close.png" class="subtask-button" onclick="deleteTask(${i})"></img>
                <img src="../assets/img/edit.png" class="subtask-button" onclick="editSubtask(${i})"></img>
            </div>
        </li>
`;
}