<?php
require_once('model_getBd.php');

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

function envoiCarteDistribuee ($nomPartie, $carte, $nomJoueur) {
    $db = getBd();

    $query = 'INSERT INTO PAQUET (NOM_PARTIE, CARTE, JOUEUR) VALUES (:nomPartie, :carte, :nomJoueur)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':carte',$carte);
    $stmt->bindParam(':nomJoueur',$nomJoueur);
    $stmt->execute();
}

function envoiCarteChien ($nomPartie, $carte) {
    $db = getBd();

    $query = 'INSERT INTO CHIEN (NOM_PARTIE, CARTE) VALUES (:nomPartie, :carte)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':carte',$carte);
    $stmt->execute();
}