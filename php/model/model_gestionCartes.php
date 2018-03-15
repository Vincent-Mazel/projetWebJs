<?php
require('model_getBd.php');

function getEtatTour($nomPartie) {
    $db = getBd();

    $query = 'SELECT ETAT_PARTIE, TOUR FROM PARTIE WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();

    return $stmt;
}

function getPaquet($nomPartie, $joueur) {
    $db = getBd();

    $query = 'SELECT CARTE FROM PAQUET WHERE NOM_PARTIE = :nomPartie AND JOUEUR = :joueur';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->execute();

    return $stmt;
}

function envoiCarteDistribuee ($nomPartie, $nomJoueur, $carte) {
    $db = getBd();

    $query = 'INSERT INTO PAQUET (NOM_PARTIE, CARTE, JOUEUR) WHERE NOM_PARTIE = :nomPartie AND CARTE = :carte AND JOUEUR = :nomJoueur';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':carte',$carte);
    $stmt->bindParam(':nomJoueur',$nomJoueur);
    $stmt->execute();
}