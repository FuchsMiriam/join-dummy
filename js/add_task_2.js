async function createTask() {
  let task = buildTask();

  tasksBoardAdd.push(task);
  tasksBd.push(task);

  putDataTasks((path = ""), tasksBoardAdd);
  clearInputs();
  spliceTask();
  save();
}

function buildTask() {
  let { title, description, assigned, date, category, prio } = getTaskDetails();

  return {
    title: title,
    description: description,
    assigned: assigned,
    date: date,
    category: category,
    subtasks: getSubtasks(),
    prio: prio,
    "assigned to": getSumContacts(),
    taskApplication: currentColumn,
  };
}

function getTaskDetails() {
  let title = document.getElementById("input-title").value;
  let description = document.getElementById("input-description").value;
  let assigned = document.getElementById("show-contacts");
  let date = document.getElementById("input-date").valueAsDate;
  date.valueAsDate = formDate(date);
  let category = document.getElementById("input-category");
  let prio = getPrio();

  return { title, description, assigned, date, category, prio };
}

function getSumContacts() {
  let name = namesFromContacts;
  let color = colorClassForContact;
  return name.map((n, i) => ({ name: n, color: color[i] }));
}

function getSubtasks() {
  return tasks.map((t) => ({ text: t, checked: "0" }));
}

function getColor(name) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name == name) return contacts[i].colorClass;
  }
}

function getColorClass() {
  for (let i = 0; i < contacts.length; i++) {
    const colorClass = contacts[i].colorClass;

    colorClassForContact.push(colorClass);
  }
}

function getTaskApplication() {
  if (tasksBd[openTask].taskApplication != null)
    return tasksBd[openTask].taskApplication;
  else return 0;
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
  tasks.splice(0, tasks.length);
  return tasks;
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


let openEditChangeSubtasks = 0;
function hoverValueFromSubtask(i) {
  openEditChangeSubtasks = 1;
  let subtask = document.getElementById(`subtask${i}`);
  let images = document.getElementById(`images-subtask${i}`);

  if (subtask && images) {
    subtask.addEventListener("mouseover", function () {
      mouseOver(subtask, images);
    });

    subtask.addEventListener("mouseout", function () {
      mouseOut(subtask, images);
    });

    subtask.addEventListener('touchstart', function() {
      mouseOver(subtask, images);
    });
  }
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
  tasks.splice(i, 1);
  showSubtask();
  save();
}

function editSubtask(i) {
  let subtask = document.getElementById(`subtask${i}`);

  subtask.innerHTML = editSubtaskTemplate(i);

  save();
}

function updateSubtask(i) {
  let input = document.getElementById(`update-subtask-input${i}`).value;

  tasks[i] = input;

  showSubtask();
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
  let tasksAsText = JSON.stringify(tasks);
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

function checkContacts(i) {
  let checkbox = document.getElementById(`checkbox-contacts${i}`);
  addInitials(i);
  toggleChecked(checkbox);
}

function toggleChecked(checkbox) {
  checkbox.checked = !checkbox.checked;
}

function doubleclickSubtaskToEdit(i, event, stopPro) {
  let sub = document.getElementById(`subtask${i}`);

  sub.addEventListener("dblclick", function () {
    editSubtask(i);
  });
}
