async function renderGreetingHello(){
    await init();
    if(activeUser != 'Guest'){
        document.getElementById('greeting-name-mobile').innerText = activeUser;
    }
    setTimeout(() =>{
        window.location.href = 'summary.html';
    }, 3000);
}