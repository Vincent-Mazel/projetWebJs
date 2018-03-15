let Hand;
(function () {
    "use strict";

    Hand = class Hand {
        constructor (cartes) {
            this.cartes = [];
            for (let nomCarte of cartes)
                this.cartes.push(new Carte(nomCarte));
        }

        toString() {
            let str;
            for (let carte of this.cartes)
                str += carte.valeur + " de " + carte.couleur + "<br>";
            return str;
        }
    }
}) ();