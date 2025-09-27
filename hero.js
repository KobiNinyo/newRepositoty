'use strict'

const LASER_SPEED = 80

var gHero = {
  pos: { i: 12, j: 5 },
  isShoot: false,
}

var gLaser = {
  id: null,
  lastPos: null,
  currPos: null,
}

function createHero(board) {
  board[gHero.pos.i][gHero.pos.j] = createCell(HERO)
}

function onKeyDown(ev) {
  const cols = gBoard[0].length

  var nextLocation = { i: gHero.pos.i, j: gHero.pos.j }

  switch (ev.key) {
    case 'ArrowLeft':
      nextLocation.j--
      break
    case 'ArrowRight':
      nextLocation.j++
      break

    case ' ':
      return LASER

    default:
      return null
  }

  if (nextLocation.j < 0 || nextLocation.j >= cols) {
    return null
  } else {
    return nextLocation
  }
}

function moveHero(event) {
  if (gGame.isOn === false) return

  const nextPos = onKeyDown(event)

  if (nextPos === LASER) {
    shoot(gHero.pos)
    return
  }

  if (!nextPos) {
    updateCell(gHero.pos, HERO)
    console.log('WORNG BUTTON')
    return
  }
  if (gBoard[nextPos.i][nextPos.j].gameObject === ALIEN) {
    loseModal()
    return
  }

  if (checkLose()) {
    loseModal()
    return
  }

  updateCell(gHero.pos, null)
  gHero.pos = nextPos
  updateCell(gHero.pos, HERO)
}

function shoot(pos) {
  if (gHero.isShoot) return
  gHero.isShoot = true
  gLaser.lastPos = null
  gLaser.currPos = { i: pos.i - 1, j: pos.j }

  gLaser.id = setInterval(() => blinkLaser(), LASER_SPEED)
}

function blinkLaser() {
  if (gLaser.lastPos) updateCell(gLaser.lastPos, null)
  if (gLaser.currPos.i < 0) return stopInterval()

  const cell = gBoard[gLaser.currPos.i][gLaser.currPos.j]
  console.log(cell)

  if (cell.gameObject === ALIEN) {
    updateCell(gLaser.currPos, HIT)

    if (cell.gameObject === HIT) {
      setTimeout(() => {
        updateCell(gLaser.currPos, null)
      }, 250)
    }

    updateScore(10)
    stopInterval()

    if (cell.gameObject) {
    }

    if (checkVictory(gBoard)) {
      victoryModal()
      gGame.isOn = false
    }

    if (gGame.score === Victory) {
      victoryModal()
      gGame.isOn = false
    }

    return
  }

  updateCell(gLaser.currPos, LASER)

  gLaser.lastPos = { i: gLaser.currPos.i, j: gLaser.currPos.j }
  gLaser.currPos = { i: gLaser.currPos.i - 1, j: gLaser.currPos.j }
}

function stopInterval() {
  if (gLaser.id) {
    clearInterval(gLaser.id)
    gLaser.id = null
  }
  gHero.isShoot = false
}
