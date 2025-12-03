import { assertEquals } from "@std/assert/equals";
import { part1 } from "../src/program_alarm.js";

Deno.test("test for the input file : ", () => {
  const input = Deno.readTextFileSync("./data/input_program_alarm.txt").split(
    ",",
  )
    .map((x) => +x);
  assertEquals(part1(input, 12, 2), 4945026);
});
