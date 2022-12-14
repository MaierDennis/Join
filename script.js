let users = [];
let allTasks = [];

async function init() {
    setURL('https://gruppe-400.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function render(currentSection) {
    await includeHTML();
    setActiveSection(currentSection);
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
function showAddTask(){
    document.getElementById('add-task-overlay-board').classList.remove('d-none');
    document.getElementById('body').style = 'overflow-y: hidden;';
}

function hideAddTask(){
    document.getElementById('add-task-overlay-board').classList.add('d-none');
    document.getElementById('body').style = '';
}

/*stop Propagation*/
function doNotClose(event) {
    event.stopPropagation();
}