<?php
session_start();

require_once('../model/model_gestionUtilisateur.php');
require_once('../model/model_gestionParties.php');

$resultat = new stdClass();

$joueurs = $_SESSION["joueurs"];
$nbJoueurs = $_SESSION['nbJoueurs'];

$bool = true;
for ($i = 1; $i < 3; ++$i) {
    $resultReq = getUser($joueurs[$i]);
    $joueur = $resultReq->fetch();
    if (!$joueur["RECUP_CARTES"]) {
        $bool = false;
        break;
    }
}

if ($bool)
    updateEtatPartie("prise", $_SESSION["nomPartie"]);

$resultat->nbJoueurs = $_SESSION["nbJoueurs"];
$resultat->nomPartie = $_SESSION["nomPartie"];
$resultat->isDistributionOk = $bool;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);

