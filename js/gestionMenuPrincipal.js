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

        $('#formCreationPartie').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function (dataCreationPartie) {
                    if (dataCreationPartie.erreur)
                        $('#erreurCreationPartie').html(dataCreationPartie.messageErreur).show();
                    else {
                        $('#modalAttenteJoueurs').modal({backdrop: 'static', keyboard: false});
                        $('#modalAttenteJoueurs').modal("show");
                        $('#messageModalAttenteJoueurs').html("Nom de la partie : " + dataCreationPartie.nomPartie + "<br>" + "1/" + dataCreationPartie.nbJoueurs + " joueurs connectés"
                            + "<br> <br>" + dataCreationPartie.nomJoueur);
                    }
                })
                .fail(function () {
                    alert("Problème survenu lors de la création de la partie !!");
                });
            return false;
        });
    });
}) ();