(function ()  {
    "use strict";

    let timerInfosPartieModal;
    let timerInfosParties;

    let chargerTableauParties = function () {
        $.ajax({
            url: '/php/json/json_controller_getParties.php',
            data: $(this).serialize()
        })
            .done(function (dataParties) {
                $('#tbodyParties').children().remove();
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
                            .click(rejoindrePartie)
                            .attr("class", "btn btn-info"));
                        $('#tableParties').append(tr);
                    }
                }
                else
                    $('#messageErreurRejoindrePartie').show();
            })
            .fail(function () {
                alert("Problème dans l'affichage du menu de sélection de partie !");
            });
        return false;
    };

    let chargerModal = function (data) {
        $('#modalAttenteJoueurs').modal({backdrop: 'static', keyboard: false});
        $('#modalAttenteJoueurs').modal("show");
        $('#messageModalAttenteJoueurs').html(data.htmlMessage);
    };

    let chargerModalChargement = function () {
        $('#modalChargementPartie').modal({backdrop: 'static', keyboard: false});
        $('#modalChargementPartie').modal("show");
        $('#messageModalChargement').html("Corruption du croupier");
        setTimeout(function () {
            $('#messageModalChargement').html("Nettoyage du joli tapis");
            setTimeout(function () {
                $('#messageModalChargement').html("Mise à disposition de délicieux cocktels");
                setTimeout(function () {
                    $('#messageModalChargement').html("Clin d'oeil à la charmante serveuse");
                    setTimeout(function () {
                        $('#modalChargementPartie').modal("hide");
                    }, 4000);
                    }, 4000);
                }, 4000);
            }, 4000);
    };

    let rejoindrePartie = function () {
        $.ajax({
            url: '/php/json/json_controller_rejoindrePartie.php',
            type: 'GET',
            data: 'nomPartie=' + $(this).data("nomPartie")
        })
            .done(function (dataRejoindrePartie) {
                if (dataRejoindrePartie.erreur) {
                    $('#messageErreurModal').html(dataRejoindrePartie.messageErreur);
                    $('#modalErreur').modal("show");
                    setTimeout(closeModal, 15000);
                }
                else if (dataRejoindrePartie.isJouable) {
                    chargerModalChargement();
                    $('#rejoindrePartie').hide();
                    $('#messageErreurRejoindrePartie').hide();
                    $('#plateau').show();
                }
                else {
                    chargerModal(dataRejoindrePartie);
                    timerInfosPartieModal = setInterval(getInfosPartie, 2000);
                }

                $('#tbodyParties').children().remove();
                chargerTableauParties();
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
                  clearInterval(timerInfosPartieModal);
                  $('#modalAttenteJoueurs').modal("hide");
                  chargerModalChargement();
                  $('#rejoindrePartie').hide();
                  $('#plateau').show();
              }
              else
                  chargerModal(dataPartie);
          })
          .fail(function () {
              alert("Problème survenu lors de la récupération des informations sur la partie");
          });
      return false;
    };

    let closeModal = function () {
        $('#modalErreur').modal("hide");
    };

    let chargerModalErreur = function (data) {
        $('#messageErreurModal').html(data.messageErreur);
        $('#modalErreur').modal("show");
        setTimeout(closeModal, 15000);
    };

    let genererPaquet = function () {
        let paquet = [];

        for (let $i = 1; $i <= 21; ++$i)
            paquet.push($i + "A");
        paquet.push("excuse");

        for (let $k = 1; $k <= 10; ++$i)
            paquet.push($k + "CA");
        paquet.push("VCA");
        paquet.push("CCA");
        paquet.push("DCA");
        paquet.push("RCA");

        for (let $l = 1; $l <= 10; ++$i)
            paquet.push($l + "CO");
        paquet.push("VCO");
        paquet.push("CCO");
        paquet.push("DCO");
        paquet.push("RCO");

        for (let $m = 1; $m <= 10; ++$i)
            paquet.push($m + "P");
        paquet.push("VP");
        paquet.push("CP");
        paquet.push("DP");
        paquet.push("RP");

        for (let $n = 1; $n <= 10; ++$i)
            paquet.push($n + "T");
        paquet.push("VT");
        paquet.push("CT");
        paquet.push("DT");
        paquet.push("RT");

        return paquet;
    };

    $(document).ready(function () {
        $.ajax({
            url: '/php/json/json_estConnecte.php',
            data: $(this).serialize()
        })
            .done(function (dataEtatConnexion) {
                if (dataEtatConnexion.isConnecte) {
                    $.ajax({
                        url: '/php/json/json_controller_etatJoueur.php'
                    })
                        .done(function (dataEtat) {
                            $('#navBar').slideDown();
                            if ("menu" === dataEtat.etat) {
                                $('#menuPrincipal').show();
                                $('#boutonDeconnexion').show();
                            }
                            else if ("creationPartie" === dataEtat.etat)
                                $('#divCreationPartie').show();
                            else if ("rejoindrePartie" === dataEtat.etat) {
                                chargerTableauParties();
                                $('#rejoindrePartie').show();
                                $('#boutonDeconnexion').show();
                                $('#boutonMenuPrincipal').show();
                            }
                            else if ("attenteJoueursCreation" === dataEtat.etat) {
                                $('#formCreationPartie').show();
                                $('#boutonDeconnexion').show();
                                $('#boutonMenuPrincipal').show();
                                getInfosPartie();
                            }
                            else if ("attenteJoueursRejoindre" === dataEtat.etat) {
                                chargerTableauParties();
                                $('#rejoindrePartie').show();
                                $('#boutonDeconnexion').show();
                                $('#boutonMenuPrincipal').show();
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

        $('#boutonRejoindrePartie').click(function () {
            $('#menuPrincipal').hide();
            chargerTableauParties();
            $('#rejoindrePartie').show();
            $('#boutonMenuPrincipal').show();

            timerInfosParties = setInterval(chargerTableauParties, 3500);
        });

        $('#quitterFile').click(function () {
            $.ajax({
                url: '/php/json/json_controller_quitterFile.php'
            })
                .done(function (dataEtat) {
                    if ("rejoindrePartie" === dataEtat.etat) {
                        $('#tbodyParties').children().remove();
                        chargerTableauParties();
                    }
                    clearInterval(timerInfosPartieModal);
                })
                .fail(function () {
                    alert("Problème survenu lors du quittage de la file !!");
                });
        });

        $('#boutonMenuPrincipal').click(function () {
            $.ajax({
                url: '/php/json/json_controller_etatJoueur.php',
                type: 'GET',
                data: 'boutonMenuPrincipal=true'
            })
                .done(function (dataEtat) {
                    if ("creationPartie" === dataEtat.etat)
                        $('#divCreationPartie').fadeOut(function () {$('#menuPrincipal').fadeIn();});
                    else if ("rejoindrePartie" === dataEtat.etat) {
                        $('#messageErreurRejoindrePartie').hide();
                        $('#rejoindrePartie').hide();
                        clearInterval(timerInfosParties);
                        $('#tbodyParties').children().remove();
                    }
                    $('#menuPrincipal').show();
                })
                .fail(function () {
                   alert("Problème survenu lors du retour au menu principal !!");
                });
        });

        $('#boutonCreerPartie').click(function () {
            $.ajax({
                url: '/php/modifEtat/etat_creationPartie.php'
            })
                .done(function () {
                    $('#menuPrincipal').fadeOut(function () {$('#divCreationPartie').fadeIn();});
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
                        chargerModalErreur(dataCreationPartie);
                    else {
                        chargerModal(dataCreationPartie);

                        timerInfosPartieModal = setInterval(getInfosPartie, 2000);

                        $('#erreurCreationPartie').html("").hide();
                    }
                    $('#inputCreationPartie').val("");
                })
                .fail(function () {
                    alert("Problème survenu lors de la création de la partie !!");
                });
            return false;
        });

        $('#boutonDeconnexion').click(function () {
            $.ajax({
                url: '/php/json/json_controller_etatJoueur.php',
                type: 'GET',
                data: 'boutonDeconnexion=true'
            })
                .done(function (dataEtatJoueur) {
                    if ("menu" === dataEtatJoueur.etat)
                        $('#menuPrincipal').fadeOut(function () {$('#nonConnecte').fadeIn();});
                    else if ("creationPartie" === dataEtatJoueur.etat)
                        $('#divCreationPartie').fadeOut(function () {$('#nonConnecte').fadeIn()});
                    else if ("recherchePartie" === dataEtatJoueur.etat)
                        $('#rejoindrePartie').fadeOut(function () {$('#nonConnecte').fadeIn()});
                    else if ("rejoindrePartie" === dataEtatJoueur.etat) {
                        $('#messageErreurRejoindrePartie').hide();
                        clearInterval(timerInfosParties);
                        $('#tbodyParties').children().remove();
                        $('#rejoindrePartie').hide();
                    }

                    $('#navBar').slideToggle("fast", "linear");
                    $('#nonConnecte').fadeIn();
                })
                .fail(function () {
                    alert("Problème survenu lors de la déconnexion !!!");
                });
            return false;
        });
    });
}) ();
