
class Solution {

    private companion object {
        val RANGE_OF_COLORS = intArrayOf(0, 10)
    }

    fun winningPlayerCount(numberOfPlayers: Int, pick: Array<IntArray>): Int {
        val bitmaskAllWinningPlayers = createBitmaskAllWinningPlayers(numberOfPlayers, pick)
        return countWinningPlayers(bitmaskAllWinningPlayers)
    }

    private fun createBitmaskAllWinningPlayers(numberOfPlayers: Int, pick: Array<IntArray>): Int {
        val scoresCollectedColorsPerPlayer = Array<IntArray>(numberOfPlayers + 1) { IntArray(RANGE_OF_COLORS[1] + 1) }
        var bitmaskAllWinningPlayers = 0

        for (current in pick) {
            val player = current[0]
            val color = current[1]
            if (++scoresCollectedColorsPerPlayer[player][color] > player) {
                bitmaskAllWinningPlayers = (bitmaskAllWinningPlayers or (1 shl player))
            }
        }
        return bitmaskAllWinningPlayers
    }

    private fun countWinningPlayers(bitmaskAllWinningPlayers: Int): Int {
        var countWinningPlayers = 0
        var bitmaskAllWinningPlayers = bitmaskAllWinningPlayers

        while (bitmaskAllWinningPlayers > 0) {
            countWinningPlayers += 1 and bitmaskAllWinningPlayers
            bitmaskAllWinningPlayers = bitmaskAllWinningPlayers shr 1
        }
        return countWinningPlayers
    }
}
