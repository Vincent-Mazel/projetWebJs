(function ()  {
    "use strict";

    $(document).ready(function () {
        $('#formConnexion').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function (dataConnexion) {
                    if (dataConnexion.erreur)
                        $('#erreurConnexion').html(dataConnexion.messageErreur).show();
                    else {
                        $('#nonConnecte').hide();
                        $('#connecte').show();
                        $('#menuPrincipal').show();
                        $('#boutonDeconnexion').show();
                    }
                })
                .fail(function () {
                    alert("Problème survenu lors de l'inscription !!");
                });
            return false;
        });

        $('#formInscription').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function (dataInscription) {
                    if (dataInscription.erreur)
                        $('#messageInscription').html(dataInscription.messageErreur).show();
                    else
                        $('#messageInscription').html(dataInscription.messageInscription).show();
                })
                .fail(function () {
                    alert("Problème survenu lors de l'inscription !!");
                });
            return false;
        });

        $('#boutonDeconnexion').click(function () {
            $.ajax({
                url: '/php/json/json_etatJoueur.php',
                data: $(this).serialize()
            })
                .done(function (dataEtatJoueur) {
                    if ("menu" === dataEtatJoueur.etat)
                        $('#menuPrincipal').hide();
                    else if ("creationPartie" === dataEtatJoueur.etat)
                        $('#formCreationPartie').hide();
                    else if ("recherchePartie" === dataEtatJoueur.etat)
                        $('#rejoindrePartie').hide();

                    $('#boutonDeconnexion').hide();
                    $('#nonConnecte').show();

                    $.ajax({
                        url: '/php/deconnexion.php'
                    })
                        .fail(function () {
                            alert("Problème survenu lors de la déconnexion !!");
                        });
                    return false;
                })
                .fail(function () {
                    alert("Problème survenu lors de la déconnexion !!");
                });
            return false;
        });
    });
}) ();