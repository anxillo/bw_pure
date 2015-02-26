/**
 * Created by andrea on 24.02.15.
 */


function Game () {



    this.board        = new Board();
    this.dom            = new DOM_handler();
    this.score       = 0;

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




/*
 * Game Over - ToDo
 */

Game.gameOver  = function (cause) {
    throw new Error("GAME OVER: " + cause + ".");

};
