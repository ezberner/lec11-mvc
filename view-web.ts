import {Model} from './model';
import {Controller} from './controller-web'; // used to be just controller

import * as $ from 'jquery';

export class View {
  private playerSymbols = [' ','X','O'];
  private ctrl:Controller;

  constructor(private game:Model){}

  setController(ctrl:Controller) {
    this.ctrl = ctrl;
  }

  display() {
    console.log("displaying...");

    let gamebox = $('#game-box');
    gamebox.empty(); //clear old display

    // make grid of buttons
    for(let i=0; i<this.game.size; i++){ //row
      let row = $('<div>'); //a row for the button
      for(let j=0; j<this.game.size; j++) {
        let player = this.game.getPiece(i,j);
        if(player === undefined) player = -1;

        let button = $('<button class="btn btn-default">'+this.playerSymbols[player+1]+'</button>')
        button.click((e) => this.handleClick(i,j)); //closure!!
        row.append(button);
      }
      gamebox.append(row);
    }

    //show winner, if any
    let winner = this.game.getWinner();
    if(winner !== undefined){
      this.showWinner(winner)
      $('button').attr('disabled','disabled'); //disable all the buttons
    }
    else {
      this.showPrompt(); //show prompt for next move
    }
  }

  showPrompt():void {
    let player = this.playerSymbols[this.game.getCurrentPlayer()+1]
    $('#message').html('<p class="lead">'+player+"'s turn. Pick a spot!"+'</p>')
  }

  showWinner(winner:number):void {
    let player = this.playerSymbols[winner+1]
    $('#message').html('<p class="lead">'+player+" is the winner!"+'</p>')
  }

  //callback for clicking
  handleClick(row, col) {
    console.log("You clicked",row,col);
    this.ctrl.takeTurn(row,col);
  }

  // added this in class
  notify() {
    this.display();
  }

}
