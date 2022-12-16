async function initBoard() {
    console.log('1');
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

function renderTasks(){
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
    <div onclick='openCard(${JSON.stringify(task)})' class="task-card">
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
    <div onclick='openCard(${JSON.stringify(task)})' class="task-card">
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
    renderTaskDetails(taskBig);
    renderContributorsContainerDetails(taskBig)
    renderPriorityTagBig(taskBig);
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
        document.getElementById('priority-tag').src = 'assets/img/urgent-filled.svg';
    }
    if (task['priority'] === 'low') {
        document.getElementById('priority-tag').src = 'assets/img/urgent-filled.svg';
    }
}

function showTaskDetailsTemplate(task) {
    return /*html*/ `
    <span class="card-category-big" style="background-color: ${task['category']['color']};">${task['category']['name']}</span>
    <span class="card-title-big">${task['title']}</span>
    <span class="card-description-big">${task['description']}</span>
    <div class="due-date-prio">
        <span style="font-weight:bold; margin-right: 50px;">Due date:</span>
        <span> ${task['due-date']} </span>
    </div>
    <div class="due-date-prio">
        <span style="font-weight:bold; margin-right: 50px;">Priority:</span>
        <span><img class="priority-tag" id="priority-tag"></span>
    </div>
    <div class="assigned">
        <span class="due-date-prio" style="font-weight:bold;">Assigned to:</span>
        <div id="contributor-container-container-big"></div>
    </div>
    `;
}