(function ()  {
    "use strict";

    $(document).ready(function () {
        $.ajax({
            url: '/json/est_connectee.php'
        }).done(function (data) {
            if (data.isConnecte) {
                $('#deconnexion').show();
            } else {
                $('#connexion').show();
            }
        }).fail(function () {
            alert('hola manant ! attention !!!')
        });

        $('#connexion').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function () {
                    $('#deconnexion').show();
                    window.location.reload();
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
                    $('#form-connexion').show();
                    window.location.reload();
                })
                .fail(function () {
                    alert('Minceeeee ! Regardez qui voilà !');
                });
            return false;
        });
    });
}) ();