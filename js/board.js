const BASE_URL = "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks = [];
let currentTask = 0;
let exampleTask = {
    "label": "User Story",
    "title": "Einkaufen",
    "text": "Obst, Gemüse, Fleisch",
    "date": "10/06/2026",
    "priority": 1, // 1 - High, 2 - Medium, 3 - Low
    "assigned to": [
        {
           "name": "Max Mustermann",
           "color": "yellow"},
        {
           "name": "Anna Müller",
           "color": "blue"},
    ],
    "subtasks": [
        {
           "text": "Obst im Rewe",
           "checked": "0"}, //0 - did not, 1 - did
        {
           "text": "Gemüse im Lidl",
           "checked": "1"}, //0 - did not, 1 - did
    ],
    "taskApplication": 0, // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
};

let result = false;
function init(){
    includeHTML();
    // hoverSidebar();
    loadTasks().then((result) => {
        // for(let i = 0; i<2; i++)
        //     tasks.push(exampleTask);
        putData(path="", tasks);
        renderTasks();
        hoverSidebar();
    });
}

async function loadTasks(){
    let response = await fetch(BASE_URL + ".json");
    let responseToJSON = await response.json();
    tasks = responseToJSON;
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
    setBackColumns();
    showTasks();
}

function setBackColumns(){
    document.getElementById("toDO").innerHTML = ``;
    document.getElementById("inProgress").innerHTML = ``;
    document.getElementById("awaitFeedback").innerHTML = ``;
    document.getElementById("done").innerHTML = ``;
}

function openDetailCard(idTask){
    document.getElementById("idDetailCard").innerHTML = detailCardHTML(idTask);
    document.getElementById("idDetailCard").classList.add("leftPart");
    document.getElementById("idDetailCard").classList.remove("leftPartOut");
    checkSubtasks(idTask);
}

function closeDetailCard(idTask){
    document.getElementById("idDetailCard").classList.remove("leftPart");
    document.getElementById("idDetailCard").classList.add("leftPartOut");
}

function checkSubtasks(idTask){
    for(let i = 0; i < tasks[idTask]["subtasks"].length; i++)
        {
            let name = "checkCard" + idTask + i;
            if(tasks[idTask]["subtasks"][i]["checked"])
                document.getElementById(name).setAttribute('checked', 'checked');
        }
}

function detailCardHTML(idTask){
    return /*html*/`
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
    `
}

function showTasks(){ // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
    let tasksToDo = 0; let tasksInProgress = 0; let tasksAwaitFeedback = 0; let tasksDone = 0;
    setBackColumns();
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].taskApplication == 0)
            tasksToDo += addTask(i, "toDO");
        else if(tasks[i].taskApplication == 1)
            tasksInProgress += addTask(i, "inProgress");
        else if(tasks[i].taskApplication == 2)
            tasksAwaitFeedback += addTask(i, "awaitFeedback");
        else if(tasks[i].taskApplication == 3)
            tasksDone += addTask(i, "done");
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

function toggleCheckbox(idTask, idCheckBox){
    var isChecked = document.getElementById("checkCard" + idTask + idCheckBox).checked;

    tasks[idTask]["subtasks"][idCheckBox]["checked"] = isChecked;
    renderTasks();
    putData(path="", tasks);
}

function deleteTask(idTask){
    tasks.splice(idTask, 1);
    closeDetailCard(idTask);
    renderTasks();
    putData(path="", tasks);
}

function searchTasks() {
    let input = document.getElementById("searchTask").value;
    input = input.toLowerCase();

    if(!input.length)
        renderTasks();
    else{
        setBackColumns();
        showSearchTasks(input);
    }
}

function showSearchTasks(input){ // 0 - toDo, 1 - inProgress, 2 - awaitFeedback, 3 - done
    let tasksToDo = 0; let tasksInProgress = 0; let tasksAwaitFeedback = 0; let tasksDone = 0;
    for(let i = 0; i < tasks.length; i++){
        let text = tasks[i].text;
        let title = tasks[i].title;
        if(tasks[i].taskApplication == 0 && (text.toLowerCase().includes(input) || title.toLowerCase().includes(input)))
            tasksToDo += addTask(i, "toDO");
        else if(tasks[i].taskApplication == 1 && (text.toLowerCase().includes(input) || title.toLowerCase().includes(input)))
            tasksInProgress += addTask(i, "inProgress");
        else if(tasks[i].taskApplication == 2 && (text.toLowerCase().includes(input) || title.toLowerCase().includes(input)))
            tasksAwaitFeedback += addTask(i, "awaitFeedback");
        else if(tasks[i].taskApplication == 3 && (text.toLowerCase().includes(input) || title.toLowerCase().includes(input)))
            tasksDone += addTask(i, "done");
    }
    checkNoTasks(tasksToDo, tasksInProgress, tasksAwaitFeedback, tasksDone);
}

function foundTask(){
    setBackColumns();
    renderTasks();
    // document.getElementById("searchTask").value = '';
}

function startDragging(idTask){
    currentTask = idTask;
}

function allowDrop(ev){
    ev.preventDefault();
}

function drop(category){
    tasks[currentTask]['taskApplication'] = category;
    renderTasks();
    putData(path="", tasks);
}