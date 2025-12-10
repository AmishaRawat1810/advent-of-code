import { assertEquals } from "@std/assert/equals";
import { intCodeComp } from "../src/sunny_with_a_chance.js";

const parseInput = (input) => input.split(",").map(Number);

Deno.test("Test for the input file: ", () => {
  const testInput = Deno.readTextFileSync(
    "./data/input_sunny_with_a_chance.txt",
  );
  // const input = parseInput(testInput);
  assertEquals(intCodeComp(input), undefined); //9219874
});
