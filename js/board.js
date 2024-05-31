const BASE_URL = "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks = [];
let exampleTask = {
    "label": "User Story",
    "title": "Einkaufen",
    "text": "Obst, Gemüse, Fleisch",
    "date": "10/06/2026",
    "priority": 1, // 1 - High, 2 - Medium, 3 - Low
    "assigned to": {
        "0": {
            "name": "Max Mustermann",
            "color": "yellow"},
        "1": {
            "name": "Anna Müller",
            "color": "blue"},
    },
    "subtasks": {
        "0": {
            "text": "Obst im Rewe",
            "checked": "0"}, //0 - did not, 1 - did
        "1": {
            "text": "Gemüse im Lidl",
            "checked": "1"}, //0 - did not, 1 - did
    },
    "taskApplication": 0, // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
};

let result = false;
function init(){
    includeHTML();
    // hoverSidebar();
    loadTasks().then((result) => {
        putData(path="", tasks);
        renderTasks();
    });
}

async function loadTasks(){
    let response = await fetch(BASE_URL + ".json");
    let responseToJSON = await response.json();
    tasks = responseToJSON;
    console.log(tasks);
    result = true;
}

async function postData(path="", data=""){
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJSON = await response.json();
}

async function deleteData(path=""){
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    return responseToJSON = await response.json();
}

async function putData(path="", data={}){
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

function renderTasks(){
    document.getElementById("idDetailCard").innerHTML = detailCardHTML();
    showTasks();
    // document.getElementById("toDO").innerHTML = cardHTMLNoTasks();
    // document.getElementById("inProgress").innerHTML = cardHTML();
    // document.getElementById("awaitFeedback").innerHTML = cardHTMLNoTasks();
    // document.getElementById("done").innerHTML = cardHTMLNoTasks();
}

function openDetailCard(idTask){
    document.getElementById(idTask).classList.remove("detailCardoutsideContent");
    document.getElementById(idTask).classList.add("detailCardinsideContent");
}

function closeDetailCard(idTask){
    document.getElementById(idTask).classList.add("detailCardoutsideContent");
    document.getElementById(idTask).classList.remove("detailCardinsideContent");
}

function detailCardHTML(){
    return /*html*/`
        <div id="taskToDo" class="detailCardTaskToDo centered-axis-xy detailCardoutsideContent">
            ${detailCardHTMLLabel()}
            ${detailCardHTMLTitle()}
            ${detailCardHTMLContent()}
            ${detailCardHTMLDate()}
            ${detailCardHTMLPriority()}
            ${detailCardHTMLContacts()}
            ${detailCardHTMLSubtasks()}
            ${detailCardHTMLDeleteEdit()}
        </div>
    `
}

function showTasks(){ // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
    let tasksToDo = 0; let tasksInProgress = 0; let tasksAwaitFeedback = 0; let tasksDone = 0;

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].taskApplication == 0)
            tasksToDo += addTask(i, "toDO");
        else if(tasks[i].taskApplication == 1)
            tasksInProgress += addTask(i, "inProgress");
        else if(tasks[i].taskApplication == 2)
            tasksAwaitFeedback += addTask(i, "awaitFeedback");
        else if(tasks[i].taskApplication == 3)
            tasksAwaitFeedback += addTask(i, "done");
    }
    checkNoTasks(tasksToDo, tasksInProgress, tasksAwaitFeedback, tasksDone);
}

function addTask(idTask, idApplication){
    document.getElementById(idApplication).innerHTML += cardHTML(idTask);
    return 1;
}

function getCheckedTasks(idTask){
    let checkedTasks = 0;
    for(let i = 0; i < tasks[idTask]["subtasks"].length; i++)
        if(tasks[idTask]["subtasks"][i]["checked"] == 1)
            checkedTasks++;
    return checkedTasks;
}

