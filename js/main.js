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

                            }
                            else if ("consultationStats" === dataEtat.etat) {

                            }
                            else if ("attenteJoueurs" === dataEtat.etat) {

                            }
                            console.log(dataEtat.etat);
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

        $('#boutonDeconnexion').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function () {
                    $('#connecte').hide();
                    $('#nonConnecte').show();
                })
                .fail(function () {
                    alert("Problème survenu lors de la déconnexion !!");
                });
            return false;
        });
    });
}) ();
