let task = [];
let subtask = [];
let savedTask = [];
let contacts = [];
let contactsNames = [];
let colorClassForContact = [];
let assigned = [];
let listContactsLoaded = false;
let initial = [];
let namesFromContacts = [];
let tasksBoardAdd = [];
let isClicked1 = false;
let isClicked2 = false;
let isClicked3 = false;
let isChecked = [];
let contactChoose = [];
const colorClasses = [
  "orange",
  "purple",
  "blue",
  "pink",
  "yellow",
  "green",
  "red",
];
const URL_CONTACT =
  "https://contacts-c645d-default-rtdb.europe-west1.firebasedatabase.app/";
const TASK_URL =
  "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let resultTask = false;

async function init() {
  includeHTML();
  await fetchContacts();
  loadTasks().then((resultTask) => {
    getNamesFromArray();
    getColorClass();
    load();
    showSubtask();
    hoverSidebar();
  });
  //   await loadTasks();
  //   while (resultTask == false);
  //   getNamesFromArray();
  //   load();
  //   showSubtask();
  //   setTimeout(() => {}, 5000);
  //   hoverSidebar();
}

async function loadTasks() {
  let response = await fetch(TASK_URL + ".json");
  let responseToJson = await response.json();
  if (responseToJson == null) tasksBoardAdd = [];
  else tasksBoardAdd = responseToJson;
  resultTask = true;
}

