function openNewContact() {
    document.getElementById('add-contact').classList.remove('d-none');
    document.getElementById('overview').classList.add('d-none');
    document.getElementById('overlay').classList.remove('d-none');
}

function closeNewContact() {
    document.getElementById('add-contact').classList.add('d-none');
    document.getElementById('overview').classList.remove('d-none');
    document.getElementById('overlay').classList.add('d-none');
}

function openEditContact(){
    document.getElementById('edit-contact').classList.remove('d-none');
    document.getElementById('complete-contact').classList.add('d-none');
    document.getElementById('overlay').classList.remove('d-none');
}

function closeEditContact(){
    document.getElementById('edit-contact').classList.add('d-none');
    document.getElementById('complete-contact').classList.remove('d-none');
    document.getElementById('overlay').classList.add('d-none');
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
