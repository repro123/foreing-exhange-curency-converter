import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const today = new Date().toISOString().split("T")[0];

export const yesterday = new Date(Date.now() - 86400000)
  .toISOString()
  .split("T")[0];

export const currencyFlags = {
  AED: "ae",
  ARS: "ar",
  AUD: "au",
  BDT: "bd",
  BGN: "bg",
  BHD: "bh",
  BRL: "br",
  CAD: "ca",
  CHF: "ch",
  CLP: "cl",
  CNY: "cn",
  COP: "co",
  CZK: "cz",
  DKK: "dk",
  EGP: "eg",
  EUR: "eu",
  GBP: "gb",
  HKD: "hk",
  HNL: "hn",
  HRK: "hr",
  HTG: "ht",
  HUF: "hu",
  IDR: "id",
  INR: "in",
  ISK: "is",
  JOD: "jo",
  JPY: "jp",
  KES: "ke",
  KRW: "kr",
  KWD: "kw",
  LBP: "lb",
  LKR: "lk",
  MAD: "ma",
  MXN: "mx",
  MYR: "my",
  NGN: "ng",
  NOK: "no",
  NPR: "np",
  NZD: "nz",
  OMR: "om",
  PEN: "pe",
  PHP: "ph",
  PKR: "pk",
  PLN: "pl",
  QAR: "qa",
  RON: "ro",
  RUB: "ru",
  SAR: "sa",
  SEK: "se",
  SGD: "sg",
  THB: "th",
  TRY: "tr",
  TWD: "tw",
  UAH: "ua",
  USD: "us",
  VND: "vn",
  ZAR: "za",
};

export const getCurrencyFlag = (currencyCode) =>
  currencyFlags[currencyCode?.toUpperCase()] ?? "eu";

export function shortenCurrencyName(name) {
  const words = name.split(" ");
  const currencyUnit = words[words.length - 1];
  const descriptors = words.slice(0, -1);

  if (descriptors.length <= 1) return name;

  const initials = descriptors.map((word) => word[0].toUpperCase()).join("");

  return `${initials} ${currencyUnit}`;
}

export function formatNumber(number) {
  return number > 1_000_000_000
    ? new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(number)
    : number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}

export function formatRelativeDate(date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffMs = now.getTime() - targetDate.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) {
    return "just now";
  }

  if (diffMins < 60) {
    return `${diffMins}M`;
  }

  if (diffHours < 24) {
    return `${diffHours}H`;
  }

  if (diffDays < 7) {
    return `${diffDays}D`;
  }

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return targetDate.toLocaleDateString("en-US", options);
}

export function getDateRange(period) {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "1D":
      start.setDate(end.getDate() - 1);
      break;
    case "1W":
      start.setDate(end.getDate() - 7);
      break;
    case "1M":
      start.setMonth(end.getMonth() - 1);
      break;
    case "3M":
      start.setMonth(end.getMonth() - 3);
      break;
    case "1Y":
      start.setFullYear(end.getFullYear() - 1);
      break;
    case "5Y":
      start.setFullYear(end.getFullYear() - 5);
      break;
    default:
      start.setMonth(end.getMonth() - 1);
  }

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

export function formatXAxisDate(date, period) {
  const d = new Date(date);

  switch (period) {
    case "1W":
      return d.toLocaleDateString("en-US", {
        weekday: "short",
      });

    case "1M":
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

    case "6M":
      return d.toLocaleDateString("en-US", {
        month: "short",
      });

    case "1Y":
    case "5Y":
      return d.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

    default:
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
  }
}
