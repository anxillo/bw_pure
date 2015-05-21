/**
 * Created by andrea on 24.02.15.
 */


function Game () {
    this.STARTING_PIECES = 14;
    this.MAX_PIECE_VALUE = 5;
    this.MAX_MOVES = 100;

    this.dom    = new DOM_handler();
    this.inputManager = new HandleEvents();
    this.storageManager = new StorageManager();
    this.score  = 0;

    this.inputManager.on("move", this.move.bind(this));
    this.inputManager.on("restart", this.restart.bind(this));
    this.inputManager.on("closeMenu", this.closeMenu.bind(this));
    this.inputManager.on("openMenu", this.openMenu.bind(this));
    this.inputManager.on("openHowTo", this.openHowTo.bind(this));

    this.inputManager.on("nextHowTo1", this.nextHowTo1.bind(this));
    this.inputManager.on("nextHowTo2", this.nextHowTo2.bind(this));
    this.inputManager.on("nextHowTo3", this.nextHowTo3.bind(this));
    this.inputManager.on("nextHowTo4", this.nextHowTo4.bind(this));

    this.inputManager.on("switchSound", this.switchSound.bind(this));
    this.inputManager.on("socialShare", this.socialShare.bind(this));

    this.hasSound    = this.storageManager.getHasSound();
    this.dom.switchSound(this.hasSound);


    this.setup();
}

//  Restart the game
Game.prototype.restart = function () {
    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }

    if (typeof admob != 'undefined') {
        admob.showInterstitialAd();

        admob.requestInterstitialAd({
            publisherId: "ca-app-pub-4711044414330488/7526333057",
            interstitialAdId: "ca-app-pub-4711044414330488/3176858659",
            autoShowInterstitial: false
        });
    }


     this.storageManager.clearGameState();
     this.dom.continueGame();
    this.setup();
};

// Return true if the game is lost, or has won and the user hasn't kept playing
Game.prototype.isGameTerminated = function () {

    return this.over || this.won
};

Game.prototype.closeMenu = function () {

    if (typeof admob != 'undefined') {
        admob.showBannerAd(true);
    }

    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }

    this.dom.closeMenu();

};

Game.prototype.openMenu = function () {
    if (typeof admob != 'undefined') {
        admob.showBannerAd(false);
    }

    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }

    this.dom.openMenu();
};

Game.prototype.openHowTo = function () {
    if(typeof analytics != 'undefined') {
        analytics.trackEvent('Button', 'click', "HowTo Button", 1);
    }

    if (typeof admob != 'undefined') {
        admob.showBannerAd(false);
    }

    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }

    this.dom.openHowTo();
};

Game.prototype.nextHowTo1 = function () {

    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }

    this.dom.nextHowTo(1);
};

Game.prototype.nextHowTo2 = function () {

    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }

    this.dom.nextHowTo(2);
};

Game.prototype.nextHowTo3 = function () {

    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }

    this.dom.nextHowTo(3);
};

Game.prototype.nextHowTo4 = function () {

    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }

    this.dom.nextHowTo(4);
};

Game.prototype.switchSound = function () {


    if(typeof analytics != 'undefined') {
        analytics.trackEvent('Button', 'click', "sound Button", 1);
    }

    if(this.hasSound === true){
        this.hasSound = false;
    } else {
        this.hasSound = true;
    }

    //this.storageManager.setGameState(this.serialize());
    this.storageManager.setHasSound(this.hasSound);
    this.dom.switchSound(this.hasSound);
    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }

};

Game.prototype.socialShare = function () {
    if(typeof analytics != 'undefined') {
        analytics.trackEvent('Button', 'click', 'Social Button', 1);
    }

    if (typeof BW.clickSound != 'undefined' && this.hasSound) {
        BW.clickSound.play();
    }


    //this.dom.closeMenu();

    var label = "Hi! I'm playing Numentum and my highscore is " + this.storageManager.getBestScore();
    label = label + ". Get it at " + BW.appSrc + " and try to beat me.";

    var screenshot = "";
    if (typeof navigator.screenshot !='undefined') {

        navigator.screenshot.save(function(error,res){
            if(error){
                console.error(error);
                if(typeof analytics != 'undefined') {
                    analytics.trackEvent('Error', 'screenshot', 'Screenshot plugin error', 1);
                }
            }else{
                console.log(res.filepath);
                screenshot = BW.screenPre + res.filePath;
                if(typeof window.plugins.socialsharing != 'undefined' ) {
                    if(screenshot!='') {
                        window.plugins.socialsharing.share(label, null, screenshot);
                    }
                }
            }
        },'jpg',50,'numentumScreenshot');
    }

    if(typeof navigator.screenshot == 'undefined' && typeof window.plugins.socialsharing != 'undefined') {
        window.plugins.socialsharing.share(label);
    }




};

