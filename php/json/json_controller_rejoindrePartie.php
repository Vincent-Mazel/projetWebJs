<?php
session_start();

$_SESSION["etat"] = "rejoindrePartie";

require('../model/model_gestionParties.php');

$resultat = new stdClass();
$resultat->isPartieEnCours = true;

$resultReq = getAllParties();

if (empty($resultReq)) {
    $resultat->isPartieEnCours = false;

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
else {
    $resultat->parties = array();
    while ($partieReq = $resultReq->fetch())
        $resultat->parties[] = array("NOM_PARTIE" => $partieReq["NOM_PARTIE"], "NB_JOUEURS_CO" => $partieReq["NB_JOUEURS_CO"], "NB_JOUEURS" => $partieReq["NB_JOUEURS"]);

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}

