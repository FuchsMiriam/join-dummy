let task = [];
let savedTask = [];
let contacts = [];
const URL_CONTACT = "https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";


async function init() {
    addSubTask();
    await loadTasks();
}

async function loadTasks(path = "") {
    // let response = await fetch(URL_CONTACT + ".json");
    // let responseToJSON = await response.json();
    // contacts.push(responseToJSON);
    // console.log(contacts);
    // showContacts();
    let response = await fetch(URL_CONTACT + path + ".json");
  let data = await response.json();
  contacts = data ? Object.values(data):[];
  contacts.sort((a, b) => a.name.localeCompare(b.name)); 
  console.log(contacts);
}

function showContacts() {
    let container = document.getElementById('show-contacts');

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i].name;

        container.innerHTML += `
        <div class="display-contacts-dropdown">
            <ol>
                <li class="contact-list">
                    ${contact} <input type="checkbox" class="contacts-checkbox">
                </li>
            </ol>
        </div>
        `;
    }
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

            inputs.innerHTML += `
            <ul id="subtask${i}">
                <li onclick="editValue()">
                    ${tasks}
                </li>
            </ul>
        `;
    }
}

function editValue() {
    let edit = document.getElementById(`subtask${i}`).value;

    savedTask.push(edit);
    loadTasks();
}

function loadTask() {
    
}

// function showHover() {
//     document.getElementById(`subtask${i}`).classList.add('sub-hover');
// }

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