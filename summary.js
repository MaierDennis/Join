/**
 * This function calls important functions on onload of the body to get and render the needed data
 */
async function renderSummary(){
    await init();
    render('summary');
    renderFirstRow();
    renderSecondRow();
    renderThirdRow();
    renderGreeting();
}

/**
 * renders and puts data into the first row at summary(e.g. how many tasks are at the status feedback)
 */
function renderFirstRow(){
    document.getElementById('summaryTasksBoard').innerText = tasks.length;
    document.getElementById('summaryTasksProgress').innerText = getAmountTasksInProgress();
    document.getElementById('summaryTasksFeedback').innerText = getAmountTasksFeedback();
    document.getElementById('summaryTasksBoard-mobile').innerText = tasks.length;
    document.getElementById('summaryTasksProgress-mobile').innerText = getAmountTasksInProgress();
    document.getElementById('summaryTasksFeedback-mobile').innerText = getAmountTasksFeedback();
}

/**
 * renders and puts data into the second row at summary(e.g. how many tasks are urgent)
 */
function renderSecondRow(){
    document.getElementById('summaryTasksUrgent').innerText = getUrgentTasks();
    document.getElementById('currentDate').innerHTML = getCurrentDay();
    document.getElementById('summaryTasksUrgent-mobile').innerText = getUrgentTasks();
    document.getElementById('currentDate-mobile').innerHTML = getCurrentDay();
}

/**
 * renders and puts data into the third row at summary(e.g. how many tasks are at the status todo)
 */
function renderThirdRow(){
    document.getElementById('summaryTasksTodo').innerText = getAmountTasksTodo();
    document.getElementById('summaryTasksDone').innerText = getAmountTasksDone();
    document.getElementById('summaryTasksTodo-mobile').innerText = getAmountTasksTodo();
    document.getElementById('summaryTasksDone-mobile').innerText = getAmountTasksDone();
}

/**
 * shows name of logged in user at greeting
 */
function renderGreeting(){
    if(activeUser != 'Guest'){
        document.getElementById('greeting-name').innerText = activeUser;
    }
}

/**
 * gets the date of the users today
 * @returns {HTMLElement} currentDay - date of today in an html element
*/
function getCurrentDay(){
    let currentDay = new Date().toLocaleString();
    currentDay = currentDay.slice(0, 10);
    let currentDayArray = currentDay.split(".");
    let currentMonth = getCurrentMonth(currentDayArray[1]);
    currentDay = currentMonth + " " + currentDayArray[0] + ", " + currentDayArray[2];
    return `<strong>${currentDay}</strong>`
}

/**
 * function returns the name of the month depending on his number in the date
 * @param {number} i - number of the month 
 * @returns {string} month - name of the month
 */
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

/**
 * gets called to return the amount of tasks with status todo
 * @returns {number} tasksTodo - amount of tasks with status todo
 */
function getAmountTasksTodo(){
    let tasksTodo = tasks.filter(task => task['status'] === 'todo');
    return tasksTodo.length;
}

/**
 * gets called to return the amount of tasks with status done
 * @returns {number} tasksDone - amount of tasks with status done
 */
function getAmountTasksDone(){
    let tasksDone = tasks.filter(task => task['status'] === 'done');
    return tasksDone.length;
}

/**
 * gets called to return the amount of tasks with status progress
 * @returns {number} tasksProgress - amount of tasks with status progress
 */
function getAmountTasksInProgress(){
    let tasksInProgress = tasks.filter(task => task['status'] === 'progress');
    return tasksInProgress.length;
}

/**
 * gets called to return the amount of tasks with status feedback
 * @returns {number} tasksFeedback - amount of tasks with status feedback
 */
function getAmountTasksFeedback(){
    let tasksFeedback = tasks.filter(task => task['status'] === 'feedback');
    return tasksFeedback.length;
}

/**
 * gets called to return the amount of tasks with priority urgent
 * @returns {number} tasksUrgent - amount of tasks with priority urgent
 */
function getUrgentTasks(){
    let tasksUrgent = tasks.filter(task => task['priority'] === 'urgent');
    return tasksUrgent.length;
}