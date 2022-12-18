async function renderGreetingHello(){
    await init();
    if(activeUser['name'] != 'Guest'){
        document.getElementById('greeting-name-mobile').innerText = activeUser['name'];
    }
    setTimeout(() =>{
        window.location.href = 'summary.html';
    }, 3000);
}