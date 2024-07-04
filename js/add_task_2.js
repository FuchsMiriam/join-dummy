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

  let sumContacts = [];
  for (let i = 0; i < name.length; i++) {
    sumContacts[i] = {
      name: name[i],
      color: color[i],
    };
  }

  let subtasks = [];
  for (let j = 0; j < tasks.length; j++) {
    subtasks[j] = {
      text: tasks[j],
      checked: "0",
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
        text: "", //subtask,
        checked: 0,
      },
    ],
    prio: prio,
    "assigned to": {
      name: "", //name,
      color: "", //color,
    },
    taskApplication: currentColumn,
  };

  task["assigned to"] = sumContacts;
  task["subtasks"] = subtasks;

  tasksBoardAdd.push(task);
  tasksBd.push(task);

  tasksBoardAdd.push(task);
  // pushTask()[openTask] = task;
  putDataTasks((path = ""), tasksBoardAdd);
  clearInputs();
  spliceTask();
  save();
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
  tasks.splice(i, 1);
  showSubtask();
  save();
}

function editSubtask(i) {
  let input = document.getElementById("input-subtask");
  let subtask = document.getElementById(`subtask${i}`);

  document.getElementById("");

  subtask.innerHTML = `
  <div class="input-update-subtask">
        <input id="update-subtask-input${i}" class="input-update-subtask" type="text" value="${tasks[i]}">
      <div id="images-subtask-hover">
        <img src="../assets/img/close.png" class="subtask-button" onclick="deleteTask(${i})" class="d-none images-subtask-hover-1"></img>
        <img src="../assets/img/edit.png" class="subtask-button" onclick="updateSubtask(${i})" class="d-none images-subtask-hover-2"></img>
      </div>
    </div> 
    `;

  save();
}

function updateSubtask(i) {
  let input = document.getElementById(`update-subtask-input${i}`).value;

  tasks.splice(i, 1);
  tasks.push(input);

  showSubtask();
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
