const sumOf = (array, [a, b]) => array[a] + array[b];
const productOf = (array, [a, b]) => array[a] * array[b];

const instruction = {
  1: sumOf,
  2: productOf,
};

const input = Deno.readTextFileSync("./data/input_program_alarm.txt").split(
  ",",
).map((x) => +x);

export const part1 = (input, noun, verb) => {
  const array = [...input];
  array[1] = noun;
  array[2] = verb;
  for (let cmdPtr = 0; cmdPtr < array.length; cmdPtr++) {
    const opcode = array[cmdPtr];
    if (opcode === 99) {
      return array[0];
    }
    if (instruction[opcode]) {
      const nextTwo = [array[cmdPtr + 1], array[cmdPtr + 2]];
      const resultIndex = array[cmdPtr + 3];
      array[resultIndex] = instruction[opcode](array, nextTwo);
      cmdPtr += 3;
    }
  }
  return array[0];
};

export const part2 = (input, noun, verb) => {
  for (let i = noun; i < 100; i++) {
    for (let j = verb; j < 100; j++) {
      const result = part1(input, i, j);
      if (result === 19690720) {
        return 100 * i + j;
      }
    }
  }
};

console.log(part2(input, 0, 0));
