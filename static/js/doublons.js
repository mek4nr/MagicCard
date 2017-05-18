/**
 * Created by Fatou on 2017-05-17.
 */


"use strict";
/* Jean Baptiste je mets ma fonction dans un fichier independant du code pour que tu verifies et me corriges.
 Aussi je ne veux pas changer ton code et tout faire sauter...Pour les noms de variables j'ai mis
  ce qui me traverse la tete, si tu verifies apres je vais ecrire en anglais
 et mettre les noms que tu as donne dans ton code*/

function change_im(nbim) {
    if (place[nbim] !=0) {
        if (nbim==nbim2) nbim=0;
        else{
            if (nbim==nbim3) nbim=0;
            else{
                if (choixim==3)
                {
                    if (val1==val2) {efface(nbim2);efface(nbim3);gain++ /*(j'incremente le score avec ta fonction generateScore())*/;}
                    else {no_efface(nbim2);no_efface(nbim3);} //ici je ne clique pas sur la bonne 2eme paire
                    choixim=1;
                    nbim3=0
                }
                if (choixim==1) {nbim2=nbim;val1=place[nbim];choix++;}
                if (choixim==2) {nbim3=nbim;val2=place[nbim];}
                choixim++;
            }
        }
        document.images[nbim-1].src = non_im+place[nbim]+".gif";
        if (choixim==3){
            if (gain==divs-1) {
                setTimeout("efface(nbim2);efface(nbim3);document.images[1].src = 'images-gagner.gif';",500);gain++;
            }//ici j'ai pensé qu'on peut avoir une image gif qui dit gagné quand la personne reussit
        }
        document.form1.result.value = choix
    }
}

function efface(eff) {//effacer l'image quand je trouve sa paire
    document.images[eff-1].src = non_im+"00.png";
    place[eff]=0}

function no_efface(eff) {
    document.images[eff-1].src = non_im+"0.png";}


