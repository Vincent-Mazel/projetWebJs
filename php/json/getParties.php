<?php
session_start();

require('../model/model_gestionParties.php');
require_once ("Hand.php");
require_once ("Carte.php");

if ($_SESSION["etat"] == "menu")
    $_SESSION["etat"] = "rejoindrePartie";

$resultat = new stdClass();
$resultat->isPartieEnCours = true;

$resultReq = getAllParties();
$partieReq = $resultReq->fetch();

if (empty($partieReq)) {
    $resultat->isPartieEnCours = false;

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
else {
    $resultat->parties = array();
    $bool = true;
    do {
        if ($partieReq["NB_JOUEURS_CO"] < $partieReq["NB_JOUEURS"]) {
            $resultat->parties[] = array($partieReq["NOM_PARTIE"], $partieReq["NB_JOUEURS_CO"] . "/" . $partieReq["NB_JOUEURS"]);
            $bool = false;
        }
    }while ($partieReq = $resultReq->fetch());

    if ($bool)
        $resultat->isPartieEnCours = false;

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}

