'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3

//gameObject
const HERO = 'HERO'
const ALIEN = 'ALIEN'
const LASER = 'LASER'

const HERO_IMG = `<img class="hero-img" src="img/HERO.png" alt="" />`
const ALIEN_IMG = `<img class="alian-img" src="img/ALIEN.png" alt="">`
const LASER_IMG = `<img class="laser-img" src="img/LASER.png" alt="">`

//type:
const SKY = 'SKY'
const GROUND = 'GROUND'

var gBoard

var gGame = {
  isOn: false,
  alienCount: 0,
}

// TODO Called when game loads
function init() {
  gBoard = createBoard()
  console.table(gBoard)
  renderBoard(gBoard)
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
  createAliens(board, 0, 3)
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

// TODO position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
  var cell = gBoard[pos.i][pos.j]
  cell.gameObject = gameObject

  var elCell = getElCell(pos)
  elCell.innerHTML = getGameObjectImg(cell)
}

function getGameObjectImg(cell) {
  var innerHtmlImg = ''

  if (cell.gameObject === ALIEN) innerHtmlImg = ALIEN_IMG
  else if (cell.gameObject === HERO) innerHtmlImg = HERO_IMG
  else if (cell.gameObject === LASER) innerHtmlImg = LASER_IMG

  return innerHtmlImg
}
