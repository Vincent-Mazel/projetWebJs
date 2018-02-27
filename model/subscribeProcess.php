<?php
require('databaseController.php');

// Vérifie que le nom d'utilisateur n'est pas déja utilisé.
function verificationUsername($username)
{
    $db = getDb();
    $query = 'SELECT USERNAME FROM USER WHERE USERNAME = :username';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username',$username);
    $stmt->execute();

    return $stmt;
}

//Vérifie que le bon mot de passe a été rentré.
function getPassword($email)
{
    $db = getDb();

    $query = 'SELECT MDP FROM USER WHERE USERNAME = :username';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username',$username);
    $stmt->execute();

    return $stmt;
}

//Ajout d'un utilisateur dans la base de données après l'inscription
function addUser($username, $pass)
{
    $db = getDb();

    $query = 'INSERT INTO USER (USERNAME, PASSWORD, DATE_REGISTER) VALUES (:username, :pass, NOW())';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username',$username);
    $stmt->bindParam(':pass',$pass);
    $stmt->execute();

    return $stmt;
}