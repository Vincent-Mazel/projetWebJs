(function ()  {
    "use strict";

    $(document).ready(function () {
        $.ajax({
            url: '/php/json/json_estConnecte.php',
            data: $(this).serialize()
        })
            .done(function (dataEtatConnexion) {
                if (dataEtatConnexion.isConnecte) {
                    $.ajax({
                        url: '/php/json/json_etatJoueur.php'
                    })
                        .done(function (dataEtat) {
                            if ("menu" === dataEtat.etat) {
                                $('#menuPrincipal').show();
                                $('#boutonDeconnexion').show();
                            }
                            else if ("creationPartie" === dataEtat.etat) {
                                $('#formCreationPartie').show();
                                $('#boutonDeconnexion').show();
                            }
                            else if ("recherchePartie" === dataEtat.etat) {
                                $('#rejoindrePartie').show();
                                $('#boutonDeconnexion').show();
                            }
                            else if ("consultationStats" === dataEtat.etat) {

                            }
                            else if ("attenteJoueurs" === dataEtat.etat) {

                            }
                        })
                        .fail(function () {
                            alert("Problème de chargement de la page lié à l'état du joueur !!");
                        });
                }
                else
                    $('#nonConnecte').show();
                return false;
        })
            .fail(function () {
                alert("Problème de chargement de la page lié à l'état de connexion du joueur !!");
            });
    });
}) ();
