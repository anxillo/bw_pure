/**
 * Created by andrea on 23.02.15.
 */
// Globals
var BW =  {
    BOARD_SIZE_X : 5,
    BOARD_SIZE_Y : 5,
    src : "",
    appSrc: "",
    screenPre: ""

};

/*BW.getNr = function (x,y) {
    var nr;
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



}; */
// Go when ready
window.requestAnimationFrame(function () {



    new Game();
});





