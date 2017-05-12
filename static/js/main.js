/**
 * Created by jmuniere on 2017-05-05.
 */

"use strict";



table_style();
style_index();
my_picture_style();

function my_picture_style(){
    var container_picture=document.getElementById('container_picture');
    container_picture.style.display='inline-block';
    container_picture.style.margin="0px 0px 0px 550px";
}


function style_index(){

    document.body.style.backgroundImage="url(static/img/pik3.png)";
    document.body.style.backgroundSize='cover';
    document.body.style.backgroundRepeat="no-repeat";
    document.getElementById('tableau').style.display='inline-block';




    var div_reset_style=document.getElementById('div_reset');
    div_reset_style.style.margin='10px';
    var labs=document.getElementsByTagName('label');
    for (var i=0;i<labs.length;i++){
        labs[i].style.color='yellow';
    }




  var div_answer=document.getElementById('div_answer');
    div_answer.style.width='300px';

  div_answer.style.display="inline-block";
  div_answer.style.marginLeft="580px";
  div_answer.style.border="3px solid yellow";


  var div_img=document.getElementById('img_guess');
  div_img.style.border="3px solid yellow";
  div_img.style.width="300px";
  div_img.style.backgroundColor='black';
  div_img.style.display='inline-block';
  div_img.style.marginLeft='50px';
}

function table_style() {

var my_td=document.getElementsByTagName('td');

for(var i=0; i<my_td.length;i++){

    my_td[i].style.width="100px";
    my_td[i].style.height="120px";
    my_td[i].style.border="1px solid black";
    my_td[i].style.backgroundImage="url(static/img/dos.png)";
    my_td[i].style.backgroundPosition="center";
    my_td[i].style.backgroundColor="yellow";
    my_td[i].style.backgroundRepeat="no-repeat";

}



}


