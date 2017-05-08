(function($)
{
    $.fn.magicCard = function(){

    };


    $.fn.generateHiding = function(row, col)
    {
        this.each(function()
        {
            let table = document.createElement("table");
            let tbody = document.createElement("tbody");

            $(table).append(tbody);

            for(let i = 0; i < row; i++){
                let row = tbody.insertRow(i);
                for(let j = 0; j < col; j++){
                    row.insertCell(j)
                }
            }

            $(this).append(table);
            $(this).find("td").click(function(){
                $(this).css("background","none");
                $(this).unbind("click");
            });
        });
    };
})(jQuery);




$(document).ready(function(){
    $(".hiding_wall").generateHiding(3, 3);
});
