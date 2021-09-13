let activePlayer = 0
// Player representation
// 0 - X - Player 1
// 1 - O - Player 2
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
let Oturn = document.getElementById('O')

play()

restartButton.addEventListener('click', playAgain)
resetButton.addEventListener('click', restart)

function play()
{
  if(activePlayer == 0)
  {
    Xturn.style.textDecoration = "underline"
    Xturn.textContent = "* Player X"
    Oturn.style.textDecoration = "none"
    Oturn.textContent = "Player O"
  }

  cellElements.forEach(cell => {
    cell.addEventListener('click', display, { once: true })
  })
  GameEndMsg.classList.remove('show')
  scoreX.textContent = playerX
  scoreO.textContent = playerO
}

function display(e) {
  const cell = e.target

  if(activePlayer == 1)
  {
    Xturn.textContent = "* Player X"
    Xturn.style.textDecoration = "underline"
    Oturn.style.textDecoration = "none"
    Oturn.textContent = "Player O"
  }
  else
  {
    Oturn.textContent = "* Player O"
    Oturn.style.textDecoration = "underline"
    Xturn.style.textDecoration = "none"
    Xturn.textContent = "Player X"
  }

  if(cell.innerHTML=="")
  {
    if(activePlayer==0)
    {
      activePlayer = 1;
      let node = document.createTextNode ('X');
      cell.appendChild(node);
    }
    else
    {
      activePlayer = 0;
      let node = document.createTextNode ('O');
      cell.appendChild(node);  
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
  activePlayer = 0
  play()
}  

function restart()
{
  for(let i=0;i<9;i++)
  {
    cellElements[i].textContent = ""  
  }  
  activePlayer = 0
  playerX=0
  playerO=0
  play()
}