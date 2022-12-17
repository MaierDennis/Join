async function initBoard() {
    await init();
    render('board');
    declareArrays();
    renderTasks();
}


// OVERLAY 
function closeCard() {
    getElement('card-container').classList.add('d-none');
    getElement('overlay').classList.add('d-none');
    getElement('body').classList.add('oflow-y-unset');
    getElement('body').classList.remove('oflow-y-hidden');
}
//HELP FUNCTIONS 

function getElement(id) {
    return document.getElementById(id);
}



// EVENT LISTENERS
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeCard();        // an der Stelle die Funktion einsetzen, die das Fenster schließen soll
    }
});


//render Tasks from Database

function resetArrays() {
    tasksToDo = [];
    tasksProgress = [];
    tasksFeedback = [];
    tasksDone = [];
}

function declareArrays() {
    tasks.forEach(task => {
        if (task['status'] === 'todo') {
            tasksToDo.push(task);
        }
        if (task['status'] === 'progress') {
            tasksProgress.push(task);
        }
        if (task['status'] === 'feedback') {
            tasksFeedback.push(task);
        }
        if (task['status'] === 'done') {
            tasksDone.push(task);
        }
    });
}

function renderTasks() {
    renderTasksDestop();
    renderTasksMobile();
}

function renderTasksDestop() {
    document.getElementById('tasks-todo').innerHTML = '';
    tasksToDo.forEach(task => {
        document.getElementById('tasks-todo').innerHTML += taskCardTemplate(task);
        renderContributorsContainer(task);
        renderPrioritySymbol(task);
    });
    document.getElementById('tasks-inprogress').innerHTML = '';
    tasksProgress.forEach(task => {
        document.getElementById('tasks-inprogress').innerHTML += taskCardTemplate(task);
        renderContributorsContainer(task);
        renderPrioritySymbol(task);
    });
    document.getElementById('tasks-feedback').innerHTML = '';
    tasksFeedback.forEach(task => {
        document.getElementById('tasks-feedback').innerHTML += taskCardTemplate(task);
        renderContributorsContainer(task);
        renderPrioritySymbol(task);
    });
    document.getElementById('tasks-done').innerHTML = '';
    tasksDone.forEach(task => {
        document.getElementById('tasks-done').innerHTML += taskCardTemplate(task);
        renderContributorsContainer(task);
        renderPrioritySymbol(task);
    });
}

function renderTasksMobile() {
    document.getElementById('tasks-todo-mobile').innerHTML = '';
    tasksToDo.forEach(task => {
        document.getElementById('tasks-todo-mobile').innerHTML += taskCardTemplateMobile(task);
        renderContributorsContainerMobile(task);
        renderPrioritySymbolMobile(task);
    });
    document.getElementById('tasks-inprogress-mobile').innerHTML = '';
    tasksProgress.forEach(task => {
        document.getElementById('tasks-inprogress-mobile').innerHTML += taskCardTemplateMobile(task);
        renderContributorsContainerMobile(task);
        renderPrioritySymbolMobile(task);
    });
    document.getElementById('tasks-feedback-mobile').innerHTML = '';
    tasksFeedback.forEach(task => {
        document.getElementById('tasks-feedback-mobile').innerHTML += taskCardTemplateMobile(task);
        renderContributorsContainerMobile(task);
        renderPrioritySymbolMobile(task);
    });
    document.getElementById('tasks-done-mobile').innerHTML = '';
    tasksDone.forEach(task => {
        document.getElementById('tasks-done-mobile').innerHTML += taskCardTemplateMobile(task);
        renderContributorsContainerMobile(task);
        renderPrioritySymbolMobile(task);
    });
}

function renderPrioritySymbol(task) {
    if (task['priority'] === 'urgent') {
        document.getElementById(`prioritySymbol${task['id']}`).src = "assets/img/urgent.svg";
    }
    if (task['priority'] === 'medium') {
        document.getElementById(`prioritySymbol${task['id']}`).src = 'assets/img/medium.svg';
    }
    if (task['priority'] === 'low') {
        document.getElementById(`prioritySymbol${task['id']}`).src = 'assets/img/low.svg';
    }
}

