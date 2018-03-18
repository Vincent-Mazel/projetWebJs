<?php
session_start();

require_once ("../model/model_gestionChien.php");

deleteChien($_SESSION["nomPartie"]);