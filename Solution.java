
public class Solution {

    private static final int[] RANGE_OF_COLORS = {0, 10};

    public int winningPlayerCount(int numberOfPlayers, int[][] pick) {
        int bitmaskAllWinningPlayers = createBitmaskAllWinningPlayers(numberOfPlayers, pick);
        return countWinningPlayers(bitmaskAllWinningPlayers);
    }

    private int createBitmaskAllWinningPlayers(int numberOfPlayers, int[][] pick) {
        int[][] scoresCollectedColorsPerPlayer = new int[numberOfPlayers + 1][RANGE_OF_COLORS[1] + 1];
        int bitmaskAllWinningPlayers = 0;

        for (int[] current : pick) {
            int player = current[0];
            int color = current[1];
            if (++scoresCollectedColorsPerPlayer[player][color] > player) {
                bitmaskAllWinningPlayers |= 1 << player;
            }
        }
        return bitmaskAllWinningPlayers;
    }

    private int countWinningPlayers(int bitmaskAllWinningPlayers) {
        int countWinningPlayers = 0;
        while (bitmaskAllWinningPlayers > 0) {
            countWinningPlayers += 1 & bitmaskAllWinningPlayers;
            bitmaskAllWinningPlayers >>= 1;
        }
        return countWinningPlayers;
    }
}
