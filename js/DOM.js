/**
 * Created by andrea on 25.02.15.
 */
function DOM_handler () {
    this.PIECES_CONTAINER = document.querySelector(".pieces-container");
    this.SCORE_CONTAINER   = document.querySelector(".score-container");
    this.BEST_CONTAINER    = document.querySelector(".best-container");
    this.MESSAGE_CONTAINER = document.querySelector(".game-message");
    this.MAIN_MENU = document.querySelector(".mainMenu");
    this.HOW_TO = document.querySelector(".howTo");
    this.MOVES_CONTAINER = document.querySelector(".moves-left")

    this.score = 0;


}


DOM_handler.prototype.closeMenu = function () {
    this.HOW_TO.style.display = "none";
    if (this.MAIN_MENU.classList.contains("slide-right")) {
        this.MAIN_MENU.classList.remove("slide-right");
    }
    this.MAIN_MENU.classList.add("slide-left");
};

DOM_handler.prototype.openMenu = function() {
    this.clearMessage();
    //this.MESSAGE_CONTAINER.style.display = "none";
    if (this.MAIN_MENU.classList.contains("slide-left")) {
        this.MAIN_MENU.classList.remove("slide-left");
    }
    this.MAIN_MENU.classList.add("slide-right");
};

DOM_handler.prototype.openHowTo = function () {
    this.HOW_TO.style.display = "block";
    if (this.MAIN_MENU.classList.contains("slide-right")) {
        this.MAIN_MENU.classList.remove("slide-right");
    }
    this.MAIN_MENU.classList.add("slide-left");
};


/*
 * Render function: render the board.
 */
DOM_handler.prototype.refresh = function (board, metadata) {
    var self = this;

    window.requestAnimationFrame(function () {
        self.clearContainer(self.PIECES_CONTAINER);

        board.cells.forEach(function (column) {
            column.forEach(function (cell) {
                if (cell) {
                    self.addPiece(cell);
                }
            });
        });

        self.updateScore(metadata.score);
        self.updateBestScore(metadata.bestScore);
        self.updateMoves(metadata.moves);

        if (metadata.terminated) {
            if (metadata.over) {
                self.message(false); // You lose
            } else if (metadata.won) {
                self.message(true); // You win!
            }
        }
    });
};


// Continues the game (both restart and keep playing)
DOM_handler.prototype.continueGame = function () {
    this.clearMessage();
};

DOM_handler.prototype.clearContainer = function (container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

DOM_handler.prototype.addPiece = function (piece) {
    var self = this;

    var wrapper   = document.createElement("div");
    var inner     = document.createElement("div");
    var position  = piece.previousPosition || { x: piece.x, y: piece.y };
    var positionClass = this.positionClass(position);
    var typePiece = piece.isTypeA;
    var typePieceClass = typePiece ? "piece-a" : "piece-b";

    var classes = ["piece",  typePieceClass, positionClass];

    this.applyClasses(wrapper, classes);
    this.applyPositionData (inner, position);

    inner.classList.add("piece-inner");
    inner.textContent = piece.value;

    if (piece.previousPosition) {
        // Make sure that the piece gets rendered in the previous position first
        window.requestAnimationFrame(function () {
            classes[2] = self.positionClass({ x: piece.x, y: piece.y });
            self.applyPositionData (inner, { x: piece.x, y: piece.y });
            self.applyClasses(wrapper, classes); // Update the position
        });

    } else if (piece.mergedFrom) {
        classes.push("tile-merged");
        this.applyClasses(wrapper, classes);

        // Render the tiles that merged
        piece.mergedFrom.forEach(function (merged) {
            self.addPiece(merged);
        });
    } else {
        classes.push("piece-new");
        this.applyClasses(wrapper, classes);
    }



    // Add the inner part of the piece to the wrapper
    wrapper.appendChild(inner);

    // Put the piece on the board
    this.PIECES_CONTAINER.appendChild(wrapper);
};



DOM_handler.prototype.normalizePosition = function (position) {
    return { x: position.x + 1, y: position.y + 1 };
};


DOM_handler.prototype.applyPositionData = function (element, position) {
    //position = this.normalizePosition(position);
    element.setAttribute("Data-x", position.x);
    element.setAttribute("Data-y", position.y);
};

DOM_handler.prototype.positionClass = function (position) {
    position = this.normalizePosition(position);
    return "piece-position-" + position.x + "-" + position.y;
};


DOM_handler.prototype.applyClasses = function (element, classes) {
    element.setAttribute("class", classes.join(" "));
};

DOM_handler.prototype.clearContainer = function (container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

DOM_handler.prototype.updateScore = function (score) {
    this.clearContainer(this.SCORE_CONTAINER);

    var difference = score - this.score;
    this.score = score;

    this.SCORE_CONTAINER.textContent = this.score;

    if (difference > 0) {
        var addition = document.createElement("div");
        addition.classList.add("score-addition");
        addition.textContent = "+" + difference;

        this.SCORE_CONTAINER.appendChild(addition);
    }
};

DOM_handler.prototype.updateMoves = function(moves) {
    this.MOVES_CONTAINER.textContent = moves;
}

DOM_handler.prototype.updateBestScore = function (bestScore) {
    this.BEST_CONTAINER.textContent = bestScore;
};

DOM_handler.prototype.message = function (won) {
    var type    = won ? "game-won" : "game-over";
    var message = won ? "You win!" : "Game over!";

    this.MESSAGE_CONTAINER.classList.add(type);
    this.MESSAGE_CONTAINER.getElementsByTagName("p")[0].textContent = message;


};

DOM_handler.prototype.clearMessage = function () {
    // IE only takes one value to remove at a time.
    this.MESSAGE_CONTAINER.classList.remove("game-won");
    this.MESSAGE_CONTAINER.classList.remove("game-over");
};

