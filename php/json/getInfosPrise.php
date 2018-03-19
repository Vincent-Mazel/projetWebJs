<?php
session_start();

require_once ("../model/model_gestionPrises.php");
require_once ("Hand.php");
require_once ("Carte.php");

$resultat = new stdClass();

$resultReq = getPrise($_SESSION["nomPartie"]);
$prise = $resultReq->fetch();

if (empty($prise))
    $resultat->isPrise = false;
else {
    $resultat->isPrise = true;
    $resultat->prise = $prise["VALEUR"];
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);