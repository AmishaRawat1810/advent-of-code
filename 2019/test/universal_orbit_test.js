const input = "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L";
const map = input.split("\n").map((orbit) => orbit.split(")"));
console.log(map);

const makeItObject = (map) => {
  const object = {};
  map.forEach((element) => {
    object[element[1]] = { orbitOn: element[0], count: 0 };
  });
  return object;
};

const incrementCount = (map, keys, key, index) => {
  const currentKey = key;
  if (map[currentKey] !== undefined) {
    return 0;
  }
  ++index;
  return 1 + incrementCount(map, keys, keys[index], index);
};

const orbitedOnCount = (map) => {
  const keys = Object.keys(map);
  console.log(keys);

  keys.forEach((key) => {
    map[key].count = incrementCount(map, keys, key, 0);
  });

  return keys;
};

const object = makeItObject(map);
console.log(orbitedOnCount(object));

const sumOfCounts = () => {
  const counts = orbitedOnCount(map).map(Number);
  return counts.reduce((acc, num) => acc + num, 0);
};

console.log(sumOfCounts);
