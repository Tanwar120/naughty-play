import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency with symbol and decimals
export function formatCurrency(amount: number, currency = "USD", decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

// Format crypto values with appropriate decimals
export function formatCrypto(amount: number, symbol: string): string {
  let decimals = 2;
  
  // Use more decimals for BTC and other high-value crypto
  if (["BTC", "ETH"].includes(symbol)) {
    decimals = 8;
  }
  
  return `${amount.toFixed(decimals)} ${symbol}`;
}

// Format large numbers with commas
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Convert crypto value to USD equivalent
export function cryptoToUsd(amount: number, rate: number): string {
  return formatCurrency(amount * rate);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Generate a random number between min and max
export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Format date to readable string
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Simple email validation
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simple password strength check
export function getPasswordStrength(password: string): "weak" | "medium" | "strong" {
  if (password.length < 8) return "weak";
  if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    return "strong";
  }
  return "medium";
}
