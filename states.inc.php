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
 * states.inc.php
 *
 * ParaBellumLudo game states description
 *
 */

/*
   Game state machine is a tool used to facilitate game developpement by doing common stuff that can be set up
   in a very easy way from this configuration file.

   Please check the BGA Studio presentation about game state to understand this, and associated documentation.

   Summary:

   States types:
   _ activeplayer: in this type of state, we expect some action from the active player.
   _ multipleactiveplayer: in this type of state, we expect some action from multiple players (the active players)
   _ game: this is an intermediary state where we don't expect any actions from players. Your game logic must decide what is the next game state.
   _ manager: special type for initial and final state

   Arguments of game states:
   _ name: the name of the GameState, in order you can recognize it on your own code.
   _ description: the description of the current game state is always displayed in the action status bar on
                  the top of the game. Most of the time this is useless for game state with "game" type.
   _ descriptionmyturn: the description of the current game state when it's your turn.
   _ type: defines the type of game states (activeplayer / multipleactiveplayer / game / manager)
   _ action: name of the method to call when this game state become the current game state. Usually, the
             action method is prefixed by "st" (ex: "stMyGameStateName").
   _ possibleactions: array that specify possible player actions on this step. It allows you to use "checkAction"
                      method on both client side (Javacript: this.checkAction) and server side (PHP: self::checkAction).
   _ transitions: the transitions are the possible paths to go from a game state to another. You must name
                  transitions in order to use transition names in "nextState" PHP method, and use IDs to
                  specify the next game state for each transition.
   _ args: name of the method to call to retrieve arguments for this gamestate. Arguments are sent to the
           client side to be used on "onEnteringState" or to set arguments in the gamestate description.
   _ updateGameProgression: when specified, the game progression is updated (=> call to your getGameProgression
                            method).
*/

//    !! It is not a good idea to modify this file when a game is running !!

 
$machinestates = array(

    // The initial state. Please do not modify.
    1 => array(
        "name" => "gameSetup",
        "description" => "",
        "type" => "manager",
        "action" => "stGameSetup",
        "transitions" => array( "" => 2 )
    ),
    
    // Note: ID=2 => your first state

    2 => array(
        "name" => "recruitment",
        "description" => clienttranslate('Recruiting new cohorts'),
        "type" => "game",
        "action" => "pblRecruitment",
        "updateGameProgression" => true,   
        "transitions" => array( "" => 3 )
    ),

    3 => array(
        "name" => "playerShipPlacement",
        "description" => clienttranslate('${actplayer} is constructing ships'),
        "descriptionmyturn" => clienttranslate('${you} must construct a ship or pass'),
        "type" => "activeplayer",
        "possibleactions" => array( "constructShip", "pass" ),
        "transitions" => array( "constructShip" => 3, "pass" => 4)
    ),

    4 => array(
        "name" => "playerFortPlacement",
        "description" => clienttranslate('${actplayer} is building forts'),
        "descriptionmyturn" => clienttranslate('${you} must build a fort or pass'),
        "type" => "activeplayer",
        "possibleactions" => array( "buildFort", "pass" ),
        "transitions" => array( "buildFort" => 4, "pass" => 5)
    ),

    5 => array(
        "name" => "playerTroopsMovement",
        "description" => clienttranslate('${actplayer} is moving troops'),
        "descriptionmyturn" => clienttranslate('${you} must move some troops or pass'),
        "type" => "activeplayer",
        "possibleactions" => array( "moveTroop", "pass" ),
        "transitions" => array( "moveTroop" => 5, "pass" => 6)
    ),

    6 => array(
        "name" => "playerCombat",
        "description" => clienttranslate('${actplayer} is fighting'),
        "descriptionmyturn" => clienttranslate('${you} must fight for a province, retire or pass'),
        "type" => "activeplayer",
        "possibleactions" => array( "attackProvince", "retireFromFight", "pass" ),
        "transitions" => array( "attackProvince" => 6, "retireFromFight" => 6, "pass" => 10)
    ),

    10 => array(
        "name" => "isLastPlayer",
        "description" => '',
        "type" => "game",
        "action" => "pblIsLastPlayer",
        "updateGameProgression" => true,   
        "transitions" => array( "nextPlayer" => 3, "barbarianInvasions" => 11 )
    ),
  
    11 => array(
        "name" => "barbarianInvasions",
        "description" => clienttranslate('Barbarians are pressing at the borders'),
        "type" => "game",
        "action" => "pblBarbarianInvasions",
        "transitions" => array( "newYear" => 2, "endGame" => 99)
    ),

/*
    Examples:
    
    2 => array(
        "name" => "nextPlayer",
        "description" => '',
        "type" => "game",
        "action" => "stNextPlayer",
        "updateGameProgression" => true,   
        "transitions" => array( "endGame" => 99, "nextPlayer" => 10 )
    ),
    
    10 => array(
        "name" => "playerTurn",
        "description" => clienttranslate('${actplayer} must play a card or pass'),
        "descriptionmyturn" => clienttranslate('${you} must play a card or pass'),
        "type" => "activeplayer",
        "possibleactions" => array( "playCard", "pass" ),
        "transitions" => array( "playCard" => 2, "pass" => 2 )
    ), 

*/    
   
    // Final state.
    // Please do not modify (and do not overload action/args methods).
    99 => array(
        "name" => "gameEnd",
        "description" => clienttranslate("End of game"),
        "type" => "manager",
        "action" => "stGameEnd",
        "args" => "argGameEnd"
    )

);



