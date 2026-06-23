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
