function detailCardHTMLLabel(idTask){
    return /*html*/`
        <div class="labelClose">
            <div class="labelDetailCard">${tasks[idTask].label}</div>
            <div class="imgPrio hoverCloseDetailCard flex-center" onclick="closeDetailCard(${idTask})">
                <img class="closeDetailCard" src="../assets/img/close.png" alt="">
            </div>
        </div>
    `;
}

function detailCardHTMLTitle(idTask){
    return /*html*/`
        <div class="textDetailCardTitle">${tasks[idTask].title}</div>
    `
}

function detailCardHTMLContent(idTask){
    return /*html*/`
        <div class="textDetailCardContent">${tasks[idTask].text}</div>
    `
}

function detailCardHTMLDate(idTask){
    return /*html*/`
        <div class="textDetailCardDate">
            <div>Due date:</div>
            <div class="dateDetailCard">${tasks[idTask].date}</div>
        </div>
    `
}

function detailCardHTMLPriority(idTask){
    return /*html*/`
        <div class="textDetailCardPriority">
            <div>Priority:</div>
            <div class="priorityDetailCard">
                <div class="dateDetailCard">${cardHTMLPriorityName(idTask)}</div>
                ${cardHTMLPriority(idTask)}
            </div>
        </div>
    `
}
function cardHTMLPriorityName(idTask){// 1 - High, 2 - Medium, 3 - Low
    if(tasks[idTask].priority == 1)
        return "Low";
    if(tasks[idTask].priority == 2)
        return "LMedium";
    if(tasks[idTask].priority == 3)
        return "Urgent";
}

function detailCardHTMLContacts(idTask){
    return /*html*/`
        <div class="textDetailCardContacts">
                <div>Assigned To:</div>
                ${getdetailcardHTMLContacts(idTask)}
            </div>
    `
}

function getdetailcardHTMLContacts(idTask){
    let initials = 0;
    let contactCards = '';
    for(let i = 0; i < tasks[idTask]["assigned to"].length; i++){
        initials = getInitials(tasks[idTask]["assigned to"][i].name);
        contactCards += /*html*/`
            <div class="contactsDetailCard">
                <div class="contactsListCard">
                    <p class="cardContactDetailCard ${tasks[idTask]["assigned to"][i].color}">${initials}</p>
                    <p class="nameContactDetailCard">${tasks[idTask]["assigned to"][i].name}</p>
                </div>
            </div>`;
    }  
    return /*html*/` <div class="detailcardContacts">${contactCards}</div>`
}

function detailCardHTMLSubtasks(idTask){
    return /*html*/`
        <div class="textDetailCardContacts">
            <div>Subtasks:</div>
            ${getDetailcardHTMLSubtasks(idTask)}
        </div>
    `
}

function getDetailcardHTMLSubtasks(idTask){
    let subtasksCards = '';

    for(let i = 0; i < tasks[idTask]["subtasks"].length; i++){ 
        subtasksCards += /*html*/`
            <div class="subtasksListCard">
                <input class="checkboxRememberCard" type="checkbox" id="checkCard${idTask}${i}" onclick="toggleCheckbox(${idTask}, ${i})">
                <label for="checkCard${idTask}${i}" class="checkboxCard">${tasks[idTask]["subtasks"][i].text}</label>
            </div>`;
    } 
    
    return /*html*/` <div class="subtasksDetailCard">${subtasksCards}</div>`
}

function detailCardHTMLDeleteEdit(idTask){
    return /*html*/`
        <div class="deleteEditDetailCard">
        <div class="deleteDetailCard" onclick="deleteTask(${idTask})">
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
        <div draggable="true" id="taskToDo${idTask}" class="TasksToDo" onclick="openDetailCard(${idTask})" ondragstart="startDragging(${idTask})">
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




