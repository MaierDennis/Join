async function render(currentSection) {
    await includeHTML();
    setActiveSection(currentSection);
}


/*add templates*/
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/*set currentSection in templates*/
function setActiveSection(currentSection){
    if(currentSection == 'summary'){
        document.getElementById('summary-section').classList.add('active-content-section');
        document.getElementById('summary-section-mobile').classList.add('active-content-section');
    }
    if(currentSection == 'board'){
        document.getElementById('board-section').classList.add('active-content-section');
        document.getElementById('summary-section-mobile').classList.add('active-content-section');
    }
    if(currentSection == 'addtask'){
        document.getElementById('addtask-section').classList.add('active-content-section');
        document.getElementById('summary-section-mobile').classList.add('active-content-section');
    }
    if(currentSection == 'contacts'){
        document.getElementById('contacts-section').classList.add('active-content-section');
        document.getElementById('summary-section-mobile').classList.add('active-content-section');
    }
    if(currentSection == 'legalnotice'){
        document.getElementById('legalnotice-section').classList.add('active-content-section');
        document.getElementById('summary-section-mobile').classList.add('active-content-section');
    }
}