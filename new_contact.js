let allContacts = [];

function addNewContact(){
    let name = document.getElementById('contact-name');
    let email = document.getElementById('contact-email');
    let phone = document.getElementById('contact-phone');

    let contact = {
        'name' : name.value,
        'email' : email.value,
        'phone' : phone.value
    }

    


    allContacts.push(contact);
    console.log(allContacts);

    closeEditNewContact();
    name.innerHTML = '';
    email.innerHTML = '';
    phone.innerHTML = '';
}