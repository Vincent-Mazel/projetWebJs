let Paquet;
(function () {
    "use strict";

    Paquet = class Paquet {
        constructor (nbJoueurs) {
            this.nbJoueurs = nbJoueurs;
            this.nomCartes = [];
        }

        genererPaquet() {
            for (let i = 1; i <= 21; ++i)
                this.nomCartes.push(i + "A");
            this.nomCartes.push("excuse");

            for (let k = 1; k <= 10; ++k)
                this.nomCartes.push(new Carte(k + "Carreau"));
            this.nomCartes.push("VCA");
            this.nomCartes.push("CCA");
            this.nomCartes.push("DCA");
            this.nomCartes.push("RCA");

            for (let l = 1; l <= 10; ++l)
                this.nomCartes.push(new Carte(l + "Coeur"));
            this.nomCartes.push("VCO");
            this.nomCartes.push("CCO");
            this.nomCartes.push("DCO");
            this.nomCartes.push("RCO");

            for (let m = 1; m <= 10; ++m)
                this.nomCartes.push(m + "P");
            this.nomCartes.push("VP");
            this.nomCartes.push("CP");
            this.nomCartes.push("DP");
            this.nomCartes.push("RP");

            for (let n = 1; n <= 10; ++n)
                this.nomCartes.push(n + "Trefle");
            this.nomCartes.push("VT");
            this.nomCartes.push("CT");
            this.nomCartes.push("DT");
            this.nomCartes.push("RT");
        }

        static getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min +1)) + min;
        }

        chien() {
            let chien = [];
            if (3 === this.nbJoueurs || 4 === this.nbJoueurs) {
                for (let i = 0; i < 6; ++i) {
                    let rand = Paquet.getRandomIntInclusive(0, this.nomCartes.length - 1);
                    console.log(rand);
                    chien.push(this.nomCartes[rand]);
                    this.nomCartes.splice(rand, 1);
                }
            }
            else {
                for (let i = 0; i < 3; ++i) {
                    let rand = Paquet.getRandomIntInclusive(0, this.nomCartes.length - 1);
                    chien.push(this.nomCartes[rand]);
                    this.nomCartes.splice(rand, 1);
                }
            }
            return chien;
        }

        mainJoueur() {
            let main = [];

            if (3 === this.nbJoueurs) {
                for (let i = 0; i < 24; ++i) {
                    let rand = Paquet.getRandomIntInclusive(0, this.nomCartes.length - 1);
                    main.push(this.nomCartes[rand]);
                    this.nomCartes.splice(rand, 1);
                }
            }
            else if (4 === this.nbJoueurs) {
                for (let i = 0; i < 18; ++i) {
                    let rand = Paquet.getRandomIntInclusive(0, this.nomCartes.length - 1);
                    main.push(this.nomCartes[rand]);
                    this.nomCartes.splice(rand, 1);
                }
            }
            else {
                for (let i = 0; i < 15; ++i) {
                    let rand = Paquet.getRandomIntInclusive(0, this.nomCartes.length - 1);
                    main.push(this.nomCartes[rand]);
                    this.nomCartes.splice(rand, 1);
                }
            }

            return main;
        }

        mainDernierJoueur() {
            return this.nomCartes;
        }
    }
}) ();