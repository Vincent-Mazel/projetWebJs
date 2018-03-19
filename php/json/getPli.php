<?php
session_start();

require_once ("../model/model_gestionPli.php");
require_once ("Hand.php");
require_once ("Carte.php");

$resultat = new stdClass();
$resultat->isCarte = false;
$resultat->cartes = [];

$nomPartie = $_SESSION["nomPartie"];

$resultReq = getPliEnCours($nomPartie);

while ($carte = $resultReq->fetch()) {
    $resultat->isCarte = true;
    $resultat->cartes[] = $carte["CARTE"];
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);