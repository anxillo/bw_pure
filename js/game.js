/**
 * Created by andrea on 24.02.15.
 */


function Game () {
    this.board  = new Board();
    this.dom    = new DOM_handler();
    this.inputManager = new HandleEvents();
    this.score  = 0;


    this.inputManager.on("move", this.move.bind(this));
    //this.inputManager.on("restart", this.restart.bind(this));

    this.setup();
}

/*
 * Game setup
 */

Game.prototype.setup = function () {
    this.insertPieces (BW.STARTING_PIECES);
    this.dom.render(this.board);

};

Game.prototype.insertPieces = function (nr) {                       // insert nr. pieces
    for (var i = 0; i < nr; i++) {
        this.board.insertPiece();
    }
};

Game.prototype.move = function (direction, x,y) {
    console.log("moved " + direction + "x: " + x + " Y: " + y);

};


/*
 * Game Over - ToDo
 */

Game.gameOver  = function (cause) {
    throw new Error("GAME OVER: " + cause + ".");

};
