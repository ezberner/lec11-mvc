import {Model} from './model';
import {View} from './view-web'; // used to be view

//Fill me in!!
export class Controller {
    

    constructor(private game:Model, private view:View) {
        game.register(view); // listen to the model!
        view.setController(this); // talk to me!
    }

    play() {
        this.view.display();
    }

    takeTurn(row:number, col:number) {
        if(this.game.getWinner() == undefined) {
            this.game.makeMove(row, col);
        }
            
    }
}