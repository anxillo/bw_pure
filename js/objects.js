/*
 * Piece: the single piece on board
 */

function Piece(position, isTypeA, value){
    this.x                  = position.x;
    this.y                  = position.y;
    this.isTypeA            = isTypeA;
    this.value              = value;
    this.previousPosition   = null;
    this.mergedFrom         = null;
    this.removeMe           = null;
    this.customClass        = null;
}

Piece.prototype.savePosition = function () {
    this.previousPosition = { x: this.x, y: this.y };
};

Piece.prototype.updatePosition = function (position) {
    this.x = position.x;
    this.y = position.y;
};

Piece.prototype.serialize = function () {
    return {
        position: {
            x: this.x,
            y: this.y
        },
        isTypeA: this.isTypeA,
        value: this.value
    };

};





/*
 * Board: the board where the pieces are
 */

function Board(size, previousState, piecesCount) {
    this.size               = size ? size : {x: BW.BOARD_SIZE_X, y: BW.BOARD_SIZE_Y};
    this.cells              = previousState ? this.fromState(previousState) : this.createMe();
    this.piecesCount        = piecesCount ?  {a: piecesCount.a, b: piecesCount.b } : {a: 0, b: 0};  //check storage to pass those values too (todo)

}

// Build a grid of the specified size
Board.prototype.createMe = function () {
    var cells = [];

    for (var x = 0; x < this.size.x; x++) {
        var row = cells[x] = [];

        for (var y = 0; y < this.size.y; y++) {
            row.push(null);
        }
    }

    return cells;
};

//resume board if saved
Board.prototype.fromState = function (state) {
    var cells = [];

    for (var x = 0; x < this.size.x; x++) {
        var row = cells[x] = [];

        for (var y = 0; y < this.size.y; y++) {
            var piece = state[x][y];
            row.push(piece ? new Piece(piece.position, piece.isTypeA, piece.value) : null);
        }
    }
    return cells;

};

// Find the first available random position
Board.prototype.randomAvailableCell = function () {
    var cells = this.availableCells();

    if (cells.length) {
        return cells[Math.floor(Math.random() * cells.length)];
    }
};

Board.prototype.availableCells = function () {
    var cells = [];

    this.eachCell(function (x, y, piece) {
        if (!piece) {
            cells.push({ x: x, y: y });
        }
    });

    return cells;
};



// Call callback for every cell
Board.prototype.eachCell = function (callback) {
    for (var x = 0; x < this.size.x; x++) {
        for (var y = 0; y < this.size.y; y++) {
            callback(x, y, this.cells[x][y]);
        }
    }
};


Board.prototype.thereAreMoreA = function () {                           // check if there are more A pieces
    var typeAisMorePresent = (this.piecesCount.a - this.piecesCount.b);
    var isTypeA;
    isTypeA = typeAisMorePresent > 0;
    return isTypeA;
};

// Check if there are any cells available
Board.prototype.cellsAvailable = function () {
    return !!this.availableCells().length;
};

// Check if the specified cell is taken
Board.prototype.cellAvailable = function (cell) {
    return !this.cellOccupied(cell);
};

Board.prototype.cellOccupied = function (cell) {
    return !!this.cellContent(cell);
};

Board.prototype.cellContent = function (cell) {
    if (this.withinBounds(cell)) {
        return this.cells[cell.x][cell.y];
    } else {
        return null;
    }
};

// Inserts a piece at its position
Board.prototype.insertPiece = function (piece) {
    this.cells[piece.x][piece.y] = piece;
};

Board.prototype.removePiece = function (piece) {
    this.cells[piece.x][piece.y] = null;
};

Board.prototype.withinBounds = function (position) {
    return position.x >= 0 && position.x < this.size.x &&
        position.y >= 0 && position.y < this.size.y;
};

Board.prototype.countType = function (isTypeA, amount) {
    if (isTypeA) {
        this.piecesCount.b = this.piecesCount.b + amount;
    } else {
        this.piecesCount.a = this.piecesCount.a + amount;
    }
};

Board.prototype.serialize = function () {
    var cellState = [];

    for (var x = 0; x < this.size; x++) {

        var row = cellState[x] = [];

        for (var y = 0; y < this.size; y++) {
            row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);

        }
    }

    return {
        size: this.size,
        cells: cellState,
        piecesCount: {
            a: this.piecesCount.a,
            b: this.piecesCount.b
        }
    };
};







