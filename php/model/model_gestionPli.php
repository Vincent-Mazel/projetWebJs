<?php
require_once('model_getBd.php');

function insertCartePli ($nomPartie, $joueur, $carte) {
    $db = getBd();

    $query = 'INSERT INTO PLI (NOM_PARTIE, JOUEUR, CARTE) VALUES (:nomPartie, :joueur, :carte)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':carte',$carte);
    $stmt->execute();
}

function getPliEnCours ($nomPartie) {
    $db = getBd();

    $query = 'SELECT * FROM PLI WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();

    return $stmt;
}