import { board,playerBoard } from './createBoard.js'
import inquirer from 'inquirer'


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

}

assignNumbers()


const updatePlayerBoard = (x, y, type) => {
  if (type === "hit") {
    playerBoard[x][y] = "💥";
  } else if (type === "number-square") {
    playerBoard[x][y] = board[x][y].toString();
    console.log(playerBoard);
    getCoordinates();
  } else if (type === "blank-square"){
    playerBoard[x][y] = '⬛'
  }
};

const checkSquares = (x,y,board) => {
  //check all surrounding squares

  //extract square to west
  // console.log(board[x][y])  x,y outputs coordinates, board[x][y] outputs board element at coordinate
  
  if(y>0 && board[x][y].toString() !=="💣" ){
    //NOTE: An element assigned a zero total will *never* be next to a bomb
     const coords = [x, y-1]
     play(coords[0],coords[1],board)
    }
    console.log(playerBoard)

}

const play = (x, y, board) => {
  const resultType = ["hit", "number-square", "blank-square"];
  if (board[x][y].toString() === "💣") {
    updatePlayerBoard(x, y, resultType[0]);
    console.log("Game over!");
    process.exit(1);
  } else if (board[x][y] !== 0 && board[x][y].toString !== "💣") {
    updatePlayerBoard(x, y, resultType[1]);
  } else if(board[x][y] === 0){
    updatePlayerBoard(x, y, resultType[2]);
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


