<?php

function rollDice($modifier=0) {
    return rand(1,6) + rand(1,6) + $modifier;
}

function calcPercentage($value, $max) {
    return round($value * 100 / $max);
}
for ($modifier = -5; $modifier <= 5; $modifier++) {
    $attackerTroops = 10 + $modifier;
    $defenderTroops = 10;
    $iterations = 10000;
    $testName = sprintf("%02d vs %02d", $attackerTroops, $defenderTroops);
    $attackResult[$testName] = [1 => ['A' => 0, 'D' => 0], 2 => ['A' => 0, 'D' => 0], 3 => ['A' => 0, 'D' => 0], 4 => ['A' => 0, 'D' => 0], 5 => ['A' => 0, 'D' => 0], 6 => ['A' => 0, 'D' => 0]];
    for ($attack = 0; $attack < $iterations; $attack++) {
        $attackerTroops = 10 + $modifier;
        $defenderTroops = 10;
        $round = 0;
        while ($attackerTroops > 0 && $defenderTroops > 0) {
            // echo ".";
            printf("%02d vs %02d\n", $attackerTroops, $defenderTroops);
            $round++;
            $result = rollDice($attackerTroops - $defenderTroops);
            if ($result <= 3) {
                // attacker is defeated
                $attackerTroops = 0;
            } else if ($result <= 6) {
                // attacker troops halved
                $attackerTroops -= floor($attackerTroops / 2);
            } else if ($result == 7) {
                // nothing happens
            } else if ($result <= 10) {
                // defender troops halved
                $defenderTroops -= floor($defenderTroops / 2);
            } else {
                // defender is defeated
                $defenderTroops = 0;
            }
            if ($attackerTroops > 0 && $defenderTroops > 0) {
                // retaliation
                $result = rollDice($defenderTroops - $attackerTroops);
                if ($result <= 3) {
                    // defender is defeated
                    $defenderTroops = 0;
                } else if ($result <= 6) {
                    // defender troops halved
                    $defenderTroops -= floor($defenderTroops / 2);
                } else if ($result == 7) {
                    // nothing happens
                } else if ($result <= 10) {
                    // attacker troops halved
                    $attackerTroops -= floor($attackerTroops / 2);
                } else {
                    // attacker is defeated
                    $attackerTroops = 0;
                }                    
            }
        }
        echo "\n";
        if ($attackerTroops > 0) {
            $attackResult[$testName][$round]['A'] += 1;
            printf("%s: %02d - A\n", $testName, $round);
        } else {
            $attackResult[$testName][$round]['D'] += 1;
            printf("%s: %02d - D\n", $testName, $round);
        }
    }
    // var_dump($attackResult);
    printf("         |   1   |   2   |   3   |   4   |   5   |   6   |\n");
    printf("         | A | D | A | D | A | D | A | D | A | D | A | D |\n");
    printf("----------------------------------------------------------\n");
    foreach ($attackResult as $testResultKey => $testResultValue) {
        printf("%9s|", $testResultKey);
        for ($testRound = 1; $testRound <= 6; $testRound++)  {
            printf("% 3d|% 3d|", calcPercentage($testResultValue[$testRound]['A'], $iterations), calcPercentage($testResultValue[$testRound]['D'], $iterations));
        }
        printf("\n");
        printf("----------------------------------------------------------\n");
    }
}