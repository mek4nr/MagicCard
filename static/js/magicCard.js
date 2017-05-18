(function($)
{
    const flipClass = "flipped";
    const foundClass = "find";
    let cards = [];
    let pairFound = 0;
    let tried = 0;
    let $cards;
    let rowCards = 0;
    let colCards = 0;
    let foundPoints = 100;
    let triedPoints = -10;
    let scoreZone = null;
    let foundPairZone = null;

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

    function showPartHiddenImage(){
        let $blocks = $(".hidden_block");
        $($blocks[parseInt(Math.random()*$blocks.length)]).removeClass("hidden_block").addClass("show_block");
    }

    function createCard(index){
        let container = document.createElement("div");
        $(container).addClass("card_container");
        let card = $("<div>").appendTo(container).addClass("card").attr("card-id", index);
        $("<div>").appendTo(card).addClass("front").css('background-image', "url('static/img/dos2.png')");
        $("<div>").appendTo(card).addClass("back")
        return container;
    }

    function flip(){
        $cards.unbind("click");
        if(!$(this).hasClass(flipClass)) {
            $(this).find(".back").css("background-image", "url('" + cards[parseInt($(this).attr("card-id"))].src + "')");
        }
        $(this).toggleClass(flipClass);
    }

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

    function generateFoundPair(){
        let text = " paire";
        text += (pairFound > 1)? "s":"";

        $(foundPairZone).each(function(){
            $(this).text(pairFound + text);
        });
    }

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
