export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const OCCURRENCE_NUMBERS = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
};

export function getCommemorativeDate(day, year) {
  const month = MONTH_NAMES.indexOf(day.monthName);
  const weekday = WEEKDAY_NAMES.indexOf(day.dayName);

  if (month === -1 || weekday === -1) {
    throw new Error("Invalid month or weekday in days.json");
  }

  if (day.occurrence === "last") {
    const lastDate = getDaysInMonth(year, month);
    const lastWeekday = new Date(year, month, lastDate).getDay();

    return lastDate - ((lastWeekday - weekday + 7) % 7);
  }

  const occurrence = OCCURRENCE_NUMBERS[day.occurrence];

  if (!occurrence) {
    throw new Error(`Invalid occurrence: ${day.occurrence}`);
  }

  const firstWeekday = getFirstDayOfMonth(year, month);
  const firstMatch = 1 + ((weekday - firstWeekday + 7) % 7);
  const date = firstMatch + (occurrence - 1) * 7;

  if (date > getDaysInMonth(year, month)) {
    throw new Error("That occurrence does not exist in this month");
  }

  return date;
}
