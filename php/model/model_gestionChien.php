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
