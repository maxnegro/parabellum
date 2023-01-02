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
  * parabellumludo.game.php
  *
  * This is the main file for your game logic.
  *
  * In this PHP file, you are going to defines the rules of the game.
  *
  */


require_once( APP_GAMEMODULE_PATH.'module/table/table.game.php' );
require_once ('modules/parabellum_troops.php');

class ParaBellumLudo extends Table
{
	function __construct( )
	{
        // Your global variables labels:
        //  Here, you can assign labels to global variables you are using for this game.
        //  You can use any number of global variables with IDs between 10 and 99.
        //  If your game has options (variants), you also have to associate here a label to
        //  the corresponding ID in gameoptions.inc.php.
        // Note: afterwards, you can get/set the global variables with getGameStateValue/setGameStateInitialValue/setGameStateValue
        parent::__construct();
        
        self::initGameStateLabels( array( 
            //    "my_first_global_variable" => 10,
            //    "my_second_global_variable" => 11,
            //      ...
            //    "my_first_game_variant" => 100,
            //    "my_second_game_variant" => 101,
            //      ...
            'consular_year' => 10,
        ) );        

        $this->provinceDeck = self::getNew( "module.common.deck" );
	    $this->provinceDeck->init( "provincia" );   
        $this->troops = new pblTroops;
        $this->troops->init('troop');

	}
	
    protected function getGameName( )
    {
		// Used for translations and stuff. Please do not modify.
        return "parabellumludo";
    }	

    /*
        setupNewGame:
        
        This method is called only once, when a new game is launched.
        In this method, you must setup the game according to the game rules, so that
        the game is ready to be played.
    */
    protected function setupNewGame( $players, $options = array() )
    {    
        // Set the colors of the players with HTML color code
        // The default below is red/green/blue/orange/brown
        // The number of colors defined here must correspond to the maximum number of players allowed for the gams
        $gameinfos = self::getGameinfos();
        $default_colors = $gameinfos['player_colors'];
 
        // Create players
        // Note: if you added some extra field on "player" table in the database (dbmodel.sql), you can initialize it there.
        $sql = "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar) VALUES ";
        $values = array();
        foreach( $players as $player_id => $player )
        {
            $color = array_shift( $default_colors );
            $values[] = "('".$player_id."','$color','".$player['player_canal']."','".addslashes( $player['player_name'] )."','".addslashes( $player['player_avatar'] )."')";
        }
        $sql .= implode( $values, ',' );
        self::DbQuery( $sql );
        self::reattributeColorsBasedOnPreferences( $players, $gameinfos['player_colors'] );
        self::reloadPlayersBasicInfos();
        
        /************ Start the game initialization *****/

        // Init global values with their initial values
        //self::setGameStateInitialValue( 'my_first_global_variable', 0 );
        
        // Init game statistics
        // (note: statistics used in this file must be defined in your stats.inc.php file)
        //self::initStat( 'table', 'table_teststat1', 0 );    // Init a table statistics
        //self::initStat( 'player', 'player_teststat1', 0 );  // Init a player statistics (for all players)

        // TODO: setup the initial game situation here

        self::setGameStateInitialValue( 'consular_year', 0 );

        // Populate provinceDeck
        $provinces = array();
        foreach ($this->provinces as $id => $attributes) {
            $provinces[] = array (
                "type" => "land",
                "type_arg" => $id,
                "nbr" => 1,
            );
        }
        $this->provinceDeck->createCards( $provinces, 'deck' );
       
        // Shuffle deck
        $this->provinceDeck->shuffle('deck');

        $players = self::loadPlayersBasicInfos();
        $startingProvinces = floor(count($provinces) / count($players));
        foreach( $players as $player_id => $player )
        {
            $cards = $this->provinceDeck->pickCards( $startingProvinces, 'deck', $player_id );
              
            // Notify player about his cards
            //    self::notifyPlayer( $player_id, 'newHand', '', array( 
            //        'cards' => $cards
            //     ) );

            $provinceList = array();
            foreach ($cards as $card_id => $card) {
                $provinceList[] = $this->provinces[$card['type_arg']]["name"];
            }

            self::notifyAllPlayers("playerLog", clienttranslate('${player_name} received ${provinceNbr} provinces in setup phase:<br>${provinceList}'), array(
                'player_name' => $player['player_name'],
                'provinceNbr' => $startingProvinces,
                'provinceList' => join(', ', $provinceList),
            ));
        }  
        foreach($this->provinceDeck->getCardsInLocation('deck') as $card) {
            $this->troops->addDesolation($card['type_arg']);
        }

        // Activate first player (which is in general a good idea :) )
        $this->activeNextPlayer();

        /************ End of the game initialization *****/
    }

