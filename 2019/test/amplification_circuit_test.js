const dbg = (x, message = "", type = false, toStop = false) => {
  if (toStop) {
    prompt("");
  }
  if (type) {
    message = `${message} | ${typeof x} `;
  }
  console.log(message, " : ", x);
  return x;
};

const sumOf = (arg1, arg2) => arg1 + arg2;
const productOf = (arg1, arg2) => arg1 * arg2;
const lessThan = (arg1, arg2) => arg1 < arg2 ? 1 : 0;
const equals = (arg1, arg2) => arg1 === arg2 ? 1 : 0;

const binaryInstruction = {
  1: { fn: sumOf, moveBy: 4 },
  2: { fn: productOf, moveBy: 4 },
  7: { fn: lessThan, moveBy: 4 },
  8: { fn: equals, moveBy: 4 },
};

const getInput = (_memory, _token, amplifierInfo) => amplifierInfo.shift();

const putOutput = (memory, token) => memory[memory[token]];

const unaryInstruction = {
  3: { fn: getInput, moveBy: 2 },
  4: { fn: putOutput, moveBy: 2 },
};

const jumpIfTrue = (arg1, arg2) => arg1 !== 0 ? arg2 : null;
const jumpIfFalse = (arg1, arg2) => arg1 === 0 ? arg2 : null;

const movePointerInstruction = {
  5: jumpIfTrue,
  6: jumpIfFalse,
};

const immediateMode = (memory, token) => memory[token];
const positionMode = (memory, token) => memory[memory[token]];

const parameterMode = {
  1: immediateMode,
  0: positionMode,
};

const parseOpCode = (instruction) => {
  const opcode = instruction % 100;
  const arg1Mode = Math.floor(instruction / 100) % 10;
  const arg2Mode = Math.floor(instruction / 1000) % 10;
  return { opcode, arg1Mode, arg2Mode };
};

const parseInstruction = (intCode, cmdPtr) => parseOpCode(intCode[cmdPtr]);

const selectInstruction = {
  1: { type: "binary", moveBy: 4 },
  2: { type: "binary", moveBy: 4 },
  3: { type: "unary", moveBy: 2 },
  4: { type: "unary", moveBy: 2 },
  5: { type: "jump", moveBy: 0 },
  6: { type: "jump", moveBy: 0 },
  7: { type: "binary", moveBy: 4 },
  8: { type: "binary", moveBy: 4 },
};

export const intCodeComp = (memory, amplifierInfo, cmdPointer = 0) => {
  let i = 0;

  while (cmdPointer < memory.length) {
    ++i;
    const { opcode, arg1Mode, arg2Mode } = parseInstruction(memory, cmdPointer);

    if (opcode === 99) {
      return { memory, cmdPointer, output: undefined, halted: true };
    }

    const arg1 = parameterMode[arg1Mode](memory, cmdPointer + 1);
    const arg2 = parameterMode[arg2Mode](memory, cmdPointer + 2);
    const instruction = selectInstruction[opcode];

    if (instruction.type === "binary") {
      const resultIndex = memory[cmdPointer + 3];
      memory[resultIndex] = binaryInstruction[opcode].fn(arg1, arg2);
      cmdPointer += instruction.moveBy;
    }

    if (instruction.type === "unary") {
      const address = memory[cmdPointer + 1];
      const output = unaryInstruction[opcode].fn(
        memory,
        cmdPointer + 1,
        amplifierInfo,
      );

      if (opcode === 4) {
        dbg(output);
        cmdPointer += instruction.moveBy;
        return { memory, cmdPointer, output, halted: false };
      }

      memory[address] = output;
      cmdPointer += instruction.moveBy;
    }

    if (instruction.type === "jump") {
      const jumpTarget = movePointerInstruction[opcode](arg1, arg2);
      if (jumpTarget !== null) {
        cmdPointer = jumpTarget;
      } else {
        cmdPointer += 3;
      }
    }
  }
};
