let selectedPriority;
let contactAssigned = false;

function initAddTask() {
    initDestop();
    initMobile();
}

function initDestop() {
    let checkList = document.getElementById('assign-to-list');
    checkList.getElementsByClassName('anchor')[0].onclick = function () {
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    }
}

function initMobile() {
    if (document.getElementById('assign-to-list-mobile')) {
        let checkList = document.getElementById('assign-to-list-mobile');
        checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
            if (checkList.classList.contains('visible'))
                checkList.classList.remove('visible');
            else
                checkList.classList.add('visible');
        }
    }
}

function renderCategories() {
    categories.forEach(category => {
        document.getElementById('select-category').innerHTML += categoriesDropdownTemplate(category);
    });
}

function categoriesDropdownTemplate(category) {
    return `<option value="${category['name']}">${category['name']}</option>`;
}

function showAddCategory() {
    if (document.getElementById('select-category').selectedIndex == 1); {
        document.getElementById('select-category').classList.add('d-none');
        document.getElementById('create-category').classList.remove('d-none');
    }
}

function selectColor(id){
    for(let i = 1; i < 8; i++){
        document.getElementById(`color${i}`).classList.remove('selected-color');
    }
    document.getElementById(`color${id}`).classList.add('selected-color');
}

function clickPriorityButton(id) {
    unsetBtnClicked();
    if (id == 'urgent-btn-mobile' || id == 'urgent-btn') {
        urgentBtnclicked();
    }
    if (id == 'medium-btn-mobile' || id == 'medium-btn') {
        mediumBtnclicked();
    }
    if (id == 'low-btn-mobile' || id == 'low-btn') {
        lowBtnclicked();
    }
    defineSelectedPriority(id);
}

function defineSelectedPriority(id) {
    if (id == 'urgent-btn-mobile' || id == 'urgent-btn') {
        selectedPriority = 'urgent';
    }
    if (id == 'medium-btn-mobile' || id == 'medium-btn') {
        selectedPriority = 'medium';
    }
    if (id == 'low-btn-mobile' || id == 'low-btn') {
        selectedPriority = 'low';
    }
}

function unsetBtnClicked() {
    unsetBtnClickedUrgent();
    unsetBtnClickedMedium();
    unsetBtnClickedLow();
}

function unsetBtnClickedUrgent() {
    document.getElementById('urgent-btn').classList.remove('choosePriorityPicked');
    document.getElementById('urgent-btn').style = '';
    if (document.getElementById('urgent-btn-mobile')) {
        document.getElementById('urgent-btn-mobile').style = '';
        document.getElementById('urgent-btn-mobile').classList.remove('choosePriorityPicked');
    }
}

function unsetBtnClickedMedium() {
    document.getElementById('medium-btn').classList.remove('choosePriorityPicked');
    document.getElementById('medium-btn').style = '';
    if (document.getElementById('medium-btn-mobile')) {
        document.getElementById('medium-btn-mobile').style = '';
        document.getElementById('medium-btn-mobile').classList.remove('choosePriorityPicked');
    }
}

function unsetBtnClickedLow() {
    document.getElementById('low-btn').classList.remove('choosePriorityPicked');
    document.getElementById('low-btn').style = '';
    if (document.getElementById('low-btn-mobile')) {
        document.getElementById('low-btn-mobile').style = '';
        document.getElementById('low-btn-mobile').classList.remove('choosePriorityPicked');
    }
}

function urgentBtnclicked() {
    document.getElementById('urgent-btn').classList.add('choosePriorityPicked');
    document.getElementById('urgent-btn').style = 'background-color: red;';
    if (document.getElementById('urgent-btn-mobile')) {
        document.getElementById('urgent-btn-mobile').style = 'background-color: red;';
        document.getElementById('urgent-btn-mobile').classList.add('choosePriorityPicked');
    }
}

function mediumBtnclicked() {
    document.getElementById('medium-btn').classList.add('choosePriorityPicked');
    document.getElementById('medium-btn').style = 'background-color: orange;';
    if (document.getElementById('medium-btn-mobile')) {
        document.getElementById('medium-btn-mobile').style = 'background-color: orange;';
        document.getElementById('medium-btn-mobile').classList.add('choosePriorityPicked');
    }
}

function lowBtnclicked() {
    document.getElementById('low-btn').classList.add('choosePriorityPicked');
    document.getElementById('low-btn').style = 'background-color: green;';
    if (document.getElementById('low-btn-mobile')) {
        document.getElementById('low-btn-mobile').style = 'background-color: green;';
        document.getElementById('low-btn-mobile').classList.add('choosePriorityPicked');
    }
}

function checkAssignedTo() {
    let contactsSelection = Array.from(document.getElementsByClassName('input-contact'));
    contactsSelection.forEach(contact => {
        if (contact.checked == true) {
            contactAssigned = true;
        }
    });
}

/*create Task on click create Button*/
function createTask() {
    checkAssignedTo();
    if (selectedPriority && contactAssigned) {
        saveTask();
        showSuccessMessage();
        clearTask();
    } else {
        alert('Please select a priority and assign a contact!');
    }
}

/*clear Button on click, reset Form*/
function clearTask() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-description').value = '';
    document.getElementById('select-category').selectedIndex = 0;
    clearAssignedContacts();
    contactAssigned = false;
    selectedPriority = false;
    document.getElementById('input-date').value = '';
    unsetBtnClicked();
    if (document.getElementById('low-btn-mobile')) {
        document.getElementById('input-title-mobile').value = '';
        document.getElementById('input-description-mobile').value = '';
        document.getElementById('select-category-mobile').selectedIndex = 0;
        document.getElementById('input-date-mobile').value = '';
    }
}

function clearAssignedContacts() {
    let contactsSelection = Array.from(document.getElementsByClassName('input-contact'));
    contactsSelection.forEach(contact => {
        contact.checked = false;
    });
}

/*upload Task to database*/
async function saveTask() {
    let task = {
        'id': tasks.length,
        'title': document.getElementById('input-title').value,
        'description': document.getElementById('input-description').value,
        'category': document.getElementById('select-category').options[document.getElementById('select-category').selectedIndex].text,
        'assigned-contacts': getAssignedContacts(),
        'due-date': document.getElementById('input-date').value,
        'priority': selectedPriority
    }
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
}

function getAssignedContacts() {
    let assignedContacts = [];
    let counter = 0;
    let contactsSelection = Array.from(document.getElementsByClassName('input-contact'));
    let contactsSelectionList = Array.from(document.getElementsByClassName('input-contact-listitem'));
    contactsSelection.forEach(contact => {
        if (contact.checked) {
            assignedContacts.push(contactsSelectionList[counter].value);
        }
        counter++;
    });
    console.log(assignedContacts);
    return assignedContacts;
}

function showSuccessMessage() {
    document.getElementById("dialog-taskadded").classList.remove('d-none');
    setTimeout(function () {
        document.getElementById("dialog-taskadded").classList.add('d-none');
    }, 3000);
}