<?php
session_start();

require_once ("../model/model_gestionCartes.php");
require_once ("../model/model_gestionUtilisateur.php");
require_once ("../model/model_gestionParties.php");

$resultat = new stdClass();
$resultat->isRedistribution = false;

$resultReq = getPaquet($_SESSION["nomPartie"], $_SESSION["username"]);

$cartes = array();

while ($carteReq = $resultReq->fetch())
    $cartes[] = $carteReq["CARTE"];

$_SESSION["main"] = $cartes;
$_SESSION["carteRecuperees"] = true;

$resultat->cartes = $cartes;

updateRecupCartes($_SESSION["username"], TRUE);

$resultReqPartie = getPartieByName($_SESSION["nomPartie"]);
$partieReq = $resultReqPartie->fetch();
if ($partieReq["TOUR"] == "recupCartes")
    $resultat->isRedistribution = true;

$_SESSION["etat"] = "prise";

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);

