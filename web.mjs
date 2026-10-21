import {
  getFirstDayOfMonth,
  getDaysInMonth,
  getCommemorativeDate,
  MONTH_NAMES,
} from "./common.mjs";

import daysData from "./days.json" with { type: "json" };

const today = new Date();

const state = {
  currentMonth: today.getMonth(),
  currentYear: today.getFullYear(),
  daysInMonth: 0,
  firstDayOfMonth: 0,
  commemorativeDatesArray: [],
};

const elements = {};

function setup() {
  elements.calendarHeading = document.getElementById("calendar-heading");
  elements.calendarBody = document.getElementById("calendar-body");
  elements.nextMonthButton = document.getElementById("next-month");
  elements.previousMonthButton = document.getElementById("previous-month");
  elements.monthSelect = document.getElementById("month-select");
  elements.yearInput = document.getElementById("year-input");
  elements.jumpToDateButton = document.getElementById("jump-to-date");

  elements.previousMonthButton.addEventListener(
    "click",
    handlePreviousMonthClick,
  );
  elements.nextMonthButton.addEventListener("click", handleNextMonthClick);
  elements.jumpToDateButton.addEventListener("click", handleJumpToDateClick);
}

function handleNextMonthClick() {
  if (state.currentMonth === 11) {
    state.currentMonth = 0;
    state.currentYear++;
  } else {
    state.currentMonth++;
  }

  updateCalendar();
}

function handlePreviousMonthClick() {
  if (state.currentMonth === 0) {
    state.currentMonth = 11;
    state.currentYear--;
  } else {
    state.currentMonth--;
  }

  updateCalendar();
}

function handleJumpToDateClick() {
  if (!elements.yearInput.checkValidity()) {
    elements.yearInput.reportValidity();
    return;
  }
  state.currentMonth = Number(elements.monthSelect.value);
  state.currentYear = Number(elements.yearInput.value);

  updateCalendar();
}

function updateCalendar() {
  getCalendarData();
  getCommemorativeDays();
  renderCalendar();
  elements.monthSelect.value = state.currentMonth;
  elements.yearInput.value = state.currentYear;
}

function getCalendarData() {
  state.daysInMonth = getDaysInMonth(state.currentYear, state.currentMonth);

  state.firstDayOfMonth = getFirstDayOfMonth(
    state.currentYear,
    state.currentMonth,
  );
}

function getCommemorativeDays() {
  state.commemorativeDatesArray = daysData.map((day) => ({
    ...day,
    date: getCommemorativeDate(day, state.currentYear),
  }));
}

function renderCalendar() {
  elements.calendarHeading.textContent = `${MONTH_NAMES[state.currentMonth]} ${state.currentYear}`;

  elements.calendarBody.replaceChildren();

  let dayOfMonth = 1;

  for (let week = 0; week < 6; week++) {
    if (dayOfMonth > state.daysInMonth) {
      break;
    }

    const row = document.createElement("tr");

    for (let weekday = 0; weekday < 7; weekday++) {
      const cell = document.createElement("td");

      if (week === 0 && weekday < state.firstDayOfMonth) {
        cell.textContent = "";
      } else if (dayOfMonth <= state.daysInMonth) {
        cell.textContent = dayOfMonth;

        if (
          dayOfMonth === today.getDate() &&
          state.currentMonth === today.getMonth() &&
          state.currentYear === today.getFullYear()
        ) {
          cell.classList.add("today");
        }

        const commemorativeDay = state.commemorativeDatesArray.find(
          (day) =>
            day.monthName === MONTH_NAMES[state.currentMonth] &&
            day.date === dayOfMonth,
        );

        if (commemorativeDay) {
          cell.classList.add("commemorative-day");
          const dateNumber = document.createElement("span");
          dateNumber.className = "date-number";
          dateNumber.textContent = dayOfMonth;

          const eventName = document.createElement("span");
          eventName.className = "event-name";
          eventName.textContent = commemorativeDay.name;

          cell.replaceChildren(dateNumber, eventName);
        }

        dayOfMonth++;
      } else {
        cell.textContent = "";
      }

      row.appendChild(cell);
    }

    elements.calendarBody.appendChild(row);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setup();
  updateCalendar();
});
