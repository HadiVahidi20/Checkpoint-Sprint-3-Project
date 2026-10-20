import {
  getCommemorativeDate,
  getDaysInMonth,
  getFirstDayOfMonth,
} from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

// Kiritimati skipped the whole of 31 December 1994. Running the tests in this
// time zone shows that our dates do not depend on the local time zone.
process.env.TZ = "Pacific/Kiritimati";

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

const vultureDay = {
  name: "International Vulture Awareness Day",
  monthName: "September",
  dayName: "Saturday",
  occurrence: "first",
};

const redPandaDay = {
  name: "International Red Panda Day",
  monthName: "September",
  dayName: "Saturday",
  occurrence: "third",
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

test("International Vulture Awareness Day is on the first Saturday of September", () => {
  // 1 September 1900 is a Saturday.
  assert.equal(getCommemorativeDate(vultureDay, 1900), 1);
  assert.equal(getCommemorativeDate(vultureDay, 2024), 7);
});

test("International Red Panda Day is on the third Saturday of September", () => {
  assert.equal(getCommemorativeDate(redPandaDay, 2024), 21);
  assert.equal(getCommemorativeDate(redPandaDay, 2050), 17);
});

// Months start at 0, so 11 is December. Weekdays start at 0, so 0 is Sunday.

test("Months start on the right day of the week", () => {
  assert.equal(getFirstDayOfMonth(2024, 9), 2);
  assert.equal(getFirstDayOfMonth(2024, 11), 0);
  assert.equal(getFirstDayOfMonth(2025, 1), 6);
  assert.equal(getFirstDayOfMonth(2025, 4), 4);
  assert.equal(getFirstDayOfMonth(2026, 1), 0);
});

test("Months have the right number of days", () => {
  assert.equal(getDaysInMonth(2024, 9), 31);
  assert.equal(getDaysInMonth(2024, 11), 31);
  assert.equal(getDaysInMonth(2025, 1), 28);
  assert.equal(getDaysInMonth(2025, 4), 31);
  assert.equal(getDaysInMonth(2026, 1), 28);
  // 2024 is a leap year, but 1900 is not.
  assert.equal(getDaysInMonth(2024, 1), 29);
  assert.equal(getDaysInMonth(1900, 1), 28);
});

test("December 1994 has 31 days, even in Kiritimati", () => {
  assert.equal(getDaysInMonth(1994, 11), 31);
});
