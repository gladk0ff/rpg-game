import ClientEngine from './clientEngine';
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import World from './world';

class ClientGame {
  constructor(cnf) {
    Object.assign(this, { cnf });
    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  createWorld() {
    return new World(this, this.engine, levelCfg);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cnf.tagID));
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', () => {
        this.world.init();
      });
      this.engine.start();
    });
  }

  static init(cnf) {
    if (ClientGame.game) return;
    ClientGame.game = new ClientGame(cnf);
  }
}

export default ClientGame;
