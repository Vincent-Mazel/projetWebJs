<?php
session_start();

require ("../model/model_gestionCartes.php");

$resultat = new stdClass();

$resultReq = getPaquet($_SESSION["nomPartie"], $_SESSION["username"]);

$cartes = array();

while ($carteReq = $resultReq->fetch())
    $cartes[] = $carteReq["CARTE"];

$_SESSION["main"] = $cartes;

$resultat->cartes = $cartes;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);