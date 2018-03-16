<?php
require_once('model_getBd.php');

function addPartie($nomPartie, $joueur1, $nbJoueurs) {
    $db = getBd();

    $query = 'INSERT INTO PARTIE (NOM_PARTIE, JOUEUR1, NB_JOUEURS) VALUES (:nomPartie, :joueur1, :nbjoueurs)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':joueur1',$joueur1);
    $stmt->bindParam(':nbjoueurs',$nbJoueurs);
    $stmt->execute();

    return $stmt;
}

function getAllParties() {
    $db = getBd();

    $query = 'SELECT * FROM PARTIE';
    $stmt = $db->prepare($query);
    $stmt->execute();

    return $stmt;
}

function getPartieByPlayer($joueur) {
    $db = getBd();

    $query = 'SELECT * FROM PARTIE WHERE JOUEUR1 = :joueur1 OR JOUEUR2 = :joueur2 OR JOUEUR3 = :joueur3 OR JOUEUR4 = :joueur4 OR JOUEUR5 = :joueur5';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':joueur1',$joueur);
    $stmt->bindParam(':joueur2',$joueur);
    $stmt->bindParam(':joueur3',$joueur);
    $stmt->bindParam(':joueur4',$joueur);
    $stmt->bindParam(':joueur5',$joueur);
    $stmt->execute();

    return $stmt;
}

function getPartieByName($nomPartie) {
    $db = getBd();

    $query = 'SELECT * FROM PARTIE WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();

    return $stmt;
}

function deletePartie ($nomPartie) {
    $db = getBd();

    $query = 'DELETE FROM PARTIE WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}

function updatePartie ($joueur1, $joueur2, $joueur3, $joueur4, $joueur5, $nomPartie, $nbJoueursCo) {
    $db = getBd();

    $query = 'UPDATE PARTIE SET JOUEUR1 = :joueur1, JOUEUR2 = :joueur2, JOUEUR3 = :joueur3, JOUEUR4 = :joueur4, JOUEUR5 = :joueur5, NB_JOUEURS_CO = :nbJoueursCo WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':joueur1',$joueur1);
    $stmt->bindParam(':joueur2',$joueur2);
    $stmt->bindParam(':joueur3',$joueur3);
    $stmt->bindParam(':joueur4',$joueur4);
    $stmt->bindParam(':joueur5',$joueur5);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->bindParam(':nbJoueursCo',$nbJoueursCo);
    $stmt->execute();
}

function addJoueur2 ($joueur, $nomPartie, $nbJoueurs) {
    $db = getBd();

    $query = 'UPDATE PARTIE SET JOUEUR2 = :joueur, NB_JOUEURS_CO = :nbJoueurs WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':nbJoueurs',$nbJoueurs);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}

function addJoueur3 ($joueur, $nomPartie, $nbJoueurs) {
    $db = getBd();

    $query = 'UPDATE PARTIE SET JOUEUR3 = :joueur, NB_JOUEURS_CO = :nbJoueurs WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':nbJoueurs',$nbJoueurs);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}

function addJoueur4 ($joueur, $nomPartie, $nbJoueurs) {
    $db = getBd();

    $query = 'UPDATE PARTIE SET JOUEUR4 = :joueur, NB_JOUEURS_CO = :nbJoueurs WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':nbJoueurs',$nbJoueurs);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}

function addJoueur5 ($joueur, $nomPartie, $nbJoueurs) {
    $db = getBd();

    $query = 'UPDATE PARTIE SET JOUEUR5 = :joueur, NB_JOUEURS_CO = :nbJoueurs WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':joueur',$joueur);
    $stmt->bindParam(':nbJoueurs',$nbJoueurs);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}

function updateEtatPartie ($nouvelEtat, $nomPartie) {
    $db = getBd();

    $query = 'UPDATE PARTIE SET ETAT_PARTIE = :etatPartie WHERE NOM_PARTIE = :nomPartie';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':etatPartie',$nouvelEtat);
    $stmt->bindParam(':nomPartie',$nomPartie);
    $stmt->execute();
}
