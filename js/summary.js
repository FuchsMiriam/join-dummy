let tasksBoard = [];
const TASK_URL = "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let result2 = false;

async function summaryInit(){
  includeHTML();
  loadTasks().then((result2) => {
      hoverSidebar();
      getSummary();
  });
  await onloadDatabase();
}

async function loadTasks(){
  let response = await fetch(TASK_URL + ".json");
  let responseToJSON = await response.json();
  tasksBoard = responseToJSON;
  result2 = true;
  console.log(tasksBoard);
}

function addTask(){
  let task =  {
    title: "Test",
    description: "Test Des",
  };

  tasksBoard.push(task);
  putData(path="", tasksBoard);
}

async function putData(path="", data={}){
  let response = await fetch(TASK_URL + path + ".json", {
      method: "PUT",
      header: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  });
  return responseToJson = await response.json();
}

let nrToDO = 0;
function getNumberofToDo(){
  for(let i = 0; i < tasksBoard.length; i++)
    if(tasksBoard[i]["taskApplication"] == 0)
      nrToDO++;
  return nrToDO;
}

let nrDone = 0;
function getNumberofDone(){
  for(let i = 0; i < tasksBoard.length; i++)
    if(tasksBoard[i]["taskApplication"] == 3)
      nrDone++;
  return nrDone;
}

let nrUrgent = 0;
function getNumberofUrgent(){
  for(let i = 0; i < tasksBoard.length; i++)
    if(tasksBoard[i]["priority"] == 1)
      nrUrgent++;
  return nrUrgent;
}

function getNumberofTasks(){
  return tasksBoard.length;
}

let nrProgress = 0;
function getNumberofProgress(){
  for(let i = 0; i < tasksBoard.length; i++)
    if(tasksBoard[i]["taskApplication"] == 1)
      nrProgress++;
  return nrProgress;
}

let nrAwait = 0;
function getNumberofAwait(){
  for(let i = 0; i < tasksBoard.length; i++)
    if(tasksBoard[i]["taskApplication"] == 2)
      nrAwait++;
  return nrAwait;
}

function getSummary(){
  document.getElementById("summaryToDo").innerHTML = getNumberofToDo();
  document.getElementById("summaryProgress").innerHTML = getNumberofProgress();
  document.getElementById("summaryAwait").innerHTML = getNumberofAwait();
  document.getElementById("summaryDone").innerHTML = getNumberofDone();
  document.getElementById("summaryNrTask").innerHTML = getNumberofTasks();
  document.getElementById("summaryNrUrgent").innerHTML = getNumberofUrgent();
  document.getElementById("summaryDate").innerHTML = getNextDate();
}

function getNextDate(){
  let date1 = new Date(tasksBoard[0]["date"]);
  let date2;

  for(let i = 1; i < tasksBoard.length; i++)
  {
    date2 = new Date(tasksBoard[i]["date"]);
    if(date2 < date1)
      date1 = date2;
  }
  return formatDate(date1);
}

function formatDate(date) {
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const databaseURL =
  "https://users-f61ab-default-rtdb.europe-west1.firebasedatabase.app/";

async function onloadDatabase(path = "") {
  let response = await fetch(databaseURL + path + ".json");
  let responseToJson = await response.json();
  console.log(responseToJson);
  return responseToJson;
}

