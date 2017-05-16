"use strict";

let centi=0 ;
let secon=0 ;
let minu=0;

function chrono(){
    centi++; //incrémentation des dixièmes de 1
    if (centi>9){centi=0;secon++} //si les dixièmes > 9,on les réinitialise à 0 et on incrémente les secondes de 1
    if (secon>59){secon=0;minu++} //si les secondes > 59,on les réinitialise à 0 et on incrémente les minutes de 1
    document.getElementById('sp_time').textContent= minu + ":" + secon +":"+ centi;
    let compte=setTimeout('chrono()',100) ;//la fonction est relancée tous les 10° de secondes
}


document.getElementById('chrono').addEventListener('click', function () {
  //  console.log(this);
    chrono();
    menuHover();
});

function rasee(){ //fonction qui remet les compteurs à 0
    clearTimeout(compte); //arrête la fonction chrono()
    centi=0;
    secon=0;
    minu=0;
}

function menuHover() {
    document.getElementById('hoverSound').play();
}
