<?php
session_start();

require_once ("../model/model_gestionPli.php");

$resultat = new stdClass();
$resultat->isErreur = false;

$cartePost = $_POST["carte"];
$carte = new Carte();
$carte->genererCarte($cartePost);

$mainSession = $_SESSION["main"];
$main = new Hand();
$main->genererMain($mainSession);

$nomPartie = $_SESSION["nomPartie"];

$joueurs = $_SESSION["joueurs"];
$nbJoueurs = sizeof($joueurs);
$nomJoueur = $_SESSION["username"];

$resultReq = getPliEnCours($nomPartie);

$isCarte = false;
$cartesPli = array();

while ($pli = $resultReq->fetch()) {
    $isCarte = true;
    $carteReq = new Carte();
    $carteReq->genererCarte($pli["CARTE"]);
    $cartesPli[] = $carteReq;
}

if (!$test)
    insertCartePli($nomPartie, $nomJoueur, $carte->getNom());
else {
    if ("Excuse" == $carte->getNom()) {
        if (sizeof($main->getCartes()) <= 2) {
            $resultat->isErreur = true;
            $resultat->cartesJouables = "Aie aie aie, n'oublie pas cette règle fondamentale du Tarot stipulant que l'excuse ne se joue pas en dernier jeune homme !";
        }
        else {
            insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

            $placeCarte = $main->getPlaceCarte($carte->getNom());
            $resultat->place = $placeCarte;

            unset($_SESSION["main"][$placeCarte]);
            $_SESSION["main"] = array_values($_SESSION["main"]);

            $main->supprimerCarte($placeCarte);

        }
    }
    else if ($cartesPli[0]->getCouleur() == $carte->getCouleur()) {
        $plusGrandAtout = $cartesPli[0];
        foreach ($cartesPli as $cartePliAtout) {
            if ($cartePliAtout->getValeur() > $plusGrandAtout->getValeur())
                $plusGrandAtout = $cartePliAtout;
        }

        if (("Atout" == $carte->getCouleur()) && ($carte->getValeur() < $plusGrandAtout->getValeur())) {
            $cartesJouables = $main->getCarteJouablesAtouts($plusGrandAtout->getValeur());
            if (empty($cartesJouables)) {
                insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

                $placeCarte = $main->getPlaceCarte($carte->getNom());
                $resultat->place = $placeCarte;

                unset($_SESSION["main"][$placeCarte]);
                $_SESSION["main"] = array_values($_SESSION["main"]);

                $main->supprimerCarte($placeCarte);
            }
            else {
                $resultat->isErreur = true;
                $resultat->messageErreur = "Ouvre les yeux voyons ! Tu possèdes des atouts bien plus puissants que ça !";
                $resultat->cartesJouables = $cartesJouables;
            }
        }
        else {
            insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

            $placeCarte = $main->getPlaceCarte($carte->getNom());
            $resultat->place = $placeCarte;

            unset($_SESSION["main"][$placeCarte]);
            $_SESSION["main"] = array_values($_SESSION["main"]);

            $main->supprimerCarte($placeCarte);
        }
    }
    else {
        if ("Atout" == $carte->getCouleur()) {
            $cartesJouables = $main->getCartesJouablesAtoutEtAutreCouleur($cartesPli[0]->getCouleur());

            if (empty($cartesJouables)) {
                insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

                $placeCarte = $main->getPlaceCarte($carte->getNom());
                $resultat->place = $placeCarte;

                unset($_SESSION["main"][$placeCarte]);
                $_SESSION["main"] = array_values($_SESSION["main"]);

                $main->supprimerCarte($placeCarte);
            }
            else {
                $resultat->isErreur = true;
                $resultat->messageErreur = "Alors comme ça on essaie de jouer un atout alors qu'on a encore dans sa main la couleur demandée ? Tu es une mauvaise personne ...";
                $resultat->cartesJouables = $cartesJouables;
            }
        }
        else if ((("Coeur" == $carte->getCouleur()) || ("Pique" == $carte->getCouleur()) || ("Trefle" == $carte->getCouleur()) || ("Carreau" == $carte->getCouleur())) && ("Atout" == $cartesPli[0])) {
            $cartesJouables = $main->getPresenceAtout();

            if (empty($cartesJouables)) {

            }
            else {
                $resultat->isErreur = true;
                $resultat->messageErreur = "Eh bien je ne te dis pas bravo ... Tu essaies de conserver en douce tes atouts et tu pensais passer inpaerçu ! Tu es vraiment un gros déglingo !";
                $resultat->cartesJouables = $cartesJouables;
            }
        }
        else {
            $cartesJouables = $main->getPresenceAtout();
            $cartesJouables += $main->getCartesJouablesAtoutEtAutreCouleur($cartesPli[0]);

            if (empty($cartesJouables)) {
                insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

                $placeCarte = $main->getPlaceCarte($carte->getNom());
                $resultat->place = $placeCarte;

                unset($_SESSION["main"][$placeCarte]);
                $_SESSION["main"] = array_values($_SESSION["main"]);

                $main->supprimerCarte($placeCarte);
            }
            else {
                $resultat->isErreur = true;
                $resultat->messageErreur = "Ah beh très bien ! Au lieu de joueur la couleur ou même de joueur un atout, tu décides carrément de changer au couleur ! Tu t'es trompé de jeu toi, c'est pas possible !";
                $resultat->cartesJouables = $cartesJouables;
            }
        }
    }
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);



