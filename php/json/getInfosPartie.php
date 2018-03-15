<?php
session_start();

require('../model/model_gestionParties.php');

$resultat = new stdClass();
$resultat->isJouable = false;

$nomPartie = $_SESSION["nomPartie"];

$resultReq = getPartieByName($nomPartie);
$partie = $resultReq->fetch();

if ($partie["NB_JOUEURS"] == $partie["NB_JOUEURS_CO"]) {
    $resultat->isJouable = true;

    $i = 1;
    while ($i <= $partie["NB_JOUEURS"]) {
        if ($partie["JOUEUR" . $i] == $_SESSION["username"])
            break;
        $i += 1;
    }

    $resultat->numJoueur = $i;
    $resultat->nbJoueurs = $partie["NB_JOUEURS"];

    $_SESSION["joueurs"] = array();
    $k = 1;
    while ($k <= $partie["NB_JOUEURS"]) {
        $_SESSION["joueurs"][] = $partie["JOUEUR" . $k];
        $k += 1;
    }

    $resultat->joueurs = $_SESSION["joueurs"];
    $resultat->nomPartie = $_SESSION["nomPartie"];

    $_SESSION["etat"] = "distributionCartes";

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
else {
    $resultat->htmlMessage = "Nom de la partie : " . $nomPartie . "<br>" . $partie["NB_JOUEURS_CO"] . "/" . $partie["NB_JOUEURS"] . " joueurs connectés"
        . "<br> <br>";

    $k = 1;
    while ($k <= $partie["NB_JOUEURS_CO"]) {
        $resultat->htmlMessage .= "Joueur " . $k . " : " . $partie["JOUEUR" . $k] . '<br>';
        $k += 1;
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}





