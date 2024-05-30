let task = [];
let contacts = [];
const URL_CONTACT = " https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";

async function init() {
    addSubTask();
    await loadTasks();
}

async function loadTasks() {
    let response = await fetch(URL_CONTACT + ".json");
    let responseToJSON = await response.json();
    tasks = responseToJSON;
    console.log(tasks);
    contacts.push(tasks);
}

function showContacts() {
    let container = document.getElementById('show-assigned');

    for (let i = 0; i < contacts[0].length; i++) {
        const contact = contacts[0][i].name;

        container.innerHTML += `
        <div>
        ${contact}
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

    function addSubTask() {
        let inputs = document.getElementById('show-subtask');
        inputs.innerHTML = '';

        for (let i = 0; i < task.length; i++) {
            let tasks = task[i];

            inputs.innerHTML += `
            <ul>
                <li>
                    ${tasks}
                </li>
            </ul>
        `;
        }
        inputs.value = '';
    }

    function valueNewTask() {
        let valueTask = document.getElementById('input-subtask');

        task.push(valueTask.value);

        addSubTask();
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