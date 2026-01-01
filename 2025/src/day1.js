const countHits = (start, distance, dir) => {
  let first;

  if (dir === "R") {
    first = (100 - start) % 100;
    if (first === 0) first = 100;
  } else {
    first = start === 0 ? 100 : start;
  }

  if (first > distance) return 0;

  return 1 + Math.floor((distance - first) / 100);
};

const move = (dialer, distance, dir) => {
  const hits = countHits(dialer, distance, dir);

  if (dir === "R") {
    dialer = (dialer + distance) % 100;
  } else {
    dialer = ((dialer - distance) % 100 + 100) % 100;
  }

  return [dialer, hits];
};

const main = (input) => {
  let dialer = 50;
  let count = 0;

  for (const line of input) {
    const dir = line[0];
    const dist = parseInt(line.slice(1), 10);
    const [nextDialer, hits] = move(dialer, dist, dir);
    dialer = nextDialer;
    count += hits;
  }

  return count;
};

const input = Deno.readTextFileSync("./input/day1_input.txt").split("\n");
// const input = `L68
// L30
// R48
// L5
// R60
// L55
// L1
// L99
// R14
// L82`.split("\n");
console.log(main(input));
