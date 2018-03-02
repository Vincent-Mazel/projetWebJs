(function ()  {
    "use strict";

    $(document).ready(function () {
        $.ajax({
            url: '/json/etatJoueur.php'
        })
            .done(function (data) {
                if ("menu" === data.etat) {

                }
                else if ("créationPartie" === data.etat) {
                    window.location.reload(true);
                    $('#boutonsMenu').hide();
                    $('#formCreationPartie').show();
                }
                else if ("recherchePartie" === data.etat) {

                }
                else if ("consultationStats" === data.etat) {

                }
                else if ("attenteJoueurs" === data.etat) {

                }
            })
            .fail(function () {
                alert('hola manant ! attention !!!')
            });
    });
}) ();