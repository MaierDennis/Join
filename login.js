let users = [
    {
        'name': 'Niclas',
        'email': 'niclas@join.de',
        'password': 'niclas123',
    },

    {
        'name': 'Dennis',
        'email': 'dennis@join.de',
        'password': 'dennis123',
    },

    {
        'name': 'Simon',
        'email': 'simon@join.de',
        'password': 'simon123',
    }
];


function addUser() {
    let name = document.getElementById('name-signup');
    let email = document.getElementById('email-signup');
    let password = document.getElementById('password-signup');

    users.push({ name: name.value, email: email.value, password: password.value });

    backend.setItem('users', JSON.stringify(users));

    console.log(users);

    name.value = "";
    email.value = "";
    password.value = "";

    alert('You have signed up successfully. Please log in now.')

    closeSignUp();

}

function login() {
    let email = document.getElementById('email-login');
    let password = document.getElementById('password-login');

    let user = users.find(u => u.email === email.value && u.password == password.value);

    console.log(user);

    
    if(user) {
        alert ('You are logged in. Click "OK" to proceed');
        window.open("board.html");
        // window.open("board.html", "_self");
    } else {
        alert ('Wrong E-Mail or Password. User not found. Try again or sign up if you have no Join account');
    }

    email.value = "";
    password.value = "";

}







function getData() {
    backend.getItem('users');
    JSON.parse(backend.getItem('users'));
    users = JSON.parse(backend.getItem('users'));
    console.log(users);

}

