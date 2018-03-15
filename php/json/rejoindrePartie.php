<?php
session_start();

require('../model/model_gestionParties.php');

$resultat = new stdClass();
$resultat->erreur = false;
$resultat->isJouable = false;

$nomPartie = $_GET["nomPartie"];
$nomJoueur = $_SESSION["username"];

$resultReq = getPartieByName($nomPartie);
$partie = $resultReq->fetch();

if (empty($partie)) {
    $resultat->erreur = true;
    $resultat->message = "Aie aie aie ... Il semblerait que la partie aie été supprimée. Choisissez-en une autre !";
    $resultat->nomPartie = $_GET["nomPartie"];

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
else if ($partie["NB_JOUEURS_CO"] == $partie["NB_JOUEURS"]) {
    $resultat->erreur = true;
    $resultat->message = "Aie aie aie ... Il semblerait que la partie soit pleine. Choisissez-en une autre !";

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
else {
    $nbJoueursCo = $partie["NB_JOUEURS_CO"];
    switch ($nbJoueursCo) {
        case 1:
            addJoueur2($nomJoueur, $nomPartie, $nbJoueursCo + 1);
            break;
        case 2:
            addJoueur3($nomJoueur, $nomPartie, $nbJoueursCo + 1);
            break;
        case 3:
            addJoueur4($nomJoueur, $nomPartie, $nbJoueursCo + 1);
            break;
        case 4:
            addJoueur5($nomJoueur, $nomPartie, $nbJoueursCo + 1);
            break;
    }

    $_SESSION["etat"] = "attenteJoueursRejoindre";
    $_SESSION["nomPartie"] = $nomPartie;
    $_SESSION["nbJoueurs"] = $partie["NB_JOUEURS"];
    $_SESSION["numJoueur"] = $nbJoueursCo + 1;

    $resultat->etat = $_SESSION["etat"];

    $nbJoueursCoOk = $nbJoueursCo + 1;
    $resultat->htmlMessage = "Nom de la partie : " . $nomPartie . "<br>" . $nbJoueursCoOk . "/" . $partie["NB_JOUEURS"] . " joueurs connectés"
        . "<br> <br>";

    $k = 1;
    while ($k <= $nbJoueursCo) {
        $resultat->htmlMessage .= "Joueur " . $k . " : " . $partie["JOUEUR" . $k] . '<br>';
        $k += 1;
    }

    $resultat->htmlMessage .= "Joueur " . $nbJoueursCoOk . " : " . $nomJoueur;

    if ($nbJoueursCoOk == $partie["NB_JOUEURS"]) {
        $resultat->isJouable = true;
        $_SESSION["etat"] = "distributionCartes";
        $_SESSION["joueurs"] = array();
        $k = 1;
        while ($k <= $nbJoueursCo) {
            $_SESSION["joueurs"] = $partie["JOUEUR" . $k];
            $k += 1;
        }

    }

    $resultat->nbJoueurs = $partie["NB_JOUEURS"];
    $resultat->numJoueur = $nbJoueursCoOk;

    $resultat->nomPartie = $_SESSION["nomPartie"];
    $resultat->joueurs = $_SESSION["joueurs"];

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}