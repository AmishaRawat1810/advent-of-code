const MOVES = {
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
};

export const moveOn = (heading, x, y) => {
  const direction = heading[0];
  const moveBy = parseInt(heading.match(/(\d+)/g)) || 1;
  const [dx, dy] = [
    x + MOVES[direction].x * moveBy,
    y + MOVES[direction].y * moveBy,
  ];
  return { dx, dy };
};