// Set up the game
Game.prototype.setup = function () {
    if(typeof analytics != 'undefined') {
        analytics.trackEvent('Event', 'setup', 'new game setup', 1);
    }

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
        this.moves       = previousState.moves;
        //this.hasSound    = previousState.hasSound;
        //this.keepPlaying = previousState.keepPlaying;
    } else {
        this.board       = new Board();
        this.score       = 0;
        this.over        = false;
        this.won         = false;
        this.moves       = this.MAX_MOVES;
        //this.hasSound    = true;
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
        var isTypeA = this.board.thereAreMoreA();
        var piece   = new Piece(this.board.randomAvailableCell(), isTypeA, value);
        this.board.countType(isTypeA, 1);
        this.board.insertPiece(piece);
    }
};

// Sends the updated board to the dom
Game.prototype.refresh = function () {

    //this.moves = this.moves - 1;

    if (this.moves === 0) {
        this.over = true;
    }

    if (this.storageManager.getBestScore() < this.score) {
        this.storageManager.setBestScore(this.score);
    }


    // Clear the state when the game is over (game over only, not win)

    if (this.over) {
        if(typeof analytics != 'undefined') {
            analytics.trackEvent('Game End', 'game over', 'Game Over', 1);
        }

        if (typeof BW.gameoverSound != 'undefined' && this.hasSound) {
            BW.gameoverSound.play();
        }

        this.storageManager.clearGameState();
    } else {
        this.storageManager.setGameState(this.serialize());

    }



    this.dom.refresh(this.board, {
        score:      this.score,
        over:       this.over,
        moves:      this.moves,
        won:        this.won,
        bestScore:  this.storageManager.getBestScore(),
        terminated: this.isGameTerminated()
    });


};

// Represent the current game as an object
Game.prototype.serialize = function () {

    return {
        board:       this.board.serialize(),
        score:       this.score,
        over:        this.over,
        won:         this.won,
        moves:       this.moves
        //hasSound:    this.hasSound
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
        this.moves = this.moves - 1;
        if (typeof BW.swipeSound != 'undefined' && this.hasSound) {
            BW.swipeSound.play();
        }

        self.movePiece(piece, positions.farthest);
    } else


    // same color: sum,
    if(piece.isTypeA === next.isTypeA) {
        this.moves = this.moves - 1;

        if (typeof BW.blobSound != 'undefined' && this.hasSound) {
            BW.blobSound.play();
        }

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
        //try with randomize the number of new Pieces
        //var howManyNew = Math.floor(Math.random() * 5);

        for (var i = 0; i < 5; i++) {
            self.addRandomPiece();
        }



    } else

    // different color same value : boom

    if( piece.isTypeA !== next.isTypeA && piece.value === next.value ) {

        this.moves = this.moves - 1;

        if (typeof BW.popSound != 'undefined' && this.hasSound) {
            BW.popSound.play();
        }

        self.score += piece.value * next.value;


        self.board.removePiece(piece);
        self.board.removePiece(next);
        self.board.countType(true, -1);
        self.board.countType(false, -1);
        console.log(this.board.piecesCount.a + this.board.piecesCount.b);
        if (this.board.piecesCount.a + this.board.piecesCount.b > 2) {
            self.addRandomPiece();
        }
    }


    if(!this.board.cellsAvailable()) {
        this.over = true;
    }

    if(this.board.piecesCount.a + this.board.piecesCount.b === 0) {
        this.score = this.score * this.moves;

        if(typeof analytics != 'undefined') {
            analytics.trackEvent('Game End', 'game won', 'game Won', 1);
        }

        if (typeof BW.finalSound != 'undefined' && this.hasSound) {
            BW.finalSound.play();
        }

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


