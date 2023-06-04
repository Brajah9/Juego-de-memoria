"use strict"

const botonStart = document.querySelector('.start');
const contenedor = document.querySelector('.box-cont');
const box = contenedor.querySelectorAll('.box');
const alerta = document.querySelector('.alerta');

let pause = false;
let puntos = 0;
let clicks = 0;
let randomNums = []

function comprobar() {
    const [nA, nB, nC] = randomNums;

    if ( clicks >= 4) {
        pause = false;
        console.log("Perdiste")
        puntos = 0;
        reiniciar()
        return;
    }

    else if (
        box[nA] &&
        box[nB] &&
        box[nC] &&
        box[nA].classList &&
        box[nB].classList &&
        box[nC].classList &&
        box[nA].classList.contains('boxOn') &&
        box[nB].classList.contains('boxOn') &&
        box[nC].classList.contains('boxOn')
    ) {
        pause = false;
        randomNums = [];
        setTimeout(()=> {
            pause = true;
        },2000)
        setTimeout(()=> {
            randoms()
            juego()
        },500)
        for (let i = 0; i < box.length; i++) {
            if (box[i].classList.contains('boxOn')) {
                box[i].classList.remove('boxOn');
            }
        }
        clicks = 0;
        puntos++;
        alerta.textContent = "Puntos: " + puntos;
        return;
    }
}


botonStart.addEventListener('click', ()=> {
    randoms()
    juego()
    setInterval(()=> {comprobar()});
    setTimeout(()=>{
        pause = true;
    },1500)
    return;
})

contenedor.addEventListener('click', (e)=> {
    if (pause == true) {
        boxOn(e);
    }
})

function boxOn(e) {
        clicks++
        box[e.target.id].classList.add('boxOn');
}

function juego() {
    const [nA,nB,nC] = randomNums;

    box[nA].classList.add('boxTime');
    box[nB].classList.add('boxTime');
    box[nC].classList.add('boxTime');
    setTimeout(()=> {
        box[nA].classList.remove('boxTime');
        box[nB].classList.remove('boxTime');
        box[nC].classList.remove('boxTime');
    },1500)
}


function randoms() {

    while (randomNums.length < 3) {
        let num = parseInt(Math.random()*8)
        if (randomNums.indexOf(num) === -1){
            randomNums.push(num);
        }
    }
}

function reiniciar() {
    alerta.textContent = "Puntos: " + puntos;
    pause = false;
    randomNums = [];
    for (let i = 0; i < box.length; i++) {
        if (box[i].classList.contains('boxOn')) {
            box[i].classList.remove('boxOn');
        }
    }
    clicks = 0;
    return;
}
