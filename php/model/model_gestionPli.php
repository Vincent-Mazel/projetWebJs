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

function insertCartePliOk3 ($nomPartie, $joueur, $carte1, $carte2, $carte3) {
    $db = getBd();

    $query = 'INSERT INTO PLI_OK (NOM_PARTIE, JOUEUR, CARTE1, CARTE2, CARTE3) VALUES (:nomPartie, :joueur, :carte1, :carte2, :carte3)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':carte1',$carte1);
    $stmt->bindParam(':carte2',$carte2);
    $stmt->bindParam(':carte3',$carte3);
    $stmt->execute();
}

function insertCartePliOk4 ($nomPartie, $joueur, $carte1, $carte2, $carte3, $carte4) {
    $db = getBd();

    $query = 'INSERT INTO PLI_OK (NOM_PARTIE, JOUEUR, CARTE1, CARTE2, CARTE3, CARTE4) VALUES (:nomPartie, :joueur, :carte1, :carte2, :carte3, :carte4)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':carte1',$carte1);
    $stmt->bindParam(':carte2',$carte2);
    $stmt->bindParam(':carte3',$carte3);
    $stmt->bindParam(':carte4',$carte4);
    $stmt->execute();
}

function insertCartePliOk5 ($nomPartie, $joueur, $carte1, $carte2, $carte3, $carte4, $carte5) {
    $db = getBd();

    $query = 'INSERT INTO PLI_OK (NOM_PARTIE, JOUEUR, CARTE1, CARTE2, CARTE3, CARTE4, CARTE5) VALUES (:nomPartie, :joueur, :carte1, :carte2, :carte3, :carte4, :carte5)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':carte1',$carte1);
    $stmt->bindParam(':carte2',$carte2);
    $stmt->bindParam(':carte3',$carte3);
    $stmt->bindParam(':carte4',$carte4);
    $stmt->bindParam(':carte5',$carte5);
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

function deletePli ($nomPartie) {
    $db = getBd();

    $query = 'DELETE FROM PLI WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}