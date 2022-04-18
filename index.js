import { board } from './createBoard.js'
import inquirer from 'inquirer'

const getCoordinates = () => {
    const question = [
        {
          type: "input",
          name: "x-coordinate",
          message: "Please enter the first of two coordinates (any number from 0 up to 7)",
        },
        {
          type: "input",
          name: "y-coordinate",
          message: "Please enter the last coordinate (any number from 0 up to 7)",
        },
      ];
      let xCoordinate;
      let yCoordinate;

      inquirer.prompt(question).then(answers => {
        xCoordinate = answers["x-coordinate"];
        yCoordinate = answers["y-coordinate"];
      })
}



const assignNumbers =  () => {
  for(let i = 0; i<board.length; i++){
    for(let j=0; j<board[i].length; j++){
      if(board[i][j].toString() === 'x'){
       
        let newTotal = 0
        const isRightEdge = [j]/9 === 1
        const isLeftEdge = [j] === 0
         //check square to right
        if(!isRightEdge  && board[i][j+1].toString() === '💣') newTotal++
        //check square to left
        if([j]>0 && board[i][j-1].toString() === '💣') newTotal++
        //check square to north-west
        if([j]>0 && [i]>0 && board[i-1][j-1].toString() === '💣') newTotal++
        //check square to north-east
        if(!isRightEdge && [i]>0 && board[i-1][j+1].toString() === '💣') newTotal++
        //check square to south-west
        if([j]>0 && [i]<9 && board[i+1][j-1].toString() === '💣') newTotal++
        //check square to south-east
        if(!isRightEdge && [i]<9 && board[i+1][j+1].toString() === '💣') newTotal++
        //check square to north
        if([i]>0 && board[i-1][j].toString() === '💣') newTotal++
        //check square to the south
        if([i]<9 && board[i+1][j].toString() === '💣') newTotal++
        board[i][j] = newTotal
      }
    }
  }
 console.log(board)
}

assignNumbers()
