let tasksBoard = [];
const TASK_URL = "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let result2 = false;
let result3 = true;
let loginName;

async function summaryInit(){
  includeHTML();
  loadTasks().then((result2) => {
      getSummary();
      hoverSidebar();
  });
}

async function summaryMobilInit(){
  includeHTML();
  loadTasks().then((result3) => {
      window.addEventListener('load', function () {
        hoverSidebar();
      });
      document.getElementById("greetingSummary").innerHTML = getGreeting();
      document.getElementById("nameSummary").innerHTML = loadLoginName();
      setTimeout( function() { openSummary(); }, 2000);
  });
}

function openSummary(){
  window.location.href = "./summary.html";
}



async function loadTasks(){
  let response = await fetch(TASK_URL + ".json");
  let responseToJSON = await response.json();
  tasksBoard = responseToJSON;
  tasksBoard = null;
  result2 = true;
  result3 = true;
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
  if(tasksBoard == null)
    return 0;
  for(let i = 0; i < tasksBoard.length; i++)
    if(tasksBoard[i]["taskApplication"] == 0)
      nrToDO++;
  return nrToDO;
}

let nrDone = 0;
function getNumberofDone(){
  if(tasksBoard == null)
    return 0;
  for(let i = 0; i < tasksBoard.length; i++)
    if(tasksBoard[i]["taskApplication"] == 3)
      nrDone++;
  return nrDone;
}

let nrUrgent = 0;
function getNumberofUrgent(){
  if(tasksBoard == null)
    return 0;
  for(let i = 0; i < tasksBoard.length; i++)
    if(tasksBoard[i]["priority"] == 1)
      nrUrgent++;
  return nrUrgent;
}

function getNumberofTasks(){
  if(tasksBoard == null)
    return 0;
  else
    return tasksBoard.length;
}

let nrProgress = 0;
function getNumberofProgress(){
  if(tasksBoard == null)
    return 0;
  for(let i = 0; i < tasksBoard.length; i++)
    if(tasksBoard[i]["taskApplication"] == 1)
      nrProgress++;
  return nrProgress;
}

let nrAwait = 0;
function getNumberofAwait(){
  if(tasksBoard == null)
    return 0;
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
  document.getElementById("greetingSummary").innerHTML = getGreeting();
  document.getElementById("nameSummary").innerHTML = loadLoginName();
}

function getNextDate(){
  if(tasksBoard == null)
    return '';
  let date = tasksBoard[0]["date"];
  let date1 = new Date(tasksBoard[0]["date"]);
  let date2;

  for(let i = 1; i < tasksBoard.length; i++)
  {
    date2 = new Date(tasksBoard[i]["date"]);
    if(date2 < date1)
      {
        date = tasksBoard[i]["date"];
        date1 = date2;
      }
  }
  return formatDate(date);
}

function formatDate(date) {
  let dateParts = date.split("/");

  let day = dateParts[0];
  let month = dateParts[1];
  let year = dateParts[2];

  let monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
  ];

  let monthName = monthNames[parseInt(month) - 1];
  return `${monthName} ${day}, ${year}`;
}

function calculateGreeting(currentHour){
  if (currentHour >= 5 && currentHour < 12) 
    return "Good Morning";
  else if (currentHour >= 12 && currentHour < 17) 
    return "Good Afternoon";
  else if (currentHour >= 17 && currentHour < 22) 
    return "Good Evening";
  else
    return "Good Night";
}

function getGreeting(){
  let currentDate = new Date(); 
  let currentHour = currentDate.getHours();
  let name = loadLoginName();
  let greeting = calculateGreeting(currentHour);

  if(name != null)
    return greeting + ',';
  else
    return greeting;
}

function getLoginName(name){
  let nameAsText = JSON.stringify(name);
  localStorage.setItem("name", nameAsText);
}

function loadLoginName() {
  let nameAsText = localStorage.getItem("name", loginName);

  if (nameAsText) 
    return JSON.parse(nameAsText);
}

