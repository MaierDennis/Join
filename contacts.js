/*initialize contacts*/
async function initContacts(){
    await init();
    render('contacts'); 
    checkContacts(); 
    showContacts();
}


function closeEditNewContact() {
    document.getElementById('add-contact').classList.add('d-none');
    document.getElementById('edit-contact').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
}

function openNewContact() {
    document.getElementById('add-contact').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
}

function openEditContact() {
    document.getElementById('edit-contact').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');

    document.getElementById('edit-name').placeholder = (contacts[activeContact]['name']);
    document.getElementById('edit-email').placeholder = (contacts[activeContact]['email']);
    document.getElementById('edit-phone').placeholder = (contacts[activeContact]['phone']);
}

function showContacts() {
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

function closeSingleContact() {
    document.getElementById('complete-contact').classList.add('d-none');
    document.getElementById('contact-list').classList.remove('d-none');
}

function doNotClose(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeEditNewContact();        // an der Stelle die Funktion einsetzen, die das Fenster schließen soll
    }
});