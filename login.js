

async function addUser() {
    let name = document.getElementById('name-signup');
    let email = document.getElementById('email-signup');
    let password = document.getElementById('password-signup');

    users.push({ name: name.value, email: email.value, password: password.value });

    await backend.setItem('users', JSON.stringify(users));

    window.location.href = 'success_signup.html';

    name.value = "";
    email.value = "";
    password.value = "";
}

async function login() {
    let email = document.getElementById('email-login');
    let password = document.getElementById('password-login');

    let user = users.find(u => u.email === email.value && u.password == password.value);
    console.log(user);

    if (user) {
        await backend.setItem('activeUser', JSON.stringify(user));  // saving active user in database 
        // alert ('You are logged in. Click "OK" to proceed'); 
        if (document.body.clientWidth > 1024) {
            window.location.href = 'summary.html';
        } else {
            window.location.href = 'hello_mobile.html';
        }
        console.log(activeUser);
    } else {
        // alert ('User not found');
        document.getElementById('user-not-found').classList.remove('d-none');
        email.value = "";
        password.value = "";
    }


}

async function guestLogin() {
    let guest = {
        'name': 'Guest',
        'email': 'guest@join.de',
        'password': 'guest'
    }

    await backend.setItem('activeUser', JSON.stringify(guest));  // saving guest as activeuser in backend
    if (document.body.clientWidth > 1024) {
        window.location.href = 'summary.html';
    } else {
        window.location.href = 'hello_mobile.html';
    }
}

function checkIfUserExists(e) {

    let email = document.getElementById('forgot-pw-mail');
    let user = users.find(u => u.email === email.value);

    console.log(user);

    if (user) {
        return true
        // console.log('User exists:', user);
        // email.value = '';
    } else {
        e.preventDefault();
        document.getElementById('forgot-user-not-found').classList.remove('d-none');
        email.value = "";
        console.warn('User not found. Try again');

        return false
    }

}

async function changePassword() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    let newPassword = document.getElementById('new-password');
    let newPasswordConfirm = document.getElementById('new-password-confirm');

    let findMailInUsers = users.find (u => u.email == email);

    if (newPassword.value == newPasswordConfirm.value) {
        findMailInUsers.password = newPassword.value;

        console.log('Changing password for this user: ', email);
        console.log('Password changed to:',findMailInUsers.password);

        await backend.setItem('users', JSON.stringify(users));
        window.location.href = 'success_reset_pw.html'
        newPassword.value = '';
        newPasswordConfirm.value = '';
        
    } else {
        document.getElementById('user-not-found').classList.remove('d-none');
        newPassword.value = '';
        newPasswordConfirm.value = '';
    }
}



//PASSWORD SHOW AND HIDE FUNCTIONS

function changePwIconToEye() {
    document.getElementById('pw-icon-no-show').classList.remove('d-none');
    document.getElementById('pw-icon').classList.add('d-none');
    document.getElementById('pw-icon-show').classList.add('d-none');

}

function changePwIconToLock() {
    document.getElementById('pw-icon-no-show').classList.add('d-none');
    document.getElementById('pw-icon').classList.remove('d-none');

}

function changePwToText(e) {
    e.preventDefault();
    document.getElementById('pw-icon-no-show').classList.add('d-none');
    document.getElementById('pw-icon-show').classList.remove('d-none');

    document.getElementById('password-login').type = 'text';



}

function changeTextToPw() {
    document.getElementById('pw-icon-no-show').classList.remove('d-none');
    document.getElementById('pw-icon-show').classList.add('d-none');

    document.getElementById('password-login').type = 'password';


}


// function getData() {
//     backend.getItem('users');
//     JSON.parse(backend.getItem('users'));
//     users = JSON.parse(backend.getItem('users'));
//     console.log(users);

// }

