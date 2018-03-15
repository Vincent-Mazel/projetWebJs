<?php
session_start();

require ("../model/model_gestionCartes.php");
require('../model/model_gestionParties.php');

$nbJoueurs = $_SESSION["nbJoueurs"];
$joueurs = $_SESSION["joueurs"];
$nomPartie = $_SESSION["nomPartie"];

for ($i = 2; $i <= $nbJoueurs; ++$i) {
    $main = $_POST["j" . $i];
    foreach ($main as &$value) {
        envoiCarteDistribuee($nomPartie, $value, $joueurs[$i]);
    }
}

updateEtatPartie("distributionCartes", $nomPartie);

$resultat = new stdClass();
$resultat->nomPartie = $_SESSION["nomPartie"];
$resultat->joueurs = $_SESSION["joueurs"];
$resultat->nbJoueurs = $_SESSION["nbJoueurs"];

$resultat->j1 = $_POST["j1"];

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);
