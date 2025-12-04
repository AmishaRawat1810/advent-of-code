// const input = Deno.readTextFileSync("./data/input_sunny_with_a_chance.txt");
const testInput = "1002,4,3,4,33";
const parseInput = (input) => input.split(",").map(Number);

const sumOf = (array, [a, b]) => array[a] + array[b];
const productOf = (array, [a, b]) => array[a] * array[b];

const immediateMode = (_, token) => token;
const positionMode = (array, token) => array[token];

const getInput = () => parseInt(prompt("Enter 1 as value : "));
const putOutput = (array, token) => console.log(array[token]);

const binaryInstruction = {
  1: { operation: sumOf, moveBy: 4 },
  2: { operation: productOf, moveBy: 4 },
};

const unaryInstruction = {
  3: { operation: getInput, moveBy: 1 },
  4: { operation: putOutput, moveBy: 1 },
};

const parameterMode = {
  1: immediateMode,
  0: positionMode,
};

const parseOpCode = (instruction) => {
  const opcode = (instruction % 1000) % 100;
  const arg1Mode = Math.floor(instruction / 100) % 10;
  const arg2Mode = Math.floor(instruction / 1000);
  return { opcode, arg1Mode, arg2Mode };
};

const parseInstruction = (intCode, cmdPtr) => {
  if (String(intCode[cmdPtr]).length === 4) {
    return parseOpCode(intCode[cmdPtr]);
  }
  return { opcode: intCode[cmdPtr], arg1Mode: 0, arg2Mode: 0 };
};

export const part1 = (input) => {
  const intCode = [...input];
  let cmdPtr = 0;

  while (cmdPtr < intCode.length) {
    const { opcode, arg1Mode, arg2Mode } = parseInstruction(intCode, cmdPtr);

    if (opcode === 99) {
      return intCode[0];
    }

    if (binaryInstruction[opcode]) {
      const args = [
        parameterMode[arg1Mode](intCode, cmdPtr + 1),
        parameterMode[arg2Mode](intCode, cmdPtr + 2),
      ];
      const resultIndex = intCode[cmdPtr + 3];
      intCode[resultIndex] = binaryInstruction[opcode].operation(intCode, args);
      cmdPtr += binaryInstruction[opcode].moveBy;
    }

    if (unaryInstruction[opcode]) {
      const arg = [unaryInstruction[opcode].operation(intCode, cmdPtr + 1)];
      intCode[cmdPtr + 1] = arg;
      cmdPtr += unaryInstruction[opcode].moveBy;
    }
  }
};

const parsed = parseInput(testInput);
part1(parsed);
