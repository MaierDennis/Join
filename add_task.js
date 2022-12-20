let selectedPriority;
let contactAssigned = false;
let selectedColor;
let selectedCategory;
let contactsAddTask;
let contactsSorted;
let categories = [];

async function initAddTask() {
    await init();
    sortContactsAddTask();
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
    renderCategories();
    renderContactsAddTask()
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
        renderCategoriesMobile();
        renderContactsMobile();
    }
}

/*contacts*/

function sortContactsAddTask() {
    contactsSorted = contactsAddTask.sort((a, b) => a.name.localeCompare(b.name));
}

function renderContactsMobile() {

    document.getElementById('contacts-to-assign-mobile').innerHTML = '';
    for (let i = 0; i < contactsSorted.length; i++) {
        document.getElementById('contacts-to-assign-mobile').innerHTML += `
        <li class="input-contact-listitem-mobile" style="background-color: ${contactsSorted[i]['bg-color']};" value="${[i]}"><input class="input-contact-mobile"
            type="checkbox" />${contactsSorted[i]['name']}</li>
        `;
    }
}

function getAssignedContactsMobile() {
    let assignedContacts = [];
    let counter = 0;
    let contactsSelection = Array.from(document.getElementsByClassName('input-contact-mobile'));
    contactsSelection.forEach(contact => {
        if (contact.checked) {
            assignedContacts.push(contactsSorted[counter]);
        }
        counter++;
    });
    return assignedContacts;
}

function renderContactsAddTask() {
    document.getElementById('contacts-to-assign').innerHTML = '';
    for (let i = 0; i < contactsSorted.length; i++) {
        document.getElementById('contacts-to-assign').innerHTML += `
        <li class="input-contact-listitem" style="background-color: ${contactsSorted[i]['bg-color']};" value="${[i]}"><input class="input-contact"
            type="checkbox" />${contactsSorted[i]['name']}</li>
        `;
    }
}

function getAssignedContacts() {
    let assignedContacts = [];
    let counter = 0;
    let contactsSelection = Array.from(document.getElementsByClassName('input-contact'));
    contactsSelection.forEach(contact => {
        if (contact.checked) {
            assignedContacts.push(contactsSorted[counter]);
        }
        counter++;
    });
    return assignedContacts;
}


/*render categories*/
function renderCategoriesMobile() {
    document.getElementById('select-category-mobile').innerHTML = '';
    document.getElementById('select-category-mobile').innerHTML = `
    <option disabled selected style="background-color:grey;">Select task category</option>
    <option style="color: black;">Create a new Category</option>
    `;
    categories.forEach(category => {
        document.getElementById('select-category-mobile').innerHTML += categoriesDropdownTemplate(category);
    });
}

function renderCategories() {
    document.getElementById('select-category').innerHTML = '';
    document.getElementById('select-category').innerHTML = `
    <option disabled selected style="background-color:grey;">Select task category</option>
    <option style="color: black;">Create a new Category</option>
    `;
    categories.forEach(category => {
        document.getElementById('select-category').innerHTML += categoriesDropdownTemplate(category);
    });
}

function categoriesDropdownTemplate(category) {
    return `<option style="background-color: ${category['color']}" value="${category['name']}">${category['name']}</option>`;
}

function showAddCategory() {
    let selectedIndex = document.getElementById('select-category').selectedIndex;
    if (selectedIndex === 1) {
        document.getElementById('select-category').classList.add('d-none');
        document.getElementById('create-category').classList.remove('d-none');
    } else {
        selectedCategory = categories[selectedIndex - 2];
    }
}

function showAddCategoryMobile() {
    let selectedIndex = document.getElementById('select-category-mobile').selectedIndex;
    if (selectedIndex === 1) {
        document.getElementById('select-category-mobile').classList.add('d-none');
        document.getElementById('create-category-mobile').classList.remove('d-none');
    } else {
        selectedCategory = categories[selectedIndex - 2];
    }
}

function selectColor(id) {
    for (let i = 1; i < 8; i++) {
        document.getElementById(`color${i}`).classList.remove('selected-color');
        if (document.getElementById(`color${i}-mobile`)) {
            document.getElementById(`color${i}-mobile`).classList.remove('selected-color');
        }
    }
    document.getElementById(`color${id}`).classList.add('selected-color');
    if (document.getElementById(`color${id}-mobile`)) {
        document.getElementById(`color${id}-mobile`).classList.add('selected-color');
    }
    selectedColor = document.getElementById(`color${id}`).style.backgroundColor;
}

async function createNewCategory() {
    if (selectedColor && document.getElementById('new-category').value != '') {
        let category = {
            'name': document.getElementById('new-category').value,
            'color': selectedColor
        }
        categories.push(category);
        await backend.setItem('categories', JSON.stringify(categories));
        dismissCategory();
        renderCategories();
        if (document.getElementById(`urgent-btn-mobile`)) {
            renderCategoriesMobile();
        }
    } else {
        alert('Please insert Categoryname and a color. To dismiss click x.');
    }
    selectedColor = null;
}

