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
    $_SESSION["etat"] = "carteDistribuees";

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
else {
    $resultat->nomPartie = $nomPartie;
    $resultat->nbJoueurs = $partie["NB_JOUEURS"];
    $resultat->nbJoueursCo = $partie["NB_JOUEURS_CO"];

    $k = 1;
    while ($k <= $partie["NB_JOUEURS_CO"]) {
        $resultat->joueurs .= "Joueur " . $k . " : " . $partie["JOUEUR" . $k] . '<br>';
        $k += 1;
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}





