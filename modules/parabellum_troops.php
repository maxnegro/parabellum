<?php

/*
 * This is a generic class to manage game pieces.
 *
 * On DB side this is based on a standard table with the following fields:
 * token_key (string), token_location (string), token_state (int)
 *
 *
 * CREATE TABLE IF NOT EXISTS `token` (
 * `token_key` varchar(32) NOT NULL,
 * `token_location` varchar(32) NOT NULL,
 * `token_state` int(10),
 * PRIMARY KEY (`token_key`)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 *
 * CREATE TABLE IF NOT EXISTS `troop` (
 *  `troop_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 *  `troop_type` int(10) NOT NULL,
 *  `troop_location` int(10),
 *  `troop_playerid` int(10),
 *  `troop_count` int(10) DEFAULT 0,
 *  PRIMARY KEY (`token_key`)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 */

class pblTroops extends APP_GameClass {
   var $table;
   function __construct() {
      $this->table = 'troop';

      // $this->custom_fields = array ();
      // $this->g_index = array ();
   }

   // MUST be called before any other method if db table is not called 'troop'
   function init($table) {
      $this->table = $table;
   }

   function deleteAll() {
      self::DbQuery("DELETE FROM " . $this->table);
   }

   function addTroop($player_id, $location_id, $nbr) {
      $sql = "";
      if (($result = $this->getTroop($player_id, $location_id)) != null) {
         $sql = sprintf("UPDATE `%s` SET `troop_count` = `troop_count` + %d WHERE `troop_id` = %d",
            $this->table,
            $nbr,
            $result['troop_id']
         );
      } else {
         $sql = sprintf("INSERT INTO `%s` (`troop_type`, `troop_location_id`, `troop_player_id`, `troop_count`) VALUES (%d,%d,%d,%d)",
            $this->table,
            2, $location_id, $player_id, $nbr
         );
      }
      return self::DbQuery($sql);
   }

   function addDesolation($location_id) {
      if (!empty($this->getTroopsByLocation($location_id))) {
         return false;
      }
      $sql = sprintf("INSERT INTO `%s` (`troop_type`, `troop_location_id`, `troop_player_id`, `troop_count`) VALUES (%d,%d,NULL,1)",
         $this->table,
         0, $location_id
      );
      return self::DbQuery($sql);
   }

   function getDesolations() {
      $sql = sprintf("SELECT `troop_id`, `troop_type`, `troop_location_id`, `troop_player_id`, `troop_count` FROM `%s` WHERE `troop_type` = 0", $this->table);
      return self::getCollectionFromDb($sql);
   }

   function removeDesolation($location_id) {
      $sql = sprintf("DELETE FROM `%s` WHERE `troop_type` = 0 AND `troop_location_id` = %d", $this->table, $location_id);
      return self::DbQuery($sql);
   }

   function getTroop($player_id, $location_id) {
      $sql = sprintf("SELECT troop_id, troop_type, troop_count FROM `%s` WHERE `troop_player_id` = %d AND `troop_location_id` = %d", 
         $this->table, $player_id, $location_id
      );
      $dbres = self::DbQuery($sql);
      $row = mysql_fetch_assoc($dbres);
      if ($row) {
         return $row;
      } else {
         return null;
      }
   }

   function getTroopsByLocation($location_id) {
      $sql = sprintf("SELECT troop_id, troop_type, troop_location_id, troop_player_id, troop_count FROM `%s` WHERE troop_location_id = %d", 
         $this->table, $location_id,
      );
      return self::getCollectionFromDb($sql);
   }

   function getAllData() {
      $sql = sprintf("SELECT troop_id, troop_type, troop_location_id, troop_player_id, troop_count FROM `%s` ORDER BY troop_location_id", $this->table);
      return self::getCollectionFromDb($sql);
   }
}