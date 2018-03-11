<?php
session_start();

require('../model/model_connexionEtInscription.php');

$resultat = new stdClass();
$resultat->erreur = false;

$nomUtilisateur = $_POST["nomUtilisateur"];
$mdp = $_POST["mdp"];

$resultReq = getUser($nomUtilisateur);
$utilisateur = $resultReq->fetch();
$mdpReq = $utilisateur["PASSWORD"];

if (empty($nomUtilisateur) && empty($mdp)) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Qu'est ce que c'est que ces simagrées, t'as oublié de renseigner tes informations !";
}
else if (empty($nomUtilisateur)) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Fais un effort voyons ! Renseigne ton nom d'utilisateur !";
}
else if (empty($mdp) ) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Ah beh très bien, on a oublié le mot de passe à ce que je vois !";
}
else if (0 == $resultReq->rowCount()) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Ola manant ! Il semblerait que tu te sois trompé dans ton nom de compte, fais attention !";
}
else if ($mdp != $mdpReq) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Aie aie aie, ce n'est pas le bon mot de passe ! Tu essaies de hacker le compte, c'est ça ?";
}
else if ($utilisateur["IS_CONNECTE"]) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Une seule personne à la fois voyons ! Quelqu'un est déjà connecté sur ce compte !";
}
else {
    $_SESSION["etat"] = "menu";
    $_SESSION["username"] = $nomUtilisateur;

    updateEtatConnexion($nomUtilisateur, true);
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);
