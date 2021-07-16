import EventSourceMixin from '../common/EventSourceMixin';
import Camera from './Camera';
import Input from './input';

class ClientEngine {
  constructor(canvas) {
    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoader: [],
      sprites: {},
      images: {},
      camera: new Camera({ canvas, engine: this }),
      input: new Input(canvas),
    });
    this.ctx = canvas.getContext('2d');
    this.loop = this.loop.bind(this);
  }

  start() {
    this.initNextFrame();
  }

  loop(timestamp) {
    const { ctx, canvas } = this;
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.trigger('render', timestamp);
    this.initNextFrame();
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop);
  }

  renderSpriteFrame({ sprite, frame, x, y, w, h }) {
    const spriteCfg = this.sprites[sprite[0]][sprite[1]];
    const [fx, fy, fw, fh] = spriteCfg.frames[frame];
    const img = this.images[spriteCfg.img];
    this.ctx.drawImage(img, fx, fy, fw, fh, x, y, w, h);
  }

  loadSprites(spritesGroup) {
    this.imageLoader = [];
    Object.keys(spritesGroup).forEach((groupName) => {
      const group = spritesGroup[groupName];
      this.sprites[groupName] = group;

      Object.keys(group).forEach((spriteName) => {
        const { img } = group[spriteName];
        if (!this.images[img]) {
          this.imageLoader.push(this.loadImage(img));
        }
      });
    });
    return Promise.all(this.imageLoader);
  }

  loadImage(imgUrl) {
    const img = new Image();
    this.images[imgUrl] = img;
    return new Promise((res) => {
      img.onload = () => res(img);
      img.src = imgUrl;
    });
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;
