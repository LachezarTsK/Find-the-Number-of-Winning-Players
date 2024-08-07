
#include <span>
#include <array>
#include <vector>
using namespace std;


class Solution {

    static constexpr array<int, 2> RANGE_OF_COLORS = { 0, 10 };

public:
    int winningPlayerCount(int numberOfPlayers, const vector<vector<int>>& pick) const {
        int bitmaskAllWinningPlayers = createBitmaskAllWinningPlayers(numberOfPlayers, pick);
        return countWinningPlayers(bitmaskAllWinningPlayers);
    }

private:
    int createBitmaskAllWinningPlayers(int numberOfPlayers, span<const vector<int>> pick) const {
        vector<array<int, RANGE_OF_COLORS[1] + 1>> scoresCollectedColorsPerPlayer(numberOfPlayers + 1);
        int bitmaskAllWinningPlayers = 0;

        for (const auto& current : pick) {
            int player = current[0];
            int color = current[1];
            if (++scoresCollectedColorsPerPlayer[player][color] > player) {
                bitmaskAllWinningPlayers |= 1 << player;
            }
        }
        return bitmaskAllWinningPlayers;
    }

    int countWinningPlayers(int bitmaskAllWinningPlayers) const {
        int countWinningPlayers = 0;
        while (bitmaskAllWinningPlayers > 0) {
            countWinningPlayers += 1 & bitmaskAllWinningPlayers;
            bitmaskAllWinningPlayers >>= 1;
        }
        return countWinningPlayers;
    }
};
