function displayAddTask() {
  return `
        <div class="container  m-left-328">
        <div class="head">
            <h1>Add Task</h1>
        </div>
        <section id="content">
            <div class="content-left">
                <form onsubmit="addTask(); return false">
                    <label for="input-title">Title<span class="span-star">*</span></label>
                    <input type="text" id="input-title" placeholder="Enter a Title" required>
                </form>
                <label for="input-description">Description</label>
                <textarea name="input-description" id="input-description" placeholder="Enter a Description"></textarea>
                <label for="input-assigny">Assigned to</label>
                <div class="input-container-contacts">
                    <input list="input-assigned" id="input-assigny" class="dropbtn"
                        placeholder="Select contacts to assign">
                    <button class="add-button" id="add-button-contacts" onclick="ifIsListContactsLoaded()">+
                    </button>
                    <div id="show-contacts" class="d-none">
                    </div>
                </div>
                <div id="display-initials"></div>
            </div>

            <div class="seperator" id="seperator-content"></div>

            <div class="content-right">
                <form onsubmit="addTask(); return false">
                    <label for="input-date">Due Date<span class="span-star">*</span></label>
                    <input id="input-date" type="date" required>
                </form>
                <label for="input-prio">Prio</label>
                <div class="input-prio-span">
                    <div id="input-prio1" onclick="changePrioButtonUrgent()" class="urgent-image btn"></div>
                    <div id="input-prio2" onclick="changePrioButtonMedium()" class="medium-image btn"></div>
                    <div id="input-prio3" onclick="changePrioButtonLow()" class="low-image btn"></div>
                </div>
                <form onsubmit="addTask(); return false">
                    <label for="input-category">Category<span class="span-star">*</span></label>
                    <input list="input-categorie" id="input-category" required>
                    <datalist id="input-categorie">
                        <option value="Technical Task"></option>
                        <option value="User Story"></option>
                    </datalist>
                </form>
                <label for="input-subtask">Subtasks</label>
                <div class="input-container">
                    <input type="text" id="input-subtask" placeholder="Add new subtask"><button class="add-button" id="add-button-subtask"
                        onclick="addSubTask()">+</button>
                    <div id="show-subtask"></div>
                </div>
            </div>
        </section>
        <div class="footer">
            <span>*This field is required</span>
            <div class="button-footer">
                <button class="btn-footer-clear btn" onclick="clearInputs()" id="btn-clear">Clear x</button>
                <button class="btn-footer-create btn" onclick="addTask()">Create Task <img src="../assets/img/check.svg"></button>
            </div>
        </div>
    </div>
    <div class="pop-up-task d-none" id="add_task">
        <div class="overlay-create-task" id="overlay-task">
            <p>Task added to Board</p><img src="../assets/img/imgBoard.png">
        </div>
    </div>
    `;
}
