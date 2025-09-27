'use strict'
const ALIEN_SPEED = 500
var gIntervalAliens
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze = false
var gAlienDir = 1
var gNextLine = false

function createAliens(board, rowIdx, rowNum) {
  const startCol = Math.floor((BOARD_SIZE - ALIEN_ROW_LENGTH) / 2)
  const endCol = startCol + ALIEN_ROW_LENGTH

  for (var i = rowIdx; i < rowIdx + rowNum; i++) {
    for (var j = startCol; j < endCol; j++) {
      board[i][j] = createCell(ALIEN)
    }
  }
  var cell = (gGame.alienCount = rowNum * ALIEN_ROW_LENGTH)

  return cell
}
function shiftBoardRight(board, fromI = 0, toI = board.length - 1) {
  const alianCell = []
  const cols = board[0].length
  var edga = false

  for (var i = fromI; i <= toI; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        alianCell.push({ i, j })
        if (j + 1 >= cols) edga = true
      }
    }
  }
  if (edga) return false

  for (var i = 0; i < alianCell.length; i++) {
    const pos = alianCell[i]
    board[pos.i][pos.j].gameObject = null
  }
  for (var i = 0; i < alianCell.length; i++) {
    const pos = alianCell[i]
    board[pos.i][pos.j + 1].gameObject = ALIEN
  }
  return true
}
function shiftBoardLeft(board, fromI = 0, toI = board.length - 1) {
  const alianCell = []
  const cols = board[0].length
  let edga = false

  for (let i = fromI; i <= toI; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j].gameObject === ALIEN) {
        alianCell.push({ i, j })
        if (j - 1 < 0) edga = true
      }
    }
  }
  if (edga) return false

  for (let k = 0; k < alianCell.length; k++) {
    const pos = alianCell[k]
    board[pos.i][pos.j].gameObject = null
  }
  for (let k = 0; k < alianCell.length; k++) {
    const pos = alianCell[k]
    board[pos.i][pos.j - 1].gameObject = ALIEN
  }
  return true
}
function shiftBoardDown(board, fromI = 0, toI = gBoard.length - 1) {
  const alianCell = []
  const rows = board.length

  for (var i = fromI; i <= toI; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        alianCell.push({ i, j })
        if (i + 1 >= rows) return false
      }
    }
  }
  for (var i = 0; i < alianCell.length; i++) {
    const pos = alianCell[i]
    board[pos.i][pos.j].gameObject = null
  }

  for (var i = 0; i < alianCell.length; i++) {
    const pos = alianCell[i]
    board[pos.i + 1][pos.j].gameObject = ALIEN
  }
  return true
}
function moveAliens() {
  if (gIsAlienFreeze) return

  if (gAlienDir === 1) {
    const movedRight = shiftBoardRight(gBoard)
    if (!movedRight) {
      const down = shiftBoardDown(gBoard)
      if (!down) return
      gAlienDir = -1
    }
  } else {
    const moveLeft = shiftBoardLeft(gBoard)
    if (!moveLeft) {
      const down = shiftBoardDown(gBoard)
      if (!down) return
      gAlienDir = 1
    }
  }

  if (checkLose()) {
    loseModal()
    return
  }

  renderBoard(gBoard)
}
function startIntrval() {
  if (gIntervalAliens) {
    clearInterval(gIntervalAliens)
  }
  gIntervalAliens = setInterval(() => moveAliens(), ALIEN_SPEED)
}
