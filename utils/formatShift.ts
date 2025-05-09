import { format, toZonedTime } from "date-fns-tz";

export const formatShift = (
  startDateStr: string,
  endDateStr: string,
  timeZone = "America/Los_Angeles"
) => {
  const start = toZonedTime(startDateStr, timeZone);
  const end = toZonedTime(endDateStr, timeZone);

  const dayPart = format(start, "MMM d, EEE", { timeZone });
  const timePart = `${format(start, "h:mmaaa", { timeZone })} - ${format(
    end,
    "h:mmaaa",
    { timeZone }
  )}`;
  const zoneAbbr = format(start, "zzz", { timeZone });

  return `${dayPart} ${timePart} ${zoneAbbr}`;
};
