(function ()  {
    "use strict";

    $(document).ready(function () {
        $.ajax({
            url: '/json/estConnectee.php'
        })
            .done(function (data) {
                if (data.isConnecte)
                    $('#boutonsMenu').show();
                else
                    $('#connexion').show();
        })
            .fail(function () {
                alert('hola manant ! attention !!!')
            });

        $('#connexion').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function () {
                    window.location.reload();
                    $('#deconnexion').show();
                })
                .fail(function () {
                    alert('fais gaffe mec !')
                });
            return false;
        });

        $('#deconnexion').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function () {
                    window.location.reload();
                    $('#form-connexion').show();
                })
                .fail(function () {
                    alert('Minceeeee ! Regardez qui voilà !');
                });
            return false;
        });
    });
}) ();