let statusTaskOnCreate = 'todo';
let tasks = [];
let tasksToDo = [];
let tasksProgress = [];
let tasksFeedback = [];
let tasksDone = [];
let users = [
    {
        'name': 'Niclas Michel',
        'email': 'niclas@join.de',
        'password': '111',
    },

    {
        'name': 'Dennis Maier',
        'email': 'dennis@join.de',
        'password': '222',
    },

    {
        'name': 'Simon Vitt',
        'email': 'simon@join.de',
        'password': '333',
    }
];
let activeUser;


async function init() {
    setURL('https://gruppe-400.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    contactsAddTask = JSON.parse(backend.getItem('contact')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    contacts = JSON.parse(backend.getItem('contact')) || [];
    activeUser = JSON.parse(backend.getItem('activeUser')) || [];
    console.log('Active user:', JSON.parse(backend.getItem('activeUser')));

}


async function render(currentSection) {
    await includeHTML();
    setActiveSection(currentSection);
}


/*add templates*/
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');

    

    for (let i = 0; i < includeElements.length; i++) {
        console.log(includeElements[i]);
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

/*set currentSection in templates*/
function setActiveSection(currentSection){
    if(currentSection == 'summary'){
        document.getElementById('summary-section').classList.add('active-content-section');
        document.getElementById('summary-section-mobile').classList.add('active-content-section');
    }
    if(currentSection == 'board'){
        document.getElementById('board-section').classList.add('active-content-section');
        document.getElementById('board-section-mobile').classList.add('active-content-section');
        initAddTask();
    }
    if(currentSection == 'addtask'){
        document.getElementById('addtask-section').classList.add('active-content-section');
        document.getElementById('addtask-section-mobile').classList.add('active-content-section');
    }
    if(currentSection == 'contacts'){
        document.getElementById('contacts-section').classList.add('active-content-section');
        document.getElementById('contacts-section-mobile').classList.add('active-content-section');
        initAddTask();
    }
    if(currentSection == 'legalnotice'){
        document.getElementById('legalnotice-section').classList.add('active-content-section');
    }
}

/*on help button clicked destop template*/
function showHelp(){
    document.getElementById('body').style = 'overflow-y: hidden;';
    document.getElementById('help-content').classList.remove('d-none');
    document.getElementById('help-button').classList.add('d-none');
}

/* hide help page*/
function hideHelp(){
    document.getElementById('body').style = '';
    document.getElementById('help-content').classList.add('d-none');
    document.getElementById('help-button').classList.remove('d-none');
}

/*show LogoutButton*/
function showLogout(){
    document.getElementById('logout-button').classList.remove('d-none');
    document.getElementById('options-mobile').classList.remove('d-none');
}

/*hide LogoutButton*/
function hideLogout(){
    document.getElementById('logout-button').classList.add('d-none');
    document.getElementById('options-mobile').classList.add('d-none');
}

/*show add Task*/
function showAddTask(statusPro){
    statusTaskOnCreate = statusPro;
    document.getElementById('add-task-overlay-board').classList.remove('d-none');
    document.getElementById('body').style = 'overflow-y: hidden;';
}

function hideAddTask(){
    statusTaskOnCreate = 'todo';
    document.getElementById('add-task-overlay-board').classList.add('d-none');
    document.getElementById('body').style = '';
}

/*stop Propagation*/
function doNotClose(event) {
    event.stopPropagation();
}