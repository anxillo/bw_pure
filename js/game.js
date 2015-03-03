/**
 * Created by andrea on 24.02.15.
 */


function Game () {
    this.STARTING_PIECES = 14;
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

//  Restart the game
Game.prototype.restart = function () {
     this.storageManager.clearGameState();
     this.dom.continueGame();
    this.setup();
};

// Return true if the game is lost, or has won and the user hasn't kept playing
Game.prototype.isGameTerminated = function () {
    return this.over || this.won
};


// Set up the game
Game.prototype.setup = function () {
    var previousState = this.storageManager.getGameState();

    //var previousState = false;



    // Reload the game from a previous game if present
    if (previousState) {
        this.board        = new Board(  previousState.board.size,
                                        previousState.board.cells,
                                        previousState.board.piecesCount); // Reload board

        this.score       = previousState.score;
        this.over        = previousState.over;
        this.won         = previousState.won;
        //this.keepPlaying = previousState.keepPlaying;
    } else {
        this.board       = new Board();
        this.score       = 0;
        this.over        = false;
        this.won         = false;
        //this.keepPlaying = false;

        // Add the initial pieces
        this.addStartPieces();
    }

    // Update the DOM
    this.refresh();
};

// Set up the initial pieces to start the game with
Game.prototype.addStartPieces = function () {
    for (var i = 0; i < this.STARTING_PIECES; i++) {
        this.addRandomPiece();
    }
    console.dir(this.board.piecesCount);
};

// Adds a piece in a random position
Game.prototype.addRandomPiece = function () {
    if (this.board.cellsAvailable()) {
        var value   = Math.floor(Math.random() * this.MAX_PIECE_VALUE) + 1;
        console.log (value);
        var isTypeA = this.board.thereAreMoreA();
        var piece   = new Piece(this.board.randomAvailableCell(), isTypeA, value);
        this.board.countType(isTypeA, 1);
        this.board.insertPiece(piece);
    }
};

// Sends the updated board to the dom
Game.prototype.refresh = function () {

    if (this.storageManager.getBestScore() < this.score) {
        this.storageManager.setBestScore(this.score);
    }


    // Clear the state when the game is over (game over only, not win)

    if (this.over) {
        this.storageManager.clearGameState();
    } else {
        this.storageManager.setGameState(this.serialize());




    }


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
    console.dir(this.board.serialize());

    return {
        board:       this.board.serialize(),
        score:       this.score,
        over:        this.over,
        won:         this.won
        //keepPlaying: this.keepPlaying
    };


};

// Save all piece positions and remove merger info
Game.prototype.preparePieces = function () {


    this.board.eachCell(function (x, y, piece) {
        if (piece) {
            piece.mergedFrom = null;
            piece.customClass = null;
            piece.savePosition();
        }
    });
};

// Move a piece and its representation
Game.prototype.movePiece = function (piece, cell) {
    this.board.cells[piece.x][piece.y] = null;
    this.board.cells[cell.x][cell.y] = piece;
    piece.updatePosition(cell);

    // this.board.cells[cell.x][cell.y].customClass = "piece-new";
};


Game.prototype.move = function (direction, x,y) {
    var self = this;

    if (this.isGameTerminated()) return; // Don't do anything if the game's over

    var cell = { x: x, y: y };
    var piece = self.board.cellContent(cell);
    var vector     = this.getVector(direction);
    var positions = self.findFarthestPosition(cell, vector);
    var next      = self.board.cellContent(positions.next);

    // Save the current piece positions and remove merger information

    this.preparePieces();

    //next is not a piece, just move near
    if (!next || piece.isTypeA !== next.isTypeA && piece.value !== next.value) {
        self.movePiece(piece, positions.farthest);
    } else


    // same color: sum,
    if(piece.isTypeA === next.isTypeA) {
        var merged = new Piece(positions.next, piece.isTypeA,  piece.value + next.value);
        merged.mergedFrom = [piece, next];

        self.board.insertPiece(merged);
        self.board.removePiece(piece);

        // Converge the two tiles' positions
        piece.updatePosition(positions.next);

        // Update the score
        self.score += merged.value;

        // Update piece count
        self.board.countType(next.isTypeA, -1);
        self.addRandomPiece();
        self.addRandomPiece();
        self.addRandomPiece();


    } else

    // different color same value : boom

    if( piece.isTypeA !== next.isTypeA && piece.value === next.value ) {



        self.score += piece.value * next.value;


        self.board.removePiece(piece);
        self.board.removePiece(next);
        self.board.countType(true, -1);
        self.board.countType(false, -1);

        self.addRandomPiece();
    }


    if(!this.board.cellsAvailable()) {
        this.over = true;
    }

    if(this.board.piecesCount.a + this.board.piecesCount.b === 0) {
        this.score = this.score * 10;
        this.won = true;
    }



    this.refresh();

};


// Get the vector representing the chosen direction
Game.prototype.getVector = function (direction) {
    // Vectors representing piece movement
    var map = {
        0: { x: 0,  y: -1 }, // Up
        1: { x: 1,  y: 0 },  // Right
        2: { x: 0,  y: 1 },  // Down
        3: { x: -1, y: 0 }   // Left
    };

    return map[direction];
};

Game.prototype.findFarthestPosition = function (cell, vector) {
    var previous;

    // Progress towards the vector direction until an obstacle is found
    do {
        previous = cell;
        cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.board.withinBounds(cell) &&
    this.board.cellAvailable(cell));

    return {
        farthest: previous,
        next: cell // Used to check if a merge is required
    };
};


