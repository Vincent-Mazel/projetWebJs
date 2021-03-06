<?php
require_once ("Hand.php");
require_once ("Carte.php");
session_start();

require_once ("../model/model_gestionChien.php");
require_once ("../model/model_gestionCartes.php");
require_once ("../model/model_gestionParties.php");


$resultat = new stdClass();

$nomPartie = $_SESSION["nomPartie"];

$resultReqTour = getEtatTour($nomPartie);
$partie = $resultReqTour->fetch();

if (!isset($_SESSION["afficher"]) || $partie["TOUR"] == $_SESSION["username"]) {
    $_SESSION["afficher"] = true;
    $resultat->afficher = true;
}
else
    $resultat->afficher = false;


$resultReq = getChien($nomPartie);

while ($carteReq = $resultReq->fetch())
    $cartes[] = $carteReq["CARTE"];

$resultat->chien = $cartes;
$_SESSION["chien"] = $cartes;

updateJoueurChien($nomPartie, $nomJoueur);

if ($partie["TOUR"] == $_SESSION["username"]) {
    foreach ($_SESSION["chien"] as $carte) {
        $newCarte = new Carte();
        $newCarte->genererCarte($carte, $_SESSION["username"]);
        $_SESSION["main"]->addCarte($newCarte);
    }

}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);

