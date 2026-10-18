const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const PERSIAN_DIGIT_CHARS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGIT_CHARS = "٠١٢٣٤٥٦٧٨٩";

export function toPersianDigits(value: string | number): string {
  return String(value)
    .replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)])
    .replace(
      /[٠-٩]/g,
      (digit) => PERSIAN_DIGITS[ARABIC_DIGIT_CHARS.indexOf(digit)],
    );
}

export function toEnglishDigits(value: string | number): string {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGIT_CHARS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGIT_CHARS.indexOf(digit)));
}

export function formatPhone(phoneNumber: string): string {
  const englishDigits = toEnglishDigits(phoneNumber);
  if (englishDigits.length !== 11) {
    return toPersianDigits(phoneNumber);
  }
  return toPersianDigits(
    `${englishDigits.slice(0, 4)} ${englishDigits.slice(4, 7)} ${englishDigits.slice(7)}`,
  );
}
