<?php
session_start();

require_once("../model/model_gestionCartes.php");

deletePaquet($_SESSION["nomPartie"]);