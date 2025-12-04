import { assertEquals } from "@std/assert/equals";
import { passwordCombination } from "../src/secure_container.js";

Deno.test("Test for part 2 : ", () => {
  const input = "353096-843212";
  assertEquals(passwordCombination(input), 358);
});
