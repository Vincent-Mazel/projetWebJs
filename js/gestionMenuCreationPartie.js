(function ()  {
    "use strict";

    $(document).ready(function () {
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
        
        $('#quitterFile').click(function () {
            $.ajax({
                url: '/php/controller_updatePartie.php'
            })
                .fail(function () {
                   alert("Problème survenu lors du quittage de la file !!");
                });
        });
    });
}) ();