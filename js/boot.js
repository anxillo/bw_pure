/**
 * Created by andrea on 23.02.15.
 */
// Globals
var BW =  {
    BOARD_SIZE_X : 5,
    BOARD_SIZE_Y : 5,
    STARTING_PIECES : 10,
    MAX_PIECE_VALUE : 5

};

BW.getNr = function (position) {
    var nr;
    var x = position.x;
    var y = position.y;
    nr = y * BW.BOARD_SIZE_X + x;
    return nr;
};

BW.getCoords = function (nr) {
    var coords = {};
    var x = nr % BW.BOARD_SIZE_X;
    var y = Math.floor(nr / BW.BOARD_SIZE_X);
    coords["x"] = x;
    coords["y"] = y;

    return coords;

};
// Go when ready
window.requestAnimationFrame(function () {
    new Game(); //grid size [x, y]
});





