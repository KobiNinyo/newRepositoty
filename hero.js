'use strict'

const LASER_SPEED = 80
const SUPER_SPEED_LASER = 30

var gHero = {
  pos: { i: 12, j: 5 },
  isShoot: false,
}
var gLaser = {
  id: null,
  lastPos: null,
  currPos: null,
  shotType: null,
  SpecialShoot: false,
  queueSuperSpeed: false,
  armedSuperSpeed: false,
}
function createHero(board) {
  board[gHero.pos.i][gHero.pos.j] = createCell(HERO)
}
function onKeyDown(ev) {
  const cols = gBoard[0].length
  const nextLocation = { i: gHero.pos.i, j: gHero.pos.j }

  if (ev.code === 'KeyN') {
    gLaser.SpecialShoot = true
    return null
  }
  if (ev.code === 'KeyX') {
    if (!gHero.isShoot && gGame.superUse > 0) {
      gLaser.queueSuperSpeed = true
    }
    return LASER
  }
  if (ev.code === 'Space') {
    ev.preventDefault()
    return LASER
  }

  switch (ev.key) {
    case 'ArrowLeft':
      nextLocation.j--
      gLaser.SpecialShoot = false
      break
    case 'ArrowRight':
      nextLocation.j++
      gLaser.SpecialShoot = false
      break

    default:
      return null
  }

  if (nextLocation.j < 0 || nextLocation.j >= cols) return null

  return nextLocation
}
function moveHero(event) {
  if (gGame.isOn === false) return

  const nextPos = onKeyDown(event)

  if (nextPos === LASER) {
    shoot(gHero.pos)
    var sound = new Audio('blaster-2-81267.mp3')
    sound.play()
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

  if (checkLose()) loseModal()

  updateCell(gHero.pos, null)
  gHero.pos = nextPos
  updateCell(gHero.pos, HERO)
}
function shoot(pos) {
  if (gHero.isShoot) return

  gHero.isShoot = true
  gLaser.lastPos = null
  gLaser.currPos = { i: pos.i - 1, j: pos.j }

  if (gLaser.queueSuperSpeed && gGame.superUse > 0) {
    gLaser.armedSuperSpeed = true
    gLaser.queueSuperSpeed = false
    gGame.superUse--
  }

  var speed
  if (gLaser.armedSuperSpeed) {
    speed = SUPER_SPEED_LASER
  } else {
    speed = LASER_SPEED
  }

  if (gLaser.armedSuperSpeed) {
    gLaser.shotType = LASERSPEED
  } else {
    gLaser.shotType = LASER
  }

  gLaser.id = setInterval(() => blinkLaser(), speed)
}
function blinkLaser() {
  if (gLaser.lastPos) updateCell(gLaser.lastPos, null)
  if (gLaser.currPos.i < 0) return stopInterval()

  const cell = gBoard[gLaser.currPos.i][gLaser.currPos.j]

  if (cell.gameObject === ALIEN) {
    const hitPos = { i: gLaser.currPos.i, j: gLaser.currPos.j }
    const isSpecial = gLaser.SpecialShoot

    if (isSpecial) {
      blowUpNeighbors(gBoard, hitPos.i, hitPos.j)
      updateCell(hitPos, HIT)
      setTimeout(() => {
        updateCell(gLaser.currPos, null)
        gIsAlienFreeze = false
      }, 250)
    }

    updateCell(hitPos, HIT)
    gIsAlienFreeze = true

    setTimeout(() => {
      updateCell(gLaser.currPos, null)
      gIsAlienFreeze = false
    }, 250)

    updateScore(10)

    stopInterval()

    //REMEMBER TO WIN
    if (checkVictory(gBoard) || gGame.score === Victory) {
      victoryModal()
      gGame.isOn = false
      var sound = new Audio('star-wars-style-march-165111.mp3')
      sound.push()
      sound.currentTime = 0
    }
    return
  }
  updateCell(gLaser.currPos, gLaser.shotType)

  gLaser.lastPos = { i: gLaser.currPos.i, j: gLaser.currPos.j }
  gLaser.currPos = { i: gLaser.currPos.i - 1, j: gLaser.currPos.j }
}
function stopInterval() {
  if (gLaser.id) {
    clearInterval(gLaser.id)
    gLaser.id = null
    gHero.isShoot = false
  }
  gLaser.armedSuperSpeed = false
  gLaser.shotType = false
}
function blowUpNeighbors(board, hitI, hitJ) {
  var targets = []

  for (var i = hitI - 1; i <= hitI + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = hitJ - 1; j <= hitJ + 1; j++) {
      if (j < 0 || j >= board[0].length) continue

      if (i === hitI && j === hitJ) continue

      const cell = board[i][j]
      if (cell && cell.gameObject === ALIEN) {
        targets.push({ i, j })
      }
    }
  }
  //dom
  for (const pos of targets) {
    updateCell(pos, HIT)
    setTimeout(() => {
      updateCell(pos, null)
      gIsAlienFreeze = false
    }, 250)
    updateScore(10)
  }
}
