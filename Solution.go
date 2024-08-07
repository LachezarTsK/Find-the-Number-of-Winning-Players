
package main

import "fmt"

var RANGE_OF_COLORS = [2]int{1, 10}

func winningPlayerCount(numberOfPlayers int, pick [][]int) int {
    var bitmaskAllWinningPlayers int = createBitmaskAllWinningPlayers(numberOfPlayers, pick)
    return countWinningPlayers(bitmaskAllWinningPlayers)
}

func createBitmaskAllWinningPlayers(numberOfPlayers int, pick [][]int) int {
    scoresCollectedColorsPerPlayer := make([][]int, numberOfPlayers+1)
    for i := range scoresCollectedColorsPerPlayer {
        scoresCollectedColorsPerPlayer[i] = make([]int, RANGE_OF_COLORS[1]+1)
    }
    var bitmaskAllWinningPlayers = 0

    for _, current := range pick {
        player := current[0]
        color := current[1]
        scoresCollectedColorsPerPlayer[player][color]++
        if scoresCollectedColorsPerPlayer[player][color] > player {
            bitmaskAllWinningPlayers |= 1 << player
        }
    }
    return bitmaskAllWinningPlayers
}

func countWinningPlayers(bitmaskAllWinningPlayers int) int {
    countWinningPlayers := 0
    for bitmaskAllWinningPlayers > 0 {
        countWinningPlayers += 1 & bitmaskAllWinningPlayers
        bitmaskAllWinningPlayers >>= 1
    }
    return countWinningPlayers
}
