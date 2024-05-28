const BASE_URL = "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks = [];
let exampleTask = {
    "label": "User Story",
    "title": "Einkaufen",
    "text": "Obst, Gemüse, Fleisch",
};

function init(){
    includeHTML();
    loadTasks();
    postData("", {"3": exampleTask});
    document.getElementById("idDetailCard").innerHTML = detailCardHTML();
    document.getElementById("inProgress").innerHTML = cardHTML();
    document.getElementById("toDO").innerHTML = cardHTMLNoTasks();
}

async function loadTasks(){
    let response = await fetch(BASE_URL + ".json");
    let responseToJSON = await response.json();
    tasks = responseToJSON;
    console.log(tasks);
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

function detailCardHTMLLabel(){
    return /*html*/`
        <div class="labelClose">
            <div class="labelDetailCard">User Story</div>
            <div class="imgPrio hoverCloseDetailCard flex-center" onclick="closeDetailCard('taskToDo')">
                <img class="closeDetailCard" src="../assets/img/close.png" alt="">
            </div>
        </div>
    `;
}

function detailCardHTMLTitle(){
    return /*html*/`
        <div class="textDetailCardTitle">Kochwelt Page & Recipe Recommender</div>
    `
}

function detailCardHTMLContent(){
    return /*html*/`
        <div class="textDetailCardContent">Build start page with recipe recommandation...</div>
    `
}

function detailCardHTMLDate(){
    return /*html*/`
        <div class="textDetailCardDate">
            <div>Due date:</div>
            <div class="dateDetailCard">10/05/2023</div>
        </div>
    `
}

function detailCardHTMLPriority(){
    return /*html*/`
        <div class="textDetailCardPriority">
            <div>Priority:</div>
            <div class="priorityDetailCard">
                <div class="dateDetailCard">Medium</div>
                <img class="imgPrio" src="../assets/img/Property 1=Medium.png" alt="">
            </div>
        </div>
    `
}

function detailCardHTMLContacts(){
    return /*html*/`
        <div class="textDetailCardContacts">
                <div>Assigned To:</div>
                <div class="contactsDetailCard">
                    <div class="contactsListCard">
                        <p class="cardContactDetailCard">EM</p>
                        <p class="nameContactDetailCard">Emmanuel Mauer</p>
                    </div>
                </div>
            </div>
    `
}

function detailCardHTMLSubtasks(){
    return /*html*/`
        <div class="textDetailCardContacts">
            <div>Subtasks:</div>
            <div class="subtasksDetailCard">
                <div class="subtasksListCard">
                    <input class="checkboxRememberCard" type="checkbox" id="checkCard1" />
                    <label for="checkCard1" class="checkboxCard">Implement Recipe Recommandation</label>
                </div>
            </div>
        </div>
    `
}

function detailCardHTMLDeleteEdit(){
    return /*html*/`
        <div class="deleteEditDetailCard">
        <div class="deleteDetailCard">
            <div class="imgDetaildelete"></div>
            <p class="textDeleteCard">Delete</p>
        </div>
        <div class="vektorDetailCard"></div>
        <div class="editDetailCard">
            <div class="imgDetailedit"></div>
            <p class="textDeleteCard">Edit</p>
        </div>
    </div>
    `
}

function cardHTML(){
    return /*html*/`
        <div id="taskToDo1" class="TasksToDo" onclick="openDetailCard('taskToDo')">
            ${cardHTMLLabel()}
            <div class="textCard">
                ${cardHTMLTitle()}
                ${cardHTMLContent()}
            </div>
            ${cardHTMLProgressBar()}
            <div class="contactsPriority">
                ${cardHTMLContacts()}
                ${cardHTMLPriority()}
            </div>
        </div>
    `
}

function cardHTMLLabel(){
    return /*html*/`
        <div class="labelCard">User Story</div>
    `
}

function cardHTMLTitle(){
    return /*html*/`
        <div class="textCardTitle">Kochwelt Page & Recipe Recommender</div>
    `
}

function cardHTMLContent(){
    return /*html*/`
        <div class="textCardContent">Build start page with recipe recommandation...</div>
    `
}

function cardHTMLProgressBar(){
    return /*html*/`
        <div class="textCardProgress">
            <div class="progressBar">
                <div class="progressBarLine"></div>
            </div>
            <div class="textProgress">1/2 Subtasks</div>
        </div>
    `
}

function cardHTMLPriority(){
    return /*html*/`
        <img class="imgPrio" src="../assets/img/Property 1=Medium.png" alt="">        
    `
}

function cardHTMLContacts(){
    return /*html*/`
        <div class="cardContacts">   
            <div class="cardContact">AM</div>
            <div class="cardContact overlapContacts">EM</div>
        </div>
    `
}

function cardHTMLNoTasks(){
    return /*html*/`
        <div class="noTasksToDo">No tasks To do</div>
    `
}