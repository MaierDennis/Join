

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
        window.open("board.html", "_self"); 
        alert ('You are logged in. Click "OK" to proceed');  
        backend.setItem('activeUser', JSON.stringify(user));  // saving active user in database
        console.log(activeUser);
    } else {
        alert ('User not found');
    }

    email.value = "";
    password.value = "";

}

function guestLogin() {

    window.open("board.html", "_self");
    console.log ('Guest is logged in'); 

}


// function getData() {
//     backend.getItem('users');
//     JSON.parse(backend.getItem('users'));
//     users = JSON.parse(backend.getItem('users'));
//     console.log(users);

// }

