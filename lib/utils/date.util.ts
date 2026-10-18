import {
  format,
  getYear,
  getMonth,
  getDate,
  newDate,
} from "date-fns-jalali";
import { toEnglishDigits, toPersianDigits } from "@/lib/utils/persian.util";

export const PERSIAN_DATE_FORMAT = "yyyy-MM-dd";
export const PERSIAN_LONG_FORMAT = "d MMMM yyyy";

export function formatJalali(date: Date, pattern = PERSIAN_LONG_FORMAT): string {
  return toPersianDigits(format(date, pattern));
}

export function formatJalaliString(
  isoDateString: string,
  pattern = PERSIAN_LONG_FORMAT,
): string {
  const parsedDate = parseJalaliISO(isoDateString);
  if (!parsedDate) return "";
  return toPersianDigits(format(parsedDate, pattern));
}

export function parseJalaliISO(isoDateString: string): Date | null {
  const normalizedIso = toEnglishDigits(isoDateString);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalizedIso);
  if (!match) return null;
  const [, yearText, monthText, dayText] = match;
  return newDate(Number(yearText), Number(monthText) - 1, Number(dayText));
}

export function toISODate(date: Date): string {
  const year = getYear(date);
  const month = String(getMonth(date) + 1).padStart(2, "0");
  const day = String(getDate(date)).padStart(2, "0");
  return toEnglishDigits(`${year}-${month}-${day}`);
}
