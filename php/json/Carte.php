<?php
session_start();

class Carte
{
    private $_nom;
    private $_valeur;
    private $_couleur;
    private $_nomJoueur;

    public function genererCarte ($nom, $nomJoueur) {
        $this->_nom = $nom;
        $this->_nomJoueur = $nomJoueur;
        if ("Excuse" !== $nom) {
            if ("0" === substr($nom, 1, 1) || "1" === substr($nom,1, 1) || "2" === substr($nom,1, 1) || "3" === substr($nom,1, 1) || "4" === substr($nom,1, 1)
                || "5" === substr($nom,1, 1) || "6" === substr($nom,1, 1) || "7" === substr($nom,1, 1) || "8" === substr($nom,1, 1) || "9" === substr($nom,1, 1)) {
                $this->_valeur = substr($nom,0, 2);
                $this->_couleur = substr($nom,2, strlen($nom) - 2);
            }
            else if ("V" === substr($nom,0, 1) || "C" === substr($nom,0, 1) || "D" === substr($nom,0, 1) || "R" === substr($nom,0, 1)) {
                switch (substr($nom,0, 1)) {
                    case "V" :
                        $this->_valeur = "11";
                        break;
                    case "C" :
                        $this->_valeur = "12";
                        break;
                    case "D" :
                        $this->_valeur = "13";
                        break;
                    case "R" :
                        $this->_valeur = "14";
                        break;
                }
                $this->_couleur = substr($nom,1, strlen($nom) - 1);
            }
            else {
                $this->_valeur = substr($nom,0, 1);
                $this->_couleur = substr($nom,1, strlen($nom) - 1);
            }

            switch ($this->_couleur) {
                case "A" :
                    $this->_couleur = "Atout";
                    break;
                case "CA" :
                    $this->_couleur = "Carreau";
                    break;
                case "CO" :
                    $this->_couleur = "Coeur";
                    break;
                case "P" :
                    $this->_couleur = "Pique";
                    break;
                case "T" :
                    $this->_couleur = "Trefle";
                    break;
            }
        }
        else {
            $this->_valeur = "Excuse";
            $this->_couleur = "Atout";
        }
    }

    public function getNom() {
        return $this->_nom;
    }

    public function getValeur() {
        return $this->_valeur;
    }

    public function getCouleur() {
        return $this->_couleur;
    }

    public function toString() {
        if ("Excuse" == $this->_couleur)
            return "l'excuse";
        else if ("Atout" == $this->_couleur)
            return "le " . $this->_valeur . "d'atout";
        else if ("13" == $this->_valeur)
            return "la dame de " . $this->_couleur;
        else if ("11" == $this->_valeur)
            return "le valet de " . $this->_couleur;
        else if ("12" == $this->_valeur)
            return "le cavalier de " . $this->_couleur;
        else if ("14" == $this->_valeur)
            return "le roi de " . $this->_couleur;
        else
            return "le " . $this->_valeur . "de " . $this->_couleur;
    }
}