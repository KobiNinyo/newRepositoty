'use strict'

const LASER_SPEED = 80

var gHero = {
  pos: { i: 12, j: 5 },
  isShoot: false,
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
     console.log('TEST')
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
function shoot() {}

// renders a LASER at specific cell for short time and removes it
// REMEMBER pos :gHero.pos.i ,gHero.pos.j , intrval + const LASER_SPEED = 80
function blinkLaser(event) {
  if (event) {
    updateCell(gHero.pos.i--, LASER)
  }
}
