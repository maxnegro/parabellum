<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * ParaBellumLudo implementation : © <Your name here> <Your email address here>
 * 
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * material.inc.php
 *
 * ParaBellumLudo game material description
 *
 * Here, you can describe the material of your game with PHP variables.
 *   
 * This file is loaded in your game logic class constructor, ie these variables
 * are available everywhere in your game logic code.
 *
 */


/*

Example:

$this->card_types = array(
    1 => array( "card_name" => ...,
                ...
              )
);

*/
$this->provinces = array(
  1 => array(
    "name" => "Baetica",
    "support"  => 2,
    "hasDocks" => true,
  ),
  2 => array(
    "name" => "Lusitania",
    "support" => 2,
    "hasDocks" => true,
  ),
  3 => array(
    "name" => "Tarraconensis",
    "support" => 2,
    "hasDocks" => true,
  ),
  4 => array(
    "name" => "Aquitania",
    "support" => 2,
    "hasDocks" => true,
  ),
);




