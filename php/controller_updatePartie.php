<?php
session_start();

require('model/model_gestionParties.php');

$_SESSION["etat"] = "creationPartie";

$nomPartie = $_SESSION["nomPartie"];
$nomJoueur = $_SESSION["username"];

$resultReq = getPartieByName($nomPartie);
$partie = $resultReq->fetch();

if (1 == $partie["NB_JOUEURS_CO"])
    deletePartie($nomPartie);
else {
    $i = 1;
    $tabJoueurs = array("JOUEUR1" => "", "JOUEUR2" => "", "JOUEUR3" => "", "JOUEUR4" => "", "JOUEUR5" => "");

    while (!empty($partie["JOUEUR" . $i])) {
        if ($partie["JOUEUR" . $i] != $nomJoueur)
            $tabJoueurs["JOUEUR" . $i] = $partie["JOUEUR" . $i];
        $i += 1;
    }

    updatePartie($tabJoueurs["JOUEUR1"], $tabJoueurs["JOUEUR2"], $tabJoueurs["JOUEUR3"], $tabJoueurs["JOUEUR4"], $tabJoueurs["JOUEUR5"], $nomPartie, $partie["NB_JOUEURS_CO"] - 1);
}