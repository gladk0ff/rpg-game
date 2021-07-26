import ClientEngine from './clientEngine';
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import World from './world';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cnf) {
    Object.assign(this, { cnf, gameObjects, player: false });
    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  createWorld() {
    return new World(this, this.engine, levelCfg);
  }

  setPlayer(player) {
    this.player = player;
  }
  createEngine() {
    return new ClientEngine(document.getElementById(this.cnf.tagID));
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: this.movePlayerByKey(-1, 0),
      ArrowUp: this.movePlayerByKey(0, -1),
      ArrowDown: this.movePlayerByKey(0, 1),
      ArrowRight: this.movePlayerByKey(1, 0),
    });
  }

  movePlayerByKey(offsetX, offsetY) {
    return (keydown) => {
      if (keydown) {
        this.player.moveByCellCoord &&
          this.player.moveByCellCoord(offsetX, offsetY, (cell) => {
            if (cell.findObjectsByType('grass')) {
              return cell.findObjectsByType('grass').length;
            }
          });
      }
    };
  }

  static init(cnf) {
    if (ClientGame.game) return;
    ClientGame.game = new ClientGame(cnf);
  }
}

export default ClientGame;
