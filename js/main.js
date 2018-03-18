(function ()  {
    "use strict";

    let timerInfosPartieModal;
    let timerInfosParties;
    let timerTestIsDistributionOk;
    let timerTourDeJeu;

    let paquet = [];
    let main;
    let chien = [];

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
                    }, 1300);
                    }, 1300);
                }, 1300);
            }, 1300);
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
                    clearInterval(timerInfosParties);
                    chargerModalChargement();
                    $('#rejoindrePartie').fadeOut(function () {
                        timerTourDeJeu = setInterval(gestionTourDeJeu, 1500);
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
                  clearInterval(timerInfosParties);
                  clearInterval(timerInfosPartieModal);
                  $('#modalAttenteJoueurs').modal("hide");
                  chargerModalChargement();

                  if (1 === dataPartie.numJoueur) {
                      distribuerCartes(dataPartie.nbJoueurs);
                      console.log(main);
                      if ("attenteJoueursCreation" === dataPartie.etat)
                        $('#divCreationPartie').fadeOut(function () {
                            ajouterCartes(main, '#mainJoueur');
                            $('#mainJoueur').fadeIn();
                        });
                      else
                          $('#rejoindrePartie').fadeOut(function () {
                              ajouterCartes(main, '#mainJoueur');
                              $('#mainJoueur').fadeIn();
                          });
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

        let mainJoueur1 = getMain(nbJoueurs);
        main = new Hand(mainJoueur1);

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
            data: {j1 : mainJoueur1, j2 : mainJoueur2, j3 : mainJoueur3, j4 : mainJoueur4, j5 : mainJoueur5, doggo : chien}
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

    let afficherCartesRedistribution = function () {
        $('#mainJoueur').fadeOut(function () {
            $('#mainJoueur').empty();
            ajouterCartes(main, '#mainJoueur');
            setTimeout(function () {$('#mainJoueur').fadeIn();}, 2000);}
            );
    };

    let ajouterCartes = function(main, destination) {
        for (let carte of main.cartes)
            ajouterImageCarte(carte, destination);
    };

    let ajouterImageCarte = function (carte, destination) {
        let img = $('<img />');
        $(destination).append(
            img.attr("src", carte.url)
                .attr("class", "imageCarte")
                .data("valeur", carte.valeur)
                .data("couleur", carte.couleur)
                .data("nom", carte.nom)
                .click(clickImgage)
        );
    };

    let afficherChien = function () {
        $.ajax({
            url: '/php/json/getChien.php'
        })
            .done(function (dataChien) {
                if (dataChien.afficher) {
                    chien = new Hand(dataChien.chien);
                    ajouterCartes(chien, '#plateau');
                    setTimeout(function () {$('#plateau').fadeIn();}, 1000);
                }

            })
            .fail(function () {
               alert("Problème survenu lors de la récupération du chien !!");
            });
    };

    let gestionTourDeJeu = function () {
        $.ajax({
            url: '/php/json/getTourEtatJeu.php'
        })
            .done(function (dataTourDeJeu) {
                if (dataTourDeJeu.isMonTour) {
                    if("redistributionCartes" === dataTourDeJeu.etatPartie) {
                        clearInterval(timerTourDeJeu);
                        distribuerCartes(dataTourDeJeu.nbJoueurs);
                        afficherCartesRedistribution();
                        timerTestIsDistributionOk = setInterval(testIsDistributionOk, 1000);
                    }
                    else if ("distributionCartes" === dataTourDeJeu.etatPartie) {
                        $.ajax({
                            url: 'php/json/getCartes.php'
                        })
                            .done(function (dataCartes) {
                                console.log("Récupération cartes : " + dataCartes.cartes);
                                main = new Hand(dataCartes.cartes);
                                if (dataCartes.isRedistribution) {
                                    afficherCartesRedistribution();
                                }
                                else  {
                                    ajouterCartes(main, '#mainJoueur');
                                    setTimeout(function () {$('#mainJoueur').fadeIn();}, 1000);
                                }

                            })
                            .fail(function () {
                                alert("Problème survenu lors de la récupération de la main !!");
                            });
                        return false;
                    }
                    else if ("prise" === dataTourDeJeu.etatPartie) {
                        console.log("prise");
                        $.ajax({
                            url: '/php/json/getInfosPrise.php'
                        })
                            .done(function (dataInfosPrise) {
                                clearInterval(timerTourDeJeu);
                                if (dataInfosPrise.isPrise) {
                                    if ("petite" === dataInfosPrise.prise)
                                        $('#boutonPetite').hide();
                                    else if ("pousse" === dataInfosPrise.prise) {
                                        $('#boutonPetite').hide();
                                        $('#boutonPousse').hide();
                                    }
                                }
                                afficherModalprise();
                            })
                            .fail(function () {
                               alert("Problème survenu lors de la récupération des infos sur la prise");
                            });
                    }
                    else if ("chien" === dataTourDeJeu.etatPartie) {
                        clearInterval(timerTourDeJeu);
                        afficherChien();
                        setTimeout(function () {$('#plateau').fadeOut(function () {
                            $('#mainJoueur').fadeOut(function () {
                                ajouterCartes(chien, '#mainJoueur');
                                $('#mainJoueur').fadeIn();
                            });
                        });}, 8000);
                        chien = [];
                        chien.push("pute");
                    }
                }
                else if ("chien" === dataTourDeJeu.etatPartie) {
                    afficherChien();
                    setTimeout(function () {$('#plateau').fadeOut();}, 8000);
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

                    $.ajax({
                        url: '/php/json/suppressionPaquetBd.php'
                    })
                        .fail(function () {
                           alert("Un problème est survenu lors de la suppresion du paquet dans la base de données.");
                        });

                    setTimeout(function () {afficherModalprise();}, 7000);

                }
            })
            .fail(function () {
                alert("Problème survenu lors de la récupération de l'avancée de la distribution des cartes");
            });
        return false;
    };

    let afficherModalprise = function () {
        $('#modalPrise').modal({backdrop: 'static', keyboard: false});
        $('#modalPrise').modal("show");
    };

    let clickImgage = function () {
        $.ajax({
            url: '/php/json/getTourEtatJeu.php'
        })
            .done(function (dataEtat) {
                if (dataEtat.isMonTour && "chien" === dataEtat.etatPartie) {
                    console.log("penis ");
                    console.log(chien.length);
                    console.log($(this).data('nom'));
                    if (chien.length < 6) {
                        let nom = $(this).data('nom');
                        let carte = new Carte(nom);
                        chien.push(carte);
                        $(this).fadeOut(function () {
                            let img = $('<img />');
                            $('#plateau').append(
                                img.attr("class", "imageCarte")
                                    .attr("id", "carte" + chien.length)
                                    .data("valeur", carte.valeur)
                                    .data("couleur", carte.couleur)
                                    .data("nom", carte.nom)
                                    .click(clickImgage)
                            );
                            let destination = "#carte" + chien.length;
                            $(destination).fadeIn();
                        })
                    }
                    else {
                        console.log("fajitas ");
                    }
                }
                else if (dataEtat.isMonTour && "jeuEnCours" === dataEtat.etatPartie) {

                }
            })
            .fail(function () {
                alert("Problème survenu lors du clic sur une carte !!");
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
                            else if ("distributionCartes" === dataEtat.etat || "chien" === dataEtat.etat) {
                                $.ajax({
                                    url: 'php/json/getCartesFromSession.php'
                                })
                                    .done(function (dataCartes) {
                                        main = new Hand(dataCartes.cartes);
                                        ajouterCartes(main, '#mainJoueur');
                                        setTimeout(function () {$('#mainJoueur').fadeIn();}, 1000);
                                    })
                                    .fail(function () {
                                        alert("Problème survenu lors de la récupération de la main en $_SESSION !!");
                                    });
                                return false;
                            }
                            else if ("prise" === dataEtat.etat) {
                                $.ajax({
                                    url: 'php/json/getCartesFromSession.php'
                                })
                                    .done(function (dataCartes) {
                                        main = new Hand(dataCartes.cartes);
                                        ajouterCartes(main, '#mainJoueur');
                                        setTimeout(function () {$('#mainJoueur').fadeIn();}, 1000);

                                        timerTourDeJeu = setInterval(gestionTourDeJeu, 1500);
                                    })
                                    .fail(function () {
                                        alert("Problème survenu lors de la récupération de la main en $_SESSION !!");
                                    });
                                return false;
                            }
                            else if ("chien" === dataEtat.etat) {

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
                    else if ("distributionCartes" === dataEtat.etat || "prise" === dataEtat.etat || "chien" === dataEtat.etat) {
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
                    else if ("distributionCartes" === dataEtatJoueur.etat || "prise" === dataEtatJoueur.etat || "chien" === dataEtatJoueur.etat) {
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
                type: 'GET',
                data: 'prise=petite'
            })
                .done(function () {
                    $('#modalPrise').modal("hide");
                    timerTourDeJeu = setInterval(gestionTourDeJeu, 1500);
                })
                .fail(function () {
                    alert("Problème survenu lors de la prise d'une petite !!");
                });
            return false;
        });

        $('#boutonPousse').click(function () {
            $.ajax({
                url: '/php/json/envoiPrise.php',
                type: 'GET',
                data: 'prise=pousse'
            })
                .done(function () {
                    $('#modalPrise').modal("hide");
                    timerTourDeJeu = setInterval(gestionTourDeJeu, 1500);
                })
                .fail(function () {
                    alert("Problème survenu lors de la prise d'une pousse !!");
                });
            return false;
        });

        $('#boutonGarde').click(function () {
            $.ajax({
                url: '/php/json/envoiPrise.php',
                type: 'GET',
                data: 'prise=garde'
            })
                .done(function () {
                    $('#modalPrise').modal("hide");
                    timerTourDeJeu = setInterval(gestionTourDeJeu, 1500);
                })
                .fail(function () {
                    alert("Problème survenu lors de la prise d'une garde !!");
                });
            return false;
        });

        $('#boutonPasser').click(function () {
            $.ajax({
                url: '/php/json/envoiPrise.php',
                type: 'GET',
                data: 'prise=passe'
            })
                .done(function () {
                    $('#modalPrise').modal("hide");
                    timerTourDeJeu = setInterval(gestionTourDeJeu, 1500);
                })
                .fail(function () {
                    alert("Problème survenu lors des enchères et de la décision de passer !!");
                });
            return false;
        });
    });
}) ();
