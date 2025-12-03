import { assertEquals } from "@std/assert";
import { moveOn } from "../src/crossed_wires.js";

Deno.test("Test for moves", () => {
  assertEquals(moveOn("R7", 0, 0), { dx: 7, dy: 0 });
  assertEquals(moveOn("L", 0, 0), { dx: -1, dy: 0 });
  assertEquals(moveOn("U", 0, 0), { dx: 0, dy: 1 });
  assertEquals(moveOn("D", 0, 0), { dx: 0, dy: -1 });
});
