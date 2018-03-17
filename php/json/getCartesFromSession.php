<?php
session_start();

$resultat = new stdClass();
$resultat->cartes = $_SESSION["main"];

$nomJoueur = $_SESSION["username"];
$joueurs = $_SESSION["joueurs"];

$resultat->isJoueur1 = false;
$k = 1;
foreach ((array) $joueurs as $joueur) {
    if ($joueur == $nomJoueur && $k == 1)
        $resultat->isJoueur1 = true;
    $k += 1;
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);

/*echo "Nom joueur : " . $nomJoueur . "<br>";
foreach ($joueurs as $j)
    echo "Joueur : " . $joueur . "<br>";
echo "Num joueur : " . $k;*/