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
        this.notifyAll(); // added in class - let every know who has changed
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
