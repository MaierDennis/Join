let users = [
    {
        'name': 'Niclas',
        'email': 'niclas@test.de',
        'password': 'test123',
    }
];


function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    users.push({name: name.value, email:email.value, password:password.value})

    console.log(users);

    name.value = "";
    email.value = "";
    password.value = "";

    alert('You have signed up successfully. Please log in now.')

    //Weiterleitung zu Login
    //window.location.href = 'index.html';

}

