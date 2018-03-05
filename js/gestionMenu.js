(function ()  {
    "use strict";

    $(document).ready(function () {
        $('#boutonCreerPartie').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
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

        $('#boutonRejoindrePartie').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function () {
                    $('#menuPrincipal').hide();
                    $('#formCreationPartie').show();
                })
                .fail(function () {
                    alert("Problème dans l'affichage du menu de sélection de partie !");
                });
            return false;
        });
    });
}) ();