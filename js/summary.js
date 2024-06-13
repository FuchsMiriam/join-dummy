let tasksBoard = [];
const TASK_URL = "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let result2 = false;

function summaryInit(){
  includeHTML();
  loadTasks().then((result2) => {
      hoverSidebar();
  });
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


