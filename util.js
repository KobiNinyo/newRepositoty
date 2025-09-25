'use strict'
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject,
  }
}
function getElCell(pos) {
  return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}

function getGameObjectImg(cell) {
  var innerHtmlImg = ''

  if (cell.gameObject === ALIEN) innerHtmlImg = ALIEN_IMG
  else if (cell.gameObject === HERO) innerHtmlImg = HERO_IMG
  else if (cell.gameObject === LASER) innerHtmlImg = LASER_IMG
  else if (cell.gameObject === HIT) innerHtmlImg = HIT_IMG

  return innerHtmlImg
}
