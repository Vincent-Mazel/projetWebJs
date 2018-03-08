(function ()  {
    "use strict";

    $(document).ready(function () {
        $('#boutonCreerPartie').click(function () {
            $.ajax({
                url: '/php/modifEtat/etat_creationPartie.php'
            })
                .done(function () {
                    $('#menuPrincipal').hide();
                    $('#formCreationPartie').show();
                })
                .fail(function () {
                    alert("Problème dans l'affichage du menu de création de partie !");
                });
            return false;
        });

        $('#boutonRejoindrePartie').click(function () {
            $.ajax({
                url: '/php/json/json_controller_rejoindrePartie.php'
            })
                .done(function (dataParties) {
                    $('#menuPrincipal').hide();
                    if (dataParties.isPartieEnCours) {

                        $('#rejoindrePartie').show();
                    }
                    else
                        $('#messageErreurRejoindrePartie').show();
                })
                .fail(function () {
                    alert("Problème dans l'affichage du menu de sélection de partie !");
                });
            return false;
        });
    });
}) ();