let cardOpened = false;

async function initBoard() {
    await init();
    declareArrays();
    renderTasks();
}


// OVERLAY 
function closeCard() {
    getElement('card-container').classList.add('d-none');
    getElement('overlay').classList.add('d-none');
    getElement('body').classList.add('oflow-y-unset');
    getElement('body').classList.remove('oflow-y-hidden');
    cardOpened = false;
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

let tasksToDo = [];
let tasksProgress = [];
let tasksFeedback = [];
let tasksDone = [];

function declareArrays() {
    tasks.forEach(task => {
        console.log('hallo');
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
    console.log(tasksToDo);
}

function renderTasks() {
    document.getElementById('tasks-todo').innerHTML = '';
    tasksToDo.forEach(task => {
        document.getElementById('tasks-todo').innerHTML += taskCardTemplate(task);
        renderContributorsContainer(task);
        renderPrioritySymbol(task);
    });
    document.getElementById('tasks-inprogress').innerHTML = '';
    tasksProgress.forEach(task => {
        document.getElementById('tasks-progress').innerHTML += taskCardTemplate(task);
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

function renderPrioritySymbol(task) {
    if (task['priority'] === 'urgent') {
        document.getElementById('prioritySymbol').src = "assets/img/urgent.svg";
    }
    if (task['priority'] === 'medium') {
        document.getElementById('prioritySymbol').src = 'assets/img/medium.svg';
    }
    if (task['priority'] === 'low') {
        document.getElementById('prioritySymbol').src = 'assets/img/low.svg';
    }
}

function renderContributorsContainer(task) {
    let contacts = task['assigned-contacts'];
    document.getElementById(`contributers-container-${task['id']}`).innerHTML = '';
    contacts.forEach(contact => {
        document.getElementById(`contributers-container-${task['id']}`).innerHTML += contributorsContainerTemplate(contact);
    });
}

function contributorsContainerTemplate(contact) {
    let firstLetters = contact['name'].slice(0, 2).toUpperCase();
    return `<span class="contributors-circle" style="background-color: ${contact['bg-color']}">${firstLetters}</span>`;
}

function taskCardTemplate(task) {
    return /*html*/`
    <div onclick="openCard()" class="task-card">
        <span class="card-category" style="background-color: ${task['category']['color']};">${task['category']['name']}</span>
        <span class="card-title">${task['title']}</span>
        <span class="card-description">${task['description']}</span>
        <div class="card-bottom">
            <div class="contributors-container" id="contributers-container-${task['id']}">
            </div>
            <img id="prioritySymbol">
        </div>
    </div>
    `;
}

/*show task details*/

function openCard() {
    cardOpened = true;
    getElement('card-container').classList.remove('d-none');
    getElement('overlay').classList.remove('d-none');
    getElement('body').classList.add('oflow-y-hid');
    getElement('body').classList.remove('oflow-y-unset');
}

function doNotClose(event) {
    event.stopPropagation();

}

function showTaskDetailsTemplate(task) {
    return /*html*/ `
    <span class="card-category-big sales">Sales</span>
    <span class="card-title-big">Call potential clients</span>
    <span class="card-description-big">Present product to prospective clients...</span>
    <div class="due-date-prio">
        <span style="font-weight:bold; margin-right: 50px;">Due date:</span>
        <span> 05-08-2022 </span>
    </div>
    <div class="due-date-prio">
        <span style="font-weight:bold; margin-right: 50px;">Priority:</span>
        <span><img class="priority-tag" src="assets/img/urgent-filled.svg" alt=""></span>
    </div>
    <div class="assigned">
        <span class="due-date-prio" style="font-weight:bold;">Assigned to:</span>
        <div class="contributor-container">
            <span class="contributors-circle-big yellow-dark" style="margin-right: 32px;">DM</span>
            <span class="due-date-prio" style="margin-bottom: 0 !important ;">Dennis Maier</span>
        </div>
        <div class="contributor-container">
            <span class="contributors-circle-big lila" style="margin-right: 32px;">NM</span>
            <span class="due-date-prio" style="margin-bottom: 0 !important ;">Niclas Michel</span>
        </div>
        <div class="contributor-container">
            <span class="contributors-circle-big orange" style="margin-right: 32px;">SV</span>
            <span class="due-date-prio" style="margin-bottom: 0 !important ;">Simon Vitt</span>
        </div>
    </div>
    `;
}