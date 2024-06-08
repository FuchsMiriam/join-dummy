function displayContactsTemplate(i, contact, initial) {
    return `
    <div class="display-contacts-dropdown"  id='contacts${i}'>
            <div class="contact-list">
                <span class="contact-span">${contact} <input type="checkbox" class="contacts-checkbox" onclick="addInitials(${i}, '${contact}')"></span>
            </div>
    </div>
    `;
}

function showSubtaskTemplate(i, tasks) {
    return `
    <ul id="subtask${i}">
        <li onclick="editValue()" class="subtask-span">
            ${tasks}
        </li>
    </ul>
`;
}