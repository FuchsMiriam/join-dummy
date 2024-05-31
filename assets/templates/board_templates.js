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

function checkNoTasks(tasksToDo, tasksInProgress, tasksAwaitFeedback, tasksDone){
    if(!tasksToDo)
        document.getElementById("toDO").innerHTML = cardHTMLNoTasks();
    if(!tasksInProgress)
        document.getElementById("inProgress").innerHTML = cardHTMLNoTasks();
    if(!tasksAwaitFeedback)
        document.getElementById("awaitFeedback").innerHTML = cardHTMLNoTasks();
    if(!tasksDone)
        document.getElementById("done").innerHTML = cardHTMLNoTasks();
}

function cardHTML(idTask){
    return /*html*/`
        <div id="taskToDo${idTask}" class="TasksToDo" onclick="openDetailCard('taskToDo')">
            ${cardHTMLLabel(idTask)}
            <div class="textCard">
                ${cardHTMLTitle(idTask)}
                ${cardHTMLContent(idTask)}
            </div>
            ${cardHTMLProgressBar(idTask)}
            <div class="contactsPriority">
                ${cardHTMLContacts(idTask)}
                ${cardHTMLPriority(idTask)}
            </div>
        </div>
    `
}

function cardHTMLLabel(idTask){
    return /*html*/`
        <div class="labelCard">${tasks[idTask].label}</div>
    `
}

function cardHTMLTitle(idTask){
    return /*html*/`
        <div class="textCardTitle">${tasks[idTask].title}</div>
    `
}

function cardHTMLContent(idTask){
    return /*html*/`
        <div class="textCardContent">${tasks[idTask].text}</div>
    `
}

function cardHTMLProgressBar(idTask){
    let maxSubtasks = tasks[idTask]["subtasks"].length;
    let checkedTasks = getCheckedTasks(idTask);
    let widthProgress = 128 * (checkedTasks / maxSubtasks);

    if(!maxSubtasks)
        return ``;
    else{
        return /*html*/`
            <div class="textCardProgress">
                <div class="progressBar"><div class="progressBarLine" style="width:${widthProgress}px"></div></div>
                <div class="textProgress">${checkedTasks}/${maxSubtasks} Subtasks</div>
            </div>
    `}
}

function cardHTMLPriority(idTask){// 1 - High, 2 - Medium, 3 - Low
    if(tasks[idTask].priority == 1)
        return /*html*/`<img class="imgPrio" src="../../assets/img/Property 1=Urgent.png" alt="">`
    if(tasks[idTask].priority == 2)
        return /*html*/`<img class="imgPrio" src="../../assets/img/Property 1=Medium.png" alt="">`
    if(tasks[idTask].priority == 3)
        return /*html*/`<img class="imgPrio" src="../../assets/img/Property 1=Low.png" alt="">`
}

function cardHTMLContacts(idTask){
    let initials = 0;
    let contactCards = '';
    let leftPosition = 0;

    for(let i = 0; i < tasks[idTask]["assigned to"].length; i++){
        leftPosition = i * 8;
        initials = getInitials(tasks[idTask]["assigned to"][i].name);
        contactCards += /*html*/`<div class="cardContact ${tasks[idTask]["assigned to"][i].color} leftPosition${leftPosition}">${initials}</div>`;
    }
        
    return /*html*/`
        <div class="cardContacts">${contactCards}</div>`
}

function cardHTMLNoTasks(idTask){
    return /*html*/`
        <div class="noTasksToDo">No tasks To do</div>
    `
}

function getInitials(name) {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');

    return initials;
}


