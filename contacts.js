function openNewContact(){
    document.getElementById('add-contact').classList.remove('d-none');
    document.getElementById('overview').classList.add('d-none');
}

function closeNewContact(){
    document.getElementById('add-contact').classList.add('d-none');
    document.getElementById('overview').classList.remove('d-none');
}