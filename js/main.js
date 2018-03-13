(function ()  {
    "use strict";

    let timerInfosPartieModal;
    let timerInfosParties;
    let timerTourDeJeu;

    let main;

    let chargerTableauParties = function () {
        $.ajax({
            url: '/php/json/getParties.php',
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
            url: '/php/json/rejoindrePartie.php',
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
                    $('#rejoindrePartie').fadeOut(function () {
                        timerTourDeJeu = setInterval(gestionTourDeJeu, 1500);
                        $('#plateau').show();
                    });

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
          url: '/php/json/getInfosPartie.php',
          data: $(this).serialize()
      })
          .done(function (dataPartie) {
              if (dataPartie.isJouable) {
                  clearInterval(timerInfosPartieModal);
                  $('#modalAttenteJoueurs').modal("hide");

                  if (1 === dataPartie.numJoueur)
                      distribuerCartes(dataPartie.nbJoueurs);

                  chargerModalChargement();
                  $('#rejoindrePartie').fadeOut(function () {
                      timerTourDeJeu = setInterval(gestionTourDeJeu, 1500);
                      $('#plateau').show();
                  });
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

    let distribuerCartes = function (nbJoueurs) {
        let paquet = new Paquet();
        paquet.genererPaquet();

        if ("3" === nbJoueurs) {

        }
        else if ("4" === nbJoueurs) {

        }
        else {

        }

        $.ajax({
            url: '/php/json/envoiCartes.php',
            type: 'GET',
            data: 'type=generationPaquet'
        })
            .fail(function () {
                alert("Problème survenu lors de la génération du paquet");
            });
        return false;
    };

    let gestionTourDeJeu = function () {
        $.ajax({
            url: '/php/json/getTourEtatJeu.php'
        })
            .done(function (dataTourDeJeu) {
                if (dataTourDeJeu.isMonTour) {
                    if ("distributionCartes" === dataTourDeJeu.etatPartie) {
                        $.ajax({
                            url: 'php/json/getCartes.php'
                        })
                            .done(function (dataCartes) {
                                main = dataCartes.cartes;
                            })
                            .fail(function () {
                                alert("Problème survenu lors de la récupération de la main !!");
                            });
                        return false;
                    }
                }
            })
            .fail(function () {
                alert("Problème survenu lors de la récupération de l'état et de la personne devant jouer !!");
            });
        return false;
    };

    $(document).ready(function () {
        $.ajax({
            url: '/php/json/estConnecte.php',
            data: $(this).serialize()
        })
            .done(function (dataEtatConnexion) {
                if (dataEtatConnexion.isConnecte) {
                    $.ajax({
                        url: '/php/json/etatJoueur.php'
                    })
                        .done(function (dataEtat) {
                            $('#navBar').slideDown();
                            if ("menu" === dataEtat.etat)
                                $('#menuPrincipal').show();
                            else if ("creationPartie" === dataEtat.etat)
                                $('#divCreationPartie').show();
                            else if ("rejoindrePartie" === dataEtat.etat) {
                                chargerTableauParties();
                                $('#rejoindrePartie').show();
                            }
                            else if ("attenteJoueursCreation" === dataEtat.etat) {
                                $('#divCreationPartie').show();
                                getInfosPartie();
                            }
                            else if ("attenteJoueursRejoindre" === dataEtat.etat) {
                                chargerTableauParties();
                                $('#rejoindrePartie').show();
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
            $('#menuPrincipal').fadeOut(function () {$('#rejoindrePartie').fadeIn();});
            chargerTableauParties();

            timerInfosParties = setInterval(chargerTableauParties, 3500);
        });

        $('#quitterFile').click(function () {
            $.ajax({
                url: '/php/json/quitterFile.php'
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
                url: '/php/json/etatJoueur.php',
                type: 'GET',
                data: 'boutonMenuPrincipal=true'
            })
                .done(function (dataEtat) {
                    if ("creationPartie" === dataEtat.etat)
                        $('#divCreationPartie').fadeOut(function () {$('#menuPrincipal').fadeIn();});
                    else if ("rejoindrePartie" === dataEtat.etat) {
                        $('#rejoindrePartie').fadeOut(function () {$('#menuPrincipal').fadeIn(function () {$('#tbodyParties').children().remove();});});
                        clearInterval(timerInfosParties);
                    }
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
                url: '/php/json/etatJoueur.php',
                type: 'GET',
                data: 'boutonDeconnexion=true'
            })
                .done(function (dataEtatJoueur) {
                    if ("menu" === dataEtatJoueur.etat)
                        $('#menuPrincipal').fadeOut(function () {$('#nonConnecte').fadeIn();});
                    else if ("creationPartie" === dataEtatJoueur.etat)
                        $('#divCreationPartie').fadeOut(function () {$('#nonConnecte').fadeIn()});
                    else if ("rejoindrePartie" === dataEtatJoueur.etat) {
                        $('#rejoindrePartie').fadeOut(function () {$('#nonConnecte').fadeIn(function () {$('#tbodyParties').children().remove();});});
                        clearInterval(timerInfosParties);
                    }
                    $('#navBar').slideToggle("fast", "linear");
                })
                .fail(function () {
                    alert("Problème survenu lors de la déconnexion !!!");
                });
            return false;
        });
    });
}) ();
