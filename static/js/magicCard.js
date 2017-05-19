(function($)
{
    // Css Class lorsque la carte flip
    const flipClass = "flipped";

    // Css Class lorsque la pair est trouvée
    const foundClass = "find";

    // Point lorsque trouvé ou essayé
    const foundPoints = 100;
    const triedPoints = -10;

    // La liste des cartes présentent
    let cards = [];

    // Nombre de paire trouvée
    let pairFound = 0;

    // Nombre d'essaie
    let tried = 0;

    // Liste des cartes en objet jquery
    let $cards;

    // Nombre de lignes de cartes
    let rowCards = 0;

    // Nombre de colonnes de cartes
    let colCards = 0;

    // Zone de score
    let scoreZone = null;

    // Zone du nombre de pair trouvée
    let foundPairZone = null;


    /***
     * Fonction jquery qui va créer un tableau html depuis un selecteur jquery
     * pour afficher un tableau de carte flippable
     * @param row : nombre de ligne
     * @param col : nombre de colonnes
     */
    $.fn.magicCard = function(row, col){
        rowCards = row;
        colCards = col;

        let tbody = document.createElement("tbody");
        $(this).append(tbody);

        for(let i = 0; i < row; i++){
            let tr = tbody.insertRow(i);
            for(let j = 0; j < col; j++){
                let td = tr.insertCell(j)
                $(td).append(createCard( (i*row + j) ));
            }
        }
        $cards = $(".card");
        generateCards("pokemon",1);
        $cards.click(flip).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", transitionListener);
    };

    /***
     * Genere les cards dans le tableaux
     * @param mode le mode de jeu
     * @param level le niveau (pour changer l'image a deviner)
     */
    function generateCards(mode, level){
        for(let i=0; i<rowCards*colCards/2; i++){
            cards.push({
                "src": "static/img/cards/" + mode + "/img" + (i+1) + ".png",
                "id" : i
            });
            cards.push({
                "src": "static/img/cards/" + mode + "/img" + (i+1) + ".png",
                "id" : i
            });
        }

        let rndCards = [];

        for(let i=0; i<rowCards*colCards; i++){
            let rnd = parseInt(Math.random()*cards.length)
            rndCards[i] = cards[rnd];
            cards.splice(rnd,1);
        }

        cards = rndCards
    }

    /***
     * Listener de ce qu'il se passe lorsqu'une carte flip, permet de supprimer le SRC
     * de la dite image pour eviter l'inspection de code.
     * @param e event
     */
    function transitionListener(e){
        if(!$(this).hasClass(flipClass) && !$(this).hasClass(foundClass)){
            $(this).find(".back").find("img").each(function () {
                $(this).attr("src", "");
            });
        }
        $(this).unbind("click");
        let $flipped = $("." + flipClass);
        if($flipped.length >= 2){
            if(checkPair()){
                $flipped.addClass(foundClass);
                showPartHiddenImage();
            }
            $flipped.removeClass(flipClass);
        }
        $cards.not("." + flipClass + ", ." + foundClass).click(flip);
    }
//fonction que je dois modifier

    /***
     * Fonction qui va tester si les 2 cartes ouvertent sont une pair ou non
     * @returns {boolean} vrai si c'est une pair, faux sinon
     */
    function checkPair(){

        let rnd = Math.random()*100;
        if(rnd > 50){
            pairFound++;

        }
        tried++;
        generateScore();
        generateFoundPair();
        return rnd > 50;
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
        let card = $("<div>").appendTo(container).addClass("card").attr("card-id", index);
        $("<div>").appendTo(card).addClass("front").css('background-image', "url('static/img/dos2.png')");
        $("<div>").appendTo(card).addClass("back")
        return container;
    }

    /***
     * Fait tourner une carte et affiche la source de l'image juste avant
     */
    function flip(){
        $cards.unbind("click");
        if(!$(this).hasClass(flipClass)) {
            $(this).find(".back").css("background-image", "url('" + cards[parseInt($(this).attr("card-id"))].src + "')");
        }
        $(this).toggleClass(flipClass);
    }

    /***
     * Fonction jquery pour generer un tableau de case sur un element (ici notre image de guessing)
     * @param row
     * @param col
     */
    $.fn.generateHiding = function(row, col)
    {
        this.each(function()
        {
            let table = document.createElement("table");
            let tbody = document.createElement("tbody");

            $(table).append(tbody);

            for(let i = 0; i < row; i++){
                let tr = tbody.insertRow(i);
                for(let j = 0; j < col; j++){
                    let td = tr.insertCell(j)
                    $(td).addClass("hidden_block");
                }
            }

            $(this).append(table);
        });
    };

    setScoreZone = function(zone){
        scoreZone = zone;
        generateScore();
    };

    setFoundPairZone = function(zone){
        foundPairZone = zone;
        generateFoundPair();
    };

    /***
     * update la vue pour afficher le nombre de paire trouvée
     */
    function generateFoundPair(){
        let text = " paire";
        text += (pairFound > 1)? "s":"";

        $(foundPairZone).each(function(){
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

        console.log(scoreZone);

        $(scoreZone).each(function(){
            $(this).text(score + text);
        });
    }

})(jQuery);

$(document).ready(function(){
    setScoreZone($("#score"));
    setFoundPairZone($("#pair_found"));
    $(".hiding_wall").generateHiding(4, 2);
    $("#card_board").magicCard(4,4);
});
