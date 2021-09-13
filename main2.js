let activePlayer = 0
// Player representation
// 0 - X - Player 1 (Us)
// 1 - O - Player 2 (Comp)
const winPositions = [[0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]]
let playerX = 0
let playerO = 0
const cellElements = document.querySelectorAll('[data-cell]')
const gameEnd = document.querySelector('[EndText]')
const GameEndMsg = document.getElementById('GameEnd')
const restartButton = document.getElementById('restartButton')
const resetButton = document.getElementById('resetButton')
let scoreX = document.getElementById('playerX_score')
let scoreO = document.getElementById('playerO_score')
let Xturn = document.getElementById('X')

let board = [['_', '_', '_'],
['_', '_', '_'],
['_', '_', '_']];
let player = 'o'
let opponent = 'x'


play()

restartButton.addEventListener('click', playAgain)
resetButton.addEventListener('click', restart)

function play()
{
  Xturn.style.textDecoration = "underline"
  Xturn.textContent = "* Player X"
  cellElements.forEach(cell => {
    cell.addEventListener('click', display, { once: true })
  })
  GameEndMsg.classList.remove('show')
  scoreX.textContent = playerX
  scoreO.textContent = playerO
}

function display(e) {
  const cell = e.target

  if(cell.innerHTML=="")
  {
    if(activePlayer==0)
    {
      activePlayer = 1;
      let node = document.createTextNode ('X');
      cell.appendChild(node);
      AddX(cell.id)
      CompTurn()
    }

    if(checkWin())
    {
      console.log("Winner")
      EndMsg(activePlayer)
      return
    }
    if(checkDraw())
    {
      console.log("Draw")
      EndMsg(2)
      return
    }
  }
}

function CompTurn()
{
    let bestMove = findBestMove(board);
    let gameStateIndex=getGameState(bestMove[0],bestMove[1])
    let cell = cellElements[gameStateIndex]

    if(bestMove[0]==-1 || bestMove[1]==-1)
    return

    board[bestMove[0]][bestMove[1]] = 'o'
    if(cell.innerHTML=="")
    {
        cellElements[gameStateIndex].textContent = 'O'
        activePlayer = 0   
    }   
}

function checkWin()
{
  for(let i=0;i<8;i++)
  {
    let combo = winPositions[i]

    if(cellElements[combo[0]].textContent==cellElements[combo[1]].textContent &&
      cellElements[combo[1]].textContent==cellElements[combo[2]].textContent &&
      cellElements[combo[0]].textContent!="" && cellElements[combo[1]].textContent!=""
      && cellElements[combo[2]].textContent!="")
      return true
  }
  return false
}

function checkDraw()
{
  for(let i=0;i<9;i++)
  {
    if(cellElements[i].textContent == "")
    return false    
  }
  return true
}

function EndMsg(code)
{
    if(code==2)
    gameEnd.innerHTML = 'Draw!' 
    else if(code==1)
    {
      gameEnd.innerHTML = 'X Wins!'  
      playerX++
    }
    else
    {
      gameEnd.innerHTML = 'O Wins!' 
      playerO++
    }   
  GameEndMsg.classList.add('show')
}

function playAgain()
{
  for(let i=0;i<9;i++)
  {
    cellElements[i].textContent = ""  
  }  

  for(let i = 0;i<3;i++){
    for(let j = 0; j<3;j++){
        board[i][j]='_';
    }
   }
  activePlayer = 0
  play()
} 

function restart()
{
  for(let i=0;i<9;i++)
  {
    cellElements[i].textContent = ""  
  }  
  for(let i = 0;i<3;i++){
    for(let j = 0; j<3;j++){
        board[i][j]='_';
    }
}
  activePlayer = 0
  playerX=0
  playerO=0
  play()
}

function getGameState(row, col ){
    let gameStateIndex = -1;
    if(row==0 && col==0){
        gameStateIndex=0;
    }else if(row==0 && col==1){
        gameStateIndex=1;
    }else if(row==0 && col==2){
        gameStateIndex=2;
    }else if(row==1 && col==0){
        gameStateIndex=3;
    }else if(row==1 && col==1){
        gameStateIndex=4;
    }else if(row==1 && col==2){
        gameStateIndex=5;
    }else if(row==2 && col==0){
        gameStateIndex=6;
    }else if(row==2 && col==1){
        gameStateIndex=7;
    }else if(row==2 && col==2){
        gameStateIndex=8;
    }
    return gameStateIndex;
}

function findBestMove(board)
{
    let bestVal = -1000;
    let bestMove = [-1,-1]

    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            if (board[i][j] == '_')
            {
                board[i][j] = player;
                let moveVal = minimax(board, 0, false);

                board[i][j] = '_';

                if (moveVal > bestVal)
                {
                    bestMove[0] = i;
                    bestMove[1] = j;
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove;
}

function isMovesLeft(board)
{
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] == '_')
                return true;
    return false;
}

function evaluate( b)
{

    for (let row = 0; row < 3; row++)
    {
        if (b[row][0] == b[row][1] &&
                b[row][1] == b[row][2])
        {
            if (b[row][0] == player)
                return +10;
            else if (b[row][0] == opponent)
                return -10;
        }
    }

    for (let col = 0; col < 3; col++)
    {
        if (b[0][col] == b[1][col] &&
                b[1][col] == b[2][col])
        {
            if (b[0][col] == player)
                return +10;

            else if (b[0][col] == opponent)
                return -10;
        }
    }

    if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
    {
        if (b[0][0] == player)
            return +10;
        else if (b[0][0] == opponent)
            return -10;
    }

    if (b[0][2] == b[1][1] && b[1][1] == b[2][0])
    {
        if (b[0][2] == player)
            return +10;
        else if (b[0][2] == opponent)
            return -10;
    }

    return 0;
}

function minimax(board, depth, isMax)
{
    let score = evaluate(board);

    if (score == 10)
    return score;
    if (score == -10)
    return score;
    if (!isMovesLeft(board))
    return 0;

    let best;
    if (isMax)
    {
    best = -1000;

    for (let i = 0; i < 3; i++)
    {
    for (let j = 0; j < 3; j++)
    {
    if (board[i][j]=='_')
    {
        board[i][j] = player;
        best = Math.max(best, minimax(board,
                depth + 1, !isMax));

        board[i][j] = '_';
    }
    }
    }
    }

    else
    {
    best = 1000;
    for (let i = 0; i < 3; i++)
    {
    for (let j = 0; j < 3; j++)
    {
    if (board[i][j] == '_')
    {
        board[i][j] = opponent;

        best = Math.min(best, minimax(board,
                depth + 1, !isMax));

        board[i][j] = '_';
    }
    }
    }
    }
    return best;
}

function AddX(id)
{
    if(id=="squareA")
    board[0][0]='x';
    else if(id=="squareB")
    board[0][1]='x';
    else if(id=="squareC")
    board[0][2]='x';
    else if(id=="squareD")
    board[1][0]='x';
    else if(id=="squareE")
    board[1][1]='x';
    else if(id=="squareF")
    board[1][2]='x';
    else if(id=="squareG")
    board[2][0]='x';
    else if(id=="squareH")
    board[2][1]='x';
    else if(id=="squareI")
    board[2][2]='x';
}