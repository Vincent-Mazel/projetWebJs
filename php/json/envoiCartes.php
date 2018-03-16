<?php
session_start();

require_once ("../model/model_gestionCartes.php");
require_once('../model/model_gestionParties.php');

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

$chien = $_POST["doggo"];

foreach ((array) $chien as $value)
    envoiCarteChien($nomPartie, $value);

updateEtatPartie("distributionCartes", $nomPartie);


$resultat->nomPartie = $_SESSION["nomPartie"];
$resultat->joueurs = $_SESSION["joueurs"];
$resultat->nbJoueurs = $_SESSION["nbJoueurs"];

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);
