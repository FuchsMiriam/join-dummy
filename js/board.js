const BASE_URL =
  "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let tasksBd = [];
let currentTask = 0;
let openTask = 0;
let exampleTask = {
  label: "User Story",
  title: "Einkaufen",
  text: "Obst, Gemüse, Fleisch",
  date: "10/06/2026",
  priority: 1, // 1 - High, 2 - Medium, 3 - Low
  "assigned to": [
    {
      name: "Max Mustermann",
      color: "yellow",
    },
    {
      name: "Anna Müller",
      color: "blue",
    },
  ],
  subtasks: [
    {
      text: "Obst im Rewe",
      checked: "0",
    }, //0 - did not, 1 - did
    {
      text: "Gemüse im Lidl",
      checked: "1",
    }, //0 - did not, 1 - did
  ],
  taskApplication: 0, // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
};
let exampleTask1 = {
  label: "User Story",
  title: "Einkaufen",
  text: "Obst, Gemüse, Fleisch",
  date: "10/06/2026",
  priority: 1, // 1 - High, 2 - Medium, 3 - Low
  "assigned to": [
    {
      name: "Max Mustermann",
      color: "yellow",
    },
    {
      name: "Anna Müller",
      color: "blue",
    },
  ],
  subtasks: [
    {
      text: "Obst im Rewe",
      checked: "0",
    }, //0 - did not, 1 - did
    {
      text: "Gemüse im Lidl",
      checked: "1",
    }, //0 - did not, 1 - did
  ],
  taskApplication: 1, // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
};
let exampleTask2 = {
  label: "User Story",
  title: "Einkaufen",
  text: "Obst, Gemüse, Fleisch",
  date: "10/06/2026",
  priority: 1, // 1 - High, 2 - Medium, 3 - Low
  "assigned to": [
    {
      name: "Max Mustermann",
      color: "yellow",
    },
    {
      name: "Anna Müller",
      color: "blue",
    },
  ],
  subtasks: [
    {
      text: "Obst im Rewe",
      checked: "0",
    }, //0 - did not, 1 - did
    {
      text: "Gemüse im Lidl",
      checked: "1",
    }, //0 - did not, 1 - did
  ],
  taskApplication: 2, // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
};

let result = false;
function boardInit() {
  initHTML();
  loadTasksBoard().then((result) => {
    renderTasks();
    fetchContacts();
    // hoverSidebar();
  });
  fetchContacts();
}

async function loadTasksBoard() {
  let response = await fetch(BASE_URL + ".json");
  let responseToJSON = await response.json();
  tasksBd = responseToJSON;
  result = true;
  return responseToJSON;
}

async function postData(path = "", data = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJSON = await response.json());
}

async function deleteData(path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  return (responseToJSON = await response.json());
}

