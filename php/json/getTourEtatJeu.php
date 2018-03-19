<?php
session_start();

require ("../model/model_gestionCartes.php");
require_once ("Hand.php");
require_once ("Carte.php");

if (!isset($_SESSION["carteRecuperees"]))
    $_SESSION["carteRecuperees"] = false;

$resultat = new stdClass();
$resultat->isMonTour = false;

$resultat->carteRecup = $_SESSION["carteRecuperees"];

$resultReq = getEtatTour($_SESSION["nomPartie"]);
$partie = $resultReq->fetch();

$testRecupCartes = $_SESSION["carteRecuperees"];
$resultat->etatPartie = $partie["ETAT_PARTIE"];

if (($_SESSION["username"] == $partie["TOUR"]) || (empty($partie["TOUR"]) && !$testRecupCartes) || "recupCartes" == $partie["TOUR"]
    || ($_SESSION["joueurs"][0] == $_SESSION["username"] && "redistributionCartes" == $partie["ETAT_PARTIE"]))
    $resultat->isMonTour = true;

$resultat->nbJoueurs = sizeof($_SESSION["joueurs"]);

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);