function renderPrioritySymbolMobile(task) {
    if (task['priority'] === 'urgent') {
        document.getElementById(`prioritySymbol${task['id']}-mobile`).src = "assets/img/urgent.svg";
    }
    if (task['priority'] === 'medium') {
        document.getElementById(`prioritySymbol${task['id']}-mobile`).src = 'assets/img/medium.svg';
    }
    if (task['priority'] === 'low') {
        document.getElementById(`prioritySymbol${task['id']}-mobile`).src = 'assets/img/low.svg';
    }
}

function renderContributorsContainer(task) {
    let contacts = task['assigned-contacts'];
    document.getElementById(`contributers-container-${task['id']}`).innerHTML = '';
    contacts.forEach(contact => {
        document.getElementById(`contributers-container-${task['id']}`).innerHTML += contributorsContainerTemplate(contact);
    });
}

function renderContributorsContainerMobile(task) {
    let contacts = task['assigned-contacts'];
    document.getElementById(`contributers-container-${task['id']}-mobile`).innerHTML = '';
    contacts.forEach(contact => {
        document.getElementById(`contributers-container-${task['id']}-mobile`).innerHTML += contributorsContainerTemplate(contact);
    });
}

function contributorsContainerTemplate(contact) {
    let firstLetters = contact['name'].slice(0, 2).toUpperCase();
    return `<span class="contributors-circle" style="background-color: ${contact['bg-color']}">${firstLetters}</span>`;
}

function taskCardTemplate(task) {
    return /*html*/`
    <div onclick='openCard(${JSON.stringify(task)})' class="task-card" id="task-card${task['id']}">
        <span class="card-category" style="background-color: ${task['category']['color']};">${task['category']['name']}</span>
        <span class="card-title">${task['title']}</span>
        <span class="card-description">${task['description']}</span>
        <div class="card-bottom">
            <div class="contributors-container" id="contributers-container-${task['id']}">
            </div>
            <img id="prioritySymbol${task['id']}">
        </div>
    </div>
    `;
}

function taskCardTemplateMobile(task) {
    return /*html*/`
    <div onclick='openCard(${JSON.stringify(task)})' class="task-card" id="task-card${task['id']}-mobile">
        <span class="card-category" style="background-color: ${task['category']['color']};">${task['category']['name']}</span>
        <span class="card-title">${task['title']}</span>
        <span class="card-description">${task['description']}</span>
        <div class="card-bottom">
            <div class="contributors-container" id="contributers-container-${task['id']}-mobile">
            </div>
            <img id="prioritySymbol${task['id']}-mobile">
        </div>
    </div>
    `;
}

/*show task details*/
function openCard(task) {
    let taskBig = task;
    getElement('card-container').classList.remove('d-none');
    getElement('overlay').classList.remove('d-none');
    getElement('body').classList.add('oflow-y-hid');
    getElement('body').classList.remove('oflow-y-unset');
    convertDueDate(taskBig);
    renderTaskDetails(taskBig);
    renderContributorsContainerDetails(taskBig)
    renderPriorityTagBig(taskBig);
}

function convertDueDate(taskBig) {
    let numbersDueDate = taskBig['due-date'].split("-");
    dueDate = numbersDueDate[2] + "." + numbersDueDate[1] + "." + numbersDueDate[0];
}

function doNotClose(event) {
    event.stopPropagation();

}

function renderTaskDetails(task) {
    document.getElementById('task-overly-details').innerHTML = '';
    document.getElementById('task-overly-details').innerHTML = showTaskDetailsTemplate(task);
}

