<?php
session_start();

require('../model/model_gestionParties.php');

$resultat = new stdClass();
$resultat->isPartieEnCours = true;

$resultReq = getAllParties();
$partieReq = $partieReq = $resultReq->fetch();

if (empty($partieReq)) {
    $resultat->isPartieEnCours = false;

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
else {
    $resultat->parties = array();
    do {
        $resultat->parties[] = array($partieReq["NOM_PARTIE"], $partieReq["NB_JOUEURS_CO"] . "/" . $partieReq["NB_JOUEURS"]);
    }while ($partieReq = $resultReq->fetch());

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}

