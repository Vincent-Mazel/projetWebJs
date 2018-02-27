<?php

function getDb() {
    try {
        //Connexion à la base de données.
        $dsn = 'mysql:host=mysql-mrvincent13.alwaysdata.net;dbname=mrvincent13_tarotonlinebd';
        $db = new PDO($dsn, '144378', '1234');
        // Codage de caractères.
        $db->exec('SET CHARACTER SET utf8');
        // Gestion des erreurs sous forme d'exceptions.
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $db;
    }
    catch(Exception $e)
    {
        //Affichage de l'erreur
        die('Erreur : '.$e->getMessage());
    }
}