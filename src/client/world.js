export const spriteSize = {
  width: 48,
  heght: 50,
};
class World {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    this.levelCfg.map.forEach((cfgRow, x) => {
      cfgRow.forEach((cellCfg, y) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cellCfg[0]],
          frame: 0,
          x: x * spriteSize.width,
          y: y * spriteSize.heght,
          w: 50,
          h: 50,
        });
      });
    });
  }
}

export default World;
