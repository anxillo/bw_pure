
window.fakeStorage = {
    _data: {},

    setItem: function (id, val) {
        return this._data[id] = String(val);
    },

    getItem: function (id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },

    removeItem: function (id) {
        return delete this._data[id];
    },

    clear: function () {
        return this._data = {};
    }
};

function StorageManager() {
    this.bestScoreKey     = "bestScore";
    this.gameStateKey     = "gameState";
    this.hasSoundKey      = "hasSound";

    var supported = this.localStorageSupported();
    this.storage = supported ? window.localStorage : window.fakeStorage;
}

StorageManager.prototype.localStorageSupported = function () {
    var testKey = "test";
    var storage = window.localStorage;

    try {
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};

// Best score getters/setters
StorageManager.prototype.getBestScore = function () {
    return this.storage.getItem(this.bestScoreKey) || 0;
};

StorageManager.prototype.setBestScore = function (score) {
    this.storage.setItem(this.bestScoreKey, score);
};

StorageManager.prototype.getHasSound = function () {
    var storageToBool = true;
    if (this.storage.getItem(this.hasSoundKey) == "hasNoSound") {
        storageToBool = false;
    }
    return storageToBool;
};

StorageManager.prototype.setHasSound = function (hasSound) {
    var stringToStorage = "";

    if (hasSound) {
        stringToStorage = "hasSound";
    } else {
        stringToStorage = "hasNoSound";
    }

    this.storage.setItem(this.hasSoundKey, stringToStorage);
};



// Game state getters/setters and clearing
StorageManager.prototype.getGameState = function () {
    var stateJSON = this.storage.getItem(this.gameStateKey);
    return stateJSON ? JSON.parse(stateJSON) : null;
};

StorageManager.prototype.setGameState = function (gameState) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

StorageManager.prototype.clearGameState = function () {
    this.storage.removeItem(this.gameStateKey);
};