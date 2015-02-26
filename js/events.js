/**
 * Created by andrea on 26.02.15.
 */
function HandleEvents () {
    this.events = {};
    this.touchSupport = null;

    if(window.navigator.msPointerEnabled) {
        this.touchSupport = 1;                              //msPointerEnabled
    } else if("ontouchstart" in window) {
        this.touchSupport = 2;                              // touch support
    } else {
        this.touchSupport = 0;                              // no touch support
    }

    switch (this.touchSupport) {
        case 1: //msPointer
            this.eventTouchstart    = "MSPointerDown";
            this.eventTouchmove     = "MSPointerMove";
            this.eventTouchend      = "MSPointerUp";
            break;

        case 2: // touch support
            this.eventTouchstart    = "touchstart";
            this.eventTouchmove     = "touchmove";
            this.eventTouchend      = "touchend";
            break;

        default: // mouse
            this.eventTouchstart    = "mousedown";
            this.eventTouchmove     = "mousemove";
            this.eventTouchend      = "mouseup";
    }

    console.log(this.touchSupport);


    this.listen();

}

HandleEvents.prototype.on = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
};

HandleEvents.prototype.emit = function (event, data, x, y) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback(data,x ,y );
        });
    }
};

HandleEvents.prototype.listen = function () {
    var self = this;

    // Respond to button presses
    //this.bindButtonPress(".retry-button", this.restart);
    //this.bindButtonPress(".restart-button", this.restart);

    // Respond to swipe events
    var touchStartClientX, touchStartClientY;
    var datasetX, datasetY;
    var gameContainer = document.getElementsByClassName("game-container")[0];

    gameContainer.addEventListener(this.eventTouchstart, function (event) {
        datasetX = parseInt(event.target.dataset.x);
        datasetY = parseInt(event.target.dataset.y);
        if (isNaN(datasetX)) {      // if there is not a data present then is a useless move
            return;
        }

        if(event.type !== "mousedown") {
            if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||
                event.targetTouches > 1) {
                return;             // no need for multitouch
            }
        }

        console.log(event.type);
        switch (event.type) {
            case "MSPointerDown":
                touchStartClientX = event.pageX;
                touchStartClientY = event.pageY;
                break;

            case "touchstart":
                touchStartClientX = event.touches[0].clientX;
                touchStartClientY = event.touches[0].clientY;
                break;

            default:
                touchStartClientX = event.layerX;
                touchStartClientY = event.layerY;
        }


        event.preventDefault();
    });

    gameContainer.addEventListener(this.eventTouchmove, function (event) {
        event.preventDefault();
    });

    gameContainer.addEventListener(this.eventTouchend, function (event) {
        if(event.type !== "mouseup") {
            if ((!window.navigator.msPointerEnabled && event.touches.length > 0) ||
                event.targetTouches > 0) {
                return; // Ignore if still touching with one or more fingers
            }
        }

        if (isNaN(datasetX)) {      // if there is not a data present then is a useless move
            return;
        }

        var touchEndClientX, touchEndClientY;
        console.dir(event.touches);
        switch (event.type) {
            case "MSPointerUp":
                touchEndClientX = event.pageX;
                touchEndClientY = event.pageY;
                break;

            case "touchend":
                touchEndClientX = event.changedTouches[0].clientX;
                touchEndClientY = event.changedTouches[0].clientY;
                break;

            default:
                touchEndClientX = event.layerX;
                touchEndClientY = event.layerY;
        }

        var dx = touchEndClientX - touchStartClientX;
        var absDx = Math.abs(dx);

        var dy = touchEndClientY - touchStartClientY;
        var absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 10) {
            // (right : left) : (down : up)
            self.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0),datasetX, datasetY);
        }
    });
};





