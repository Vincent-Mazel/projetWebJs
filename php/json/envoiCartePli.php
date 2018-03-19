<?php
require_once ("Hand.php");
require_once ("Carte.php");
session_start();

require_once ("../model/model_gestionPli.php");
require_once ("../model/model_gestionParties.php");

$resultat = new stdClass();
$resultat->isErreur = false;

$joueurs = $_SESSION["joueurs"];
$nbJoueurs = sizeof($joueurs);
$nomJoueur = $_SESSION["username"];

$m = 1;
foreach ($joueurs as $joueur) {
    if ($joueur == $nomJoueur)
        $numJoueur = $m;
    $m += 1;
}

$cartePost = $_POST["carte"];
$carte = new Carte();
$carte->genererCarte($cartePost, $nomJoueur);

$main = $_SESSION["main"];

$nomPartie = $_SESSION["nomPartie"];

$resultReq = getPliEnCours($nomPartie);

$isCarte = false;
$cartesPli = array();

while ($pli = $resultReq->fetch()) {
    $isCarte = true;
    $carteReq = new Carte();
    $carteReq->genererCarte($pli["CARTE"], $pli["JOUEUR"]);
    $cartesPli[] = $carteReq;
}

echo "Carte click : " . $carte->getNom() . "<br>" . "Main : " . $main->toString() . "<br>";

echo "Cartes du pli : " . "<br>";
foreach ($cartesPli as $c)
    echo "Couleur : " . $c->getCouleur() . ", valeur : " . $c->getValeur();

if (sizeof($main->getCartes()) == 1) {
    insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

    $placeCarte = $main->getPlaceCarte($carte->getNom());
    $placeCarte->carteJouee = $placeCarte;
    unset($_SESSION["main"][$placeCarte]);
    $_SESSION["main"] = array_values($_SESSION["main"]);

    $main->supprimerCarte($placeCarte);

    if (sizeof($cartesPli) == $nbJoueurs - 1) {
        $carteGagnante = $cartesPli[0];
        $cartesPli[] = $carte;
        $cartes = [];
        $cartes[] = $cartesPli[0];
        $k = 1;
        while ($k < sizeof($cartesPli)) {
            $cartes[] = $carte->getNom();
            if ((($carteGagnante->getCouleur() == $cartesPli[$k]->getCouleur()) && ($carteGagnante->getValeur() < $cartesPli[$k]->getValeur()))
                || (($carteGagnante->getCouleur() != "Atout") && ($cartesPli[$k]->getCouleur() == "Atout")))
                $carteGagnante = $cartesPli[$k];
            $cartes[] = $cartesPli[$k]->getNom();
            $k += 1;
        }

        if ("3" == $nbJoueurs)
            insertCartePliOk3($nomPartie, $carteGagnante["JOUEUR"], $cartes[0], $cartes[1], $cartes[2]);
        else if ("4" == $nbJoueurs)
            insertCartePliOk4($nomPartie, $carteGagnante["JOUEUR"], $cartes[0], $cartes[1], $cartes[2], $cartes[3]);
        else
            insertCartePliOk5($nomPartie, $carteGagnante["JOUEUR"], $cartes[0], $cartes[1], $cartes[2], $cartes[3], $cartes[4]);

        deletePli($nomPartie);

        updateEtatPartie("finPartie", $nomPartie);
        updateTour($nomPartie, "fin");
    }
}
else {
    if ((sizeof($main->getCartes()) == 2) && $main->isExcuse()) {
        if ("Excuse" != $carte->getValeur()) {
            $resultat->isErreur = true;
            $resultat->cartesJouables = "Aie aie aie, n'oublie pas cette règle fondamentale du Tarot stipulant que l'excuse ne se joue pas en dernier jeune homme !";
        }
        else {
            insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

            $placeCarte = $main->getPlaceCarte($carte->getNom());
            $placeCarte->carteJouee = $placeCarte;
            unset($_SESSION["main"][$placeCarte]);
            $_SESSION["main"] = array_values($_SESSION["main"]);

            $main->supprimerCarte($placeCarte);
        }
    }
    else {
        if (!$test) {
            insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

            $placeCarte = $main->getPlaceCarte($carte->getNom());
            unset($_SESSION["main"][$placeCarte]);
            $_SESSION["main"] = array_values($_SESSION["main"]);

            $main->supprimerCarte($placeCarte);
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
                    $placeCarte->carteJouee = $placeCarte;
                    unset($_SESSION["main"][$placeCarte]);
                    $_SESSION["main"] = array_values($_SESSION["main"]);

                    $main->supprimerCarte($placeCarte);
                }
                else {
                    $resultat->isErreur = true;

                    if ("1" == sizeof($cartesJouables))
                        $messageErreur = "Tu peux jouer cette carte par exemple : ";
                    else
                        $messageErreur = "Tu peux jouer ces cartes par exemple : ";

                    foreach ($cartesJouables as $c)
                        $messageErreur .= $c->toString() . ", ";
                    $resultat->messageErreur = "Ouvre les yeux voyons ! Tu possèdes des atouts bien plus puissants que ça !";
                    $resultat->cartesJouables = $messageErreur;
                }
            }
            else {
                insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

                $placeCarte = $main->getPlaceCarte($carte->getNom());
                $placeCarte->carteJouee = $placeCarte;
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
                    $placeCarte->carteJouee = $placeCarte;
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
                    insertCartePli($nomPartie, $nomJoueur, $carte->getNom());

                    $placeCarte = $main->getPlaceCarte($carte->getNom());
                    $placeCarte->carteJouee = $placeCarte;
                    unset($_SESSION["main"][$placeCarte]);
                    $_SESSION["main"] = array_values($_SESSION["main"]);

                    $main->supprimerCarte($placeCarte);
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
                    $placeCarte->carteJouee = $placeCarte;
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
    if (sizeof($cartesPli) == $nbJoueurs - 1) {
        $carteGagnante = $cartesPli[0];
        $cartesPli[] = $carte;
        $cartes = [];
        $cartes[] = $cartesPli[0];
        $k = 1;
        while ($k < sizeof($cartesPli)) {
            $cartes[] = $carte->getNom();
            if ((($carteGagnante->getCouleur() == $cartesPli[$k]->getCouleur()) && ($carteGagnante->getValeur() < $cartesPli[$k]->getValeur()))
                || (($carteGagnante->getCouleur() != "Atout") && ($cartesPli[$k]->getCouleur() == "Atout")))
                $carteGagnante = $cartesPli[$k];
            $cartes[] = $cartesPli[$k]->getNom();
            $k += 1;
        }

        if ("3" == $nbJoueurs)
            insertCartePliOk3($nomPartie, $carteGagnante["JOUEUR"], $cartes[0], $cartes[1], $cartes[2]);
        else if ("4" == $nbJoueurs)
            insertCartePliOk4($nomPartie, $carteGagnante["JOUEUR"], $cartes[0], $cartes[1], $cartes[2], $cartes[3]);
        else
            insertCartePliOk5($nomPartie, $carteGagnante["JOUEUR"], $cartes[0], $cartes[1], $cartes[2], $cartes[3], $cartes[4]);

        deletePli($nomPartie);
        updateTour($nomPartie, $carteGagnante["JOUEUR"]);
    }
    else if ($numJoueur == $nbJoueurs)
        updateTour($nomPartie, $joueurs[0]);
    else
        updateTour($nomPartie, $joueurs[$numJoueur + 1]);
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);



