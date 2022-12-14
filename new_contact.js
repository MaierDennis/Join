let contacts = [];
let alphabetList = [];
let sortedAlphabetList = [];

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


function checkContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let thisContact = contacts[i];
        contactName = thisContact['name'];
        contactEmail = thisContact['email'];
        contactPhone = thisContact['phone'];

        let firstLetter = getFirstLetter(contactName);

        checkAlphabetBox(firstLetter);
    }
    sortAlphabetList();
    createAlphabetBox();
    renderThisContacts();
}

function checkAlphabetBox(firstLetter) {
    if (!alphabetList.includes(firstLetter)) {
        alphabetList.push(firstLetter)
    }
}

function sortAlphabetList() {
    alphabetList.sort();
    sortedAlphabetList = [];

    for (let i = 0; i < alphabetList.length; i++) {
        let letter = alphabetList[i];
        sortedAlphabetList.push(letter);
    }
}

function createAlphabetBox() {
    let contactList = document.getElementById('all-contacts');

    contactList.innerHTML = '';

    for (let i = 0; i < sortedAlphabetList.length; i++) {
        let letter = sortedAlphabetList[i];

        contactList.innerHTML += `
        <div class="alphabet-box">
        <div class="first-letter-box">
            <h3>${letter}</h3>
        </div>

        <div class="line"></div>

        <div style="width: 100%;" id="single-contact${letter}"></div>

    </div>
        `;
    }
}

function renderThisContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let thisContact = contacts[i];
        contactName = thisContact['name'];
        contactEmail = thisContact['email'];
        contactPhone = thisContact['phone'];

        let firstLetter = getFirstLetter(contactName);

        let initials = getInitials(contactName);

        document.getElementById('single-contact' + firstLetter).innerHTML += `
        <div onclick="openSingleContact(), showThisContactInfos('${contactName}', '${contactEmail}', ${contactPhone}, '${initials}')" class="single-contact">
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

function getFirstLetter(name) {
    return name.charAt(0);
}


/* Zum leeren der Kontakte*/

async function deleteUser() {
    await backend.deleteItem('contact',);
}


function showThisContactInfos(contactName, contactEmail, contactPhone, initials) {
    document.getElementById('bigContactInitials').innerHTML = initials;
    document.getElementById('bigContactName').innerHTML = contactName;
    document.getElementById('bigContactEmail').innerHTML = contactEmail;
    document.getElementById('bigContactPhone').innerHTML = contactPhone;
}
