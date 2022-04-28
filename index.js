import { board,playerBoard } from './createBoard.js'
import inquirer from 'inquirer'


const assignNumbers =  () => {
  for(let i = 0; i<board.length; i++){
    for(let j=0; j<board[i].length; j++){
      if(board[i][j].toString() === 'x'){
       
        let newTotal = 0
        const isRightEdge = [j]/9 === 1

        if(!isRightEdge  && board[i][j+1].toString() === '💣') newTotal++
        if([j]>0 && board[i][j-1].toString() === '💣') newTotal++
        if([j]>0 && [i]>0 && board[i-1][j-1].toString() === '💣') newTotal++
        if(!isRightEdge && [i]>0 && board[i-1][j+1].toString() === '💣') newTotal++
        if([j]>0 && [i]<9 && board[i+1][j-1].toString() === '💣') newTotal++
        if(!isRightEdge && [i]<9 && board[i+1][j+1].toString() === '💣') newTotal++
        if([i]>0 && board[i-1][j].toString() === '💣') newTotal++
        if([i]<9 && board[i+1][j].toString() === '💣') newTotal++

        board[i][j] = newTotal
      }
    }
  }

}

assignNumbers()


// const updatePlayerBoard = (x, y, type) => {
//   if (type === "hit") {
//     playerBoard[x][y] = "💥";
//   } else if (type === "number-square") {
//     playerBoard[x][y] = board[x][y].toString();
//     console.log(playerBoard);
//     getCoordinates();
//   } else if (type === "blank-square"){
//     playerBoard[x][y] = '⬛'
//   }
// };

const checkSquares = (x,y,board) => {

     if(y>0) play(x,y-1,board)
      if (y<9) {
        const total = parseInt(y)+1
        play(x,total,board)
      }

     if(x>0 && y>0) play(x-1,y-1,board)

     if(x>0) play(x-1,y,board)

    if(x<9){
      const total = parseInt(x)+1
      play(total,y,board)
    }

    if(y>0 && x<9){
      const total = parseInt(x)+1
      play(total,y-1,board)
    }

    if(x<9 && y<9){
      const xTotal = parseInt(x)+1
      const yTotal = parseInt(y)+ 1
      play(xTotal,yTotal,board)
    }

    if(x>0 && y<9){
      const total = parseInt(y)+1
      play(x-1,total,board)
    }

   console.log(board)
}

const play = (x, y, board) => {
  // const resultType = ["hit", "number-square", "blank-square"];
  // if(board[x][y] === '✅') return
  // if (board[x][y].toString() === "💣") {
    // updatePlayerBoard(x, y, resultType[0]);
    // console.log("Game over!");
    // process.exit(1);}
  //  if (board[x][y] !== 0 && board[x][y].toString !== "💣") {
    // updatePlayerBoard(x, y, resultType[1]);
    // return} 
if(board[x][y] === 0){
    // updatePlayerBoard(x, y, resultType[2]);
    board[x][y] = '✅'
    console.log(` play coordinates:  x: ${x} y: ${y}`)
    checkSquares(x,y,board)
  }
};


const getCoordinates = async () => {
  const question = [
    {
      type: "input",
      name: "x-coordinate",
      message:
        "Please enter the first of two coordinates (any number from 0 up to 9)",
    },
    {
      type: "input",
      name: "y-coordinate",
      message: "Please enter the last coordinate (any number from 0 up to 9)",
    },
  ];
  let xCoordinate;
  let yCoordinate;

  inquirer.prompt(question).then((answers) => {
    xCoordinate = answers["x-coordinate"];
    yCoordinate = answers["y-coordinate"];

    play(xCoordinate, yCoordinate, board);
  });
};

console.log(board)
await getCoordinates()


