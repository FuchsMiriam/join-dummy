let tasks = [];
let subtaskAdd = [];
let contacts = [];
let contactsNames = [];
let colorClassForContact = [];
let assigned = [];
let listContactsLoaded = false;
let initial = [];
let initialName = [];
let initialColor = [];
let namesFromContacts = [];
let tasksBoardAdd = [];
let isClicked1 = false;
let isClicked2 = false;
let isClicked3 = false;
let isChecked = [];
let contactChoose = [];
let currentColumn = 0;
let tasksBd = [];
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
  } catch (error) {}
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

function getNamesFromArray() {
  contactsNames = contacts.map((contact) => contact.name);
}

let openContacts = false;
function ifIsListContactsLoaded(event, stopPro, fktEdit) {
  if (listContactsLoaded == false) {
    listContactsLoaded = true;
    showContacts(fktEdit);
    closeButtonForShowContacts();
  } else {
    listContactsLoaded = false;
  }
  if (stopPro) event.stopPropagation();
  openContacts = true;
}

function showContacts() {
  let container = document.getElementById("show-contacts");

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

function updateCheckEdit(nameEdit) {
  for (let i = 0; i < contacts.length; i++) {
    if (nameEdit == contacts[i].name) {
      contactChoose[i] = true;
    } else if (contactChoose[i] != true) contactChoose[i] = false;
  }
}

function cleanCheckbox() {
  for (let i = 0; i < contacts.length; i++) {
    document.getElementById(`checkbox-contacts${i}`).checked = false;
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
    document.getElementById("add-button-contacts").innerHTML =
      closeButtonForShowContactsTemplate();
  }
}

function closeContacts(event, stopPro) {
  let buttonContacts = document.getElementById("close-contacts");

  document.getElementById("show-contacts").classList.add("d-none");
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
    addNewSelectedContact(i, initials, ini);
  } else {
    for (let id = 0; id < initial.length; id++) {
      if (initial[id] == initials) {
        initial.splice(id, 1);
        initialName.splice(id, 1);
        contactChoose[i] = false;
      }
    }
  }
  ini.innerHTML = "";
  // for (let i = 0; i < initial.length; i++) {
  //   ini.innerHTML += displayInitials(i, initial[i]);
  //   initalsBackgroundColor(i);
  // }
  showSelectedContacts(ini);
}

function addNewSelectedContact(i, initials, ini) {
  ini.classList.remove("d-none");
  initial.push(initials);
  initialName.push(contacts[i].name);
  namesFromContacts.push(contacts[i].name);
  contactChoose[i] = true;
}

function showSelectedContacts(ini) {
  let count = 0;
  for (let i = 0; i < initial.length; i++) {
    if (i < 4) {
      ini.innerHTML += displayInitials(i, initial[i]);
      initalsBackgroundColor(i);
    } else count++;
  }
  if (count) ini.innerHTML += displayInitialsNumber(count);
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

  for (let i = 0; i < tasks.length; i++) {
    let showtasks = tasks[i];
    inputs.innerHTML += showSubtaskTemplate(i, showtasks);
  }
}

function addSubTask() {
  let input = document.getElementById("input-subtask");
  checkRequieredValues(
    input,
    document.getElementById("error-message-subtasks")
  );
  if (input.value.trim() != "") {
    tasks.push(input.value);
    showSubtask();
  }
  input.value = "";
  save();
}

function shortURL(url) {
  return url.substring(url.lastIndexOf("/") + 1);
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
      if (shortURL(document.referrer) != "board.html")
        window.location.href = "../html/board.html";
      else {
        document.getElementById("add_task").classList.add("d-none");
        if ((window.location.href = "../html/board.html")) {
          closeAddTaskBoard();
        } else {
          renderTasks();
        }
      }
    }, 2000);
  }
  save();
}

function addOrEditTask() {
  contactChoose = [];
  if (useEditFunction) addTaskEdit();
  else addTask();
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
