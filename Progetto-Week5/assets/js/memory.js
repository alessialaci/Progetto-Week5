let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];


document.body.onload = startGame();

var arrayComparison = [];
var interval = setInterval(tempo, 1000);
var find = document.querySelector('.find');
var modal = document.getElementById('modal');
var min = 0;
var sec = 0;
var timer = document.querySelector('.timer');
var iconsFind = document.getElementsByClassName('find');


// una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}


// la funzione startGame che pulisce il timer, mescola casualmente l'array degli animali (var arrayShuffle = shuffle(arrayAnimali);),
// aggancia il contenitore con id griglia, pulisce tutti gli elementi che eventualmente contiene,
// poi fa un ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto
function startGame() {
    min = 0;
    sec = 0;
    let arrayShuffle = shuffle(arrayAnimali);
    let griglia = document.getElementById('griglia');

    griglia.innerHTML = "";

    for (i = 0; i < arrayAnimali.length; i++) {
        let card = document.createElement("div");
        let icone = document.createElement("div");

        griglia.appendChild(card);
        card.appendChild(icone);

        icone.classList.add('icon');
        icone.innerHTML = arrayShuffle[i];

        icone.addEventListener('click', displayIcon);
    }
}


// una funzione che calcola il tempo e aggiorna il contenitore sotto
function tempo() {
    sec++;

    if (sec == 60) {
        sec = 0;
        min++;
    }

    timer.innerHTML = `Tempo: ${min} min ${sec} sec`;
}


function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function (item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function () {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function (item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
    fine();
}


// una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function fine() {
    if (iconsFind.length == 24) {
        modal.classList.add('active');
    }
    document.querySelector('#tempoTrascorso').innerText = `${min} min ${sec} sec`;
}


// una funzione che rimuove la classe active e chiama la funzione startGame()
function playAgain() {
    modal.classList.remove('active');
    startGame();
}