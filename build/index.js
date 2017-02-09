"use strict";
var model_1 = require("./model");
var view_web_1 = require("./view-web"); // used to be just './view'
var controller_web_1 = require("./controller-web");
var game = new model_1.Model();
var view = new view_web_1.View(game);
var ctrl = new controller_web_1.Controller(game, view);
console.log("starting game...");
view.display(); // added this in class
ctrl.play();
