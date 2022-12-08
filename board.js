let cardOpened = false;


function closeCard () {
    getElement('card-container').classList.add('d-none');
    getElement('overlay').classList.add('d-none');
    getElement('body').classList.add ('oflow-y-unset');
    getElement('body').classList.remove ('oflow-y-hidden');
    cardOpened = false;
}

function openCard(){
    // currentOpenedPokemon = i ;
    cardOpened = true;
    getElement('card-container').classList.remove('d-none');
    getElement('overlay').classList.remove('d-none');
    getElement('body').classList.add('oflow-y-hid');
    getElement('body').classList.remove('oflow-y-unset');


}

function getElement(id) {
    return document.getElementById(id);
}



// EVENT LISTENERS
document.addEventListener('keydown', function(event){      
	if(event.key === "Escape"){
		closeCard();
	}
}); 