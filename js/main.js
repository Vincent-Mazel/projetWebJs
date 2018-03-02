(function ()  {
    "use strict";

    $(document).ready(function () {
        $.ajax({
            url: '/json/estConnectee.php'
        })
            .done(function (dataConnexion) {
                if (dataConnexion.isConnecte) {
                    $.ajax({
                        url: '/json/etatJoueur.php'
                    })
                        .done(function (dataEtat) {
                            if ("menu" === dataEtat.etat) {
                                $('#boutonsMenu').show();
                            }
                            else if ("créationPartie" === dataEtat.etat) {
                                $('#boutonsMenu').hide();
                                $('#formCreationPartie').show();
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
                            alert('hola manant ! attention !!!')
                        });
                    return false;
                }
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