import './index.scss';
import ClientGame from './client/clientGame';

window.addEventListener('load', () => {
  ClientGame.init({ tagID: 'game' });
});
