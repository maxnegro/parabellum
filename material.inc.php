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
    'name' => 'Britannia',
    'support'  => 1,
    'hasDocks' => true,
    'landBorders' => [2],
    'seaBorders' => [2,6]
  ),
  2 => array(
    'name' => 'Belgica',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [3,30],
    'seaBorders' => [1,30,3]
  ),
  3 => array(
    'name' => 'Lugdunensis',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [2,4,5,29,30],
    'seaBorders' => [2,4]
  ),
  4 => array(
    'name' => 'Aquitania',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [3,5,6],
    'seaBorders' => [3,6]
  ),
  5 => array(
    'name' => 'Narbonensis',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [29,3,4,6,31],
    'seaBorders' => [31,6,9]
  ),
  6 => array(
    'name' => 'Tarraconensis',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [4,5,7,8],
    'seaBorders' => [1,9,5,7,8]
  ),
  7 => array(
    'name' => 'Lusitania',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [6,8],
    'seaBorders' => [6,8]
  ),
  8 => array(
    'name' => 'Baetica',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [6,7,9],
    'seaBorders' => [6,7,9]
  ),
  9 => array(
    'name' => 'Mauretania',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [8,10],
    'seaBorders' => [8,10,6,5,32]
  ),
  10 => array(
    'name' => 'Africa Proconsularis',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [9,11],
    'seaBorders' => [9,11,31,33]
  ),
  11 => array(
    'name' => 'Cyrenaica et Creta',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [10,12],
    'seaBorders' => [10,12,33]
  ),
  12 => array(
    'name' => 'Aegyptus',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [11,13],
    'seaBorders' => [11,13,33,25]
  ),
  13 => array(
    'name' => 'Arabia Petraea',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [12,14],
    'seaBorders' => [12,14]
  ),
  14 => array(
    'name' => 'Syria et Iudaea',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [13,15,17,18,20],
    'seaBorders' => [13,20]
  ),
  15 => array(
    'name' => 'Mesopotamia',
    'support'  => 2,
    'hasDocks' => false,
    'landBorders' => [14,16,17],
    'seaBorders' => []
  ),
  16 => array(
    'name' => 'Assyria',
    'support'  => 2,
    'hasDocks' => false,
    'landBorders' => [15,17],
    'seaBorders' => []
  ),
  17 => array(
    'name' => 'Armenia',
    'support'  => 2,
    'hasDocks' => false,
    'landBorders' => [14,15,16,18],
    'seaBorders' => []
  ),
  18 => array(
    'name' => 'Cappadocia',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [14,17,19,20,22],
    'seaBorders' => [22]
  ),
  19 => array(
    'name' => 'Galatia',
    'support'  => 3,
    'hasDocks' => false,
    'landBorders' => [18,20,21,22],
    'seaBorders' => []
  ),
  20 => array(
    'name' => 'Lycia et Cilicia',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [14,18,19,21],
    'seaBorders' => [14,21]
  ),
  21 => array(
    'name' => 'Asia',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [19,20,22,24],
    'seaBorders' => [20,24]
  ),
  22 => array(
    'name' => 'Bithynia et Pontus',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [18,19,21,23],
    'seaBorders' => [18,21,23,26]
  ),
  23 => array(
    'name' => 'Thracia',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [22,24,26],
    'seaBorders' => [22,24,26]
  ),
  24 => array(
    'name' => 'Macedonia et Epirus',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [23,25,26,27],
    'seaBorders' => [23,25,27,31]
  ),
  25 => array(
    'name' => 'Achaia',
    'support'  => 1,
    'hasDocks' => true,
    'landBorders' => [24],
    'seaBorders' => [24,12]
  ),
  26 => array(
    'name' => 'Moesia',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [23,24,27,28],
    'seaBorders' => [23,22]
  ),
  27 => array(
    'name' => 'Dalmatia',
    'support'  => 2,
    'hasDocks' => true,
    'landBorders' => [24,26,28,31],
    'seaBorders' => [24,31]
  ),
  28 => array(
    'name' => 'Pannonia',
    'support'  => 3,
    'hasDocks' => false,
    'landBorders' => [26,27,29,31],
    'seaBorders' => []
  ),
  29 => array(
    'name' => 'Raetia',
    'support'  => 3,
    'hasDocks' => false,
    'landBorders' => [28,30,31,5,3],
    'seaBorders' => []
  ),
  30 => array(
    'name' => 'Germania',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [2,3,29],
    'seaBorders' => [2]
  ),
  31 => array(
    'name' => 'Italia',
    'support'  => 3,
    'hasDocks' => true,
    'landBorders' => [5,27,28,29,33],
    'seaBorders' => [27,5,33,32,10,24]
  ),
  32 => array(
    'name' => 'Corsica et Sardinia',
    'support'  => 1,
    'hasDocks' => true,
    'landBorders' => [],
    'seaBorders' => [31,9]
  ),
  33 => array(
    'name' => 'Sicilia',
    'support'  => 1,
    'hasDocks' => true,
    'landBorders' => [31],
    'seaBorders' => [10,11,12,31]
  ),
);

$this->barbarians = array(
  1 => array(
    'name' => 'Hibernia et Caledonia',
    'borders'  => [1],
  ),
  2 => array(
    'name' => 'Germania Magna',
    'borders'  => [28,29,30],
  ),
  3 => array(
    'name' => 'Sarmatia',
    'borders'  => [26,28],
  ),
  4 => array(
    'name' => 'Iberia',
    'borders'  => [17,18],
  ),
  5 => array(
    'name' => 'Regnum Parthicum',
    'borders'  => [15,16,17],
  ),
  6 => array(
    'name' => 'Arabia',
    'borders'  => [13,14,15],
  ),
  7 => array(
    'name' => 'Gaetulia',
    'borders'  => [9,10,11,12],
  ),
);

