/*
 * Piece: the single piece on board
 */

function Piece(nr, isTypeA, value){
    this.nr                 = nr;
    this.isTypeA            = isTypeA;
    this.value              = value;
    this.previousPosition   = null;
}

Piece.prototype.savePosition = function () {
    this.previousPosition = this.nr;
};

Piece.prototype.updatePosition = function (position) {
    this.nr = position.nr;
};





/*
 * Board: the board where the pieces are
 */

function Board() {
    this.size = {x: BW.BOARD_SIZE_X, y: BW.BOARD_SIZE_Y};
    this.cells =  this.create();
    this.piecesCount = {a : 0, b : 0};
    this.availableCells = this.listAllCells();
}

Board.prototype.size = function (){

};

Board.prototype.create = function () {
    var cells = [];
    var length = this.size.x * this.size.y;

    for (var i = 0; i < length; i++) {
        cells.push(null);
    }

    return cells;
};

Board.prototype.listAllCells = function () {
    var cells = [];
    var lenght = this.size.x * this.size.y;

    for (var i = 0; i < lenght; i++) {
        cells.push(i);
    }

    return cells;
};

Board.prototype.boardIsFull = function () {
    return (this.availableCells.length == 0);                            // if lenght = 0 return true, else false

};

Board.prototype.thereAreMoreA = function () {                           // check if there are more A pieces
    var typeAisMorePresent = (this.piecesCount.a - this.piecesCount.b);
    var isTypeA;
    isTypeA = typeAisMorePresent > 0;
    return isTypeA;
};



Board.prototype.insertPiece = function () {
    if (!this.boardIsFull()) {                                            // if there are
        var freeCellsNr = this.availableCells.length;
        var freeCells = this.availableCells;
        var oneFreeCellId = Math.floor(Math.random() * freeCellsNr);   // select a random cell
        var value = Math.floor(Math.random() * (BW.MAX_PIECE_VALUE)) +1;
        var position = this.availableCells[oneFreeCellId];                     // set as position for the cell

        var isTypeA = this.thereAreMoreA();                             // set the type of piece
        var piece = new Piece(position,isTypeA, value);                                          // create new piece;
        var cells = this.cells;
        cells[position] = piece;                                      // put the piece in the board
        freeCells.splice(oneFreeCellId, 1);                          // remove from availableCells array
        if (isTypeA){                                                   //  typeA or typeB +1
            this.piecesCount.b++
        } else this.piecesCount.a++;


// if the board is full: GAME OVER

    } else Game.gameOver("board is full");
};







