(function ()  {
    "use strict";

    $(document).ready(function () {
        let cacherMenu = function () {
            $('#creerPartie').hide();
            $('#rejoindrePartie').hide();
            $('#stats').hide();
            $('#deconnexion').hide();
        };

        $('#creerPartie').click(function () {
            cacherMenu();
            $('#formCreationPartie').show();
        });
        
        $('#rejoindrePartie').click(function () {
            cacherMenu();

        })
    });
}) ();