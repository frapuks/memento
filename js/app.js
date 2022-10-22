const memento = {
    // -------- VARIABLES -------- \\    
    moaiens : [
        'images/Abdelkarim.png',
        'images/AdrienB.png',
        'images/AdrienH.png',
        'images/Ahmed.png',
        'images/Alexandre.png',
        'images/Amaury.png',
        'images/Anis.png',
        'images/Arnaud.png',
        'images/Azouaou.png',
        'images/Bryan.png',
        'images/Charlotte.png',
        'images/Clemence.png',
        'images/Cyril.png',
        'images/Enzo.png',
        'images/Fabien.png',
        'images/Fabrice.png',
        'images/Fanny.png',
        'images/Fetra.png',
        'images/Floriane.png',
        'images/Florine.png',
        'images/Francois.png',
        'images/Gautier.png',
        'images/Hugo.png',
        'images/Jm.png',
        'images/Joseph.png',
        'images/Julien.png',
        'images/Karen.png',
        'images/Karim.png',
        'images/Kilian.png',
        'images/Laetitia.png',
        'images/Lea.png',
        'images/Lynda.png',
        'images/Matthieu.png',
        'images/Maxime.png',
        'images/Mia.png',
        'images/Mickael.png',
        'images/Morgane.png',
        'images/Mug.png',
        'images/Nikola.png',
        'images/Olivier.png',
        'images/Quentin.png',
        'images/Rachid.png',
        'images/Ramazan.png',
        'images/Ronald.png',
        'images/Sion.png',
        'images/Sophie.png',
        'images/Tom.png',
        'images/Wesley.png',
        'images/Whitney.png',
        'images/Yoann.png',
    ],
    nbrCounter : 0,
    level : 25,
    bestScore : 99999,



    // -------- ELEMENTS -------- \\
    targetContainerElement : document.getElementById('container'),
    targetCounterElement: document.querySelector('.counter'),
    targetBestScoreElement: document.querySelector('.bestScore'),
    targetOverlayElement: document.getElementById('overlay'),
    
    


    // -------- BUTTONS -------- \\
    targetStartBtn : document.querySelector('.StartBtn'),



    // -------- INIT -------- \\
    init : () => {
        console.log('Hello from space 🚀');
        memento.handleListener();
    },
   


    // -------- HANDLE LISTENER -------- \\
    handleListener : () => {
        memento.targetStartBtn.addEventListener('click', memento.handleBtnStart);
    },

    handleBtnStart : () => {
        memento.nbrCounter = 0;
        memento.targetStartBtn.style.display = "none";
        memento.displayCards();
    },
    
    handleCard : (event) => {
        event.currentTarget.classList.add('card--return');
        let cardReturn = document.querySelectorAll('.card--return');
        
        if (cardReturn.length === 2) {
            memento.targetOverlayElement.classList.remove('hidden');
            setTimeout(memento.checkPairingCard, 1200, cardReturn);
        }
    },
    


    // -------- METHODS -------- \\    
    displayCards : () => {
        memento.moaiens.sort(() => Math.random() - 0.5);

        const tab = [];
        
        for (i = 0 ; i < memento.level ; i++) {
            for (let a = 0; a < 2; a++) {
                const front = document.createElement('div');
                front.style.backgroundImage = `url('../images/logo_MOAI.png')`;
                front.classList.add("front");

                const back = document.createElement('div');
                back.style.backgroundImage = `url('${memento.moaiens[i]}')`;
                back.classList.add("back");

                const card = document.createElement('div');
                card.append(front);
                card.append(back);

                card.classList.add("card");
                card.addEventListener('click', memento.handleCard)
                card.dataset.index = i;

                const container = document.createElement('div');
                container.classList.add('containerCard');
                container.append(card);

                tab.push(container);
            }
        }
        
        tab.sort(() => Math.random() - 0.5);
    
        for(let card of tab){
            memento.targetContainerElement.appendChild(card);
        }        
    },

    checkPairingCard : (cardReturn) => {
        
        for (const card of cardReturn) {
            card.classList.remove('card--return');
        }
        if (cardReturn[0].dataset.index === cardReturn[1].dataset.index) {
            cardReturn[0].classList.add('card--valid');
            cardReturn[1].classList.add('card--valid');
        }
        memento.nbrCounter++;
        memento.targetCounterElement.textContent = memento.nbrCounter;
        memento.targetOverlayElement.classList.add('hidden');
        memento.checkVictory();
    },

    checkVictory : () => {
        const targetCardValidElement = document.querySelectorAll('.card--valid');
        if(targetCardValidElement.length === memento.level*2){
            memento.targetStartBtn.style.display = "block";
            memento.targetStartBtn.textContent = 'Winner ! Restart ?';
            if(memento.bestScore > memento.nbrCounter){
                memento.targetBestScoreElement.textContent = memento.nbrCounter;
            }

            const containerCardElements = document.querySelectorAll('.containerCard');
            for (let elem of containerCardElements){
                elem.remove();
            }
        }
    },
}

memento.init();

// TODO

//V2:
    // une version avec un nombre de coups maximum possible.
    // gerer la difficultée avec le nombre de cartes affichées.