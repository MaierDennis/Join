let contacts = [];

function addNewContact() {
    let name = document.getElementById('contact-name');
    let email = document.getElementById('contact-email');
    let phone = document.getElementById('contact-phone');

    let contact = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value
    }

    name.value = '';
    email.value = '';
    phone.value = '';

    contacts.push(contact);

    closeEditNewContact();
    pushNewContact();

}

function pushNewContact() {
    backend.setItem('contact', JSON.stringify(contacts));
}

function renderContacts() {
    let singleContact = document.getElementById('single-contact');

    singleContact.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let thisContact = contacts[i];
        contactName = thisContact['name'];
        contactEmail = thisContact['email'];
        contactPhone = thisContact['phone'];

        let initials = getInitials(contactName);

        singleContact.innerHTML += `
        <div onclick="openSingleContact(), showThisContactInfos('${contactName}', '${contactEmail}', ${contactPhone})" class="single-contact">
                                <div class="initials">${initials}</div>
                                <div class="name-email">
                                    <div class="name-small">${contactName}</div>
                                    <div class="email-small">${contactEmail}</div>
                                </div>
                            </div>
        `;
    }
}

function getInitials(name) {
    let parts = name.split(' ')
    let initials = ''
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0]
        }
    }
    return initials

}

/* Zum leeren der Kontakte*/

async function deleteUser() {
    await backend.deleteItem('contact',);
}


function showThisContactInfos(contactName, contactEmail, contactPhone) {
    let fullContact = document.getElementById('full-contact');

    fullContact.innerHTML = `
    <div class="this-contact">
    <div class="head">
        <div class="arrow-back" onclick="closeSingleContact()"><img
                src="assets/img/arrow_left_black.png"></div>
        <div class="headline-contacts">
            <h1>Contacts</h1>
        </div>
        <div class="horizontal-line"></div>
        <div class="motivation"><span>Better with a team</span></div>
        <div class="vertical-line"></div>
    </div>

    <div class="name">
        <div class="initials-big">DM</div>
        <div class="name-addTask">
            <div class="name-big">
                <h2>${contactName}</h2>
            </div>
            <div class="addTask-button" onclick="showAddTask()">+ Add Task</div>
        </div>
    </div>

    <div class="contact-information">
        <div class="heading-information"> <span>Contact Information</span></div>
        <div class="edit-contact" onclick="openEditContact()"> <img
                src="assets/img/pencil.png"><span>Edit Contact</span></div>
    </div>

    <div class="email-div">
        <div class="contact-variant">Email</div>
        <div class="email-adress"><a href="#">${contactEmail}</a></div>
    </div>

    <div class="phone-div">
        <div class="contact-variant">Phone</div>
        <div class="phone-number">${contactPhone}</div>
    </div>

    <div class="new-contact-button" onclick="openNewContact()"><button>New contact<img
                src="assets/img/add_contact_icon.png"></button>
    </div>

    <div class="mobile-edit-button" onclick="openEditContact()"><img
            src="assets/img/white_pencil.png"></div>

</div>
    `;
}
