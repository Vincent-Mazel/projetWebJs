<?php
session_start();

require_once ("../model/model_gestionCartes.php");
require_once ('../model/model_gestionParties.php');
require_once ("../model/model_gestionPrises.php");
require_once ("../model/model_gestionUtilisateur.php");
require_once ("Hand.php");
require_once ("Carte.php");

$prise = $_GET["prise"];
$nomJoueur = $_SESSION["username"];
$nomPartie = $_SESSION["nomPartie"];
$joueurs = $_SESSION["joueurs"];
$nbJoueurs = sizeof($joueurs);

$k = 1;
foreach ($joueurs as $joueur) {
    if ($joueur == $nomJoueur)
        $numJoueur = $k;
    $k += 1;
}


echo "Prise valeur : " . $prise . "<br>";
echo "Nom joueur : " . $nomJoueur . "<br>";
echo "Nom partie : " . $nomPartie . "<br>";
echo "Num joueur : " . $numJoueur . "<br>";
echo "Joueurs : " . $joueurs . "<br>";
echo "Nb joueurs : " . $nbJoueurs . "<br>";

$resultReqPrise = getPrise($nomPartie);
$priseReq = $resultReqPrise->fetch();

if ($numJoueur == $nbJoueurs)
    $tourProchainJoueur = $joueurs[0];
else
    $tourProchainJoueur = $joueurs[$numJoueur];

if ("passe" == $prise) {
    if ($tourProchainJoueur == $joueurs[0] && empty($priseReq)) {
        foreach ((array) $joueurs as $joueur)
            updateRecupCartes($joueur, FALSE);
        updateEtatPartie("redistributionCartes", $nomPartie);
        updateTour($nomPartie, $tourProchainJoueur);
    }
    else if ($tourProchainJoueur == $joueurs[0]) {
        updateEtatPartie("chien", $nomPartie);
        updateTour($nomPartie, $priseReq["JOUEUR"]);
        $_SESSION["etat"] = "chien";
    }
    else
        updateTour($nomPartie, $tourProchainJoueur);
}
else if ("garde" == $prise) {
    updateEtatPartie("chien", $nomPartie);
    updateTour($nomPartie, $nomJoueur);
    if (empty($priseReq))
        insertPrise($nomPartie, $nomJoueur, $prise);
    else {
        updatePrise($nomPartie, $nomJoueur, $prise);
    }
    $_SESSION["etat"] = "chien";
}
else {
    if (empty($priseReq)) {
        insertPrise($nomPartie, $nomJoueur, $prise);
        //updatePriseOk($nomJoueur);
    }
    else {
        updatePrise($nomPartie, $nomJoueur, $prise);
        //updatePriseOk($nomJoueur);
    }

    if ($tourProchainJoueur == $joueurs[0]) {
        updateEtatPartie("chien", $nomPartie);
        updateTour($nomPartie, $nomJoueur);
        $_SESSION["etat"] = "chien";
    }
    else
        updateTour($nomPartie, $tourProchainJoueur);
}

