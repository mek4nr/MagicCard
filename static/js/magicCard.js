(function($)
{
    const attrCardId = "data-card-id";
    // Point lorsque trouvé ou essayé
    const foundPoints = 100;
    const triedPoints = -10;

    // La liste des cartes présentent
    let cards = [];

    // Nombre de paire trouvée
    let pairFound = 0;

    let flipped = 0;

    // Nombre d'essaie
    let tried = 0;

    // Liste des cartes en objet jquery
    let $cards;

    // Nombre de lignes de cartes
    let rowCards = 0;

    // Nombre de colonnes de cartes
    let colCards = 0;

    let centi=0 ;
    let secon=0 ;
    let minu=0;
    let timer = null;

    let answer = {
        'pokemon' : ['absol'],
        'eevee' : ['']
    };

    let defaults = {
        scoreZone : $("#score"),
        pairFoundZone : $("#pair_found"),
        cardsBoard : $("#card_board"),
        hidingWall : $(".hiding_wall"),
        hiddenImage : $(".hidden_image"),
        startButton : $("#start"),
        chronometer : $('#current_time'),
        flipClass : "flipped",
        foundClass : "find",
        mode : "pokemon",
        level : 1
    };

    init = function(options){
        $.extend( true, defaults, options );
        reset();
    };

    function reset(){
        resetChronometer();
        tried = 0;
        pairFound = 0;
        generateHiding(4, 2);
        magicCard(4, 4);
        generateScore();
        generateFoundPair();
        $(defaults.startButton).click(start);
    }

    change = function(mode, level){
        $.extend( true, defaults, {mode: mode, level:level} );
        reset();
    };

    function start(){
        chronometer();
        $cards.click(flip).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", transitionListener);
        $(this).unbind("click");
    }

    function chronometer(){
        centi++; //incrémentation des dixièmes de 1
        if (centi>9){centi=0;secon++} //si les dixièmes > 9,on les réinitialise à 0 et on incrémente les secondes de 1
        if (secon>59){secon=0;minu++} //si les secondes > 59,on les réinitialise à 0 et on incrémente les minutes de 1
        defaults.chronometer.text(minu + ":" + secon +":"+ centi);
        timer = setTimeout(chronometer,100) ;//la fonction est relancée tous les 10° de secondes
    }

    function resetChronometer(){ //fonction qui remet les compteurs à 0
        clearTimeout(timer); //arrête la fonction chrono()
        centi=0;
        secon=0;
        minu=0;
        $('#current_time').text(minu + ":" + secon +":"+ centi);
    }

    /***
     * Fonction jquery qui va créer un tableau html
     * pour afficher un tableau de carte flippable
     * @param row : nombre de ligne
     * @param col : nombre de colonnes
     */
     function magicCard(row, col){
        rowCards = row;
        colCards = col;

        let tbody = document.createElement("tbody");
        $(defaults.cardsBoard).html("").append(tbody);

        for(let i = 0; i < row; i++){
            let tr = tbody.insertRow(i);
            for(let j = 0; j < col; j++){
                let td = tr.insertCell(j)
                $(td).append(createCard( (i*row + j) ));
            }
        }
        $cards = $(".card");
        generateCards();
    }

    /***
     * Genere les cards dans le tableaux
     * @param mode le mode de jeu
     * @param level le niveau (pour changer l'image a deviner)
     */
    function generateCards(){
        cards = [];
        for(let i=0; i<rowCards*colCards/2; i++){
            cards.push({
                "src": getImageCardPath(i),
                "id" : i
            });
            cards.push({
                "src": getImageCardPath(i),
                "id" : i
            });
        }

        let rndCards = [];

        for(let i=0; i<rowCards*colCards; i++){
            let rnd = parseInt(Math.random()*cards.length);
            rndCards[i] = cards[rnd];
            cards.splice(rnd,1);
        }

        cards = rndCards
    }

    function getImageCardPath(index){
        return "static/img/mode/" + defaults.mode + "/cards/img" + (index+1) + ".png";
    }

    function getImageLevelPath(){
        return "static/img/mode/" + defaults.mode + "/levels/img" + defaults.level + ".png";
    }

    /***
     * Listener de ce qu'il se passe lorsqu'une carte flip, permet de supprimer le SRC
     * de la dite image pour eviter l'inspection de code.
     * @param e event
     */
    function transitionListener(e){
        console.log("transitionListener");

        if(!$(this).hasClass(defaults.flipClass) && !$(this).hasClass(defaults.foundClass)){
            $(this).find(".back").find("img").each(function () {
                $(this).attr("src", "");
            });
        }
        else{
            flipped++;
        }

        let $flipped = $("." + defaults.flipClass);
        if($flipped.length >= 2 && flipped >=2){

            if(checkPair()){
                $flipped.addClass(defaults.foundClass);
                $flipped.unbind("click");
                showPartHiddenImage();
            }
            $flipped.removeClass(defaults.flipClass);
        }
    }

    /***
     * Fonction qui va tester si les 2 cartes ouvertent sont une pair ou non
     * @returns {boolean} vrai si c'est une pair, faux sinon
     */
    function checkPair(){
        flipped = 0;
        let found= false;
        let cardFlipped= $('.'+ defaults.flipClass);
        let index1 = parseInt($(cardFlipped[0]).attr(attrCardId));
        let index2=parseInt($(cardFlipped[1]).attr(attrCardId));
        if(cards[index1].id === cards[index2].id){
            found= true;
            pairFound++;
        }
        tried++;
        generateScore();
        generateFoundPair();
        return found;
    }

    /***
     * Affiche de maniere aléatoire un bout de l'image a deviner
     */
    function showPartHiddenImage(){
        let $blocks = $(".hidden_block");
        $($blocks[parseInt(Math.random()*$blocks.length)]).removeClass("hidden_block").addClass("show_block");
    }

    /***
     * Créer une carte HTML flippable
     * @param index l'index de la carte dans le tableau (de 0 a row*col)
     * @returns {Element} retourne la carte en objet jquery
     */
    function createCard(index){
        let container = document.createElement("div");
        $(container).addClass("card_container");
        let card = $("<div>").appendTo(container).addClass("card").attr(attrCardId, index);
        $("<div>").appendTo(card).addClass("front").css('background-image', "url('static/img/dos2.png')");
        $("<div>").appendTo(card).addClass("back");
        return container;
    }

    /***
     * Fait tourner une carte et affiche la source de l'image juste avant
     */
    function flip(){
        if(canFlip()) {
            console.log("flip");
            if (!$(this).hasClass(defaults.flipClass)) {
                $(this).find(".back").css("background-image", "url('" + cards[parseInt($(this).attr(attrCardId))].src + "')");
            }
            $(this).toggleClass(defaults.flipClass);
        }
    }

    function canFlip(){
        return $("." + defaults.flipClass).length < 2;
    }

    /***
     * Fonction jquery pour generer un tableau de case sur un element (ici notre image de guessing)
     * @param row
     * @param col
     */
     function generateHiding(row, col){
        console.log($(defaults.hidingWall));
        $(defaults.hidingWall).each(function()
        {
            $(this).html("");
            let table = document.createElement("table");
            let tbody = document.createElement("tbody");

            $(table).append(tbody);

            for(let i = 0; i < row; i++){
                let tr = tbody.insertRow(i);
                for(let j = 0; j < col; j++){
                    let td = tr.insertCell(j);
                    $(td).addClass("hidden_block");
                }
            }

            $(this).append(table);
        });
        $(defaults.hiddenImage).each(function(){
            $(this).html("");
            $("<img>").appendTo(this).attr("src",getImageLevelPath())
        })
    }

    /***
     * update la vue pour afficher le nombre de paire trouvée
     */
    function generateFoundPair(){
        let text = " paire";
        text += (pairFound > 1)? "s":"";

        $(defaults.pairFoundZone).each(function(){
            $(this).text(pairFound + text);
        });
    }

    /***
     * update la vue pour afficher le score en cours
     */
    function generateScore(){
        let score = (foundPoints * pairFound + triedPoints * (tried-pairFound));
        let text = " point";
        text += (score > 1)? "s":"";

        $(defaults.scoreZone).each(function(){
            $(this).text(score + text);
        });
    }

})(jQuery);

$(document).ready(function(){
    init({
        mode : $("#mode").val(),
        level : 1
    });

    $("#new_game").click(function(){
        change($("#mode").val(), 1);
    });
});
