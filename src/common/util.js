export function clamp(x, from_x, to_x) {
  if (x < from_x) x = from_x;
  if (x > to_x) x = to_x;

  return x;
}

export function move(player, offsetX, offsetY) {
  return (keydown) => {
    if (keydown) {
      player.moveByCellCoord &&
        player.moveByCellCoord(offsetX, offsetY, (cell) => {
          if (cell.findObjectsByType('grass')) {
            return cell.findObjectsByType('grass').length;
          }
        });
    }
  };
}
