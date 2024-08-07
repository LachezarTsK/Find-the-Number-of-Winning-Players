
/**
 * @param {number} numberOfPlayers
 * @param {number[][]} pick
 * @return {number}
 */
var winningPlayerCount = function (numberOfPlayers, pick) {
    this.RANGE_OF_COLORS = [0, 10];
    const bitmaskAllWinningPlayers = createBitmaskAllWinningPlayers(numberOfPlayers, pick);
    return countWinningPlayers(bitmaskAllWinningPlayers);
};
/**
 * @param {number} numberOfPlayers
 * @param {number[][]} pick
 * @return {number}
 */
function createBitmaskAllWinningPlayers(numberOfPlayers, pick) {
    const scoresCollectedColorsPerPlayer = Array.from(new Array(numberOfPlayers + 1),
                                           () => new Array(this.RANGE_OF_COLORS[1] + 1).fill(0));
    let bitmaskAllWinningPlayers = 0;

    for (let current of pick) {
        const player = current[0];
        const color = current[1];
        if (++scoresCollectedColorsPerPlayer[player][color] > player) {
            bitmaskAllWinningPlayers |= 1 << player;
        }
    }
    return bitmaskAllWinningPlayers;
}

/**
 * @param {number} bitmaskAllWinningPlayers
 * @return {number}
 */
function countWinningPlayers(bitmaskAllWinningPlayers) {
    let countWinningPlayers = 0;
    while (bitmaskAllWinningPlayers > 0) {
        countWinningPlayers += 1 & bitmaskAllWinningPlayers;
        bitmaskAllWinningPlayers >>= 1;
    }
    return countWinningPlayers;
}
