
function winningPlayerCount(numberOfPlayers: number, pick: number[][]): number {
    this.RANGE_OF_COLORS = [0, 10];
    const bitmaskAllWinningPlayers = createBitmaskAllWinningPlayers(numberOfPlayers, pick);
    return countWinningPlayers(bitmaskAllWinningPlayers);
};

function createBitmaskAllWinningPlayers(numberOfPlayers: number, pick: number[][]): number {
    const scoresCollectedColorsPerPlayer: number[][] = Array.from(new Array(numberOfPlayers + 1),
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

function countWinningPlayers(bitmaskAllWinningPlayers: number): number {
    let countWinningPlayers = 0;
    while (bitmaskAllWinningPlayers > 0) {
        countWinningPlayers += 1 & bitmaskAllWinningPlayers;
        bitmaskAllWinningPlayers >>= 1;
    }
    return countWinningPlayers;
}
