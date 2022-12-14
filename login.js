let users = [
    {
        'name': 'Niclas',
        'email': 'niclas@test.de',
        'password': 'niclas123',
    },

    {
        'name': 'Dennis',
        'email': 'dennis@test.de',
        'password': 'dennis123',
    },

    {
        'name': 'Simon',
        'email': 'simon@test.de',
        'password': 'simon123',
    }
];


function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    users.push({ name: name.value, email: email.value, password: password.value });

    backend.setItem('users', JSON.stringify(users));

    console.log(users);

    name.value = "";
    email.value = "";
    password.value = "";

    alert('You have signed up successfully. Please log in now.')

    users = [];

    //Weiterleitung zu Login
    //window.location.href = 'index.html';

}

