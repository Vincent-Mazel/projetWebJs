(function ()  {
    "use strict";

    let closeModal = function () {
        $('#modalErreur').modal("hide");
    };

    let chargerModalErreur = function (data) {
        $('#messageErreurModal').html(data.messageErreur);
        $('#modalErreur').modal("show");
        setTimeout(closeModal, 15000);
    };

    $(document).ready(function () {
        $('#formConnexion').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function (dataConnexion) {
                    if (dataConnexion.erreur)
                        chargerModalErreur(dataConnexion);
                    else {
                        $('#nonConnecte').hide();

                        $('.inputInscription').val("");

                        $('#connecte').show();
                        $('#menuPrincipal').show();
                        $('#boutonDeconnexion').show();
                    }
                    $('.inputConnexion').val("");
                    $('#messageInscription').hide();
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
                        chargerModalErreur(dataInscription);
                    else
                        $('#messageInscription').html(dataInscription.messageInscription).show();

                    $('.inputInscription').val("");
                    $('#inputNomUtilisateurConnexion').focus();
                })
                .fail(function () {
                    alert("Problème survenu lors de l'inscription !!");
                });
            return false;
        });
    });
}) ();