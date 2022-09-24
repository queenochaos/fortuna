import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertExists,
  assertThrows,
} from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { GachaMachine } from "./mod.ts";

const testData = [
  { result: "SSR cool character", chance: 1 },
  { result: "Kinda rare character", chance: 3 },
  { result: "Mob character", chance: 5 },
  { result: "Mob character", chance: 5 },
  { result: "Mob character", chance: 5 },
];

const sortedTestData = testData.sort((a, b) => a.chance - b.chance);
/*
import pokemon from "./testdata/pokemon.json" assert { type: "json" };

let testData = pokemon.slice().map((x) => ({
  result: x.id,
  chance: x.tier === "legendary" ? 11 : x.tier === "mythic" ? 1 : 25,
}));

testData = testData.concat(testData);

testData = testData.concat(testData);
*/
Deno.test({
  name: "Is GachaMachine defined?",
  fn() {
    const machine = new GachaMachine(testData);
    assertExists(machine);
  },
});

Deno.test({
  name:
    "Is the initialization time less than 200 + (number of elements / 3) microseconds?",
  fn() {
    const t1 = performance.now();
    new GachaMachine(testData);
    const t2 = performance.now();
    assert((t2 - t1) * 100 < 200 + (testData.length / 3));
  },
});

Deno.test({
  name: `Roll 3 unique items from a collection of 5 items`,
  fn() {
    const machine = new GachaMachine(testData);
    const res = machine.getUnique(3);
    assertExists(res);
  },
});

Deno.test({
  name: `Roll 5 unique items from a collection of 5 items`,
  fn() {
    const machine = new GachaMachine(testData);
    const res = machine.getUnique(5);
    assertArrayIncludes(res, [
      "SSR cool character",
      "Kinda rare character",
      "Mob character",
      "Mob character",
      "Mob character",
    ]);
  },
});

Deno.test({
  name: `Roll 7 unique items from a collection of 5 items (throw error)`,
  fn() {
    const machine = new GachaMachine(testData);
    assertThrows(() => machine.getUnique(7));
  },
});

Deno.test({
  name: `Roll 7 non-unique items from a collection of 5 items (don't throw error)`,
  fn() {
    const machine = new GachaMachine(testData);
    const res = machine.get(7);
    assertEquals(res.length, 7)
  },
});

/*
Deno.test({
    name: `${sortedTestData[0].chance} in ${testData.reduce((acc, val) => acc + val.chance, 0)} rolls return a ${sortedTestData[0].result}?`,
    fn() {
      const machine = new GachaMachine(testData);
      const res = machine.get(testData.reduce((acc, val) => acc + val.chance, 0));
      assertArrayIncludes(res, sortedTestData[0].result)
    },
});
*/
