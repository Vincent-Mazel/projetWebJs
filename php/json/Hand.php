<?php
session_start();

require_once ("Carte.php");

class Hand
{
    private $_cartes = array();

    public function genererMain ($nomCartes, $nomJoueur) {
        foreach ($nomCartes as $c) {
            $carte = new Carte();
            $carte->genererCarte($c, $nomJoueur);
            $this->_cartes[] = $carte;
        }
    }

    public function getCartes () {
        return $this->_cartes;
    }

    public function supprimerCarte ($place) {
        unset($this->_cartes[$place]);
        $this->_cartes = array_values($this->_cartes);
    }

    public function getPlaceCarte ($nomCarte) {
        $i = 0;
        while ($nomCarte != ($this->_cartes[$i])->getNom())
            $i += 1;

        return $i;
    }

    public function getCarteJouablesAtouts ($valeurCarte) {
        $cartesJouables = [];

        foreach ($this->_cartes as $carte) {
            if ($valeurCarte < $carte->getValeur())
                $cartesJouables[] = $carte;
        }

        return $cartesJouables;
    }

    public function getCartesJouablesAtoutEtAutreCouleur ($couleur) {
        $cartesJouables = [];

        foreach ($this->_cartes as $carte) {
            if ($carte->getCouleur() == $couleur)
                $cartesJouables[] = $carte;
        }

        return $cartesJouables;
    }

    public function getPresenceAtout () {
        $carteJouables = [];

        foreach ($this->_cartes as $carte) {
            if ("Atout" == $carte->getCouleur())
                $carteJouables[] = $carte;
        }

        return $carteJouables;
    }

    public function isExcuse () {
        $isExcuse = false;
        foreach ($this->_cartes as $carte) {
            if ("Excuse" == $carte->getNom())
                $isExcuse = true;
        }

        return $isExcuse;
    }

    public function addCarte ($carte) {
        $this->_cartes[] = $carte;
    }
}