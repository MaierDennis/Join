function openForgotPassword(){
    document.getElementById('forgot-password').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
}

function closeForgotPassword(){
    document.getElementById('forgot-password').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
}

function openSignUp(){
    document.getElementById('login').classList.add('d-none');
    document.getElementById('sign-up').classList.remove('d-none');
}

function closeSignUp(){
    document.getElementById('login').classList.remove('d-none');
    document.getElementById('sign-up').classList.add('d-none');
}