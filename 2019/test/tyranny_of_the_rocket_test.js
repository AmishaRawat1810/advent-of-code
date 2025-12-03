import { part1, part2 } from "../src/tyranny_of_the_rocket.js";
import { assertEquals } from "@std/assert";

Deno.test("Test for : The Tyranny of the Rocket Equation", () => {
  const input = Deno.readTextFileSync("./data/input_tyranny_of_rocket.txt");
  assertEquals(part1(input), 3421505);
});

Deno.test("Test for : The Tyranny of the Rocket Equation", () => {
  const input = Deno.readTextFileSync("./data/input_tyranny_of_rocket.txt");
  assertEquals(part2(input), 5129386);
});
