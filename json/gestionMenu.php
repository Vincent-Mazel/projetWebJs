<?php
session_start();

//$resultat = new stdClass();

if (isset($_POST["creePartie"]))
    $_SESSION["etat"] = "créationPartie";

else if (isset($_POST["rejoindrePartie"]))
    $_SESSION["etat"] = "recherchePartie";

else if (isset($_POST["stats"]))
    $_SESSION["etat"] = "consultationStats";

//$resultat->etat = $_SESSION['etat'];

/*header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);*/