<?php
session_start();

require('../model/model_connexionEtInscription.php');

$resultat = new stdClass();
$resultat->etat = $_SESSION["etat"];

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);

if ($_GET["boutonMenuPrincipal"])
    $_SESSION["etat"] = "menu";
else if ($_GET["boutonDeconnexion"]) {
    updateEtatConnexion($_SESSION["username"], false);

    $_SESSION = array();

    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    session_destroy();
}