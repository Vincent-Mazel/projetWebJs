<?php
session_start();

$resultat = new stdClass();
$resultat->etat = $_SESSION["etat"];

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);