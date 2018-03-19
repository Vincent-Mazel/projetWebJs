(function () {
    "use strict";

    Carte = class Carte {
        constructor(nom) {
            this.nom = nom;

            if ("Excuse" !== nom) {
                if ("0" === nom.substr(1, 1) || "1" === nom.substr(1, 1) || "2" === nom.substr(1, 1) || "3" === nom.substr(1, 1) || "4" === nom.substr(1, 1)
                || "5" === nom.substr(1, 1) || "6" === nom.substr(1, 1) || "7" === nom.substr(1, 1) || "8" === nom.substr(1, 1) || "9" === nom.substr(1, 1)) {
                    this.valeur = nom.substr(0, 2);
                    this.couleur = nom.substr(2, nom.length - 2);
                }
                else if ("V" === nom.substr(0, 1) || "C" === nom.substr(0, 1) || "D" === nom.substr(0, 1) || "R" === nom.substr(0, 1)) {
                    switch (nom.substr(0, 1)) {
                        case "V" :
                            this.valeur = "Valet";
                            break;
                        case "C" :
                            this.valeur = "Cavalier";
                            break;
                        case "D" :
                            this.valeur = "Dame";
                            break;
                        case "R" :
                            this.valeur = "Roi";
                            break;
                    }
                    this.couleur = nom.substr(1, nom.length - 1);
                }
                else {
                    this.valeur = nom.substr(0, 1);
                    this.couleur = nom.substr(1, nom.length - 1);
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
                        this.couleur = "Trefle";
                        break;
                }
            }
            else {
                this.valeur = "Excuse";
                this.couleur = "Atout";
            }

            this.url = "/images/" + this.couleur + "/" + this.valeur + ".jpg";
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

        ajouterImageCarte() {
            let a = $('<img />');
            $('#mainJoueur').append(
                a.attr("src", this.url)
                    .attr("alt", this.tostring())
                    .attr("class", "imageCarte")
                    .data("valeur", this.valeur)
                    .data("couleur", this.couleur)
            );
        }

        tostring() {
            if ("Excuse" === this.valeur)
                return "L'excuse";
            else if ("Atout" === this.couleur)
                return this.valeur + " d'atout";
            else
                return this.valeur + " de " + this.couleur;
        }
    }
}) ();

