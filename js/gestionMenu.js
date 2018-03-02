(function ()  {
    "use strict";

    $(document).ready(function () {
        $('#creerPartie').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function () {
                    $('#boutonsMenu').hide();
                    $('#formCreationPartie').show();
                })
                .fail(function () {
                    alert("Problème dans l'affichage du menu de création de partie !");
                });
            return false;
        });

        $('#rejoindrePartie').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function () {
                    $('#boutonsMenu').hide();
                    $('#formCreationPartie').show();
                })
                .fail(function () {
                    alert("Problème dans l'affichage du menu de sélection de partie !");
                });
            return false;
        });
    });
}) ();