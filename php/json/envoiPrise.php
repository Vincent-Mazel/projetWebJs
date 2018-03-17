<?php
session_start();

require_once ("../model/model_gestionCartes.php");
require_once('../model/model_gestionParties.php');

$prise = $_POST["prise"];
$nomJoueur = $_SESSION["username"];
$nomPartie = $_SESSION["nomPartie"];
$numJoueur = $_SESSION["numJoueur"];
$joueurs = $_SESSION["joueurs"];
$nbJoueurs = sizeof($joueurs);

if ($numJoueur == $nbJoueurs)
    $tourJoueur = $joueurs[0];
else
    $tourJoueur = $joueurs[$numJoueur];

if ("passe" == $prise)
    updateTour($nomPartie, $tourJoueur);
else if ("garde" == $prise) {
    updateEtatPartie("chien", $nomPartie);
    updateTour($nomPartie, $nomJoueur);
}
else {
    if (empty($prise))
        insertPrise($nomPartie, $nomJoueur, $prise);
    else {
        updatePrise($nomPartie, $nomJoueur, $prise);
    }
}

//rajouter un élem PRISE_OK à la bd aux users pour pouvoir check si tt le monde à bien fait cette étape, et si on revient au j1.
//le j1 aura un intervall qui va check que soit tt le monde a fait sa prise, soit il y a eu une garde.
