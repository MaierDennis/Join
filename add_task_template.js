/*edit task*/
function showAddTaskEdit(taskId){
    let task = getTaskById(taskId);
    document.getElementById('add-task-overlay-board').classList.remove('d-none');
    document.getElementById('body').style = 'overflow-y: hidden;';
    document.getElementById('overlay').classList.add('d-none');
    renderEditTask(task);
}

function getTaskById(taskId){
    let task = tasks.filter(task => task['id'] === taskId);
    return task[0];
}

function renderEditTask(task){
    document.getElementById('input-title').value = task['title'];
    document.getElementById('input-description').value = task['description'];
    console.log(task['due-date']);
    document.getElementById('input-date').value = task['due-date'];
}