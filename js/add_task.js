let task = [];
let savedTask = [];
let contacts = [];
let contactsNames = [];
let assigned = [];
let isListContactsLoaded = false;
const URL_CONTACT = "https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";


async function init() {
    addSubTask();
    await loadTasks();
    await getNamesFromArray();
}

async function loadTasks(path = "") {
    let response = await fetch(URL_CONTACT + path + ".json");
    let data = await response.json();
    contacts = data ? Object.values(data) : [];
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    console.log(contacts);
}

async function getNamesFromArray() {
    for (let j = 0; j < contacts.length; j++) {
        const names = contacts[j].name;

        contactsNames.push(names);
    }
}

function showContacts() {
    let container = document.getElementById('show-contacts');
    getInitials();

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i].name;

        container.innerHTML +=
            displayContactsTemplate(i, contact)
    }
}

function ifIsListContactsLoaded() {
    document.getElementById('input-assigny').addEventListener('click', function() {
        if(!isListContactsLoaded) {
            showContacts();
            isListContactsLoaded = true;
            closeButtonForShowContacts();
        }
    })
}

function closeButtonForShowContacts() {
    let assigny = document.getElementById('input-assigny');

    assigny.style.backgroundImage = 'url(../assets/img/close.png)';
    assigny.style.backgroundRepeat = 'no-repeat';
    assigny.style.backgroundPosition = 'right';
}

function addInitials(i, contact) {
    let ini = document.getElementById('display-initials');

    assigned.push(contact[i]);
}

function getInitials() {
    const nameParts = contactsNames.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');

    return initials;
}

function clearInputs() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-description').value = '';
    document.getElementById("input-date").valueAsDate = null;
    document.getElementById('input-subtask').value = '';
    document.getElementById('input-prio1').style.backgroundImage = "url(../assets/img/urgent_button.svg)";
    document.getElementById('input-prio2').style.backgroundImage = "url(../assets/img/medium_button.svg)";
    document.getElementById('input-prio3').style.backgroundImage = "url(../assets/img/low_button.svg)";
    task.splice(0, task.length);
    addSubTask();
}

function catergoryClear() {
    let category = document.getElementById('input-category');
    if (category == !'') {
        category = document.createElement('IMG');
        category.src = '../assets/img/close.png';
    }
}

function imageOnSubtask() {
    let subtask = document.getElementById('input-subtask');

    if (subtask.onfocus) {
        subtask.style.backgroundImage = "url(../assets/img/add.svg)";
        subtask.style.backgroundPosition = "center";
    }
}

function showSubtask() {
    let inputs = document.getElementById('show-subtask');
    inputs.innerHTML = '';

    for (let i = 0; i < task.length; i++) {
        let tasks = task[i];

        inputs.innerHTML +=
            showSubtaskTemplate(i, tasks)
    }
}

function editValue() {

}

function addSubTask() {
    let input = document.getElementById('input-subtask');

    task.push(input.value);

    showSubtask();
    input.value = '';
}

function changePrioButtonUrgent() {
    document.getElementById('input-prio1').style.backgroundImage = "url(../assets/img/urgent_button_active.svg)";
    document.getElementById('input-prio2').style.backgroundImage = "url(../assets/img/medium_button.svg)";
    document.getElementById('input-prio3').style.backgroundImage = "url(../assets/img/low_button.svg)";
}

function changePrioButtonMedium() {
    document.getElementById('input-prio2').style.backgroundImage = "url(../assets/img/medium_button_active.svg)";
    document.getElementById('input-prio1').style.backgroundImage = "url(../assets/img/urgent_button.svg)";
    document.getElementById('input-prio3').style.backgroundImage = "url(../assets/img/low_button.svg)";
}

function changePrioButtonLow() {
    document.getElementById('input-prio3').style.backgroundImage = "url(../assets/img/low_button_active.svg)";
    document.getElementById('input-prio1').style.backgroundImage = "url(../assets/img/urgent_button.svg)";
    document.getElementById('input-prio2').style.backgroundImage = "url(../assets/img/medium_button.svg)";
}