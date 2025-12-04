const MOVES = {
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
};

const manhattanDistance = (intersectionPoint) => {
  const [x, y] = intersectionPoint[1];
  return Math.abs(x) + Math.abs(y);
};

export const moveOn = (heading, startingCoord) => {
  const direction = heading[0];
  return {
    x: startingCoord.x + MOVES[direction].x,
    y: startingCoord.y + MOVES[direction].y,
  };
};

const coordinatesVisited = (heading, startingCoord) => {
  const allVisited = [];
  let currentStart = { ...startingCoord };
  let moveBy = parseInt(heading.match(/(\d+)/g));

  while (moveBy !== 0) {
    currentStart = moveOn(heading, currentStart);
    allVisited.push(`${currentStart.x},${currentStart.y}`);
    moveBy--;
  }
  return { visited: allVisited, lastVisitedCoord: currentStart };
};

const headToCamp = (wire, startingCoord) => {
  let startingPoint = { ...startingCoord };
  const allVisited = [];

  for (const coord of wire.split(",")) {
    const result = coordinatesVisited(coord, startingPoint);
    allVisited.push(...result.visited);
    startingPoint = result.lastVisitedCoord;
  }

  return allVisited;
};

const intersection = (wire1, wire2) => {
  const intersect = {};
  for (const wire1Coord of wire1) {
    for (const wire2Coord of wire2) {
      if (wire1Coord === wire2Coord && !intersect[wire1Coord]) {
        intersect[wire1Coord] = [
          wire1.indexOf(wire1Coord) + 1,
          wire2.indexOf(wire2Coord) + 1,
        ];
      }
    }
  }
  return intersect;
};

export const crossedWires = (input) => {
  const origin = { x: 0, y: 0 };
  const [wire1, wire2] = input.split("\n");
  const wire1VisitedCoord = headToCamp(wire1, origin).flat();
  const wire2VisitedCoord = headToCamp(wire2, origin).flat();
  const intersects = intersection(wire1VisitedCoord, wire2VisitedCoord);
  const distance = Object.entries(intersects).filter((coord) => coord !== "0,0")
    .map((coord) => manhattanDistance(coord));

  return Math.min(...distance);
};
