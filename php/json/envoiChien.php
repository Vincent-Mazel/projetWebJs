<?php
session_start();

require_once ("../model/model_gestionChien.php");
require_once ("../model/model_gestionParties.php");
require_once ("Hand.php");
require_once ("Carte.php");

$nomPartie = $_SESSION["nomPartie"];
$chienStr = $_POST["chien"];

//$chien = print_r(str_word_count($chienStr, 1, '0123456789'));

deleteChien($nomPartie);

foreach ((array)$chien as $carte) {
    echo $carte;
    insertCarteChien($nomPartie, $_SESSION["username"], $carte);
}


updateEtatPartie("enJeu", $nomPartie);
updateTour($nomPartie, $_SESSION["joueurs"][1]);