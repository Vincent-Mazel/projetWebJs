<?php
session_start();

require('../model/model_gestionParties.php');

$resultat = new stdClass();
$resultat->erreur = false;

$nomPartie = $_POST["nomPartie"];
$nbJoueurs = $_POST["nbJoueurs"];
$nomJoueur = $_SESSION["username"];

if (strlen($nomPartie) > 30) {
    $resultat->erreur = true;
    $resultat->messageErreur = "Tout doux jeune aventurier, le nom de ta partie ne doit pas excéder les 30 caractères !";

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
else {
    $resultReq = getAllParties();
    while ($partieReq = $resultReq->fetch()) {
        if ($nomPartie == $partieReq["NOM_PARTIE"]) {
            $resultat->erreur = true;
            $resultat->messageErreur = "Alors oui ... mais non. Ce nom de partie est déjà pris, recreuse toi les méninges jeune fou !";
            break;
        }
    }
    if (!$resultat->erreur) {
        addPartie($nomPartie, $nomJoueur, $nbJoueurs);

        $_SESSION["etat"] = "attenteJoueursCreation";
        $_SESSION["nomPartie"] = $nomPartie;

        $resultat->htmlMessage = "Nom de la partie : " . $nomPartie . "<br>" . "1/" . $nbJoueurs . " joueurs connectés"
            . "<br> <br>" . "Joueur 1 : " . $nomJoueur;
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
