const createVM = (program) => ({
  memory: [...program],
  ptr: 0,
  relativeBase: 0,
  halted: false,
});

const getElement = (memory, address) => memory[address] || 0;

const getArg = (vm, offset, mode) => {
  const token = getElement(vm.memory, vm.ptr + offset);
  if (mode === 1) return token;
  if (mode === 0) return getElement(vm.memory, token);
  if (mode === 2) return getElement(vm.memory, vm.relativeBase + token);
};

const getWriteAddr = (vm, offset, mode) => {
  const token = getElement(vm.memory, vm.ptr + offset);
  return mode === 2 ? vm.relativeBase + token : token;
};

const ops = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
  7: (a, b) => a < b ? 1 : 0,
  8: (a, b) => a === b ? 1 : 0,
};

const handlers = {
  binary: (vm, { opcode, mode1, mode2, mode3 }) => {
    const arg1 = getArg(vm, 1, mode1);
    const arg2 = getArg(vm, 2, mode2);
    const dest = getWriteAddr(vm, 3, mode3);
    vm.memory[dest] = ops[opcode](arg1, arg2);
    vm.ptr += 4;
  },
  jump: (vm, { opcode, mode1, mode2 }) => {
    const arg1 = getArg(vm, 1, mode1);
    const arg2 = getArg(vm, 2, mode2);
    const shouldJump = opcode === 5 ? arg1 !== 0 : arg1 === 0;
    vm.ptr = shouldJump ? arg2 : vm.ptr + 3;
  },
  input: (vm, { mode1 }) => {
    const dest = getWriteAddr(vm, 1, mode1);
    vm.memory[dest] = 2;
    vm.ptr += 2;
  },
  output: (vm, { mode1 }) => {
    console.log(getArg(vm, 1, mode1));
    vm.ptr += 2;
  },
  relBase: (vm, { mode1 }) => {
    vm.relativeBase += getArg(vm, 1, mode1);
    vm.ptr += 2;
  },
  halt: (vm) => {
    vm.halted = true;
  },
};

const instructionSet = {
  1: handlers.binary,
  2: handlers.binary,
  3: handlers.input,
  4: handlers.output,
  5: handlers.jump,
  6: handlers.jump,
  7: handlers.binary,
  8: handlers.binary,
  9: handlers.relBase,
  99: handlers.halt,
};

const parseInstruction = (vm) => {
  const instr = getElement(vm.memory, vm.ptr);
  const modesInt = Math.floor(instr / 100);

  const opcode = instr % 100;
  const mode1 = modesInt % 10;
  const mode2 = Math.floor(modesInt / 10) % 10;
  const mode3 = Math.floor(modesInt / 100) % 10;

  return { opcode, mode1, mode2, mode3 };
};

export const intCodeComp = (input) => {
  const vm = createVM(input);
  while (!vm.halted) {
    const data = parseInstruction(vm);
    const handler = instructionSet[data.opcode];
    handler(vm, data);
  }
  return "reached the end";
};

const testInput = Deno.readTextFileSync("./data/input_sensor_boost.txt");
const input = testInput.split(",").map(Number);
intCodeComp(input);
