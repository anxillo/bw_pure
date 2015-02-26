/**
 * Created by andrea on 25.02.15.
 */
function DOM_handler () {
  this.PIECES_CONTAINER = document.querySelector(".pieces-container");

    //this.handleEvents = new HandleEvents();


}


/*
 * Render function: render the board.
 */
DOM_handler.prototype.render = function (board) {
    var _this = this;
    var length = board.cells.length;
    var cells   = board.cells;

    this.clearContainer(this.PIECES_CONTAINER);
    window.requestAnimationFrame(function () {
        for (var i = 0; i < length; i++) {

            if (cells[i]) {
                _this.addPiece(cells[i]);
            }
        }
    });
};

DOM_handler.prototype.addPiece = function (piece) {
    var _this = this;
    var wrapper   = document.createElement("div");
    var inner     = document.createElement("div");
    var nr  = piece.previousPosition || piece.nr;
    var typePiece = piece.isTypeA;
    var typePieceClass = typePiece ? "piece-a" : "piece-b";
    var positionClass  =  this.positionClass(nr);
    var classes = ["piece",  typePieceClass, positionClass];

    this.applyClasses(wrapper, classes);
    this.applyPositionData (inner, nr);

    inner.classList.add("piece-inner");
    inner.textContent = piece.value;



    if (piece.previousPosition) {
        // Make sure that the tile gets rendered in the previous position first
        window.requestAnimationFrame(function () {
            classes[2] = _this.positionClass(nr);
            _this.applyClasses(wrapper, classes); // Update the position
        });
    }

    // Add the inner part of the tile to the wrapper
    wrapper.appendChild(inner);



    // Put the tile on the board
    this.PIECES_CONTAINER.appendChild(wrapper);
};


DOM_handler.prototype.applyPositionData = function (element, nr) {
    var coords = BW.getCoords(nr);
    element.setAttribute("Data-x", coords.x);
    element.setAttribute("Data-y", coords.y);
};

DOM_handler.prototype.positionClass = function (nr) {
    var coords = BW.getCoords(nr);
    return "piece-position-" + coords.x + "-" + coords.y;
};

DOM_handler.prototype.applyClasses = function (element, classes) {
    element.setAttribute("class", classes.join(" "));
};

DOM_handler.prototype.clearContainer = function (container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

