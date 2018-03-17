<?php
require_once('model_getBd.php');

function getPrise ($nomPartie) {
    $db = getBd();

    $query = 'SELECT * FROM PRISE WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();

    return $stmt;
}

function insertPrise ($nomPartie, $joueur, $valeur) {
    $db = getBd();

    $query = 'INSERT INTO PRISE (NOM_PARTIE, JOUEUR, VALEUR) VALUES (:nomPartie, :joueur, :valeur)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':valeur',$valeur);
    $stmt->execute();
}

function updatePrise ($nomPartie, $joueur, $valeur) {
    $db = getBd();

    $query = 'UPDATE PRISE SET JOUEUR = :joueur, VALEUR = :valeur WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':valeur',$valeur);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}
