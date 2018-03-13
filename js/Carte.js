let Carte;
(function () {
    "use strict";

    Carte = function (nom, valeur, couleur) {
        this.nom = nom;
        this.valeur = valeur;
        this.couleur = couleur;
        this.url = "/images/" + couleur + "/" + nom;
    }
}) ();