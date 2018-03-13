<?php
session_start();

$resultat = new stdClass();
$resultat->isConnecte = false;
if (isset($_SESSION["username"]))
    $resultat->isConnecte = true;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);