async function fetchContacts(path = "") {
  try {
    const response = await fetch(URL_CONTACT + path + ".json");
    const data = await response.json();
    contacts = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];

    contacts.forEach((contact) => {
      if (!contact.colorClass) {
        contact.colorClass =
          colorClasses[contacts.indexOf(contact) % colorClasses.length];
      }
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Kontakte:", error);
  }
}

async function putDataTasks(path = "", data = {}) {
  let response = await fetch(TASK_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

function displayAddTask() {
  document
    .getElementById("container-add-task-board")
    .classList.remove("d-none");
}

function closeAddTaskBoard() {
  document.getElementById("container-add-task-board").classList.add("d-none");
}

function getNamesFromArray() {
  contactsNames = contacts.map((contact) => contact.name);
}

let openContacts = false;
function ifIsListContactsLoaded(event, stopPro) {
  if (listContactsLoaded == false) {
    listContactsLoaded = true;
    showContacts();
    closeButtonForShowContacts();
  } else {
    listContactsLoaded = false;
  }
  if (stopPro) event.stopPropagation();
  openContacts = true;
}

function showContacts() {
  let container = document.getElementById("show-contacts");
  container.classList.remove('d-none');

  container.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i].name;

    container.classList.remove("d-none");
    container.innerHTML += displayContactsTemplate(i, contact);
    updateCheckbox(i);
    initialsBackgroundColor(i);
  }
}

function updateCheckbox(i) {
  let idcheckbox = "checkbox-contacts" + i;
  if (contactChoose[i] == true)
    document.getElementById(idcheckbox).setAttribute("checked", "checked");
}

function initialsBackgroundColor(i) {
  let initials = document.getElementById(`initials-bg${i}`);

  initials.style.backgroundColor = contacts[i].colorClass;
}

function closeButtonForShowContacts() {
  let assigny = document.getElementById("input-assigned");

  if (assigny == onfocus) {
    assigned.innerHTML = "";
    document.getElementById("add-button-contacts").innerHTML = `
            <div>
            <span id="close-contacts" onclick="closeContacts(event, 1)">-</span>
            </div>
        `;
  }
}

function closeContacts(event, stopPro) {
  let buttonContacts = document.getElementById("close-contacts");

  document.getElementById("show-contacts").classList.add("d-none");
  // buttonContacts.innerHTML = "";
  buttonContacts.innerHTML = `
             <div>
                 <span>+</span>
             </div>
         `;
  openContacts = false;
  if (stopPro) event.stopPropagation();
  document.getElementById("add-button-contacts").innerHTML = "+";
  listContactsLoaded = false;
}

//-------------Begin initials functions--------------//
function addInitials(i) {
  let ini = document.getElementById("display-initials");
  const initials = getInitials(contacts[i].name);
  if (contactChoose[i] != true) {
    ini.classList.remove("d-none");
    initial.push(initials);
    namesFromContacts.push(contacts[i].name);
  } else {
    for (let i = 0; i < initial.length; i++) {
      if (initial[i] == initials) initial.splice(i, 1);
    }
  }

  ini.innerHTML = "";
  for (let i = 0; i < initial.length; i++) {
    ini.innerHTML += displayInitials(i, initial[i]);
    initalsBackgroundColor(i);
  }
}

function displayInitials(i, initials) {
  return `
        <div>
            <span class="initials" id="initials-span${i}">${initials}</span>
        </div>
    `;
}

function getInitials(name) {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");

  return initials;
}

function initalsBackgroundColor(i) {
  let ini = document.getElementById(`initials-span${i}`);

  ini.style.backgroundColor = contacts[i].colorClass;
}
//-------------End initials functions--------------//

function checkContactsInList(i, event, stopPro) {
  let contactChecked = document.getElementById(`checkbox-contacts${i}`);
  if (contactChecked.checked == true) {
    contactChoose[i] = true;
    displayInitials();
    isChecked.push(contactChecked.checked);
  } else {
    contactChoose[i] = false;
    uncheckContactInList(i, contactChecked);
  }
  save();
  if (stopPro) event.stopPropagation();
}

function uncheckContactInList(i, contactChecked) {
  if (contactChecked.checked == false) {
    initial.splice(i);
    isChecked.splice(i);
    displayInitials();
  }
}

function clearInputs() {
  document.getElementById("input-title").value = "";
  document.getElementById("input-description").value = "";
  document.getElementById("input-date").valueAsDate = null;
  document.getElementById("input-subtask").value = "";
  document.getElementById("show-subtask").innerHTML = "";
  spliceTask();
  document.getElementById("input-category").value = "";
  document.getElementById("display-initials").innerHTML = "";
  document.getElementById("input-prio1").style.backgroundImage =
    "url(../assets/img/urgent_button.svg)";
  document.getElementById("input-prio2").style.backgroundImage =
    "url(../assets/img/medium_button.svg)";
  document.getElementById("input-prio3").style.backgroundImage =
    "url(../assets/img/low_button.svg)";
  save();
}

function catergoryClear() {
  let category = document.getElementById("input-category");
  if (category == !"") {
    category = document.createElement("IMG");
    category.src = "../assets/img/close.png";
  }
}

function imageOnSubtask() {
  let subtask = document.getElementById("input-subtask");

  if (subtask.onfocus) {
    subtask.style.backgroundImage = "url(../assets/img/add.svg)";
    subtask.style.backgroundPosition = "center";
  }
}

let openCategorie = false;
function showCategorie(event, stopPro) {
  let display = document.getElementById("display-categorie");
  document.getElementById("input-categorie-image-down").classList.add("d-none");
  document
    .getElementById("input-categorie-image-up")
    .classList.remove("d-none");
  display.classList.remove("d-none");
  openCategorie = true;
  display.innerHTML = "";
  display.innerHTML = `
      <div>
        <h2 class="technical-categorie" id="technical-input" onclick="addToInputTechnical()">Technical Task</h2>
        <h2 class="user-categorie" onclick="addToInputUser()">User Story</h2>
      </div>
    `;
  if (stopPro == true) event.stopPropagation();
}

function addToInputTechnical() {
  let value = document.getElementById("input-category");
  value.value = "Technical Task";
  closeCategorie();
}

function addToInputUser() {
  let value = document.getElementById("input-category");
  value.value = "User Story"; // setze den Textinhalt anstelle des Elements
  closeCategorie();
}

function closeCategorie(event, stopPro) {
  let display = document.getElementById("display-categorie");
  let down = document.getElementById("input-categorie-image-down");
  let up = document.getElementById("input-categorie-image-up");

  up.classList.add("d-none");
  display.classList.add("d-none");
  down.classList.remove("d-none");

  if (stopPro == true) event.stopPropagation();
  openCategorie = false;
}

function showSubtask() {
  let inputs = document.getElementById("show-subtask");
  inputs.innerHTML = "";

  for (let i = 0; i < task.length; i++) {
    let tasks = task[i];

    inputs.innerHTML += showSubtaskTemplate(i, tasks);
  }
}

function addSubTask() {
  let input = document.getElementById("input-subtask");
  checkRequieredValues(
    input,
    document.getElementById("error-message-subtasks")
  );
  if (input.value.trim() != "") {
    task.push(input.value);
    showSubtask();
  }
  input.value = "";
  save();
}

function addTask() {
  let title = document.getElementById("input-title");
  let date = document.getElementById("input-date");
  let category = document.getElementById("input-category");
  checkRequieredValues(title, document.getElementById("error-message-title"));
  checkRequieredValues(date, document.getElementById("error-message-date"));
  checkRequieredValues(
    category,
    document.getElementById("error-message-category")
  );

  if (title.value != "" && date.valueAsDate != null && category.value != "") {
    createTask();
    document.getElementById("add_task").classList.remove("d-none");
    setTimeout(function () {
      window.open("board.html");
    }, 2000);
  }
  save();
}

function checkRequieredValues(data, error) {
  if (!data.value) {
    data.classList.add("error");
    error.style.display = "inline";
  } else {
    data.classList.remove("error");
    error.style.display = "none";
  }
}

async function createTask(i) {
  let title = document.getElementById("input-title");
  let description = document.getElementById("input-description");
  let assigned = document.getElementById("show-contacts");
  let date = document.getElementById("input-date").valueAsDate;
  date.valueAsDate = formDate(date);
  let category = document.getElementById("input-category");
  let name = namesFromContacts;
  let color = colorClassForContact;
  let prio = getPrio();
  let subtask = getTask();

  let sumContacts = [];
  for (let i = 0; i < name.length; i++) {
    sumContacts[i] = {
      name: name[i],
      color: color[i],
    };
  }

  let task = {
    title: title.value,
    description: description.value,
    assigned: assigned.value,
    date: date.valueAsDate,
    category: category.value,
    subtasks: [
      {
        text: subtask,
        checked: "0",
      },
    ],
    prio: prio,
    "assigned to": {
      name: "", //name,
      color: "", //color,
    },
    taskApplication: 0,
  };
  task["assigned to"] = sumContacts;

  tasksBoardAdd.push(task);
  putDataTasks((path = ""), tasksBoardAdd);
  clearInputs();
  spliceTask();
  save();
}

function getColorClass() {
  for (let i = 0; i < contacts.length; i++) {
    const colorClass = contacts[i].colorClass;

    colorClassForContact.push(colorClass);
  }
}

function formDate(dateTask) {
  const isoDate = dateTask;
  const date = new Date(isoDate);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Monate sind 0-basiert
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

function spliceTask() {
  task.splice(0, task.length);
  return task;
}

function getPrio() {
  if (isClicked1 == true) {
    return 1;
  }
  if (isClicked2 == true) {
    return 2;
  }
  if (isClicked3 == true) {
    return 3;
  }
}

function getTask() {
  for (let i = 0; i < task.length; i++) {
    let tasks = task[i];

    return tasks;
  }
}

function hoverValueFromSubtask(i) {
  let subtask = document.getElementById(`subtask${i}`);
  let images = document.getElementById(`images-subtask${i}`);

  subtask.addEventListener("mouseover", function () {
    mouseOver(subtask, images);
  });

  subtask.addEventListener("mouseout", function () {
    mouseOut(subtask, images);
  });
}

function mouseOver(subtask, images) {
  images.classList.remove("d-none");
  subtask.style.backgroundColor = "#FFFFFF";
}

function mouseOut(subtask, images) {
  images.classList.add("d-none");
  subtask.style.backgroundColor = "rgba(0,0,0,0)";
}

function deleteTask(i) {
  task.splice(i, 1);
  showSubtask();
  save();
}

function editSubtask(i) {
  let button = document.getElementById("add-button-subtask");
  let newValue = document.getElementById(`input-subtask`);

  button.classList.add("d-none");
  newValue.focus();
  newValue.innerHTML = `
            <img src="../assets/img/edit.png"></img>
    `;

  task.push(i, newValue);
  save();
}

function changePrioButtonUrgent() {
  document.getElementById("input-prio1").style.backgroundImage =
    "url(../assets/img/urgent_button_active.svg)";
  document.getElementById("input-prio2").style.backgroundImage =
    "url(../assets/img/medium_button.svg)";
  document.getElementById("input-prio3").style.backgroundImage =
    "url(../assets/img/low_button.svg)";
  isClicked1 = true;
  isClicked2 = false;
  isClicked3 = false;
}

function changePrioButtonMedium() {
  document.getElementById("input-prio2").style.backgroundImage =
    "url(../assets/img/medium_button_active.svg)";
  document.getElementById("input-prio1").style.backgroundImage =
    "url(../assets/img/urgent_button.svg)";
  document.getElementById("input-prio3").style.backgroundImage =
    "url(../assets/img/low_button.svg)";
  isClicked1 = false;
  isClicked2 = true;
  isClicked3 = false;
}

function changePrioButtonLow() {
  document.getElementById("input-prio3").style.backgroundImage =
    "url(../assets/img/low_button_active.svg)";
  document.getElementById("input-prio1").style.backgroundImage =
    "url(../assets/img/urgent_button.svg)";
  document.getElementById("input-prio2").style.backgroundImage =
    "url(../assets/img/medium_button.svg)";
  isClicked1 = false;
  isClicked2 = false;
  isClicked3 = true;
}

function save() {
  let tasksAsText = JSON.stringify(task);
  localStorage.setItem("tasks", tasksAsText);
}

function load() {
  let tasksAsText = localStorage.getItem("tasks");
  if (tasksAsText) {
    task = JSON.parse(tasksAsText);
  }
}

window.addEventListener("click", function (event) {
  if (openCategorie) {
    openCategorie = false;
    closeCategorie();
    closeButtonForShowContacts();
  }
  if (openContacts) {
    openContacts = false;
    closeContacts();
  }
});
