let contacts = [];

function addNewContact(){
    let name = document.getElementById('contact-name');
    let email = document.getElementById('contact-email');
    let phone = document.getElementById('contact-phone');

    let contact = {
        'name' : name.value,
        'email' : email.value,
        'phone' : phone.value
    }

    name.innerHTML = '';
    email.innerHTML = '';
    phone.innerHTML = '';

    console.log(allContacts);

    closeEditNewContact();
    pushNewContact(contact);
}

function pushNewContact(contact) {
    contacts.push(contact);

    console.log(contacts);
    backend.setItem('contact', JSON.stringify(contacts));
}