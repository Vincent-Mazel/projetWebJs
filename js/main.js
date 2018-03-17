(function ()  {
    "use strict";

    let timerInfosPartieModal;
    let timerInfosParties;
    let timerTestIsDistributionOk;
    let timerTourDeJeu;

    let paquet = [];
    let main;

    let chargerTableauParties = function () {
        $.ajax({
            url: '/php/json/getParties.php',
            data: $(this).serialize()
        })
            .done(function (dataParties) {
                $('#tbodyParties').children().remove();
                if (dataParties.isPartieEnCours) {
                    $('#messageErreurRejoindrePartie').fadeOut(function () {
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
                    });
                    $('#tableParties').fadeIn();
                }
                else {
                    $('#tableParties').hide();
                    $('#messageErreurRejoindrePartie').show();
                }
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
                $('#messageModalChargement').html("Mise à disposition de délicieux cocktails");
                setTimeout(function () {
                    $('#messageModalChargement').html("Clin d'oeil à la charmante serveuse");
                    setTimeout(function () {
                        $('#modalChargementPartie').modal("hide");
                    }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
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
                  chargerModalChargement();

                  if (1 === dataPartie.numJoueur) {
                      distribuerCartes(dataPartie.nbJoueurs);
                      console.log(main);
                      if ("attenteJoueursCreation" === dataPartie.etat)
                        $('#divCreationPartie').fadeOut(function () {afficherCartes(main);});
                      else
                          $('#rejoindrePartie').fadeOut(function () {afficherCartes(main);});
                      timerTestIsDistributionOk = setInterval(testIsDistributionOk, 1000);
                  }
                  else
                      $('#rejoindrePartie').fadeOut(function () {timerTourDeJeu = setInterval(gestionTourDeJeu, 1500);});
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
        generatePaquet();
        let chien = getChien(nbJoueurs);

        main = new Hand(getMain(nbJoueurs));
        let mainJoueur2 = getMain(nbJoueurs);
        let mainJoueur3 = getMain(nbJoueurs);

        let mainJoueur4;
        let mainJoueur5;
        if (4 == nbJoueurs)
            mainJoueur4 = getMain(nbJoueurs);
        else if (5 == nbJoueurs)
            mainJoueur5 = getMain(nbJoueurs);

        $.ajax({
            url: '/php/json/envoiCartes.php',
            type: 'POST',
            data: {j2 : mainJoueur2, j3 : mainJoueur3, j4 : mainJoueur4, j5 : mainJoueur5, doggo : chien}
        })
            .fail(function () {
                alert("Problème survenu lors de la génération du paquet");
            });
        return false;
    };

    let generatePaquet = function () {
        for (let i = 1; i <= 21; ++i)
            paquet.push(i + "A");
        paquet.push("Excuse");

        for (let k = 1; k <= 10; ++k)
            paquet.push(k + "CA");
        paquet.push("VCA");
        paquet.push("CCA");
        paquet.push("DCA");
        paquet.push("RCA");

        for (let l = 1; l <= 10; ++l)
            paquet.push(l + "CO");
        paquet.push("VCO");
        paquet.push("CCO");
        paquet.push("DCO");
        paquet.push("RCO");

        for (let m = 1; m <= 10; ++m)
            paquet.push(m + "P");
        paquet.push("VP");
        paquet.push("CP");
        paquet.push("DP");
        paquet.push("RP");

        for (let n = 1; n <= 10; ++n)
            paquet.push(n + "T");
        paquet.push("VT");
        paquet.push("CT");
        paquet.push("DT");
        paquet.push("RT");
    };

    let getRandomIntInclusive = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min +1)) + min;
    };

    let getChien = function (nbJoueurs) {
        let chien = [];
        if (3 == nbJoueurs || 4 == nbJoueurs) {
            for (let i = 0; i < 6; ++i) {
                let rand = getRandomIntInclusive(0, paquet.length - 1);
                chien.push(paquet[rand]);
                paquet.splice(rand, 1);
            }
        }
        else {
            for (let i = 0; i < 3; ++i) {
                let rand = getRandomIntInclusive(0, paquet.length - 1);
                chien.push(paquet[rand]);
                paquet.splice(rand, 1);
            }
        }
        return chien;
    };

    let getMain = function (nbJoueurs) {
        let main = [];
        if (3 == nbJoueurs) {
            for (let i = 0; i < 24; ++i) {
                let rand = getRandomIntInclusive(0, paquet.length - 1);
                main.push(paquet[rand]);
                paquet.splice(rand, 1);
            }
        }
        else if (4 == nbJoueurs) {
            for (let i = 0; i < 18; ++i) {
                let rand = getRandomIntInclusive(0, paquet.length - 1);
                main.push(paquet[rand]);
                paquet.splice(rand, 1);
            }
        }
        else {
            for (let i = 0; i < 15; ++i) {
                let rand = getRandomIntInclusive(0, paquet.length - 1);
                main.push(paquet[rand]);
                paquet.splice(rand, 1);
            }
        }
        return main;
    };

    let afficherCartes = function(main) {
        for (let carte of main.cartes)
            ajouterImageCarte(carte);
        $('.imageCarte').fadeIn();
    };

    let ajouterImageCarte = function (carte) {
        let a = $('<img />');
        $('#mainJoueur').append(
            a.attr("src", carte.url)
                .attr("class", "imageCarte")
                .data("valeur", carte.valeur)
                .data("couleur", carte.couleur)
        );
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
                                console.log("Récupération cartes : " + dataCartes.cartes);
                                main = new Hand(dataCartes.cartes);
                                afficherCartes(main);
                            })
                            .fail(function () {
                                alert("Problème survenu lors de la récupération de la main !!");
                            });
                        return false;
                    }
                    else if ("prise" === dataTourDeJeu.etatPartie) {
                        console.log("viol de chèvre");
                    }
                }
            })
            .fail(function () {
                alert("Problème survenu lors de la récupération de l'état et de la personne devant jouer !!");
            });
        return false;
    };

    let testIsDistributionOk = function () {
        $.ajax({
            url: '/php/json/getEtatDistributionJoueurs.php'
        })
            .done(function (dataEtatDistribution) {
                if (dataEtatDistribution.isDistributionOk) {
                    clearInterval(timerTestIsDistributionOk);
                    $('#modalPrise').modal({backdrop: 'static', keyboard: false});
                    $('#modalPrise').modal("show");
                }
            })
            .fail(function () {
                alert("Problème survenu lors de la récupération de l'avancée de la distribution des cartes");
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
                            else if ("distributionCartes" === dataEtat.etat) {
                                $.ajax({
                                    url: 'php/json/getCartesFromSession.php'
                                })
                                    .done(function (dataCartes) {
                                        main = new Hand(dataCartes.cartes);
                                        afficherCartes(main);
                                    })
                                    .fail(function () {
                                        alert("Problème survenu lors de la récupération de la main en $_SESSION !!");
                                    });
                                return false;
                            }
                            else if ("prise" === dataEtat.etat) {

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
            chargerTableauParties();
            $('#menuPrincipal').fadeOut(function () {$('#rejoindrePartie').fadeIn();});

            timerInfosParties = setInterval(chargerTableauParties, 2000);
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
                    else if ("distributionCartes" === dataEtat.etat) {
                        $('#modalGoToMenuPartie').modal({backdrop: 'static', keyboard: false});
                        $('#modalGoToMenuPartie').modal("show");
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
                    if ("menu" === dataEtatJoueur.etat) {
                        $('#menuPrincipal').fadeOut(function () {$('#nonConnecte').fadeIn();});
                        $('#navBar').slideToggle("fast", "linear");
                    }
                    else if ("creationPartie" === dataEtatJoueur.etat) {
                        $('#divCreationPartie').fadeOut(function () {$('#nonConnecte').fadeIn()});
                        $('#navBar').slideToggle("fast", "linear");
                    }
                    else if ("rejoindrePartie" === dataEtatJoueur.etat) {
                        $('#rejoindrePartie').fadeOut(function () {$('#nonConnecte').fadeIn(function () {$('#tbodyParties').children().remove();});});
                        $('#navBar').slideToggle("fast", "linear");
                        clearInterval(timerInfosParties);
                    }
                    else if ("distributionCartes" === dataEtatJoueur.etat) {
                        $('#modalDeconnexionPartie').modal({backdrop: 'static', keyboard: false});
                        $('#modalDeconnexionPartie').modal("show");
                    }
                })
                .fail(function () {
                    alert("Problème survenu lors de la déconnexion !!!");
                });
            return false;
        });

        $('#boutonDeconnexionModal').click(function () {
            $('#mainJoueur').fadeOut(function () {$('#nonConnecte').fadeIn(function () {$('#modalDeconnexionPartie').modal("hide")});});
            $('#navBar').slideToggle("fast", "linear");
            $.ajax({
                url: 'php/deconnexion.php'
            })
                .fail(function () {
                    alert("Problème survenu lors de la déconnexion !!");
                });
            return false;
        });

        $('#boutonGoToMenuModal').click(function () {
            $('#mainJoueur').fadeOut(function () {$('#menuPrincipal').fadeIn(function () {$('#modalGoToMenuPartie').modal("hide");});});
            $.ajax({
                url: 'php/modifEtat/etat_goToMenu.php'
            })
                .fail(function () {
                    alert("Problème survenu lors du passage au menu principal depuis la partie en cours !!");
                });
            return false;
        });

        $('.boutonRester').click(function () {
            $('#modalQuitterPartie').modal("hide");
            $('#modalGoToMenuPartie').modal("hide");
        });

        $('#boutonPetite').click(function () {
            $.ajax({
                url: '/php/json/envoiPrise.php',
                type: 'POST',
                data: {prise : "petite"}
            })
                .done(function () {

                    $('#modalPrise').modal("hide");
                })
                .fail(function () {
                    alert("");
                });
            return false;
        });

        $('#boutonPousse').click(function () {
            $.ajax({
                url: '/php/json/envoiPrise.php',
                type: 'POST',
                data: {prise : "pousse"}
            })
                .done(function () {

                    $('#modalPrise').modal("hide");
                })
                .fail(function () {
                    alert("");
                });
            return false;
        });

        $('#boutonGarde').click(function () {
            $.ajax({
                url: '/php/json/envoiPrise.php',
                type: 'POST',
                data: {prise : "garde"}
            })
                .done(function () {

                    $('#modalPrise').modal("hide");
                })
                .fail(function () {
                    alert("");
                });
            return false;
        });

        $('#boutonPasser').click(function () {
            $.ajax({
                url: '/php/json/envoiPrise.php',
                type: 'POST',
                data: {prise : "passe"}
            })
                .done(function () {

                    $('#modalPrise').modal("hide");
                })
                .fail(function () {
                    alert("");
                });
            return false;
        });
    });
}) ();
