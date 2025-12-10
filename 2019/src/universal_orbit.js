import { intersect } from "@std/collections";

const dbg = (x) => {
  console.log(x);
  return x;
};

const makeItObject = (array) => {
  const object = {};
  for (const element of array) {
    const [element1, element2] = element.split(")");
    object[element2] = element1;
  }
  return object;
};

const getStepsFrom = (map, currentKey, to = undefined) => {
  if (map[currentKey] === to) {
    return 0;
  }
  currentKey = map[currentKey];
  return 1 + getStepsFrom(map, currentKey, to);
};

const steps = (map) => {
  let count = 0;
  for (const key in map) {
    count += getStepsFrom(map, key);
  }
  return count;
};

const getNeighbourOrbit = (map, key, result) => {
  if (map[key] === undefined) {
    return result;
  }
  const nextKey = map[key];
  result.push(nextKey);
  return getNeighbourOrbit(map, nextKey, result);
};

const directOrbits = (map) => {
  const relatives = {};
  Object.keys(map).forEach((key) => {
    relatives[key] = getNeighbourOrbit(map, key, []);
  });
  return relatives;
};

const fromYouToSanta = (map) => {
  const { YOU, SAN } = dbg(directOrbits(map));
  const doorStep = intersect(YOU, SAN)[0];
  return getStepsFrom(map, "YOU", doorStep) +
    getStepsFrom(map, "SAN", doorStep);
};

const input = Deno.readTextFileSync("./data/input_universal_orbit.txt");
const map = input.split("\n");
const object = makeItObject(map);
console.log(fromYouToSanta(object));
