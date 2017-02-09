"use strict";
var $ = require("jquery");
var View = (function () {
    function View(game) {
        this.game = game;
        this.playerSymbols = [' ', 'X', 'O'];
    }
    View.prototype.setController = function (ctrl) {
        this.ctrl = ctrl;
    };
    View.prototype.display = function () {
        var _this = this;
        console.log("displaying...");
        var gamebox = $('#game-box');
        gamebox.empty(); //clear old display
        var _loop_1 = function (i) {
            var row = $('<div>'); //a row for the button
            var _loop_2 = function (j) {
                var player = this_1.game.getPiece(i, j);
                if (player === undefined)
                    player = -1;
                var button = $('<button class="btn btn-default">' + this_1.playerSymbols[player + 1] + '</button>');
                button.click(function (e) { return _this.handleClick(i, j); }); //closure!!
                row.append(button);
            };
            for (var j = 0; j < this_1.game.size; j++) {
                _loop_2(j);
            }
            gamebox.append(row);
        };
        var this_1 = this;
        // make grid of buttons
        for (var i = 0; i < this.game.size; i++) {
            _loop_1(i);
        }
        //show winner, if any
        var winner = this.game.getWinner();
        if (winner !== undefined) {
            this.showWinner(winner);
            $('button').attr('disabled', 'disabled'); //disable all the buttons
        }
        else {
            this.showPrompt(); //show prompt for next move
        }
    };
    View.prototype.showPrompt = function () {
        var player = this.playerSymbols[this.game.getCurrentPlayer() + 1];
        $('#message').html('<p class="lead">' + player + "'s turn. Pick a spot!" + '</p>');
    };
    View.prototype.showWinner = function (winner) {
        var player = this.playerSymbols[winner + 1];
        $('#message').html('<p class="lead">' + player + " is the winner!" + '</p>');
    };
    //callback for clicking
    View.prototype.handleClick = function (row, col) {
        console.log("You clicked", row, col);
        this.ctrl.takeTurn(row, col);
    };
    // added this in class
    View.prototype.notify = function () {
        this.display();
    };
    return View;
}());
exports.View = View;
