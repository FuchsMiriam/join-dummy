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
    <ul id="subtask${i}">
        <li onclick="editValue()" class="subtask-span">
            <span onclick="postData${i}()">${tasks}</span>
            <img id="hover-image-1"></img>
            <img id="hover-image-2"></img>
        </li>
    </ul>
`;
}