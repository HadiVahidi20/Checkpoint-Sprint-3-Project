import { getCommemorativeDate } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

const adaLovelaceDay = {
  name: "Ada Lovelace Day",
  monthName: "October",
  dayName: "Tuesday",
  occurrence: "second",
};

const worldLemurDay = {
  name: "World Lemur Day",
  monthName: "October",
  dayName: "Friday",
  occurrence: "last",
};

const binturongDay = {
  name: "International Binturong Day",
  monthName: "May",
  dayName: "Saturday",
  occurrence: "second",
};

test("Ada Lovelace Day is on the second Tuesday of October", () => {
  assert.equal(getCommemorativeDate(adaLovelaceDay, 2020), 13);
  assert.equal(getCommemorativeDate(adaLovelaceDay, 2024), 8);
  assert.equal(getCommemorativeDate(adaLovelaceDay, 2025), 14);
});

test("World Lemur Day is on the last Friday of October", () => {
  assert.equal(getCommemorativeDate(worldLemurDay, 2020), 30);
  assert.equal(getCommemorativeDate(worldLemurDay, 2024), 25);
  // 31 October 2025 is a Friday, so it is the last day of the month.
  assert.equal(getCommemorativeDate(worldLemurDay, 2025), 31);
});

test("International Binturong Day is on the second Saturday of May", () => {
  assert.equal(getCommemorativeDate(binturongDay, 2030), 11);
});