async function putDataBoard(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

function renderTasks() {
  setBackColumns();
  showTasks();
}

function displayAddTask() {
  document
    .getElementById("container-add-task-board")
    .classList.remove("d-none");
}

function setBackColumns() {
  document.getElementById("toDO").innerHTML = ``;
  document.getElementById("inProgress").innerHTML = ``;
  document.getElementById("awaitFeedback").innerHTML = ``;
  document.getElementById("done").innerHTML = ``;
}

function openDetailCard(idTask) {
  document.getElementById("idDetailCard").innerHTML = detailCardHTML(idTask);
  document.getElementById("idDetailCard").classList.add("leftPart");
  document.getElementById("idDetailCard").classList.remove("leftPartOut");
  checkSubtasks(idTask);
  openTask = idTask;
}

function closeDetailCard(idTask) {
  document.getElementById("idDetailCard").classList.remove("leftPart");
  document.getElementById("idDetailCard").classList.add("leftPartOut");
}

function checkSubtasks(idTask) {
  if (tasksBd[idTask]["subtasks"] == null) return "";
  for (let i = 0; i < tasksBd[idTask]["subtasks"].length; i++) {
    let name = "checkCard" + idTask + i;
    if (tasksBd[idTask]["subtasks"][i].checked == '1')
      document.getElementById(name).setAttribute("checked", "checked");
  }
}

function detailCardHTML(idTask) {
  return /*html*/ `
        <div class="detailCardTaskToDo">
            ${detailCardHTMLLabel(idTask)}
            ${detailCardHTMLTitle(idTask)}
            ${detailCardHTMLContent(idTask)}
            ${detailCardHTMLDate(idTask)}
            ${detailCardHTMLPriority(idTask)}
            ${detailCardHTMLContacts(idTask)}
            ${detailCardHTMLSubtasks(idTask)}
            ${detailCardHTMLDeleteEdit(idTask)}
        </div>
    `;
}

function showTasks() {
  // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
  let tasksToDo = 0;
  let tasksInProgress = 0;
  let tasksAwaitFeedback = 0;
  let tasksDone = 0;
  setBackColumns();
  if (tasksBd == null)
    return checkNoTasks(
      tasksToDo,
      tasksInProgress,
      tasksAwaitFeedback,
      tasksDone
    );
  for (let i = 0; i < tasksBd.length; i++) {
    if (tasksBd[i].taskApplication == 0) tasksToDo += addTaskBoard(i, "toDO");
    else if (tasksBd[i].taskApplication == 1)
      tasksInProgress += addTaskBoard(i, "inProgress");
    else if (tasksBd[i].taskApplication == 2)
      tasksAwaitFeedback += addTaskBoard(i, "awaitFeedback");
    else if (tasksBd[i].taskApplication == 3)
      tasksDone += addTaskBoard(i, "done");
  }
  checkNoTasks(tasksToDo, tasksInProgress, tasksAwaitFeedback, tasksDone);
}

function addTaskBoard(idTask, idApplication) {
  document.getElementById(idApplication).innerHTML += cardHTML(idTask);
  return 1;
}

function getCheckedTasks(idTask) {
  let checkedTasks = 0;
  for (let i = 0; i < tasksBd[idTask]["subtasks"].length; i++)
    if (tasksBd[idTask]["subtasks"][i]["checked"] == 1) checkedTasks++;
  return checkedTasks;
}

function toggleCheckbox(idTask, idCheckBox) {
  var isChecked = document.getElementById(
    "checkCard" + idTask + idCheckBox
  ).checked;

  tasksBd[idTask]["subtasks"][idCheckBox]["checked"] = isChecked;
  renderTasks();
  putDataBoard((path = ""), tasksBd);
}

function deleteTaskBoard(idTask) {
  tasksBd.splice(idTask, 1);
  closeDetailCard(idTask);
  renderTasks();
  putDataBoard((path = ""), tasksBd);
}

function searchTasks() {
  let input = 0;
  if (window.innerWidth <= 1200)
    input = document.getElementById("searchTaskMobil").value;
  else input = document.getElementById("searchTaskDesktop").value;
  input = input.toLowerCase();

  if (!input.length) renderTasks();
  else {
    setBackColumns();
    showSearchTasks(input);
  }
}

function showSearchTasks(input) {
  // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
  let tasksToDo = 0;
  let tasksInProgress = 0;
  let tasksAwaitFeedback = 0;
  let tasksDone = 0;
  for (let i = 0; i < tasksBd.length; i++) {
    let text = tasksBd[i].description;
    let title = tasksBd[i].title;
    if (
      tasksBd[i].taskApplication == 0 &&
      (text.toLowerCase().includes(input) ||
        title.toLowerCase().includes(input))
    )
      tasksToDo += addTaskBoard(i, "toDO");
    else if (
      tasksBd[i].taskApplication == 1 &&
      (text.toLowerCase().includes(input) ||
        title.toLowerCase().includes(input))
    )
      tasksInProgress += addTaskBoard(i, "inProgress");
    else if (
      tasksBd[i].taskApplication == 2 &&
      (text.toLowerCase().includes(input) ||
        title.toLowerCase().includes(input))
    )
      tasksAwaitFeedback += addTaskBoard(i, "awaitFeedback");
    else if (
      tasksBd[i].taskApplication == 3 &&
      (text.toLowerCase().includes(input) ||
        title.toLowerCase().includes(input))
    )
      tasksDone += addTaskBoard(i, "done");
  }
  checkNoTasks(tasksToDo, tasksInProgress, tasksAwaitFeedback, tasksDone);
}

function foundTask() {
  setBackColumns();
  renderTasks();
  // document.getElementById("searchTask").value = '';
}

function startDragging(idTask) {
  currentTask = idTask;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(category) {
  tasksBd[currentTask]["taskApplication"] = category;
  renderTasks();
  putDataBoard((path = ""), tasksBd);
}

function getTasks() {
  return tasksBd;
}

function openEdit(idTask){
  displayAddTask();
  document.getElementById("input-title").value = tasksBd[idTask].title;
  document.getElementById("input-description-addTask").value = tasksBd[idTask].description;
  document.getElementById("input-date").value = formatDateEdit(tasksBd[idTask].date);
  document.getElementById("input-category").value = tasksBd[idTask].category;
  if(tasksBd[idTask].prio == 3)
    changePrioButtonUrgent();
  else if(tasksBd[idTask].prio == 2)
    changePrioButtonMedium();
  else if(tasksBd[idTask].prio == 1)
    changePrioButtonLow();
  let ini = document.getElementById("display-initials");
  ini.innerHTML = "";
  let initial = [];
  if(tasksBd[idTask]["assigned to"])
  {
    for(let i = 0; i < tasksBd[idTask]["assigned to"].length; i++)
      {
        initial.push(getInitials(tasksBd[idTask]["assigned to"][i].name));
        updateCheckEdit(tasksBd[idTask]["assigned to"][i].name);
        namesFromContacts.push(tasksBd[idTask]["assigned to"][i].name);
      }
      for (let i = 0; i < initial.length; i++) {
        ini.innerHTML += displayInitials(i, initial[i]);
        initalsBackgroundColor(i);
      }
    
  }
  document.getElementById("display-initials").classList.remove("d-none");
  document.getElementById("display-initials").classList.add("z1");
  let inputs = document.getElementById("show-subtask");
  inputs.innerHTML = "";

  if(tasksBd[idTask].subtasks)
  {
    for (let i = 0; i < tasksBd[idTask].subtasks.length; i++) {
      let showtasks = tasksBd[idTask].subtasks[i];
      tasks.push(showtasks.text);
      inputs.innerHTML += showSubtaskTemplate(i, showtasks.text);
    }    
  }
  
}

function formatDateEdit(inputDate) {
  let dateParts = inputDate.split('/');
  let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  console.log(formattedDate);
  return formattedDate;
}