    /*
        getAllDatas: 
        
        Gather all informations about current game situation (visible by the current player).
        
        The method is called each time the game interface is displayed to a player, ie:
        _ when the game starts
        _ when a player refreshes the game page (F5)
    */
    protected function getAllDatas()
    {
        $result = array();
    
        $current_player_id = self::getCurrentPlayerId();    // !! We must only return informations visible by this player !!
    
        // Get information about players
        // Note: you can retrieve some extra field you added for "player" table in "dbmodel.sql" if you need it.
        $sql = "SELECT player_id id, player_score score FROM player ";
        $result['players'] = self::getCollectionFromDb( $sql );
  
        // TODO: Gather all information about current game situation (visible by player $current_player_id).
  
        $result['consular_year'] = $this->getGameStateValue('consular_year');
        $result['troops'] = $this->troops->getAllData();
        $result['provinces'] = $this->provinces;              // Province card static data
        $result['province_deck'] = $this->provinceDeck->getCardsInLocation('hand', null, 'location_arg');

        return $result;
    }

    /*
        getGameProgression:
        
        Compute and return the current game progression.
        The number returned must be an integer beween 0 (=the game just started) and
        100 (= the game is finished or almost finished).
    
        This method is called each time we are in a game state with the "updateGameProgression" property set to true 
        (see states.inc.php)
    */
    function getGameProgression()
    {
        // TODO: compute and return the game progression

        return 0;
    }


//////////////////////////////////////////////////////////////////////////////
//////////// Utility functions
////////////    

    /*
        In this space, you can put any utility methods useful for your game logic
    */



//////////////////////////////////////////////////////////////////////////////
//////////// Player actions
//////////// 

    /*
        Each time a player is doing some game action, one of the methods below is called.
        (note: each method below must match an input method in parabellumludo.action.php)
    */

    /*
    
    Example:

    function playCard( $card_id )
    {
        // Check that this is the player's turn and that it is a "possible action" at this game state (see states.inc.php)
        self::checkAction( 'playCard' ); 
        
        $player_id = self::getActivePlayerId();
        
        // Add your game logic to play a card there 
        ...
        
        // Notify all players about the card played
        self::notifyAllPlayers( "cardPlayed", clienttranslate( '${player_name} plays ${card_name}' ), array(
            'player_id' => $player_id,
            'player_name' => self::getActivePlayerName(),
            'card_name' => $card_name,
            'card_id' => $card_id
        ) );
          
    }
    
    */
    function passToNextPhase() {
    	self::checkAction( 'pass' ); 
   	    $this->gamestate->nextState('pass');
    }
    
//////////////////////////////////////////////////////////////////////////////
//////////// Game state arguments
////////////

    /*
        Here, you can create methods defined as "game state arguments" (see "args" property in states.inc.php).
        These methods function is to return some additional information that is specific to the current
        game state.
    */

    /*
    
    Example for game state "MyGameState":
    
    function argMyGameState()
    {
        // Get some values from the current game situation in database...
    
        // return values:
        return array(
            'variable1' => $value1,
            'variable2' => $value2,
            ...
        );
    }    
    */

//////////////////////////////////////////////////////////////////////////////
//////////// Game state actions
////////////

    /*
        Here, you can create methods defined as "game state actions" (see "action" property in states.inc.php).
        The action method of state X is called everytime the current game state is set to X.
    */
    
    /*
    
    Example for game state "MyGameState":

    function stMyGameState()
    {
        // Do some stuff ...
        
        // (very often) go to another gamestate
        $this->gamestate->nextState( 'some_gamestate_transition' );
    }    
    */

    function pblRecruitment() {
        $this->incGameStateValue('consular_year', 1);

        foreach($this->provinceDeck->getCardsInLocation('hand') as $card) {
            $this->troops->addTroops($card['location_arg'], $card['type_arg'], $this->provinces[$card['type_arg']]['support']);
        }
        self::notifyAllPlayers("newYear", clienttranslate('Beginning of new consular year. Recruiting new cohors.'), array(
            'consular_year' => $this->getGameStateValue('consular_year'),
            'troops' => $this->troops->getAllData(),
        ));

        $this->gamestate->nextState('');
    }

    function pblIsLastPlayer() {
        $this->activeNextPlayer();
        $nextPlayerTable = $this->getNextPlayerTable();
        if ($this->getActivePlayerId() == $nextPlayerTable[0]) {
            $this->gamestate->nextState('barbarianInvasions');
        } else {
            $this->gamestate->nextState('nextPlayer');
        }
    }

