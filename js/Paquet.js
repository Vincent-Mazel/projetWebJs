let Paquet;
(function () {
    "use strict";

    Paquet = function () {
        let self = this;

        this.cartes = {};
        this.getCartes = function () {
            return this.cartes;
        };
        this.genererPaquet = function () {
            for (let $i = 1; $i <= 21; ++$i)
                this.paquet.push(new Carte($i + "A", $i, "atout"));
            this.paquet.push(new Carte("excuse", 22, "atout"));

            for (let $k = 1; $k <= 10; ++$i)
                this.paquet.push(new Carte($k + "CA", $k, "carreau"));
            this.paquet.push(new Carte("VCA", 11, "carreau"));
            this.paquet.push(new Carte("CCA", 12, "carreau"));
            this.paquet.push(new Carte("DCA", 13, "carreau"));
            this.paquet.push(new Carte("RCA", 14, "carreau"));

            for (let $l = 1; $l <= 10; ++$i)
                this.paquet.push(new Carte($l + "CO", $l, "coeur"));
            this.paquet.push(new Carte("VCO", 11, "coeur"));
            this.paquet.push(new Carte("CCO", 12, "coeur"));
            this.paquet.push(new Carte("DCO", 13, "coeur"));
            this.paquet.push(new Carte("RCO", 14, "coeur"));

            for (let $m = 1; $m <= 10; ++$i)
                this.paquet.push(new Carte($m + "P", $m, "pique"));
            this.paquet.push(new Carte("VP", 11, "pique"));
            this.paquet.push(new Carte("CP", 12, "pique"));
            this.paquet.push(new Carte("DP", 13, "pique"));
            this.paquet.push(new Carte("RP", 14, "pique"));

            for (let $n = 1; $n <= 10; ++$i)
                this.paquet.push(new Carte($n + "T", $n, "trefle"));
            this.paquet.push(new Carte("VT", 11, "trefle"));
            this.paquet.push(new Carte("CT", 12, "trefle"));
            this.paquet.push(new Carte("DT", 13, "trefle"));
            this.paquet.push(new Carte("RT", 14, "trefle"));
        };
    }
}) ();