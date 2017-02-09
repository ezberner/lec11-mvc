"use strict";
//Fill me in!!
var Controller = (function () {
    function Controller(game, view) {
        this.game = game;
        this.view = view;
        game.register(view); // listen to the model!
        view.setController(this); // talk to me!
    }
    Controller.prototype.play = function () {
        this.view.display();
    };
    Controller.prototype.takeTurn = function (row, col) {
        if (this.game.getWinner() == undefined) {
            this.game.makeMove(row, col);
        }
    };
    return Controller;
}());
exports.Controller = Controller;
