# Days Calendar

Some commemorative days happen on a different date every year. For example, Ada Lovelace Day is the second Tuesday of October. This calendar shows these days on the right dates for any month and year.

**Live site:** https://hadivahidi20.github.io/Checkpoint-Sprint-3-Project/

This is a Code Your Future Checkpoint project by Hadi Vahidi and Sandani Kannangara. You can read the [project brief](https://github.com/CodeYourFuture/Checkpoint/blob/main/Project-Days-Calendar/README.md) in the Code Your Future repo.

## What it does

- Shows the current month, with Sunday in the first column.
- The Previous and Next buttons move one month at a time.
- You can jump to any month and year.
- The days in `days.json` appear on the right dates.
- `node generate-ical.mjs` makes a `days.ics` file with every day from 2020 to 2030, which you can import into Google Calendar.

## How to run it

- Web page: run `npx http-server` in this folder and open http://localhost:8080. The page uses modules, so opening `index.html` directly will not work.
- Tests: `npm i` and then `npm test`.
- iCal file: `node generate-ical.mjs`.

## Files

- `common.mjs`: the date functions, shared by the web page and the iCal script
- `web.mjs`: builds the calendar on the page
- `generate-ical.mjs`: makes `days.ics`
- `common.test.mjs`: unit tests
- `TESTING.md`: how we tested each point of the rubric
