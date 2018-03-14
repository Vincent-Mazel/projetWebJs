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
                this.paquet.push(new Carte($i + "A", $i, "A"));
            this.paquet.push(new Carte("excuse", 22, "A"));

            for (let $k = 1; $k <= 10; ++$i)
                this.paquet.push(new Carte($k + "CA", $k, "CA"));
            this.paquet.push(new Carte("VCA", 11, "CA"));
            this.paquet.push(new Carte("CCA", 12, "CA"));
            this.paquet.push(new Carte("DCA", 13, "CA"));
            this.paquet.push(new Carte("RCA", 14, "CA"));

            for (let $l = 1; $l <= 10; ++$i)
                this.paquet.push(new Carte($l + "CO", $l, "CO"));
            this.paquet.push(new Carte("VCO", 11, "CO"));
            this.paquet.push(new Carte("CCO", 12, "CO"));
            this.paquet.push(new Carte("DCO", 13, "CO"));
            this.paquet.push(new Carte("RCO", 14, "CO"));

            for (let $m = 1; $m <= 10; ++$i)
                this.paquet.push(new Carte($m + "P", $m, "P"));
            this.paquet.push(new Carte("VP", 11, "P"));
            this.paquet.push(new Carte("CP", 12, "P"));
            this.paquet.push(new Carte("DP", 13, "P"));
            this.paquet.push(new Carte("RP", 14, "P"));

            for (let $n = 1; $n <= 10; ++$i)
                this.paquet.push(new Carte($n + "T", $n, "trefle"));
            this.paquet.push(new Carte("VT", 11, "trefle"));
            this.paquet.push(new Carte("CT", 12, "trefle"));
            this.paquet.push(new Carte("DT", 13, "trefle"));
            this.paquet.push(new Carte("RT", 14, "trefle"));
        };
    }
}) ();