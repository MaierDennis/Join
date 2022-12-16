

async function addUser() {
    let name = document.getElementById('name-signup');
    let email = document.getElementById('email-signup');
    let password = document.getElementById('password-signup');

    users.push({ name: name.value, email: email.value, password: password.value });

    await backend.setItem('users', JSON.stringify(users));

    window.location.href = 'success_signup.html';


    // console.log(users);

    name.value = "";
    email.value = "";
    password.value = "";



    // closeSignUp();

}

async function login() {
    let email = document.getElementById('email-login');
    let password = document.getElementById('password-login');
    
    let user = users.find(u => u.email === email.value && u.password == password.value);
    console.log(user);
    
    if(user) {
        await backend.setItem('activeUser', JSON.stringify(user));  // saving active user in database 
        alert ('You are logged in. Click "OK" to proceed');  
        window.location.href = 'board.html';
        console.log(activeUser);
    } else {
        alert ('User not found');
    }

    email.value = "";
    password.value = "";

}

async function guestLogin() {
    let guest = {
        'name': 'Guest',
        'email': 'guest@join.de',
        'password': 'guest'
    }

    await backend.setItem('activeUser', JSON.stringify(guest) );
    window.location.href = 'board.html';           
}


// function getData() {
//     backend.getItem('users');
//     JSON.parse(backend.getItem('users'));
//     users = JSON.parse(backend.getItem('users'));
//     console.log(users);

// }

