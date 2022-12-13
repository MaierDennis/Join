function closeEditNewContact() {
    document.getElementById('add-contact').classList.add('d-none');
    document.getElementById('edit-contact').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('close-div').classList.add('d-none');
}

function openNewContact() {
    document.getElementById('add-contact').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('close-div').classList.remove('d-none');
}

function openEditContact(){
    document.getElementById('edit-contact').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('close-div').classList.remove('d-none');
}

function showContacts() {
    console.log(window.innerWidth)
    if (window.innerWidth < 1024) {
        document.getElementById('complete-contact').classList.add('d-none');
        document.getElementById('contact-list').classList.remove('d-none');
    }
    else {
        document.getElementById('complete-contact').classList.remove('d-none');
        document.getElementById('contact-list').classList.remove('d-none');
    }
}


function openSingleContact() {
    if (window.innerWidth < 1024) {
        document.getElementById('complete-contact').classList.remove('d-none');
        document.getElementById('contact-list').classList.add('d-none');
    }
    else {
        document.getElementById('complete-contact').classList.remove('d-none');
        document.getElementById('contact-list').classList.remove('d-none');
    }
}

function closeSingleContact(){
        document.getElementById('complete-contact').classList.add('d-none');
        document.getElementById('contact-list').classList.remove('d-none');
}

function doNotClose(event) {
    event.stopPropagation();
}