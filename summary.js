async function renderSummary(){
    await init();
    renderFirstRow();
    renderSecondRow();
    renderThirdRow();
    renderGreeting();
}

function renderFirstRow(){
    document.getElementById('summaryTasksBoard').innerText = tasks.length;
    document.getElementById('summaryTasksProgress').innerText = getAmountTasksInProgress();
    document.getElementById('summaryTasksFeedback').innerText = getAmountTasksFeedback();
    document.getElementById('summaryTasksBoard-mobile').innerText = tasks.length;
    document.getElementById('summaryTasksProgress-mobile').innerText = getAmountTasksInProgress();
    document.getElementById('summaryTasksFeedback-mobile').innerText = getAmountTasksFeedback();
}

function renderSecondRow(){
    document.getElementById('summaryTasksUrgent').innerText = getUrgentTasks();
    document.getElementById('currentDate').innerHTML = getCurrentDay();
    document.getElementById('summaryTasksUrgent-mobile').innerText = getUrgentTasks();
    document.getElementById('currentDate-mobile').innerHTML = getCurrentDay();
}

function renderThirdRow(){
    document.getElementById('summaryTasksTodo').innerText = getAmountTasksTodo();
    document.getElementById('summaryTasksDone').innerText = getAmountTasksDone();
    document.getElementById('summaryTasksTodo-mobile').innerText = getAmountTasksTodo();
    document.getElementById('summaryTasksDone-mobile').innerText = getAmountTasksDone();
}

function renderGreeting(){
    if(activeUser['name'] != 'Guest'){
        document.getElementById('greeting-name').innerText = activeUser['name'];
    }
}

function getCurrentDay(){
    let currentDay = new Date().toLocaleString();
    currentDay = currentDay.slice(0, 10);
    let currentDayArray = currentDay.split(".");
    let currentMonth = getCurrentMonth(currentDayArray[1]);
    currentDay = currentMonth + " " + currentDayArray[0] + ", " + currentDayArray[2];
    console.log(currentDay);
    return `<strong>${currentDay}</strong>`
}

function getCurrentMonth(i){
    if(i === '01'){
        return 'January';
    }
    if(i === '02'){
        return 'February';
    }
    if(i === '03'){
        return 'March';
    }
    if(i === '04'){
        return 'April';
    }
    if(i === '05'){
        return 'May';
    }
    if(i === '06'){
        return 'June';
    }
    if(i === '07'){
        return 'July';
    }
    if(i === '08'){
        return 'August';
    }
    if(i === '09'){
        return 'September';
    }
    if(i === '10'){
        return 'October';
    }
    if(i === '11'){
        return 'November';
    }
    if(i === '12'){
        return 'December';
    }
}

function getAmountTasksTodo(){
    let tasksTodo = tasks.filter(task => task['status'] === 'todo');
    return tasksTodo.length;
}

function getAmountTasksDone(){
    let tasksDone = tasks.filter(task => task['status'] === 'done');
    return tasksDone.length;
}

function getAmountTasksInProgress(){
    let tasksInProgress = tasks.filter(task => task['status'] === 'progress');
    return tasksInProgress.length;
}

function getAmountTasksFeedback(){
    let tasksFeedback = tasks.filter(task => task['status'] === 'feedback');
    return tasksFeedback.length;
}

function getUrgentTasks(){
    let tasksUrgent = tasks.filter(task => task['priority'] === 'urgent');
    return tasksUrgent.length;
}