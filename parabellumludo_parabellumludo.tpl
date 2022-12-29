{OVERALL_GAME_HEADER}

<!--
--------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- ParaBellumLudo implementation : © <Your name here> <Your email address here>
--
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------

    parabellumludo_parabellumludo.tpl

    This is the HTML template of your game.

    Everything you are writing in this file will be displayed in the HTML page of your game user interface,
    in the "main game zone" of the screen.

    You can use in this template:
    _ variables, with the format {MY_VARIABLE_ELEMENT}.
    _ HTML block, with the BEGIN/END format

    See your "view" PHP file to check how to set variables and control blocks

    Please REMOVE this comment before publishing your game on BGA
-->

<!--
<div id="board" class="board shadow board4p"><img src="{GAMETHEMEURL}img/RomanEmpire_bg.jpg"></div>
-->
<div id='board'>
    <div id='map-zoom'>
        <div id='button-zoom-plus' class='button_pointer button_zoom_plus'></div>
        <div id='button-zoom-center' class='button_pointer button_zoom_center'></div>
        <div id='button-zoom-minus' class='button_pointer button_zoom_minus'></div>
    </div>
    <div id='map'>
        <img id='map-jpg' src='{GAMETHEMEURL}img/RomanEmpire_bg.jpg'>
<!--
        <div id='map-tokens' class='map-layer'></div>
-->
    </div>
</div>

<!-- BEGIN provinces -->
  <div id="{PLAYER_ID}_provinces" class="whiteblock">
   <h3><span style="color: #{PLAYER_COLOR};">{PLAYER_NAME}</span>: {PROVINCES}</h3>
   <div class="province_card_container">
   <!-- BEGIN province_cards -->
     <div class="province_card_background">
       <h4 class="province_card_name">{PROVINCE_NAME}<h4>
       {PROVINCE_SUPPORT_LABEL}: {PROVINCE_SUPPORT}
     </div>
   <!-- END province_cards -->
   </div>
  </div>
<!-- END provinces -->

<!-- BEGIN consular_year_block -->
<div class="player-board" id="timekeeping">
  <div class="player_board_inner">
    Consular year: <span id="consular_year">${consular_year_value}</span>
  </div>
</div>
<!-- END consular_year_block -->


<script type="text/javascript">

// Javascript HTML templates

/*
// Example:
var jstpl_some_game_item='<div class="my_game_item" id="my_game_item_${MY_ITEM_ID}"></div>';

*/

</script>

{OVERALL_GAME_FOOTER}
