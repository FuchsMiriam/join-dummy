let task = [];
let savedTask = [];
let contacts = [];
let contactsNames = [];
let assigned = [];
let listContactsLoaded = false;
let initial = [];
let namesFromContacts = [];
let tasksBoardAdd = [];
let isClicked1 = false;
let isClicked2 = false;
let isClicked3 = false;
let isChecked = [];
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
  // loadTasks().then((resultTask) => {
  //     getNamesFromArray();
  //     load()
  //     showSubtask();
  //     hoverSidebar();
  // });
  await loadTasks();
  while (resultTask == false);
  getNamesFromArray();
  load();
  showSubtask();
  setTimeout(() => {}, 5000);
  hoverSidebar();
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
  contactsNames = contacts.map((contact) => contact.name);
}

function ifIsListContactsLoaded() {
  if (listContactsLoaded == false) {
    listContactsLoaded = true;
    showContacts();
    closeButtonForShowContacts();
  } else {
    listContactsLoaded = false;
  }
}

function showContacts() {
  let container = document.getElementById("show-contacts");

  container.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i].name;

    container.classList.remove("d-none");
    container.innerHTML += displayContactsTemplate(i, contact);
    initialsBackgroundColor(i);
  }
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
            <span id="close-contacts" onclick="closeContacts()">-</span>
            </div>
        `;
  }
}

function closeContacts() {
  let buttonContacts = document.getElementById("close-contacts");

  document.getElementById("show-contacts").classList.add("d-none");
  buttonContacts.innerHTML = "";
  buttonContacts.innerHTML = `
             <div>
                 <span>+</span>
             </div>
         `;
}

//-------------Begin initials functions--------------//
function addInitials(i) {
  let ini = document.getElementById("display-initials");
  const initials = getInitials(contacts[i].name);
  initial.push(initials);

  ini.innerHTML += displayInitials(i, initials);
  initalsBackgroundColor(i);

  namesFromContacts.push(contacts[i].name);
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

function checkContactsInList(i) {
  let contactChecked = document.getElementById(`checkbox-contacts${i}`);

  if (contactChecked.checked == true) {
    displayInitials();
    isChecked.push(contactChecked.checked);
  } else {
    uncheckContactInList(i, contactChecked);
  }
  save();
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

  if (input.value.trim() == "") {
    alert("Bitte eintrag hinzufügen");
  } else {
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

  if (title.value == "" || date.valueAsDate == null || category.value == "") {
    alert("Bitte alle Pflichtfelder ausfüllen!");
  } else {
    createTask();
    // document.getElementById("pop-up-task").classList.remove("d-none");

    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(function () {
        window.location.href = "board.html";
      }, 3000);
    });
  }
  save();
}

async function createTask(i) {
  let title = document.getElementById("input-title");
  let description = document.getElementById("input-description");
  let assigned = document.getElementById("show-contacts");
  let date = document.getElementById("input-date").valueAsDate;
  date.valueAsDate = formDate(date);
  let category = document.getElementById("input-category");
  let names = namesFromContacts;
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
    assigned_to: {
      name: names,
    },
    taskApplication: 0,
  };

  tasksBoardAdd.push(task);
  putData((path = ""), tasksBoardAdd);
  clearInputs();
  spliceTask();
  save();
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

// function pushNewValue(i, newValue) {
//     task.splice(i, 1);
//     task.addEventListener('keypress', function (e) {
//         if (e.key === 'enter') {
//             task.push(i, newValue
//             )
//         }
//     })
//     task.push(i, newValue);
// }

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
