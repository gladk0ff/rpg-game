import ClientEngine from './clientEngine';
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import World from './world';
import gameObjects from '../configs/gameObjects.json';
import { move } from '../common/util';

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
      ArrowLeft: move(this.player, -1, 0),
      ArrowUp: move(this.player, 0, -1),
      ArrowDown: move(this.player, 0, 1),
      ArrowRight: move(this.player, 1, 0),
    });
  }

  static init(cnf) {
    if (ClientGame.game) return;
    ClientGame.game = new ClientGame(cnf);
  }
}

export default ClientGame;
