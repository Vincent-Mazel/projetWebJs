<?php
session_start();

require_once ("../model/model_gestionCartes.php");
require_once('../model/model_gestionParties.php');
require_once ("Hand.php");
require_once ("Carte.php");

$resultat = new stdClass();

$nbJoueurs = $_SESSION["nbJoueurs"];
$joueurs = $_SESSION["joueurs"];
$nomPartie = $_SESSION["nomPartie"];

$test = false;

for ($i = 2; $i <= 3; $i++) {
    $test = true;
    $main = $_POST["j" . $i];
    foreach ((array) $main as $value) {
        envoiCarteDistribuee($nomPartie, $value, $joueurs[$i - 1]);
    }
}

$_SESSION["main"] = $_POST["j1"];

$chien = $_POST["doggo"];

foreach ((array) $chien as $value)
    envoiCarteChien($nomPartie, $value);

$resultReq = getPartieByName($nomPartie);
$partieReq = $resultReq->fetch();
if ("redistributionCartes" == $partieReq["ETAT_PARTIE"])
    updateTour($nomPartie, "recupCartes");

updateEtatPartie("distributionCartes", $nomPartie);



$resultat->nomPartie = $_SESSION["nomPartie"];
$resultat->joueurs = $_SESSION["joueurs"];
$resultat->nbJoueurs = $_SESSION["nbJoueurs"];

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);
