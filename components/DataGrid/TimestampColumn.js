"use client";

import { format, formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";

const customLocale = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token, count, options) {
  options = options || {};

  const result = customLocale[token].replace("{{count}}", count);

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
}

const TimestampColumn = ({ rowIndex, data, propertyName }) => {
  if (!data[rowIndex]) return null;

  const dateInString = data[rowIndex][propertyName];
  const date = new Date(dateInString);
  const distance = formatDistanceToNowStrict(date, {
    addSuffix: false,
    locale: { ...locale, formatDistance },
  });

  return (
    <div className="flex items-center justify-between gap-1 text-base">
      {format(dateInString, "dd/MM/yyyy")}{" "}
      <span className="text-sm text-gray-500">{distance}</span>
    </div>
  );
};

export default TimestampColumn;
