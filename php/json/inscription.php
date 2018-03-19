<?php
session_start();

require('../model/model_gestionUtilisateur.php');
require_once ("Hand.php");
require_once ("Carte.php");

$resultat = new stdClass();
$resultat->erreur = false;

$nomUtilisateur = $_POST["nomUtilisateur"];
$mdp1 = $_POST["mdp1"];
$mdp2 = $_POST["mdp2"];

$resultReq = getUser($nomUtilisateur);

if (empty($nomUtilisateur) && empty($mdp1) && empty($mdp2)) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Qu'est ce que c'est que ces simagrées, t'as oublié de renseigner tes informations !";
}
else if (empty($nomUtilisateur) && empty($mdp1)) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Hop hop hop, le nom d'utilisateur et le premier mot de passe, c'est en option ?";
}
else if (empty($nomUtilisateur) && empty($mdp2)) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Hop hop hop, le nom d'utilisateur et le second mot de passe, c'est en option ?";
}
else if ("recupCartes" == $nomUtilisateur) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Ce pseudo est malheureusement interdit pour des raisons que je ne t'expliquerai pas jeune fou !";
}
else if (empty($mdp1) && empty($mdp2)) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Tu nous fais quoi là ? Il me faut le nom de compte ET un mot de passe ! C'est un prank où quoi ? Où est ibra ?";
}
else if (empty($nomUtilisateur)) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Fais un effort voyons ! Renseigne ton nom d'utilisateur !";
}
else if (empty($mdp1) ) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Ah beh très bien, on a oublié le premier mot de passe à ce que je vois !";
}
else if (empty($mdp2) ) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Ah beh très bien, on a oublié le second mot de passe à ce que je vois !";
}
else if ($resultReq->rowCount() > 0) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Ce pseudo est déjà pris jeune scarabée, il va malheureusement m'en falloir un autre !";
}
else if ($mdp1 != $mdp2) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Fais un peu attention, les deux mots de passe que tu as renseignés sont différents !";
}
else {
    addUser($nomUtilisateur, $mdp1);
    $resultat->messageInscription = "Bien joué à toi camarade ! Tu peux désormais rejoindre la grande famille des joueurs de Tarot, pour peu que tu te connectes.";
    $_SESSION["etat"] = "menu";
    $_SESSION["username"] = $nomUtilisateur;
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);
