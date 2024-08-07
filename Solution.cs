
using System;

public class Solution
{
    private static readonly int[] RANGE_OF_COLORS = { 0, 10 };

    public int WinningPlayerCount(int numberOfPlayers, int[][] pick)
    {
        int bitmaskAllWinningPlayers = CreateBitmaskAllWinningPlayers(numberOfPlayers, pick);
        return CountWinningPlayers(bitmaskAllWinningPlayers);
    }

    private int CreateBitmaskAllWinningPlayers(int numberOfPlayers, int[][] pick)
    {
        int[,] scoresCollectedColorsPerPlayer = new int[numberOfPlayers + 1, RANGE_OF_COLORS[1] + 1];
        int bitmaskAllWinningPlayers = 0;

        foreach (int[] current in pick)
        {
            int player = current[0];
            int color = current[1];
            if (++scoresCollectedColorsPerPlayer[player, color] > player)
            {
                bitmaskAllWinningPlayers |= 1 << player;
            }
        }
        return bitmaskAllWinningPlayers;
    }

    private int CountWinningPlayers(int bitmaskAllWinningPlayers)
    {
        int countWinningPlayers = 0;
        while (bitmaskAllWinningPlayers > 0)
        {
            countWinningPlayers += 1 & bitmaskAllWinningPlayers;
            bitmaskAllWinningPlayers >>= 1;
        }
        return countWinningPlayers;
    }
}
