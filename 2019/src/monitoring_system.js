const gcd = (a, b) => b !== 0 ? gcd(b, a % b) : a;

const asteroidsPositions = (grid) => {
  const cols = grid[0].length;
  const asteroids = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === "#") asteroids.push({ x, y });
    }
  }
  return asteroids;
};

const inLineOfSight = (positions, coord1, coord2) => {
  const dx = coord2.x - coord1.x;
  const dy = coord2.y - coord1.y;
  const g = gcd(Math.abs(dx), Math.abs(dy));
  const sx = dx / g;
  const sy = dy / g;

  for (let k = 1; k < g; k++) {
    const latticePoint = { y: coord1.y + k * sy, x: coord1.x + k * sx };
    if (positions[latticePoint.y][latticePoint.x] === "#") {
      return false;
    }
  }
  return true;
};

const visibleAsteroids = (positions, grid, current) =>
  positions.filter((next) =>
    next !== current &&
    inLineOfSight(grid, current, next)
  ).length;

const part1 = (input) => {
  const grid = input.split("\n").map((r) => r.split(""));
  const positions = asteroidsPositions(grid);
  let maxVisibleAsteroid = -Infinity;
  let position = { x: -1, y: -1 };

  positions.forEach((craft) => {
    const count = visibleAsteroids(positions, grid, craft);

    if (count > maxVisibleAsteroid) {
      position = { ...craft };
      maxVisibleAsteroid = count;
    }
  });

  return { position, maxVisibleAsteroid: maxVisibleAsteroid };
};

// console.log(
//   part1(
//     Deno.readTextFileSync("./data/input_monitoring_system.txt"),
//   ),
// );

const getAngle = (coord1, coord2) => {
  const { x, y } = {
    x: coord2.x - coord1.x,
    y: coord2.y - coord1.y,
  };
  return Math.atan2(y, x);
};

const getDistance = (coord1, coord2) => {
  const dx = Math.pow(coord2.x - coord1.x, 2);
  const dy = Math.pow(coord2.y - coord1.y, 2);
  return Math.sqrt(dx + dy);
};

const asteroidsAngle = (positions, station) => {
  const asteroids = [];
  positions.forEach((pos) => {
    if (pos !== station) {
      const angle = getAngle(station, pos);
      const dist = getDistance(station, pos);
      if (!(angle in asteroids)) asteroids[angle] = [dist];
      else asteroids[angle] = [...asteroids[angle], dist];
    }
  });
  return asteroids;
};

const part2 = (input) => {
  const station = { x: 27, y: 19 };
  const grid = input.split("\n").map((r) => r.split(""));
  const positions = asteroidsPositions(grid);
  const visible = asteroidsAngle(positions, station);
  console.log(visible);
};

console.log(part2(`.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....X...###..
..#.#.....#....##
`));
