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
const VICTORY = 240

var gBoard
var gAliensCell

var gGame = {
  isOn: false,
  alienCount: 0,
  score: 0,
}

// TODO Called when game loads
function init() {
  gBoard = createBoard()
  renderBoard(gBoard)
  gGame.isOn = true
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

  //DOM
  var elScore = document.querySelector('.score')
  elScore.innerHTML = gGame.score
}

function victoryModal() {
  var strHtml = `<h2>YOU WIN 🏆<button onclick="init()">Start Again</button></h2>`
  var elModal = document.querySelector('.victory')
  elModal.innerHTML = strHtml

  elModal.style.display = 'block'
}

// function onRestart() {
//   if ((gGame.isOn = false)) {
//     init()
//     var elModal = document.querySelector('.victory')
//     elModal.style.display = 'none'
//   }
// }
