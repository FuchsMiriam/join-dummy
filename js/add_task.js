let task = [];

function init() {
    addSubTask();
}

function clearInputs() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-description').value = '';
    document.getElementById('input-assigned').ariaValueText = null;
    document.getElementById("input-date").valueAsDate = null;
    document.getElementById('input-subtask').value = '';
}

function catergoryClear() {
    let category = document.getElementById('input-category');
    if(category == !'') {
        category = document.createElement('IMG');
        category.src = '../assets/img/close.png';
    }
}

function addSubTask() {
    let inputs = document.getElementById('show-subtask');
    inputs.innerHTML = '';

    for(let i = 0; i < task.length; i++) {
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