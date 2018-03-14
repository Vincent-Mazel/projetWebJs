let Carte;
(function () {
    "use strict";

    Carte = function (valeur, couleur) {
        this.nom = valeur + couleur;
        this.valeur = valeur;
        this.couleur = couleur;
        this.url = "/images/" + couleur + "/" + this.nom + ".jpg";
    }
}) ();