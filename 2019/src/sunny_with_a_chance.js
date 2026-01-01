const createVM = (program) => ({
  memory: [...program],
  ptr: 0,
  isHalted: false,
});

const getElement = (memory, address) => memory[address] || 0;

const getWriteAddress = (vm, offset) => getElement(vm.memory, vm.ptr + offset);

const getArg = (vm, offset, mode) => {
  const token = getElement(vm.memory, vm.ptr + offset);
  if (mode === 1) return token;
  if (mode === 0) return getElement(memory, token);
};

const ops = {
  1: (arg1, arg2) => arg1 + arg2,
  2: (arg1, arg2) => arg1 * arg2,
  7: (arg1, arg2) => arg1 < arg2 ? 1 : 0,
  8: (arg1, arg2) => arg1 === arg2 ? 1 : 0,
};

const handlers = {
  binary: (vm, { opcode, mode1, mode2 }) => {
    const arg1 = getArg(vm.memory, 1, mode1);
    const arg2 = getArg(vm.memory, 2, mode2);
    const writeAddr = getWriteAddress(vm.memory, 3);
    vm.memory[writeAddr] = ops[opcode](arg1, arg2);
    vm.ptr += 4;
  },
  jump: (vm, { opcode, mode1, mode2 }) => {
    const arg1 = getArg(vm.memory, 1, mode1);
    const arg2 = getArg(vm.memory, 2, mode2);
    const shouldJump = opcode === 5 ? arg1 !== 0 : arg1 === 0;
    vm.ptr = shouldJump ? arg2 : vm.ptr += 3;
  },
  input: (vm) => {
    const dest = getWriteAddress(vm.memory, 1);
    vm.memory[dest] = 5;
    vm.ptr += 2;
  },
  output: (vm, { mode1 }) => {
    console.log(getArg(vm, 1, mode1));
    vm.ptr += 2;
  },
  halt: (vm) => {
    vm.halted = true;
  },
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

const selectInstruction = {
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

export const intCodeComp = (input) => {
  const vm = createVM(input);
  while (!vm.isHalted) {
    const data = parseInstruction(vm);
    const handlers = selectInstruction(data.opcode);
    handlers(vm, data);
  }
  return "reached the end";
};

const parseInput = (input) => input.split(",").map(Number);
const testInput = Deno.readTextFileSync(
  "./data/input_sunny_with_a_chance.txt",
);
const input = parseInput(testInput);
console.log(intCodeComp(input));
