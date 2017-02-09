/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var model_1 = __webpack_require__(2);
var view_1 = __webpack_require__(3);
var controller_1 = __webpack_require__(1);
var game = new model_1.Model();
var view = new view_1.View(game);
var ctrl = new controller_1.Controller(game, view);
console.log("starting game...");
ctrl.play();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
//for CLI interactiv
var readline = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"readline\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));
var io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Controller = (function () {
    function Controller(game, view) {
        this.game = game;
        this.view = view;
    }
    //starts the game
    Controller.prototype.play = function () {
        this.view.printBoard();
        this.takeTurn();
    };
    Controller.prototype.takeTurn = function () {
        var _this = this;
        this.view.printPrompt();
        io.question('> ', function (input) {
            try {
                var cell = input.split(',');
                //make a move!
                var result = _this.game.makeMove(Number(cell[0]), Number(cell[1]));
                if (result) {
                    _this.view.printBoard();
                    if (_this.game.getWinner() !== undefined) {
                        _this.view.printWinner(_this.game.getWinner());
                        io.close();
                        return; //end
                    }
                }
            }
            catch (e) { } //for parsing errors
            _this.takeTurn(); //recurse!
        });
    };
    return Controller;
}());
exports.Controller = Controller;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Represents a game of Tic Tac Toe.
 * Board size is hard-coded at 3.
 */
var Model = (function () {
    function Model() {
        this.currentPlayer = 0;
        this.winner = undefined;
        this.size = 3; //hard-coded for simplicity
        /* Subject methods (Observer pattern) */
        this.observers = [];
        this.resetBoard(); //initialize board
    }
    Model.prototype.resetBoard = function () {
        this.gameBoard = [
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
        ];
    };
    //returns if sucessful or not
    Model.prototype.makeMove = function (x, y) {
        if (this.winner)
            return false; //don't move if won
        if (x < 0 || x > 2 || y < 0 || y > 2)
            return false; //out of bounds
        if (this.gameBoard[x][y] !== undefined)
            return false; //don't move if illegal
        this.gameBoard[x][y] = this.currentPlayer; //make move
        //check if we now have a winner
        var gb = this.gameBoard;
        //check row
        if (gb[x][0] == gb[x][1] && gb[x][1] == gb[x][2])
            this.winner = this.currentPlayer;
        //check col
        if (gb[0][y] == gb[1][y] && gb[1][y] == gb[2][y])
            this.winner = this.currentPlayer;
        //check diag
        if (gb[1][1] !== undefined && ((gb[0][0] == gb[1][1] && gb[1][1] == gb[2][2]) ||
            (gb[2][0] == gb[1][1] && gb[1][1] == gb[0][2])))
            this.winner = this.currentPlayer;
        this.currentPlayer = (this.currentPlayer + 1) % 2; //toggle
        return true;
    };
    Model.prototype.getPiece = function (x, y) {
        if (x < 0 || x > 2 || y < 0 || y > 2)
            return undefined; //out of bounds
        return this.gameBoard[x][y];
    };
    Model.prototype.getBoard = function () {
        return this.gameBoard;
    };
    Model.prototype.getCurrentPlayer = function () {
        return this.currentPlayer;
    };
    Model.prototype.getWinner = function () {
        return this.winner;
    };
    Model.prototype.register = function (obs) {
        this.observers.push(obs);
    };
    Model.prototype.unregister = function (obs) {
        var index = this.observers.indexOf(obs);
        this.observers.splice(index, 1); //remove (untested :p)
    };
    Model.prototype.notifyAll = function () {
        this.observers.forEach(function (obs) { return obs.notify(); });
    };
    return Model;
}());
exports.Model = Model;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var View = (function () {
    function View(game) {
        this.game = game;
        this.playerSymbols = [' ', 'X', 'O']; //for display
    }
    View.prototype.printBoard = function () {
        //print the board
        console.log("    0   1   2");
        for (var i = 0; i < this.game.size; i++) {
            var row = i + "   ";
            for (var j = 0; j < this.game.size; j++) {
                var player = this.game.getPiece(i, j);
                if (player === undefined)
                    player = -1;
                row += this.playerSymbols[player + 1];
                if (j < this.game.size - 1)
                    row += " | ";
            }
            console.log(row);
            if (i < this.game.size - 1)
                console.log("   -----------");
        }
        console.log("");
    };
    View.prototype.printPrompt = function () {
        var player = this.playerSymbols[this.game.getCurrentPlayer() + 1];
        console.log(player + "'s turn. Pick a spot [row, col]");
    };
    View.prototype.printWinner = function (winner) {
        var player = this.playerSymbols[winner + 1];
        console.log(player + " is the winner!");
    };
    return View;
}());
exports.View = View;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map