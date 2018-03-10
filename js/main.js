(function ()  {
    "use strict";

    let chargerTableauParties = function () {
        $.ajax({
            url: '/php/json/json_controller_getParties.php',
            data: $(this).serialize()
        })
            .done(function (dataParties) {
                $('#menuPrincipal').hide();
                if (dataParties.isPartieEnCours) {
                    for (let partie of dataParties.parties) {
                        let tr = $('<tr />');
                        for (let i = 0; i < 2; ++i) {
                            let td = $('<td />');
                            tr.append(td.html(partie[i]))
                        }
                        let button = $('<button />');
                        tr.append(button.html("Rejoindre")
                            .data("nomPartie", partie[0])
                            .click(rejoindrePartie));
                        $('#rejoindrePartie').append(tr);
                    }
                    $('#rejoindrePartie').show();
                }
                else
                    $('#messageErreurRejoindrePartie').show();
            })
            .fail(function () {
                alert("Problème dans l'affichage du menu de sélection de partie !");
            });
        return false;
    };

    let rejoindrePartie = function () {
        $.ajax({
            url: '/php/json/json_controller_rejoindrePartie.php',
            type: 'GET',
            data: 'nomPartie=' + $(this).data("nomPartie")
        })
            .done(function (dataRejoindrePartie) {
                if (dataRejoindrePartie.erreur) {
                    $('#messageErreurModalRejoindrePartie').html(dataRejoindrePartie.message);
                    $('#modalErreurRejoindrePartie').modal("show");
                }
                else {
                    $('#modalAttenteJoueurs').modal({backdrop: 'static', keyboard: false});
                    $('#modalAttenteJoueurs').modal("show");
                    $('#messageModalAttenteJoueurs').html("Nom de la partie : " + dataRejoindrePartie.nomPartie + "<br>" + dataRejoindrePartie.nbJoueursCo +"/" + dataRejoindrePartie.nbJoueurs + " joueurs connectés"
                        + "<br> <br>" + dataRejoindrePartie.joueurs);
                }
                $('#tbodyParties').children().remove();
                chargerTableauParties();
                console.log(dataRejoindrePartie.etat);
            })
            .fail(function () {
                alert("Problème survenu lors de la connexion à la partie !");
            });
        return false;
    };

    let getInfosPartie = function () {
      $.ajax({
          url: '/php/json/json_controller_getInfosPartie.php',
          data: $(this).serialize()
      })
          .done(function (dataPartie) {
              if (dataPartie.isJouable) {

              }
              else {
                  $('#modalAttenteJoueurs').modal({backdrop: 'static', keyboard: false});
                  $('#modalAttenteJoueurs').modal("show");
                  $('#messageModalAttenteJoueurs').html("Nom de la partie : " + dataPartie.nomPartie + "<br>" + dataPartie.nbJoueursCo +"/" + dataPartie.nbJoueurs + " joueurs connectés"
                      + "<br> <br>" + dataPartie.joueurs);
              }
          })
          .fail(function () {
              alert("Problème survenu lors de la récupération des informations sur la partie");
          });
      return false;
    };

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
                            console.log(dataEtat.etat);
                            if ("menu" === dataEtat.etat) {
                                $('#menuPrincipal').show();
                                $('#boutonDeconnexion').show();
                            }
                            else if ("creationPartie" === dataEtat.etat) {
                                $('#formCreationPartie').show();
                                $('#boutonDeconnexion').show();
                            }
                            else if ("rejoindrePartie" === dataEtat.etat) {
                                chargerTableauParties();
                                $('#boutonDeconnexion').show();
                            }
                            else if ("attenteJoueursCreation" === dataEtat.etat) {
                                $('#formCreationPartie').show();
                                $('#boutonDeconnexion').show();
                                getInfosPartie();
                            }
                            else if ("attenteJoueursRejoindre" === dataEtat.etat) {
                                chargerTableauParties();
                                $('#boutonDeconnexion').show();
                                getInfosPartie();
                            }
                        })
                        .fail(function () {
                            alert("Problème de chargement de la page lié à l'état du joueur !!");
                        });
                    return false;
                }
                else
                    $('#nonConnecte').show();
            })
            .fail(function () {
                alert("Problème de chargement de la page lié à l'état de connexion du joueur !!");
            });

        $('#boutonRejoindrePartie').click(chargerTableauParties);

        $('#quitterFile').click(function () {
            $.ajax({
                url: '/php/json/json_controller_quitterFile.php'
            })
                .done(function (dataEtat) {
                    if ("rejoindrePartie" === dataEtat.etat) {
                        $('#tbodyParties').children().remove();
                        chargerTableauParties();
                    }
                })
                .fail(function () {
                    alert("Problème survenu lors du quittage de la file !!");
                });
        });
    });
}) ();
