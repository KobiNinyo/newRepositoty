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
// Handle game keys
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
  const nextPos = onKeyDown(event)

  //MODAL
  if (nextPos === LASER) {
    shoot(gHero.pos)
    return
  }

  if (!nextPos) {
    updateCell(gHero.pos, HERO)
    console.log('WORNG BUTTON')
    return
  }
  //DOM
  updateCell(gHero.pos, null)
  gHero.pos = nextPos
  updateCell(gHero.pos, HERO)
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(pos) {
  if (gHero.isShoot) return
  gHero.isShoot = true
  gLaser.lastPos = null
  gLaser.currPos = { i: pos.i - 1, j: pos.j }

  gLaser.id = setInterval(() => blinkLaser(), LASER_SPEED)
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser() {
  if (gLaser.lastPos) updateCell(gLaser.lastPos, null)
  if (gLaser.currPos.i < 0) return stopInterval()

  const cell = gBoard[gLaser.currPos.i][gLaser.currPos.j]
  console.log(cell)

  if (cell && cell.gameObject === ALIEN) {
    updateCell(gLaser.currPos, HIT)
    updateScore(10)
    stopInterval()

    setTimeout(() => {
      updateCell(gLaser.currPos, null)
    }, 250)
    console.log(gGame.score)

    if (gGame.score === VICTORY) {
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
