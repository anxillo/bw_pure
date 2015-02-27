/**
 * Created by andrea on 24.02.15.
 */


function Game () {
    this.STARTING_PIECES = 10;
    this.MAX_PIECE_VALUE = 5;

    this.dom    = new DOM_handler();
    this.inputManager = new HandleEvents();
    this.storageManager = new StorageManager();
    this.score  = 0;

    this.inputManager.on("move", this.move.bind(this));
    this.inputManager.on("restart", this.restart.bind(this));
    //this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));


    this.setup();
}

//  Restart the game - ToDo
Game.prototype.restart = function () {
    // this.storageManager.clearGameState() - ToDo
    // this.dom.continueGame(); - ToDo
    this.setup();
};

// Return true if the game is lost, or has won and the user hasn't kept playing
Game.prototype.isGameTerminated = function () {
    return this.over;
};


// Set up the game
Game.prototype.setup = function () {
    //var previousState = this.storageManager.getGameState();
    var previousState = false;

    // Reload the game from a previous game if present
    if (previousState) {
        this.board        = new Board(
            previousState.board.cells); // Reload grid
        this.score       = previousState.score;
        this.over        = previousState.over;
        this.won         = previousState.won;
        this.keepPlaying = previousState.keepPlaying;
    } else {
        this.board       = new Board();
        this.score       = 0;
        this.over        = false;
        this.won         = false;
        this.keepPlaying = false;

        // Add the initial tiles
        this.addStartPieces();
    }

    // Update the DOM
    this.refresh();
};

// Set up the initial tiles to start the game with
Game.prototype.addStartPieces = function () {
    for (var i = 0; i < this.STARTING_PIECES; i++) {
        this.addRandomPiece();
    }
    console.dir(this.board.piecesCount);
};

// Adds a tile in a random position
Game.prototype.addRandomPiece = function () {
    if (this.board.cellsAvailable()) {
        var value   = Math.floor(Math.random() * this.MAX_PIECE_VALUE) + 1;
        console.log (value);
        var isTypeA = this.board.thereAreMoreA();
        var piece   = new Piece(this.board.randomAvailableCell(), isTypeA, value);
        this.board.countType(isTypeA);
        this.board.insertPiece(piece);
    }
};

// Sends the updated grid to the dom
Game.prototype.refresh = function () {

    if (this.storageManager.getBestScore() < this.score) {
        this.storageManager.setBestScore(this.score);
    }


    // Clear the state when the game is over (game over only, not win)
    /* ToDo
    if (this.over) {
        this.storageManager.clearGameState();
    } else {
        this.storageManager.setGameState(this.serialize());
    }
    */

    this.dom.refresh(this.board, {
        score:      this.score,
        over:       this.over,
        won:        this.won,
        bestScore:  this.storageManager.getBestScore(),
        terminated: this.isGameTerminated()
    });

};

// Represent the current game as an object
Game.prototype.serialize = function () {
    return {
        board:        this.board.serialize(),
        score:       this.score,
        over:        this.over,
        won:         this.won,
        keepPlaying: this.keepPlaying
    };
};

// Save all tile positions and remove merger info
Game.prototype.preparePieces = function () {
    this.board.eachCell(function (x, y, piece) {
        if (piece) {
            piece.mergedFrom = null;
            piece.savePosition();
        }
    });
};

// Move a tile and its representation
Game.prototype.movePiece = function (piece, cell) {
    this.board.cells[piece.x][piece.y] = null;
    this.board.cells[cell.x][cell.y] = tile;
    piece.updatePosition(cell);
};


Game.prototype.move = function (direction, x,y) {
    console.log("moved " + direction + "x: " + x + " Y: " + y);

};



