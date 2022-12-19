/*edit task*/
function showAddTaskEdit(taskId) {
    let task = getTaskById(taskId);
    document.getElementById('add-task-overlay-board').classList.remove('d-none');
    document.getElementById('body').style = 'overflow-y: hidden;';
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('formAddTask').setAttribute("onsubmit", `onsubmitEdit(${task['id']}); return false;`);
    renderEditTask(task);
}

async function onsubmitEdit(id){
    tasks.splice(id, 1);
    tasks.forEach(task => {
        if(task['id'] > id){
            task['id'] = +task['id'] - 1;
        }
    });
    await createTask();
    document.getElementById('formAddTask').setAttribute("onsubmit", `createTask(); return false;`);
}

function getTaskById(taskId) {
    let task = tasks.filter(task => task['id'] === taskId);
    return task[0];
}

function renderEditTask(task) {
    document.getElementById('input-title').value = task['title'];
    document.getElementById('input-description').value = task['description'];
    document.getElementById('input-date').value = task['due-date'];
    statusTaskOnCreate = task['status'];
    renderPriorityBtnEdit(task);
    renderCategoryEdit(task);
    renderAssignedContactsEdit(task);
}

function renderPriorityBtnEdit(task) {
    if (task['priority'] === 'urgent') {
        urgentBtnclicked();
        selectedPriority = 'urgent';
    }
    if (task['priority'] === 'medium') {
        mediumBtnclicked();
        selectedPriority = 'medium';
    }
    if (task['priority'] === 'low') {
        lowBtnclicked();
        selectedPriority = 'low';
    }
}

function renderCategoryEdit(task) {
    document.getElementById('select-category').value = task['category']['name'];
    selectedCategory = task['category'];
}


function renderAssignedContactsEdit(task) {
    let counter = 0;
    let assignedContactsEdit = task['assigned-contacts'];
    let allContactsEditList = Array.from(document.getElementsByClassName('input-contact-listitem'));
    let allInputFieldsContactsEdit = Array.from(document.getElementsByClassName('input-contact'));
    allContactsEditList.forEach(listItem => {
        assignedContactsEdit.forEach(contactEdit => {
            if (contactEdit['name'] === listItem.innerText) {
                allInputFieldsContactsEdit[counter].checked = true;
            }
        });
        counter++;
    });
}

/*template contactlist*/

function showAddTaskContactlist(name){
    let counter = 0;
    showAddTask('todo');
    let allInputFieldsContactsEdit = Array.from(document.getElementsByClassName('input-contact'));
    let allContactsEditList = Array.from(document.getElementsByClassName('input-contact-listitem'));
    allContactsEditList.forEach(listItem => {
        if(name === listItem.innerText){
            allInputFieldsContactsEdit[counter].checked = true;
        }
        counter++;
    });
    document.getElementById('close-btn').setAttribute("onclick", 'hideAddTaskContactsSection()');
    document.getElementById('close-addTask-background').setAttribute("onclick", 'hideAddTaskContactsSection()');
}

function hideAddTaskContactsSection(){
    document.getElementById('close-btn').setAttribute("onclick", 'hideAddTask()');
    document.getElementById('close-addTask-background').setAttribute("onclick", 'hideAddTask()');
    clearTask();
    hideAddTask();
}
