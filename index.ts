import {Model} from './model';
import {View} from './view-web'; // used to be just './view'
import {Controller} from './controller-web';

let game:Model = new Model();
let view:View = new View(game);
let ctrl:Controller = new Controller(game, view);

console.log("starting game...");
view.display(); // added this in class
ctrl.play();