async function createNewCategoryMobile() {
    if (selectedColor && document.getElementById('new-category-mobile').value != '') {
        let category = {
            'name': document.getElementById('new-category-mobile').value,
            'color': selectedColor
        }
        categories.push(category);
        await backend.setItem('categories', JSON.stringify(categories));
        dismissCategoryMobile();
        renderCategoriesMobile();
        renderCategories();
    } else {
        alert('Please insert Categoryname and a color. To dismiss click x.');
    }
    selectedColor = null;
}

function dismissCategory() {
    document.getElementById('new-category').value = '';
    if (document.getElementsByClassName('selected-color').length > 0) {
        document.getElementsByClassName('selected-color')[0].classList.remove('selected-color');
    }
    document.getElementById('select-category').classList.remove('d-none');
    document.getElementById('create-category').classList.add('d-none');
    document.getElementById('select-category').selectedIndex = 0;
}

function dismissCategoryMobile() {
    document.getElementById('new-category-mobile').value = '';
    if (document.getElementsByClassName('selected-color').length > 0) {
        document.getElementsByClassName('selected-color')[0].classList.remove('selected-color');
    }
    document.getElementById('select-category-mobile').classList.remove('d-none');
    document.getElementById('create-category-mobile').classList.add('d-none');
    document.getElementById('select-category-mobile').selectedIndex = 0;
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
    let contactsSelectionMobile = Array.from(document.getElementsByClassName('input-contact-mobile'));
    contactsSelection.forEach(contact => {
        if (contact.checked == true) {
            contactAssigned = true;
        }
    });
    contactsSelectionMobile.forEach(contact => {
        if (contact.checked == true) {
            contactAssigned = true;
        }
    });
}

/*create Task on click create Button*/
async function createTask() {
    checkAssignedTo();
    if (selectedPriority && contactAssigned && selectedCategory) {
        if (document.getElementById('input-title').value != '') {
            await saveTask();
        } else {
            await saveTaskMobile();
        }
        clearTask();
        if(document.getElementById('tasks-inprogress-mobile')){
            resetArrays();
            declareArrays();
            renderTasks();
            hideAddTask();
        }
        localStorage.setItem('taskJustCreated', 'true');
        window.location.href = 'board.html';
    } else {
        alert('Please select a priority and assign a contact!');
    }
}

/*clear Button on click, reset Form*/
function clearTask() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-description').value = '';
    document.getElementById('select-category').selectedIndex = 0;
    document.getElementById('assign-to-list').classList.remove('visible');
    clearAssignedContacts();
    contactAssigned = false;
    selectedPriority = false;
    selectedCategory = null;
    statusTaskOnCreate = 'todo';
    document.getElementById('input-date').value = '';
    unsetBtnClicked();
    if (document.getElementById('low-btn-mobile')) {
        document.getElementById('input-title-mobile').value = '';
        document.getElementById('input-description-mobile').value = '';
        document.getElementById('select-category-mobile').selectedIndex = 0;
        document.getElementById('assign-to-list-mobile').classList.remove('visible');
        document.getElementById('input-date-mobile').value = '';
    }
}

function clearAssignedContacts() {
    let contactsSelection = Array.from(document.getElementsByClassName('input-contact'));
    contactsSelection.forEach(contact => {
        contact.checked = false;
    });
    let contactsSelectionMobile = Array.from(document.getElementsByClassName('input-contact-mobile'));
    contactsSelectionMobile.forEach(contact => {
        contact.checked = false;
    });
}

/*upload Task to database*/
async function saveTask() {
    let task = {
        'id': tasks.length,
        'title': document.getElementById('input-title').value,
        'description': document.getElementById('input-description').value,
        'category': selectedCategory,
        'assigned-contacts': getAssignedContacts(),
        'due-date': document.getElementById('input-date').value,
        'priority': selectedPriority,
        'status': statusTaskOnCreate
    }
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
}

async function saveTaskMobile() {
    let task = {
        'id': tasks.length,
        'title': document.getElementById('input-title-mobile').value,
        'description': document.getElementById('input-description-mobile').value,
        'category': selectedCategory,
        'assigned-contacts': getAssignedContactsMobile(),
        'due-date': document.getElementById('input-date-mobile').value,
        'priority': selectedPriority,
        'status': statusTaskOnCreate
    }
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
}

function showSuccessMessage() {
    document.getElementById("dialog-taskadded").classList.remove('d-none');
    setTimeout(function () {
        document.getElementById("dialog-taskadded").classList.add('d-none');
        localStorage.setItem('taskJustCreated', 'false');
    }, 2000);
}