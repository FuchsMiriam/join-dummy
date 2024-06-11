let task = [];
let savedTask = [];
let contacts = [];
let contactsNames = [];
let assigned = [];
let listContactsLoaded = false;
let initial = [];
const URL_CONTACT = "https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";
const TASK_URL = "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";


async function init() {
    addSubTask();
    await loadTasks();
    await getNamesFromArray();
    await fetchContacts();
}


async function loadTasks(path = "") {
    let response = await fetch(URL_CONTACT + path + ".json");
    let data = await response.json();
    contacts = data ? Object.values(data) : [];
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    console.log(contacts);
}


async function fetchContacts(path = "") {
    try {
        const response = await fetch(URL_CONTACT + path + ".json");
        const data = await response.json();
        contacts = data
            ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
            : [];
    } catch (error) {
        console.error("Fehler beim Abrufen der Subtasks:", error);
    }
}


async function putData(path = "", data = {}) {
    let response = await fetch(TASK_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return (responseToJson = await response.json());
}


async function getNamesFromArray() {
    contactsNames = contacts.map(contact => contact.name);
}


function showContacts() {
    let container = document.getElementById('show-contacts');

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i].name;

        container.classList.remove('d-none');
        container.innerHTML +=
            displayContactsTemplate(i, contact)
    }
}


function ifIsListContactsLoaded() {
    document.getElementById('add-button-contacts').addEventListener('click', function () {
        if (listContactsLoaded == false) {
            showContacts();
            closeButtonForShowContacts();
            listContactsLoaded = true;
        }
    })
}


function closeButtonForShowContacts() {
    let assigny = document.getElementById('input-assigned');

    if (assigny == onfocus) {
        document.getElementById('add-button-contacts').innerHTML = `
            <div>
            <span id="close-contacts" onclick="closeContacts()">-</span>
            </div>
        `;
    }
}


function closeContacts() {
    let buttonContacts = document.getElementById('close-contacts');

    document.getElementById('show-contacts').classList.add('d-none');
    buttonContacts.innerHTML = '';
    buttonContacts.innerHTML = `
            <div>
                <span>+</span>
            </div>
        `;
}

//-------------Begin initials functions--------------//
function addInitials(i) {
    let ini = document.getElementById('display-initials');
    const initials = getInitials(contactsNames[i]);
    assigned = contactsNames[i];
    initial.push(initials);


    ini.innerHTML += `
        <div>
            <span class="initials">${initials}</span>
        </div>
    `;
}


function getInitials(name) {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');

    return initials;
}
//-------------End initials functions--------------//

function clearInputs() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-description').value = '';
    document.getElementById("input-date").valueAsDate = null;
    document.getElementById('input-subtask').value = '';
    document.getElementById('input-category').value = '';
    document.getElementById('display-initials').innerHTML = '';
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


function addSubTask() {
    let input = document.getElementById('input-subtask');
    let subTask = {
        subtask: input.value,
    }

    if (input == '') {
        alert('Bitte eintrag hinzufügen')
    } else {
        task.push(input.value);
        showSubtask();
        createTask();
    }
    input.value = '';
}

async function createTask() {
    let title = document.getElementById('input-title');
    let description = document.getElementById('input-description');
    let initial = getInitial();
    let assigned = document.getElementById('show-contacts');
    let date = document.getElementById('input-date');
    let category = document.getElementById('input-category');
    let subtask = getTask();

    let task =  {
        title: title.value,
        description: description.value,
        assigned: assigned.value,
        date: date.valueAsDate,
        category: category.value,
        subtask: subtask,
    };

    await putData("", task);
}

function getTask() {
    for(let i = 0; i < task.length; i++) {
        let tasks = task[i];

        return tasks;
    }
}

function getInitial() {
    for (let j = 0; j < initial.length; j++) {
        const initials = initial[i];
        
        return initials;
    }
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


function addTask() {
    createTask();
    
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() {
            window.location.href = "board.html"; 
        }, 3000); 
    });
}

