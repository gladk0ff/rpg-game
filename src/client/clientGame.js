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
    return new ClientEngine(document.getElementById(this.cnf.tagID), this);
  }

  getWorld() {
    return this.world;
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player);
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => keydown && this.movePlayerByKey(-1, 0, 'left'),
      ArrowUp: (keydown) => keydown && this.movePlayerByKey(0, -1, 'up'),
      ArrowDown: (keydown) => keydown && this.movePlayerByKey(0, 1, 'down'),
      ArrowRight: (keydown) => keydown && this.movePlayerByKey(1, 0, 'right'),
    });
  }

  movePlayerByKey(offsetX, offsetY, state) {
    const { player } = this;
    if (player && player.motionProgress === 1) {
      const canMovie = player.moveByCellCoord(offsetX, offsetY, (cell) => {
        return cell.findObjectsByType('grass').length;
      });

      if (canMovie) {
        player.setState(state);
        player.once('motion-stopped', () => player.setState('main'));
      }
    }
  }

  static init(cnf) {
    if (ClientGame.game) return;
    ClientGame.game = new ClientGame(cnf);
  }
}

export default ClientGame;
