<?php
session_start();

require('../model/model_gestionParties.php');

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
    $i = 1;
    $tabJoueurs = array("JOUEUR1" => "", "JOUEUR2" => "", "JOUEUR3" => "", "JOUEUR4" => "", "JOUEUR5" => "");

    while (!empty($partie["JOUEUR" . $i])) {
        if ($partie["JOUEUR" . $i] != $nomJoueur)
            $tabJoueurs["JOUEUR" . $i] = $partie["JOUEUR" . $i];
        $i += 1;
    }

    updatePartie($tabJoueurs["JOUEUR1"], $tabJoueurs["JOUEUR2"], $tabJoueurs["JOUEUR3"], $tabJoueurs["JOUEUR4"], $tabJoueurs["JOUEUR5"], $nomPartie, $partie["NB_JOUEURS_CO"] - 1);
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);