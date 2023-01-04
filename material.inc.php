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
      'name'=>       'Britannia',
      'support'=>    1,
      'docks'=>      [1,2],
      'borders'=>    [2],
  ),
  2 => array(
      'name'=>       'Belgica',
      'support'=>    2,
      'docks'=>      [1],
      'borders'=>    [1,3,30],
  ),
  3 => array(
      'name'=>       'Lugdunensis',
      'support'=>    3,
      'docks'=>      [1],
      'borders'=>    [2,29,30,4,5],
  ),
  4 => array(
      'name'=>       'Aquitania',
      'support'=>    2,
      'docks'=>      [2],
      'borders'=>    [3,5,6],
  ),
  5 => array(
      'name'=>       'Narbonensis',
      'support'=>    3,
      'docks'=>      [4,5],
      'borders'=>    [29,3,31,4,6],
  ),
  6 => array(
      'name'=>       'Tarraconensis',
      'support'=>    3,
      'docks'=>      [2,4],
      'borders'=>    [4,5,7,8],
  ),
  7 => array(
      'name'=>       'Lusitania',
      'support'=>    2,
      'docks'=>      [3],
      'borders'=>    [6,8],
  ),
  8 => array(
      'name'=>       'Baetica',
      'support'=>    2,
      'docks'=>      [3,4],
      'borders'=>    [6,7,9],
  ),
  9 => array(
      'name'=>       'Mauretania',
      'support'=>    2,
      'docks'=>      [3,4],
      'borders'=>    [10,8],
  ),
  10 => array(
      'name'=>       'Africa Proconsularis',
      'support'=>    2,
      'docks'=>      [6],
      'borders'=>    [11,9],
  ),
  11 => array(
      'name'=>       'Cyrenaica et Creta',
      'support'=>    2,
      'docks'=>      [6],
      'borders'=>    [10,12],
  ),
  12 => array(
      'name'=>       'Aegyptus',
      'support'=>    2,
      'docks'=>      [9],
      'borders'=>    [11,13],
  ),
  13 => array(
      'name'=>       'Arabia Petraea',
      'support'=>    2,
      'docks'=>      [9],
      'borders'=>    [12,14],
  ),
  14 => array(
      'name'=>       'Syria et Iudaea',
      'support'=>    3,
      'docks'=>      [9],
      'borders'=>    [13,15,17,18,20],
  ),
  15 => array(
      'name'=>       'Mesopotamia',
      'support'=>    2,
      'docks'=>      [],
      'borders'=>    [14,16,17],
  ),
  16 => array(
      'name'=>       'Assyria',
      'support'=>    2,
      'docks'=>      [],
      'borders'=>    [15,17],
  ),
  17 => array(
      'name'=>       'Armenia',
      'support'=>    2,
      'docks'=>      [],
      'borders'=>    [14,15,16,18],
  ),
  18 => array(
      'name'=>       'Cappadocia',
      'support'=>    3,
      'docks'=>      [11],
      'borders'=>    [14,17,19,20,22],
  ),
  19 => array(
      'name'=>       'Galatia',
      'support'=>    3,
      'docks'=>      [],
      'borders'=>    [18,20,21,22],
  ),
  20 => array(
      'name'=>       'Lycia et Cilicia',
      'support'=>    3,
      'docks'=>      [9],
      'borders'=>    [14,18,19,21],
  ),
  21 => array(
      'name'=>       'Asia',
      'support'=>    3,
      'docks'=>      [10],
      'borders'=>    [19,20,22,24],
  ),
  22 => array(
      'name'=>       'Bithynia et Pontus',
      'support'=>    3,
      'docks'=>      [11],
      'borders'=>    [18,19,21,23],
  ),
  23 => array(
      'name'=>       'Thracia',
      'support'=>    2,
      'docks'=>      [11],
      'borders'=>    [22,24,26],
  ),
  24 => array(
      'name'=>       'Macedonia et Epirus',
      'support'=>    3,
      'docks'=>      [10,8],
      'borders'=>    [21,23,25,26,27],
  ),
  25 => array(
      'name'=>       'Achaia',
      'support'=>    1,
      'docks'=>      [10,8],
      'borders'=>    [24],
  ),
  26 => array(
      'name'=>       'Moesia',
      'support'=>    3,
      'docks'=>      [11],
      'borders'=>    [23,24,27,28],
  ),
  27 => array(
      'name'=>       'Dalmatia',
      'support'=>    2,
      'docks'=>      [7],
      'borders'=>    [24,26,28,31],
  ),
  28 => array(
      'name'=>       'Pannonia',
      'support'=>    3,
      'docks'=>      [],
      'borders'=>    [26,27,29,31],
  ),
  29 => array(
      'name'=>       'Raetia',
      'support'=>    3,
      'docks'=>      [],
      'borders'=>    [28,3,30,31,5],
  ),
  30 => array(
      'name'=>       'Germania',
      'support'=>    3,
      'docks'=>      [1],
      'borders'=>    [2,29,3],
  ),
  31 => array(
      'name'=>       'Italia',
      'support'=>    3,
      'docks'=>      [5,7,8],
      'borders'=>    [27,28,29,33,5],
  ),
  32 => array(
      'name'=>       'Corsica et Sardinia',
      'support'=>    1,
      'docks'=>      [4,5],
      'borders'=>    [],
  ),
  33 => array(
      'name'=>       'Sicilia',
      'support'=>    1,
      'docks'=>      [5,6],
      'borders'=>    [31],
  ),
);

$this->barbarians = array(
  1 => array(
      'name'=>       'Hibernia et Caledonia',
      'borders'=>    [1],
  ),
  2 => array(
      'name'=>       'Germania Magna',
      'borders'=>    [28,29,30],
  ),
  3 => array(
      'name'=>       'Sarmatia',
      'borders'=>    [26,28],
  ),
  4 => array(
      'name'=>       'Iberia',
      'borders'=>    [17,18],
  ),
  5 => array(
      'name'=>       'Regnum Parthicum',
      'borders'=>    [15,16,17],
  ),
  6 => array(
      'name'=>       'Arabia',
      'borders'=>    [13,14,15],
  ),
  7 => array(
      'name'=>       'Gaetulia',
      'borders'=>    [10,11,12,9],
  ),
);

$this->seas = array(
  1 => array(
      'name'=>       'Mare Germanicum',
      'docks'=>      [1,2,3,30],
  ),
  2 => array(
      'name'=>       'Mare Gallicum',
      'docks'=>      [1,4,6],
  ),
  3 => array(
      'name'=>       'Oceanus',
      'docks'=>      [7,8,9],
  ),
  4 => array(
      'name'=>       'Mare Hispanicum',
      'docks'=>      [32,5,6,8,9],
  ),
  5 => array(
      'name'=>       'Mare Tyrrhenum',
      'docks'=>      [31,32,33,5],
  ),
  6 => array(
      'name'=>       'Mare Siculum',
      'docks'=>      [10,11,33],
  ),
  7 => array(
      'name'=>       'Mare Adriaticum',
      'docks'=>      [27,31],
  ),
  8 => array(
      'name'=>       'Mare Ionium',
      'docks'=>      [24,25,31],
  ),
  9 => array(
      'name'=>       'Mare Orientale',
      'docks'=>      [12,13,14,20],
  ),
  10 => array(
      'name'=>       'Mare Aegeum',
      'docks'=>      [21,24,25],
  ),
  11 => array(
      'name'=>       'Pontus Euxinus',
      'docks'=>      [18,22,23,26],
  ),
);


