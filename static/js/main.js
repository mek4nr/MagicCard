/**
 * Created by jmuniere on 2017-05-05.
 */

styliser_table();

function styliser_table() {


    document.body.style.backgroundColor="green";
for(var i=0; i<document.getElementsByTagName('td').length;i++){

  document.getElementsByTagName('td')[i].style.width="auto";
  document.getElementsByTagName('td')[i].style.marginRight="auto";
    document.getElementsByTagName('td')[i].style.marginLeft="auto";
  document.getElementsByTagName('td')[i].style.height="auto";
    document.getElementsByTagName('td')[i].style.border="2px solid white";
  document.getElementsByTagName('td')[i].style.backgroundImage="url(static/img/yu.png)";
  document.getElementsByTagName('td')[i].style.backgroundPosition="center";
  document.getElementsByTagName('td')[i].style.backgroundRepeat="no-repeat";



}



}


