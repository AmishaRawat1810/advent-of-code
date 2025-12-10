import { intCodeComp } from "../test/amplification_circuit_test.js";
import { permutations } from "@std/collections";

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

const parseInput = (input) => input.split(",").map(Number);
const program = Deno.readTextFileSync("./data/input_amplification_circuit.txt");
const parsedProgram = parseInput(program);

const amplifier = (instructions) => {
  let index = 0;
  const phases = permutations([0, 1, 2, 3, 4]);
  const amplifiedValues = [];

  for (const phase of phases) {
    const amplifierInfo = [];
    amplifierInfo.push(phase[index], 0);
    while (index < phase.length) {
      const program = [...instructions];
      const output = intCodeComp(program, amplifierInfo);
      index += 1;
      amplifierInfo.push(phase[index], output);
    }
    index = 0;
    amplifiedValues.push({ sequence: phase, value: amplifierInfo[1] });
  }
  return amplifiedValues;
};

const output = amplifier(parsedProgram);
const maxThruster = Math.max(...output.map((ampValue) => ampValue.value));
dbg(maxThruster);
