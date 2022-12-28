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
 * parabellumludo.view.php
 *
 * This is your "view" file.
 *
 * The method "build_page" below is called each time the game interface is displayed to a player, ie:
 * _ when the game starts
 * _ when a player refreshes the game page (F5)
 *
 * "build_page" method allows you to dynamically modify the HTML generated for the game interface. In
 * particular, you can set here the values of variables elements defined in parabellumludo_parabellumludo.tpl (elements
 * like {MY_VARIABLE_ELEMENT}), and insert HTML block elements (also defined in your HTML template file)
 *
 * Note: if the HTML of your game interface is always the same, you don't have to place anything here.
 *
 */
  
require_once( APP_BASE_PATH."view/common/game.view.php" );
  
class view_parabellumludo_parabellumludo extends game_view
{
    protected function getGameName()
    {
        // Used for translations and stuff. Please do not modify.
        return "parabellumludo";
    }
    
  	function build_page( $viewArgs )
  	{		
  	    // Get players & players number
        $players = $this->game->loadPlayersBasicInfos();
        $players_nbr = count( $players );

        /*********** Place your code below:  ************/


        /*
        
        // Examples: set the value of some element defined in your tpl file like this: {MY_VARIABLE_ELEMENT}

        // Display a specific number / string
        $this->tpl['MY_VARIABLE_ELEMENT'] = $number_to_display;

        // Display a string to be translated in all languages: 
        $this->tpl['MY_VARIABLE_ELEMENT'] = self::_("A string to be translated");

        // Display some HTML content of your own:
        $this->tpl['MY_VARIABLE_ELEMENT'] = self::raw( $some_html_code );
        
        */
        
        /*
        
        // Example: display a specific HTML block for each player in this game.
        // (note: the block is defined in your .tpl file like this:
        //      <!-- BEGIN myblock --> 
        //          ... my HTML code ...
        //      <!-- END myblock --> 
        

        $this->page->begin_block( "parabellumludo_parabellumludo", "myblock" );
        foreach( $players as $player )
        {
            $this->page->insert_block( "myblock", array( 
                                                    "PLAYER_NAME" => $player['player_name'],
                                                    "SOME_VARIABLE" => $some_value
                                                    ...
                                                     ) );
        }

        // Display a translated version of "My hand" at the place of the variable in the template
        $this->tpl['MY_HAND'] = self::_("My hand");

        // Display some raw HTML material at the place of the variable
        $this->tpl['MY_HAND'] = self::raw( "<div class='myhand_icon'></div>" );
        
        */

        $this->page->begin_block( "parabellumludo_parabellumludo", "province_cards" );
        $this->page->begin_block( "parabellumludo_parabellumludo", "provinces" );
        foreach( $players as $player_id => $player )
        {
            $this->page->reset_subblocks( 'province_cards' );
            foreach($this->game->provinceDeck->getPlayerHand($player_id) as $card) {
                $this->page->insert_block( "province_cards", array( 
                    "PROVINCE_NAME" => $this->game->provinces[$card['type_arg']]['name'],
                    "PROVINCE_SUPPORT" => $this->game->provinces[$card['type_arg']]['support'],
                    "PROVINCE_SUPPORT_LABEL" => SELF::_('Cohors/year'),
                ));
            }
            $this->page->insert_block( "provinces", array( 
                "PLAYER_NAME" => $player['player_name'],
                "PLAYER_ID" => $player_id,
                "PLAYER_COLOR" => $player['player_color'],
                "PROVINCES" => $this->game->provinceDeck->countCardInLocation('hand', $player_id),
            ) );
            
        }


        /*********** Do not change anything below this line  ************/
  	}
}
