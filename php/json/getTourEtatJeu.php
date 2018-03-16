<?php
session_start();

require ("../model/model_gestionCartes.php");

if (!isset($_SESSION["carteRecuperees"]))
    $_SESSION["carteRecuperees"] = false;

$resultat = new stdClass();
$resultat->isMonTour = false;

$resultat->carteRecup = $_SESSION["carteRecuperees"];

$resultReq = getEtatTour($_SESSION["nomPartie"]);
$partie = $resultReq->fetch();

$testRecupCartes = $_SESSION["carteRecuperees"];

if (($_SESSION["username"] == $partie["TOUR"]) || (empty($partie["TOUR"]) && !$testRecupCartes)) {
    $resultat->isMonTour = true;
    $resultat->etatPartie = $partie["ETAT_PARTIE"];
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);


