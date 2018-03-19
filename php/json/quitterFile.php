<?php
session_start();

require('../model/model_gestionParties.php');
require_once ("Hand.php");
require_once ("Carte.php");

$resultat = new stdClass();

if ("attenteJoueursCreation" == $_SESSION["etat"])
    $_SESSION["etat"] = "creationPartie";
else
    $_SESSION["etat"] = "rejoindrePartie";

$resultat->etat = $_SESSION["etat"];

$nomPartie = $_SESSION["nomPartie"];
$nomJoueur = $_SESSION["username"];

$resultReq = getPartieByName($nomPartie);
$partie = $resultReq->fetch();

if (1 == $partie["NB_JOUEURS_CO"])
    deletePartie($nomPartie);
else {
    $joueurs = array("", "", "", "", "");
    $k = 0;
    for ($i = 1; $i <= $partie["NB_JOUEURS"]; ++$i) {
        if (!empty($partie["JOUEUR" . $i]) && $nomJoueur != $partie["JOUEUR" . $i]) {
            $joueurs[$k] = $partie["JOUEUR" . $i];
            $k += 1;
        }
    }

    updatePartie($joueurs[0], $joueurs[1], $joueurs[2], $joueurs[3], $joueurs[4], $nomPartie, $partie["NB_JOUEURS_CO"] - 1);
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);