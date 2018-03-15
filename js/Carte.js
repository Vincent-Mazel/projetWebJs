let Carte;
(function () {
    "use strict";

    Carte = class Carte {
        constructor(nom) {
            this.nom = nom;

            if ("excuse" !== nom) {
                if ("0" === nom.substr(1, 1)) {
                    this.valeur = nom.substr(0, 2);
                    this.couleur = nom.substr(3, nom.length - 2);
                }
                else {
                    this.valeur = nom.substr(0, 1);
                    this.couleur = nom.substr(2, nom.length - 1);
                }

                switch (this.couleur) {
                    case "A" :
                        this.couleur = "Atout";
                        break;
                    case "CA" :
                        this.couleur = "Carreau";
                        break;
                    case "CO" :
                        this.couleur = "Coeur";
                        break;
                    case "P" :
                        this.couleur = "Pique";
                        break;
                    case "T" :
                        this.couleur = "Trèfle";
                        break;
                }
            }
            else {
                this.valeur = "Excuse";
                this.couleur = "Atout";
            }

            this.url = "/images/" + this.couleur + "/" + this.nom + ".jpg";
        }

        get Valeur() {
            return this.valeur;
        }

        get Couleur() {
            return this.couleur;
        }

        get Url() {
            return this.url;
        }
    }
}) ();