    function pblBarbarianInvasions() {
        // At the end of the barbarian invasions, desolated lands are deleted
        foreach ($this->troops->getDesolations() as $province_id => $province ) {
            $this->troops->removeDesolation($province['troop_location_id']);
            self::notifyAllPlayers('removeDesolation', clienttranslate('Remove desolation from province ${location_name}.'), array(
                'location_id' => $province['troop_location_id'],
                'location_name' => $this->provinces[$province['troop_location_id']]['name'],
                'token_id' => $province['troop_id'],
            ));
        }
        // Barbarians on the move
        // First of all check if there are still invaders from previous years
        foreach ($this->troops->getTroopsByPlayer(-1) as $barbarian) {
            // If the province is not contended, barbarians are going to attack
            if (count($this->troops->getTroopsByLocation($barbarian['troop_location_id'])) == 1) {
                $attackProvinceList = array();
                $attackDefenders = PHP_INT_MAX;
                foreach ($this->provinces[barbarian['troop_location_id']]['borders'] as $candidateProvince) {
                    $troopsInProvince = $this->troops->getTroopsByLocation($candidateProvince);
                    if (count($troopsInProvince) > 1) {
                        // destination is contended, barbarians cannot invade
                    } else {
                        // self::notifyAllPlayers('debug', var_dump($troopsInProvince), array());
                        // check for confining province less defended
                        foreach ($troopsInProvince as $candidateDefenders) {
                            // This should cycle at most one time
                            if ($candidateDefenders['troop_count'] <= $attackDefenders) {
                                if ($candidateDefenders['troop_count'] < $attackDefenders) { $attackProvinceList = array(); }
                                $attackProvinceList[] = $candidateProvince;
                                $attackDefenders = $candidateDefenders['troop_count'];
                            }
                        }
                    }
                }
                if (count($attackProvinceList) > 0) {
                    $attackProvince = $attackProvinceList[bga_rand(0, count($attackProvinceList) - 1)];
                    $this->troops->removeTroops(-1, $barbarian['troop_location_id'], $barbarian['troop_count']);
                    $this->troops->addTroops(-1, $attackProvince, 5, pblTroops::BARBARIANS);
                    self::notifyAllPlayers('barbarianAttack', clienttranslate('Barbarians in ${barbarian_province} are attacking ${target_province} with ${barbarian_troops} tribes.'), array(
                        'barbarian_province' => $this->provinces[$barbarian['troop_location_id']]['name'],
                        'target_province' => $this->provinces[$attackProvince]['name'],
                        'target_province_id' => $attackProvince,
                        'barbarian_troops' => $barbarian['troop_count'],
                        'token_id' => $barbarian['troop_id'],
                    ));
                }
            }
        }

        // Invaders from outside of the empire
        foreach ($this->barbarians as $barbarian) {
            // Roll a dice
            $dice = bga_rand(1,6);
            self::notifyAllPlayers('barbarianRoll', clienttranslate('Barbarians in ${barbarian_province} rolled a ${barbarian_dice}'), array(
                'barbarian_province' => $barbarian['name'],
                'barbarian_dice' => $dice
            ));
            switch ($dice) {
                case 1: case 2: case 3: case 4:
                // lazy barbarians, they do nothing
                break;
                case 5: case 6:
                // attack
                $attackProvinceList = array();
                $attackDefenders = PHP_INT_MAX;
                foreach ($barbarian['borders'] as $candidateProvince) {
                    $troopsInProvince = $this->troops->getTroopsByLocation($candidateProvince);
                    if (count($troopsInProvince) > 1) {
                        // destination is contended, barbarians cannot invade
                    } else {
                        // self::notifyAllPlayers('debug', var_dump($troopsInProvince), array());
                        // check for confining province less defended
                        foreach ($troopsInProvince as $candidateDefenders) {
                            // This should cycle at most one time
                            if ($candidateDefenders['troop_count'] <= $attackDefenders) {
                                if ($candidateDefenders['troop_count'] < $attackDefenders) { $attackProvinceList = array(); }
                                $attackProvinceList[] = $candidateProvince;
                                $attackDefenders = $candidateDefenders['troop_count'];
                            }
                        }
                    }
                }
                if (count($attackProvinceList) > 0) {
                    $attackProvince = $attackProvinceList[bga_rand(0, count($attackProvinceList) - 1)];
                    $this->troops->addTroops(-1, $attackProvince, 5, pblTroops::BARBARIANS);
                    self::notifyAllPlayers('barbarianAttack', clienttranslate('Barbarians in ${barbarian_province} are attacking ${target_province} with ${barbarian_troops} tribes.'), array(
                        'barbarian_province' => $barbarian['name'],
                        'target_province' => $this->provinces[$attackProvince]['name'],
                        'target_province_id' => $attackProvince,
                        'barbarian_troops' => 5,
                        'token_id' => null,
                    ));
                }
                break;
            }
        }
        // Barbarian conflict resolution
        // Get all provinces with barbarian tribes
        foreach ($this->troops->getTroopsByType(pblTroops::BARBARIANS) as $barbarianTribe) {
            $troopsInProvince = $this->troops->getTroopsByLocation($barbarianTribe['troop_location_id']);
            if (count($troopsInProvince) > 1) {
                // Contended province, we battle
                $atkTroops = null;
                $defTroops = null;
                foreach($troopsInProvince as $contender) {
                    if ($contender['troop_player_id'] == -1) {
                        $atkTroops = $contender;
                    } else {
                        $defTroops = $contender;
                    }
                }
                // Rolling dice
                $dice1 = bga_rand(1,6);
                $dice2 = bga_rand(1,6);
                $diceResult = $dice1+$dice2;
                $modifier = $atkTroops['troop_count'] - $defTroops['troop_count'];
                if ($modifier > 4) { $modifier = 4; }
                if ($modifier < -4) { $modifier = -4; }
                if ($defTroops['troop_type'] == pblTroops::FORT) { $modifier -= 1; }
                $diceResult += $modifier;
                $msg = 'Barbarians rolled ${dice1} ${dice2}. ';
                if ($diceResult <= 3) {
                    // Total defeat
                    $msg .= 'Attack in ${location_name} was a total defeat.';
                } else if ($diceResult <= 6) {
                    // Partial defeat
                    $msg .= 'Attack in ${location_name} was a partial defeat.';
                } else if ($diceResult == 7) {
                    // Nothing happened
                    $msg .= 'Attack in ${location_name} was a stall.';
                } else if ($diceResult <= 10) {
                    // Partial victory
                    $msg .= 'Attack in ${location_name} was a partial victory.';
                } else {
                    // Outstanding victory
                    $msg .= 'Attack in ${location_name} was an outstanding victory.';
                }
                self::notifyAllPlayers('battle', $msg, array(
                    'dice1' => $dice1,
                    'dice2' => $dice2,
                    'location_name' => $this->provinces[$atkTroops['troop_location_id']]['name'],
                    'location_id' => $atkTroops['troop_location_id'],

                ));
            }
        }

        // End turn
        $this->gamestate->nextState('newYear');
    }
 
//////////////////////////////////////////////////////////////////////////////
//////////// Zombie
////////////

