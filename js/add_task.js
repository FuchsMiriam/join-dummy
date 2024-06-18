let task = [];
let savedTask = [];
let contacts = [];
let contactsNames = [];
let assigned = [];
let listContactsLoaded = false;
let initial = [];
let tasksBoard = [];
let isClicked1 = false;
let isClicked2 = false;
let isClicked3 = false;
const colorClasses = ['orange', 'purple', 'blue', 'pink', 'yellow', 'green', 'red'];
const URL_CONTACT = "https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";
const TASK_URL = "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";


async function init() {
    await getNamesFromArray();
    await fetchContacts();
    await loadTasks();
    load()
    showSubtask();
}

async function loadTasks() {
    let response = await fetch(TASK_URL + ".json");
    let responseToJson = await response.json();
    tasksBoard = responseToJson;
}


async function fetchContacts(path = "") {
    try {
        const response = await fetch(URL_CONTACT + path + ".json");
        const data = await response.json();
        contacts = data
            ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
            : [];

        contacts.forEach(contact => {
            if (!contact.colorClass) {
                contact.colorClass = colorClasses[contacts.indexOf(contact) % colorClasses.length];
            }
        });
    } catch (error) {
        console.error("Fehler beim Abrufen der Kontakte:", error);
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


function getNamesFromArray() {
    contactsNames = contacts.map(contact => contact.name);
}

function ifIsListContactsLoaded() {
    if (listContactsLoaded == false) {
        listContactsLoaded = true;
        showContacts();
        closeButtonForShowContacts();

    }
}


function showContacts() {
    let container = document.getElementById('show-contacts');

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i].name;

        container.classList.remove('d-none');
        container.innerHTML +=
            displayContactsTemplate(i, contact);
    }
}



function closeButtonForShowContacts() {
    let assigny = document.getElementById('input-assigned');

    if (assigny == onfocus) {
        assigned.innerHTML = '';
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
    const initials = getInitials(contacts[i].name);
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
    document.getElementById('show-subtask').innerHTML = '';
    spliceTask();
    document.getElementById('input-category').value = '';
    document.getElementById('display-initials').innerHTML = '';
    document.getElementById('input-prio1').style.backgroundImage = "url(../assets/img/urgent_button.svg)";
    document.getElementById('input-prio2').style.backgroundImage = "url(../assets/img/medium_button.svg)";
    document.getElementById('input-prio3').style.backgroundImage = "url(../assets/img/low_button.svg)";
    save();
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

    if (input.value.trim() == '') {
        alert('Bitte eintrag hinzufügen')
    } else {
        task.push(input.value);
        showSubtask();
    }
    input.value = '';
    save()
}


function addTask() {
    let title = document.getElementById('input-title');
    let date = document.getElementById("input-date");
    let category = document.getElementById('input-category');

    if (title.value == '' ||
        date.valueAsDate == null ||
        category.value == '') {
        alert('Bitte alle pflichtfelder ausfüllen!');
    } else {
        createTask();

        document.addEventListener("DOMContentLoaded", function () {
            setTimeout(function () {
                window.location.href = "board.html";
            }, 3000);
        });
    }
    save();
}


async function createTask() {
    let title = document.getElementById('input-title');
    let description = document.getElementById('input-description');
    let assigned = document.getElementById('show-contacts');
    let date = document.getElementById('input-date');
    let category = document.getElementById('input-category');
    // let initial = initial;
    let prio = getPrio();
    let subtask = getTask();

    let task = {
        title: title.value,
        description: description.value,
        assigned: assigned.value,
        date: date.valueAsDate,
        category: category.value,
        subtask: subtask,
        prio: prio,
        initial: initial,
    };

    tasksBoard.push(task);
    putData(path = "", tasksBoard);
    clearInputs();
    spliceTask();
    save();
}


function spliceTask() {
    task.splice(0, task.length)
    return task
}


function getPrio() {
    let prio1 = document.getElementById('input-prio1');
    let prio2 = document.getElementById('input-prio2');
    let prio3 = document.getElementById('input-prio3');

    if (prio1.onfocus) {
        isClicked1 == true;
        return 1;
    }
    if (prio2.onfocus) {
        isClicked2 == true;
        return 2;
    }
    if (prio3.onfocus) {
        isClicked3 == true;
        return 3;
    }
}

function getTask() {
    for (let i = 0; i < task.length; i++) {
        let tasks = task[i];

        return tasks;
    }
}

// function getInitial(initial) {
//     for (let j = 0; j < initial.length; j++) {
//         const initials = initial[i];

//         return initials;
//     }
// }


function hoverValueFromSubtask(i) {
    let subtask = document.getElementById(`subtask${i}`);
    let images = document.getElementById(`images-subtask${i}`);

    subtask.addEventListener('mouseover', function() {
        mouseOver(subtask, images);
    });
    
     subtask.addEventListener('mouseout', function() {
        mouseOut(subtask, images);
     });
}

function mouseOver(subtask, images) {
    images.classList.remove('d-none');
    subtask.style.backgroundColor = '#FFFFFF';
}


function mouseOut(subtask, images) {
    images.classList.add('d-none');
    subtask.style.backgroundColor = 'rgba(0,0,0,0)';
}

function deleteTask(i) {
    task.splice(i, 1)
    showSubtask();
    save();
}


function editSubtask(i) {
    // let editFocus = document.getElementById('input-subtask');
        // editFocus.focus();
    let newValue = document.getElementById(`subtask${i}`);

    task.push(i, newValue);
    save();
}


function pushNewValue(i, newValue) {
    task.splice(i, 1);
    task.addEventListener('keypress', function(e) {
        if(e.key === 'enter') {
            task.push(i, newValue
            )
        }
    })
    task.push(i, newValue);
}


function changePrioButtonUrgent() {
    document.getElementById('input-prio1').style.backgroundImage = "url(../assets/img/urgent_button_active.svg)";
    document.getElementById('input-prio2').style.backgroundImage = "url(../assets/img/medium_button.svg)";
    document.getElementById('input-prio3').style.backgroundImage = "url(../assets/img/low_button.svg)";
    isClicked1 = true;
    isClicked2 = false;
    isClicked3 = false;
}


function changePrioButtonMedium() {
    document.getElementById('input-prio2').style.backgroundImage = "url(../assets/img/medium_button_active.svg)";
    document.getElementById('input-prio1').style.backgroundImage = "url(../assets/img/urgent_button.svg)";
    document.getElementById('input-prio3').style.backgroundImage = "url(../assets/img/low_button.svg)";
    isClicked2 = true;
    isClicked1 = false;
    isClicked3 = false;
}


function changePrioButtonLow() {
    document.getElementById('input-prio3').style.backgroundImage = "url(../assets/img/low_button_active.svg)";
    document.getElementById('input-prio1').style.backgroundImage = "url(../assets/img/urgent_button.svg)";
    document.getElementById('input-prio2').style.backgroundImage = "url(../assets/img/medium_button.svg)";
    isClicked3 = true;
    isClicked2 = false;
    isClicked1 = false;
}


function save() {
    let tasksAsText = JSON.stringify(task);
    localStorage.setItem('tasks', tasksAsText);
}


function load() {
    let tasksAsText = localStorage.getItem('tasks');
    if (tasksAsText) {
        task = JSON.parse(tasksAsText);
    }
}