const BASE_URL =
  "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let currentTask = 0;
let openTask = 0;
let useEditFunction = 0;

let result = false;
function boardInit() {
  initHTML();
  loadTasksBoard().then((result) => {
    renderTasks();
    fetchContacts();
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

function openDetailCard(event, idTask, stopPro) {
  document.body.classList.add("overflow-hidden");
  initial = [];
  initialName = [];
  addTaskInitials(idTask);
  document.body.classList.add("overflow-hidden");
  document.getElementById("idDetailCard").classList.remove("d-none");
  document.getElementById("idDetailCard").innerHTML = detailCardHTML(idTask);
  document.getElementById("idDetailCard").classList.add("leftPart");
  document.getElementById("idDetailCard").classList.remove("leftPartOut");
  checkSubtasks(idTask);
  openTask = idTask;
  if (stopPro) 
    event.stopPropagation();
}

function addTaskInitials(idTask){
  if(!tasksBd[idTask]["assigned to"])
    return;
  for(let i = 0; i < tasksBd[idTask]["assigned to"].length; i++)
  {
    initial.push(getInitials(tasksBd[idTask]["assigned to"][i].name));
    initialName.push(tasksBd[idTask]["assigned to"][i].name);
  }
}

function closeDetailCard(idTask) {
  document.body.classList.remove("overflow-hidden");
  document.body.classList.remove("overflow-hidden");
  document.getElementById("idDetailCard").classList.remove("leftPart");
  document.getElementById("idDetailCard").classList.add("leftPartOut");
  document.getElementById("idDetailCard").classList.add("d-none");
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
        <div id="detailCardID" class="detailCardTaskToDo">
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
  let tasksToDo = 0; let tasksInProgress = 0; let tasksAwaitFeedback = 0; let tasksDone = 0;
  setBackColumns();
  if (tasksBd == null)
    return checkNoTasks(tasksToDo,tasksInProgress,tasksAwaitFeedback,tasksDone);
  for (let i = 0; i < tasksBd.length; i++) {
    if(tasksBd[i] === null) tasksBd[i]++;
    else {
      if (tasksBd[i].taskApplication == 0) tasksToDo += addTaskBoard(i, "toDO");
      else if (tasksBd[i].taskApplication == 1) tasksInProgress += addTaskBoard(i, "inProgress");
      else if (tasksBd[i].taskApplication == 2) tasksAwaitFeedback += addTaskBoard(i, "awaitFeedback");
      else if (tasksBd[i].taskApplication == 3) tasksDone += addTaskBoard(i, "done");
    }}
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
  let isChecked = document.getElementById(
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
  let tasksToDo = 0; let tasksInProgress = 0; let tasksAwaitFeedback = 0; let tasksDone = 0;
  for (let i = 0; i < tasksBd.length; i++) {
    let text = tasksBd[i].description;
    let title = tasksBd[i].title;
    if      (tasksBd[i].taskApplication == 0 && (text.toLowerCase().includes(input) || title.toLowerCase().includes(input))) tasksToDo += addTaskBoard(i, "toDO");
    else if (tasksBd[i].taskApplication == 1 && (text.toLowerCase().includes(input) || title.toLowerCase().includes(input))) tasksInProgress += addTaskBoard(i, "inProgress");
    else if (tasksBd[i].taskApplication == 2 && (text.toLowerCase().includes(input) || title.toLowerCase().includes(input))) tasksAwaitFeedback += addTaskBoard(i, "awaitFeedback");
    else if (tasksBd[i].taskApplication == 3 && (text.toLowerCase().includes(input) || title.toLowerCase().includes(input))) tasksDone += addTaskBoard(i, "done");
  }
  checkNoTasksFound(tasksToDo, tasksInProgress, tasksAwaitFeedback, tasksDone);
}

function foundTask() {
  setBackColumns();
  renderTasks();
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

function openEditPrio(idTask){
  if(tasksBd[idTask].prio == 1)
    changePrioButtonUrgent();
  else if(tasksBd[idTask].prio == 2)
    changePrioButtonMedium();
  else if(tasksBd[idTask].prio == 3)
    changePrioButtonLow();
}

function openEditTitleDescriptionDateCategory(idTask){
  document.getElementById("input-title").value = tasksBd[idTask].title;
  document.getElementById("input-description").value = tasksBd[idTask].description;
  document.getElementById("input-date").value = formatDateEdit(tasksBd[idTask].date);
  document.getElementById("input-category").value = tasksBd[idTask].category;
}

function openEditSubtasks(idTask){
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

function openEditContacts(idTask){
  let initial = [];
  let ini = document.getElementById("display-initials");
  ini.innerHTML = "";
  let count = 0;
  for(let i = 0; i < tasksBd[idTask]["assigned to"].length; i++)
  {
    initial.push(getInitials(tasksBd[idTask]["assigned to"][i].name));
    updateCheckEdit(tasksBd[idTask]["assigned to"][i].name);
    namesFromContacts.push(tasksBd[idTask]["assigned to"][i].name);
  }
    for (let i = 0; i < initial.length; i++) {
      if(i < 4){
        ini.innerHTML += displayInitials(i, initial[i]);
        initalsBackgroundColor(i);
      }
      else
        count++;
    }
    if(count)
      ini.innerHTML += displayInitialsNumber(count);
}

function openEdit(idTask){
  clearInputsEdit();
  useEditFunction = 1;
  displayAddTask();
  openEditTitleDescriptionDateCategory(idTask);
  openEditPrio(idTask);
  if(tasksBd[idTask]["assigned to"])
    openEditContacts(idTask);
  document.getElementById("display-initials").classList.remove("d-none");
  document.getElementById("display-initials").classList.add("z1");
  openEditSubtasks(idTask);
}

function formatDateEdit(inputDate) {
  let dateParts = inputDate.split('/');
  let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  return formattedDate;
}

let toogleView = 0;
let openChangeColumn = 0;

function changeColumn(idTask, event, stopPro){
  openChangeColumn = idTask;
  let idChange = "changeColumn" + openChangeColumn;
  if(toogleView){
    document.getElementById(idChange).classList.add("d-none");
    toogleView = 0;
  }else{
    document.getElementById(idChange).classList.remove("d-none");
    dropDownCheckHTML(idTask);
    toogleView = 1;
  }
  
  if (stopPro) 
    event.stopPropagation();
}

function dropDownCheckHTML(idTask){
  let idChange = "changeColumn" + openChangeColumn;
  if(!tasksBd[idTask].taskApplication)
    document.getElementById(idChange).innerHTML = dropDownChangeColumn(0, idTask);
  else if(tasksBd[idTask].taskApplication == 1)
    document.getElementById(idChange).innerHTML = dropDownChangeColumn(1, idTask);
  else if(tasksBd[idTask].taskApplication == 2)
    document.getElementById(idChange).innerHTML = dropDownChangeColumn(2, idTask);
  else
    document.getElementById(idChange).innerHTML = dropDownChangeColumn(3, idTask);
}

function moveToColumn(index, idTask, event, stopPro){
  tasksBd[idTask].taskApplication = index;
  renderTasks();
  putDataBoard((path = ""), tasksBd);

  if (stopPro) 
    event.stopPropagation();
}
