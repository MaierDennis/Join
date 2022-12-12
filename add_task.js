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