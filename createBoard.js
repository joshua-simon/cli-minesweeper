const randomNumbers = () => {
    var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      ranNums = [],
      i = nums.length,
      j = 0;
  
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      ranNums.push(nums[j]);
      nums.splice(j, 1);
    }
    return ranNums;
  };
  
  
  const getCoordinates = () => {
    const x = randomNumbers();
    const y = randomNumbers();
  
    let coordinates = [];
  
    for (let i = 0; i < x.length; i++) {
      let coordinate = [x[i], y[i]];
      coordinates.push(coordinate);
    }
  
    return coordinates;
  };
  
  export const coordinates = getCoordinates()
  
  
  const createBoard = () => {
    let board = [];
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = ["x"];
      }
    }
  
    for (let i = 0; i < coordinates.length; i++) {
      let x = coordinates[i][0];
      let y = coordinates[i][1];
      board[x][y] = ['💣'];
    }
    return board
  };

  const createPlayerBoard = () => {
    let playerBoard = [];
    for (let i = 0; i < 10; i++) {
      playerBoard[i] = [];
      for (let j = 0; j < 10; j++) {
        playerBoard[i][j] = '⬜';
      }
    }
    return playerBoard
  }

  export const board = createBoard()
  export const playerBoard = createPlayerBoard()
