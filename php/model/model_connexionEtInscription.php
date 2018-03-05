<?php
require('model_getBd.php');

// Récupère les données concernant un utilisateur en fonction de son nom.
function getUser($username)
{
    $db = getBd();

    $query = 'SELECT USERNAME, PASSWORD FROM USER WHERE USERNAME = :username';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username',$username);
    $stmt->execute();

    return $stmt;
}

//Ajout d'un utilisateur dans la base de données après l'inscription
function addUser($username, $pass)
{
    $db = getBd();

    $query = 'INSERT INTO USER (USERNAME, PASSWORD) VALUES (:username, :pass)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username',$username);
    $stmt->bindParam(':pass',$pass);
    $stmt->execute();

    return $stmt;
}