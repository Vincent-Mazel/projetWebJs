<?php
session_start();

require_once('../model/model_gestionUtilisateur.php');

$resultat = new stdClass();
$resultat->etat = $_SESSION["etat"];

$resultat->afficherModal = false;

if ("distributionCartes" == $_SESSION["etat"]) {
    $resultat->afficherModal = true;
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);
}
else {
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultat);

    if ($_GET["boutonMenuPrincipal"])
        $_SESSION["etat"] = "menu";
    else if ($_GET["boutonDeconnexion"])
        require("../deconnexion.php");
}

