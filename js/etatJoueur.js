(function ()  {
    "use strict";

    $(document).ready(function () {
        $.ajax({
            url: '/json/etatJoueur.php'
        }).done(function (data) {
            if ("créationPartie" === data.etat) {

            }
            else if ("recherchePartie" === data.etat) {

            }
            else if ("consultationStats" === data.etat) {

            }
            else if ("attenteJoueurs" === data.etat) {

            }
        }).fail(function () {
            alert('hola manant ! attention !!!')
        });

    });
}) ();