function renderContributorsContainerDetails(task) {
    let contacts = task['assigned-contacts'];
    document.getElementById('contributor-container-container-big').innerHTML = '';
    contacts.forEach(contact => {
        document.getElementById('contributor-container-container-big').innerHTML += contributorContainerBigTemplate(contact);
    });
}

function contributorContainerBigTemplate(contact) {
    let firstLetters = contact['name'].slice(0, 2).toUpperCase();
    return /*html*/ `
        <div class="contributor-container">
            <span class="contributors-circle-big " style="margin-right: 32px; background-color: ${contact['bg-color']};">${firstLetters}</span>
            <span class="due-date-prio" style="margin-bottom: 0 !important ;">${contact['name']}</span>
        </div>
    `;
}

function renderPriorityTagBig(task) {
    if (task['priority'] === 'urgent') {
        document.getElementById('priority-tag').src = 'assets/img/urgent-filled.svg';
    }
    if (task['priority'] === 'medium') {
        document.getElementById('priority-tag').src = 'assets/img/medium-filled.svg';
    }
    if (task['priority'] === 'low') {
        document.getElementById('priority-tag').src = 'assets/img/low-filled.svg';
    }
}

function showTaskDetailsTemplate(task) {
    return /*html*/ `
    <button class="edit-overlay-btn" onclick="showAddTaskEdit(${task['id']})"><img src="assets/img/pencil.svg" ></button>
    <button class="edit-overlay-btn-delete" onclick="deleteTask(${task['id']})"><img src="assets/img/trash.png" ></button>
    <span class="card-category-big" style="background-color: ${task['category']['color']};">${task['category']['name']}</span>
    <span class="card-title-big">${task['title']}</span>
    <span class="card-description-big">${task['description']}</span>
    <div class="due-date-prio">
        <span style="font-weight:bold; margin-right: 50px;">Due date:</span>
        <span> ${dueDate} </span>
    </div>
    <div class="due-date-prio">
        <span style="font-weight:bold; margin-right: 50px;">Priority:</span>
        <span style="display:flex"><img class="priority-tag" id="priority-tag"></span>
    </div>
    <div class="assigned">
        <span class="due-date-prio" style="font-weight:bold;">Assigned to:</span>
        <div id="contributor-container-container-big"></div>
    </div>
    `;
}

async function deleteTask(id) {
    tasks.splice(id, 1);
    tasks.forEach(task => {
        if (task['id'] > id) {
            task['id'] = +task['id'] - 1;
        }
    });
    await backend.setItem('tasks', JSON.stringify(tasks));
    resetArrays();
    declareArrays();
    renderTasks();
    closeCard();
}

/*search task*/
function searchTask() {
    showAllTasksSearch();
    matchingTasks = [];
    if(document.body.clientWidth > 1024){
        searchTaskInput = document.getElementById('searchTaskDestop').value;
        document.getElementById('searchTaskMobile').value = searchTaskInput;
    }else{
        searchTaskInput = document.getElementById('searchTaskMobile').value;
        document.getElementById('searchTaskDestop').value = searchTaskInput;
    }
    if (searchTaskInput != '') {
        tasks.forEach(task => {
            let taskTitleLowerCase = task['title'].toLowerCase();
            let taskDescriptionLowerCase = task['description'].toLowerCase();
            if (taskTitleLowerCase.includes(searchTaskInput) || taskDescriptionLowerCase.includes(searchTaskInput)) {
                matchingTasks.push(task);
            }
        });
        removeTasksSearch();
    }
}

function removeTasksSearch() {
    tasks.forEach(task => {
        if (!matchingTasks.includes(task)) {
            document.getElementById(`task-card${task['id']}`).classList.add('d-none');
            document.getElementById(`task-card${task['id']}-mobile`).classList.add('d-none');
        }
    });
}

function showAllTasksSearch() {
    tasks.forEach(task => {
        document.getElementById(`task-card${task['id']}`).classList.remove('d-none');
        document.getElementById(`task-card${task['id']}-mobile`).classList.remove('d-none');
    });
}