    /*
        zombieTurn:
        
        This method is called each time it is the turn of a player who has quit the game (= "zombie" player).
        You can do whatever you want in order to make sure the turn of this player ends appropriately
        (ex: pass).
        
        Important: your zombie code will be called when the player leaves the game. This action is triggered
        from the main site and propagated to the gameserver from a server, not from a browser.
        As a consequence, there is no current player associated to this action. In your zombieTurn function,
        you must _never_ use getCurrentPlayerId() or getCurrentPlayerName(), otherwise it will fail with a "Not logged" error message. 
    */

    function zombieTurn( $state, $active_player )
    {
    	$statename = $state['name'];
    	
        if ($state['type'] === "activeplayer") {
            switch ($statename) {
                default:
                    $this->gamestate->nextState( "zombiePass" );
                	break;
            }

            return;
        }

        if ($state['type'] === "multipleactiveplayer") {
            // Make sure player is in a non blocking status for role turn
            $this->gamestate->setPlayerNonMultiactive( $active_player, '' );
            
            return;
        }

        throw new feException( "Zombie mode not supported at this game state: ".$statename );
    }
    
///////////////////////////////////////////////////////////////////////////////////:
////////// DB upgrade
//////////

    /*
        upgradeTableDb:
        
        You don't have to care about this until your game has been published on BGA.
        Once your game is on BGA, this method is called everytime the system detects a game running with your old
        Database scheme.
        In this case, if you change your Database scheme, you just have to apply the needed changes in order to
        update the game database and allow the game to continue to run with your new version.
    
    */
    
    function upgradeTableDb( $from_version )
    {
        // $from_version is the current version of this game database, in numerical form.
        // For example, if the game was running with a release of your game named "140430-1345",
        // $from_version is equal to 1404301345
        
        // Example:
//        if( $from_version <= 1404301345 )
//        {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "ALTER TABLE DBPREFIX_xxxxxxx ....";
//            self::applyDbUpgradeToAllDB( $sql );
//        }
//        if( $from_version <= 1405061421 )
//        {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "CREATE TABLE DBPREFIX_xxxxxxx ....";
//            self::applyDbUpgradeToAllDB( $sql );
//        }
//        // Please add your future database scheme changes here
//
//


    }    
}
