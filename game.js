'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3

//gameObject
const HERO = 'HERO'
const ALIEN = 'ALIEN'
const LASER = 'LASER'
const HIT = 'HIT'

const HERO_IMG = `<img class="hero-img" src="img/HERO.png" alt="hero" />`
const ALIEN_IMG = `<img class="alian-img" src="img/ALIEN.png" alt="alian">`
const LASER_IMG = `<img class="laser-img" src="img/LASER.png" alt="laser">`
const HIT_IMG = `<img class="hit-img" src="img/HIT.png" alt="hit">`
//type:
const SKY = 'SKY'
const Victory = 220
var gBoard
var gAliensCell

var gGame = {
  isOn: false,
  alienCount: 0,
  score: 0,
}

// REMEMBER Called when game loads
function init() {
  gBoard = createBoard()
  renderBoard(gBoard)
  gGame.isOn = true
  startIntrval()
  checkVictory(gBoard)
  checkLose()
}

function createBoard() {
  const size = BOARD_SIZE
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = createCell()
    }
  }
  gAliensCell = createAliens(board, 0, 3)
  createHero(board)

  return board
}

function renderBoard(board) {
  var strHtml = '<table><tbody>'
  for (var i = 0; i < board.length; i++) {
    strHtml += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j]
      const className = `cell cell-${i}-${j}`

      var gameObjectImg = getGameObjectImg(cell)

      strHtml += `<td class="${className}" data-i="${i}" data-j="${j}">${gameObjectImg}</td>`
    }
    strHtml += '</tr>'
  }
  strHtml += '</tbody></table>'
  document.querySelector('.board-container').innerHTML = strHtml
}

function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject,
  }
}

function updateCell(pos, gameObject = null) {
  var cell = gBoard[pos.i][pos.j]
  cell.gameObject = gameObject

  var elCell = getElCell(pos)
  elCell.innerHTML = getGameObjectImg(cell) || ''
}

function updateScore(diff) {
  //MODAL
  gGame.score += diff

  if (gGame.isOn === false) {
    gGame.score = 0
  }

  //DOM
  var elScore = document.querySelector('.score')
  elScore.innerHTML = gGame.score
}

function victoryModal() {
  gGame.score = 0
  gGame.isOn = true

  var elModal = document.querySelector('.victory')
  elModal.innerHTML = `
  <h2>Victory!</h2>
  <h2 class="win">May the Force be with you!</h2>
  <h2>𓆩✶𓆪</h2>

   <button onclick="onRestart()">Play Again</button>`

  elModal.style.display = 'block'

  init()
}

function onRestart() {
    init()
  gGame.isOn = true
  var elModal = document.querySelector('.victory')
  var elBtn = document.querySelector('.btn-start')
  var elBtn2 = document.querySelector('.restart-btn')
  var elBtn3 = document.querySelector('.lose')

  elModal.style.display = 'none'
  elBtn.style.display = 'none'
  elBtn3.style.display = 'none'
  elBtn2.style.display = 'block'
  gGame.score = 0
  updateScore()
  init()
}

function renderStartButton() {
  var elBtn = document.querySelector('.btn-start')
  console.log(elBtn)

  elBtn.innerHTML = ` 
  <h2>WELCOME</h2>
  <h2>TO PLAY CLICK </h2>
  <h2 class="point">⬇</h2>
  <button onclick='onRestart()'class="start"> Start</button>`
}

function checkVictory(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j].gameObject === ALIEN) return false
    }
  }
  return true
}

function loseModal() {
  gIsAlienFreeze
  var elModal = document.querySelector('.lose')
  elModal.innerHTML = `
  <h2>Game Over!</h2>
  <h2 class="lose-text">THE FORCE</h2>
 <h2 class="lose-text">WAS NOT WITH YOU THIS TIME</h2>
   <button onclick="onRestart()">Try Again</button>`

   
   elModal.style.display = 'block'
}

function checkLose() {
  const { i, j } = gHero.pos
  const cell = gBoard[i][j]
  return cell && cell.gameObject === ALIEN
}

window.onload = renderStartButton
