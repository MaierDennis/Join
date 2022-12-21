//DEFINING GLOBAL VARIABLES

let statusTaskOnCreate = 'todo';
let tasks = [];
let tasksToDo = [];
let tasksProgress = [];
let tasksFeedback = [];
let tasksDone = [];
let users = [];
let activeUser;
let dueDate;
let searchTaskInput;
let matchingTasks = [];
let currentDraggedTask;
let taskJustCreated;


/**
 * 
 * 
 */

async function init() {
    setURL('https://gruppe-400.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    contactsAddTask = JSON.parse(backend.getItem('contact')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    contacts = JSON.parse(backend.getItem('contact')) || [];

    activeUser = JSON.parse(localStorage.getItem('activeUser')) || [];
    console.log('Active user:', activeUser);

}


async function render(currentSection) {
    await includeHTML();
    setActiveSection(currentSection);
    renderUsernameTopper();
}

async function renderWithoutActiveSection() {
    await includeHTML();
    renderUsernameTopper();
}


/*add templates*/
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');



    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/*render name in topper*/
function renderUsernameTopper() {
    document.getElementById('topper-name-destop').innerHTML = `<strong>${activeUser}</strong>`;
    document.getElementById('topper-name-mobile').innerHTML = `<strong>${activeUser}</strong>`;
}

/*set currentSection in templates*/
function setActiveSection(currentSection) {
    if (currentSection == 'summary') {
        document.getElementById('summary-section').classList.add('active-content-section');
        document.getElementById('summary-section-mobile').classList.add('active-content-section');
    }
    if (currentSection == 'board') {
        document.getElementById('board-section').classList.add('active-content-section');
        document.getElementById('board-section-mobile').classList.add('active-content-section');
    }
    if (currentSection == 'addtask') {
        document.getElementById('addtask-section').classList.add('active-content-section');
        document.getElementById('addtask-section-mobile').classList.add('active-content-section');
    }
    if (currentSection == 'contacts') {
        document.getElementById('contacts-section').classList.add('active-content-section');
        document.getElementById('contacts-section-mobile').classList.add('active-content-section');
    }
    if (currentSection == 'legalnotice') {
        document.getElementById('legalnotice-section').classList.add('active-content-section');
    }
}

/*on help button clicked destop template*/
function showHelp() {
    document.getElementById('body').style = 'overflow-y: hidden;';
    document.getElementById('help-content').classList.remove('d-none');
    document.getElementById('help-button').classList.add('d-none');
}

/* hide help page*/
function hideHelp() {
    document.getElementById('body').style = '';
    document.getElementById('help-content').classList.add('d-none');
    document.getElementById('help-button').classList.remove('d-none');
}

/*show LogoutButton*/
function showLogout() {
    document.getElementById('logout-button').classList.remove('d-none');
    document.getElementById('options-mobile').classList.remove('d-none');
}

/*hide LogoutButton*/
function hideLogout() {
    document.getElementById('logout-button').classList.add('d-none');
    document.getElementById('options-mobile').classList.add('d-none');
}

/*show add Task*/
function showAddTask(statusPro) {
    statusTaskOnCreate = statusPro;
    document.getElementById('add-task-overlay-board').classList.remove('d-none');
    document.getElementById('body').style = 'overflow-y: hidden;';
    initDestop();
    renderCategories();
}

function hideAddTask() {
    statusTaskOnCreate = 'todo';
    document.getElementById('add-task-overlay-board').classList.add('d-none');
    document.getElementById('body').style = '';
    if (document.getElementById('tasks-inprogress-mobile')) {
        closeCard();
        document.getElementById('formAddTask').setAttribute("onsubmit", `checkTaskToCreate()`);
    }
}

/*stop Propagation*/
function doNotClose(event) {
    event.stopPropagation();
}


