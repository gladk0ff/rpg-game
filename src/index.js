import './index.scss';
import pers from './assets/pers.png';
import water from './assets/landscape_water.png';

const spriteSize = {
  width: 48,
  heght: 50,
};
const initPosition = {
  x: 200,
  y: 300,
};
const cnvLimit = {
  x: 550,
  y: 550,
};

const views = {
  down: 0,
  up: 152,
  left: 48,
  right: 96,
};

const img = document.createElement('img');
const landscape = document.createElement('img');
img.src = pers;
landscape.src = water;

const cn = document.getElementById('game');
const ctx = cn.getContext('2d');

let cycle = 0;
const shots = 3;
const posOffset = 5;

let isMoveKeyPress = false;
function isMoveKey(key) {
  switch (key) {
    case 'Down':
      return 'down';
    case 'ArrowDown':
      return 'down';
    case 'Up':
      return 'up';
    case 'ArrowUp':
      return 'up';
    case 'Left':
      return 'left';
    case 'ArrowLeft':
      return 'left';
    case 'Right':
      return 'right';
    case 'ArrowRight':
      return 'right';
    default:
      return false;
  }
}

function keyPressDownHandler(e) {
  if (isMoveKey(e.key)) {
    isMoveKeyPress = isMoveKey(e.key);
  }
}

function keyUpDownHandler(e) {
  if (isMoveKey(e.key)) {
    isMoveKeyPress = false;
  }
}

document.addEventListener('keydown', keyPressDownHandler);
document.addEventListener('keyup', keyUpDownHandler);

img.addEventListener('load', () => {
  const persPosition = initPosition;
  setInterval(() => {
    const viewMode = views[isMoveKeyPress] || views.down;
    if (isMoveKeyPress) {
      ctx.clearRect(persPosition.x, persPosition.y, spriteSize.width, spriteSize.heght);
      cycle = (cycle + 1) % shots;
      switch (isMoveKeyPress) {
        case 'down':
          if (persPosition.y + posOffset < cnvLimit.y) {
            persPosition.y += posOffset;
          }
          break;
        case 'up':
          if (persPosition.y - posOffset > 0) {
            persPosition.y -= posOffset;
          }
          break;
        case 'left':
          if (persPosition.x - posOffset > 125) {
            persPosition.x -= posOffset;
          }
          break;
        case 'right':
          if (persPosition.x + posOffset < cnvLimit.x) {
            persPosition.x += posOffset;
          }
          break;
        default:
          break;
      }
    }

    ctx.drawImage(
      img,
      cycle * spriteSize.width,
      viewMode,
      spriteSize.width,
      spriteSize.heght,
      persPosition.x,
      persPosition.y,
      50,
      50,
    );
    ctx.drawImage(landscape, 0, 0);
  }, 60);
});
