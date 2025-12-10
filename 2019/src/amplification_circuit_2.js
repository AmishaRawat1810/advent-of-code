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

const amplification = (instructions) => {
  const phases = permutations([5, 6, 7, 8, 9]);
  let maxThruster = 0;

  for (const phase of phases) {
    const amplifier = Array.from({ length: 5 }, (amp, index) => ({
      memory: [...instructions],
      cmdPtr: 0,
      input: [phase[index]],
      onHalt: false,
    }));

    let feedback = 0;
    let ampIndex = 0;

    while (!amplifier[4].onHalt) {
      const currentAmp = amplifier[ampIndex];
      currentAmp.input.push(feedback);

      const result = intCodeComp(
        currentAmp.memory,
        currentAmp.input,
        currentAmp.cmdPtr,
      );

      currentAmp.cmdPtr = result.cmdPointer;
      currentAmp.onHalt = result.halted;

      if (result.output !== undefined) feedback = result.output;

      ampIndex = (ampIndex + 1) % 5;
    }

    maxThruster = Math.max(maxThruster, feedback);
  }
  return maxThruster;
};

const parseInput = (input) => input.split(",").map(Number);
const program = Deno.readTextFileSync("./data/input_amplification_circuit.txt");
const parsedProgram = parseInput(program);

console.log(amplification(parsedProgram));
