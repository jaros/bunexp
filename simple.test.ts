import { mock, test, expect } from "bun:test";

let fn = () => 42;

test("function magic value shall be 42", async () => {
  expect(fn()).toEqual(42);
});