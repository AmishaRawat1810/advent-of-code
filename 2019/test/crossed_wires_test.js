import { assertEquals } from "@std/assert";
import { crossedWires } from "../src/crossed_wires.js";

Deno.test("Test for the input file", () => {
  const input = Deno.readTextFileSync("./data/input_crossed_wires.txt");
  assertEquals(crossedWires(input), 48262);
});
