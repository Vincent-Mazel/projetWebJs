<?php
session_start();

class Hand
{
    private $_cartes = array();

    public function genererMain ($nomCartes) {
        foreach ($nomCartes as $c) {
            $carte = new Carte();
            $carte->genererCarte($c);
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
        $i = 0;
        foreach ($this->_cartes as $carte) {
            if ($valeurCarte < $carte->getValeur())
                $cartesJouables[] = $i;
            $i += 1;
        }

        return $cartesJouables;
    }

    public function getCartesJouablesAtoutEtAutreCouleur ($couleur) {
        $cartesJouables = [];
        $i = 0;
        foreach ($this->_cartes as $carte) {
            if ($carte->getCouleur() == $couleur)
                $cartesJouables[] = $i;
            $i += 1;
        }

        return $cartesJouables;
    }

    public function getPresenceAtout () {
        $carteJouables = [];
        $i = 0;
        foreach ($this->_cartes as $carte) {
            if ("Atout" == $carte->getCouleur())
                $carteJouables[] = $i;
            $i += 1;
        }

        return $carteJouables;
    }
}