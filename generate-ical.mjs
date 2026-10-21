import { writeFile } from "node:fs/promises";
import { getCommemorativeDate, MONTH_NAMES } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const START_YEAR = 2020;
const END_YEAR = 2030;

const dtstamp = new Date()
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\.\d{3}/, "");

function escapeICalText(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

let icalContent = "";

icalContent += "BEGIN:VCALENDAR\r\n";
icalContent += "VERSION:2.0\r\n";
icalContent += "PRODID:-//CodeYourFuture//Commemorative Days//EN\r\n";
icalContent += "CALSCALE:GREGORIAN\r\n";

for (let year = START_YEAR; year <= END_YEAR; year++) {
  for (const day of daysData) {
    const date = getCommemorativeDate(day, year);
    const monthIndex = MONTH_NAMES.indexOf(day.monthName);

    if (monthIndex === -1) {
      throw new Error(`Unknown month: ${day.monthName}`);
    }

    const formattedDate = `${year}${String(monthIndex + 1).padStart(2, "0")}${String(date).padStart(2, "0")}`;
    const uidName = day.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    icalContent += "BEGIN:VEVENT\r\n";
    icalContent += `UID:${uidName}-${formattedDate}@codeyourfuture.github.io\r\n`;
    icalContent += `DTSTAMP:${dtstamp}\r\n`;
    icalContent += `DTSTART;VALUE=DATE:${formattedDate}\r\n`;
    icalContent += `SUMMARY:${escapeICalText(day.name)}\r\n`;

    if (day.descriptionURL) {
      icalContent += `URL:${day.descriptionURL}\r\n`;
    }

    icalContent += "END:VEVENT\r\n";
  }
}

icalContent += "END:VCALENDAR\r\n";

await writeFile("commemorative-days.ics", icalContent, "utf8");

console.log("Calendar generated: commemorative-days.ics");
