function generateWall(elmt, col, row){
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");

    $(table).append(tbody);

    for(let i = 0; i < row; i++){
        let row = tbody.insertRow(i);
        for(let j = 0; j < col; j++){
           row.insertCell(j)
        }
    }

    $(elmt).append(table);
    $(elmt).find("td").click(function(){
        $(this).css("background","none");
        $(this).unbind("click");
    });
}

$(document).ready(function(){
    generateWall($(".hiding_wall"), 3, 3);
});


