# Testing

This file explains how we tested each point of the rubric. We did the browser checks in Chrome. Run the unit tests with `npm i` and then `npm test`.

## For everyone

- **The calendar shows the current month when it opens.** Checked in Chrome: it opened on October 2026, the month when we tested it.
- **October 2024 has 5 rows and 7 columns. The first row is Tuesday 1 to Saturday 5, and the last row is Sunday 27 to Thursday 31.** Checked in Chrome: Sunday 29 and Monday 30 at the start, and Friday and Saturday at the end, are blank boxes. Unit tests in `common.test.mjs` also check that October 2024 starts on a Tuesday and has 31 days.
- **October 2024: Ada Lovelace Day on the 8th and World Lemur Day on the 25th.** Checked in Chrome. Unit tests in `common.test.mjs`.
- **October 2020: Ada Lovelace Day on the 13th and World Lemur Day on the 30th.** Checked in Chrome. Unit tests in `common.test.mjs`.
- **May 2030: International Binturong Day on the 11th.** Checked in Chrome. Unit tests in `common.test.mjs`.
- **2024-12, 2025-02, 2025-05 and 2026-02 start and end on the right days, with no extra boxes.** Checked in Chrome:
  - December 2024: no blank boxes before, 4 after.
  - February 2025: 6 before, 1 after.
  - May 2025: 4 before, none after.
  - February 2026: only 4 rows, with no blank boxes.

  Unit tests in `common.test.mjs` check the first weekday and the number of days of each of these months.
- **The Previous and Next buttons work, also past the ends of the year box.** Checked in Chrome:
  - Clicked from December 2026 to January 2027 and back.
  - Jumped to December 2050 (the last year in the box) and clicked Next: January 2051 and February 2051 were shown correctly.
  - Jumped to January 1900 (the first year) and clicked Previous: December 1899 was shown correctly.
  - The heading, the month list and the year box never showed an empty value, "undefined", "null" or "NaN".
- **There is a usable way to jump to a month and year.** Checked in Chrome: we used the month list, the year box and the Go button to open every month above. An empty year, a year with a decimal point, or a year outside 1900 to 2050 shows the browser's error message and does not change the calendar.
- **The UI is made with DOM manipulation, and the days are not hard-coded.** `web.mjs` makes every row and box with `document.createElement`. We added International Dawn Chorus Day (the first Sunday of May) to a copy of `days.json`. Without any change to the code, it appeared on 4 May 2025 on the web page and in `days.ics`.
- **Lighthouse accessibility is 100% in Desktop mode for all views.** Lighthouse in Chrome (Desktop mode, Snapshot mode) gave 100 for:
  - the first view (October 2026)
  - October 2024
  - February 2026
  - December 2050
  - January 2051 (past the end of the year box)
- **Unit tests for at least one non-trivial function.** Unit tests in `common.test.mjs`. They test `getCommemorativeDate` (for "first", "second", "third" and "last"), `getDaysInMonth` and `getFirstDayOfMonth`. The tests run in the Pacific/Kiritimati time zone, which skipped 31 December 1994. This shows that the dates do not depend on the local time zone.
- **No dead code.** We checked that every CSS class and id is used in `index.html` or `web.mjs`, that every function is called, and that no starter placeholder code is left.

## For groups of at least 2

- **`node generate-ical.mjs` makes a file called `days.ics`, and Google Calendar shows the same dates as the web page.** We ran `node generate-ical.mjs` and checked `days.ics`:
  - It has 55 events (5 days for each year from 2020 to 2030).
  - Every date is the same as the date from `getCommemorativeDate`.

  We import `days.ics` into a new, empty test calendar in Google Calendar and check that the dates are the same as on the web page.
- **The events are whole-day events with no start or end time.** Every event uses `DTSTART;VALUE=DATE` (a date with no time). There is no `DTEND` and no `RRULE`, so each event is one whole day and does not repeat.
- **The date logic is shared between the web page and the iCal script.** `web.mjs` and `generate-ical.mjs` both import `getCommemorativeDate` from `common.mjs`.
