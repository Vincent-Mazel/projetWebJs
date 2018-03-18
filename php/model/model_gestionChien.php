<?php
require_once('model_getBd.php');

function getChien($nomPartie) {
    $db = getBd();

    $query = 'SELECT * FROM CHIEN WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();

    return $stmt;
}

function updateJoueurChien ($nomPartie, $nomJoueur) {
    $db = getBd();

    $query = 'UPDATE CHIEN SET JOUEUR = :nomJoueur WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomJoueur',$nomJoueur);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}

function deleteChien ($nomPartie) {
    $db = getBd();

    $query = 'DELETE FROM CHIEN WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}

function insertCarteChien ($nomPartie, $joueur, $carte) {
    $db = getBd();

    $query = 'INSERT INTO CHIEN (NOM_PARTIE, JOUEUR, CARTE) VALUES (:nomPartie, :joueur, :carte)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':carte',$carte);
    $stmt->execute();
}
