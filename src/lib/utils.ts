import { clsx, type ClassValue } from "clsx";
import crypto from 'crypto';
import { formatDate, formatDistanceToNowStrict } from 'date-fns';
import { twMerge } from "tailwind-merge";

import disposableDomains from 'disposable-email-domains';


export const emailConfig = {
    info: {
        user: "info@purechecker.com",
        pass: "ZtP5ixkC5dtw",
    },
    billing: {
        user: "billing@purechecker.com",
        pass: "fdD2jtSnGGn8",
    },
    support: {
        user: "support@purechecker.com",
        pass: "6RahhU4G26VH",
    },
};


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateRandomToken(size = 32) {
  return crypto.randomBytes(size).toString('hex'); // Default size is 32 bytes
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date()
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true })
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, 'MMM d')
    } else {
      return formatDate(from, 'MMM d, yyyy')
    }
  }
}
export const formatIndianCurrency = (num: number) => {
  return new Intl.NumberFormat('en-IN').format(num);
};


export function formatNumber(n: number): string {
  return Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}


export function extractEmails(inputText: string) {
  // Regular expression to match valid email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  // Extract all matches and return as an array
  const emails = inputText.match(emailRegex) || [];
  return emails;
}


export function isTimeBetween11AMto1AM() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Check if the hour is within the range of 11:00 AM to 12:00 PM
  if (hours === 23) {
    return true; // Any minute within 11:00 AM to 11:59 AM is valid
  } else if (hours === 24 && minutes < 59) {
    return true; // Exactly 12:00 PM is valid
  }

  return false;
}

export function isValidSyntax(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Assess risk level based on checks
export function getRiskLevel(disposable: boolean, smtpExists: boolean): string {
  if (!smtpExists) return "high";
  if (disposable) return "medium";
  return "low";
}
// Check if the email domain is disposable
export function isDisposableEmail(domain: string): boolean {
  return disposableDomains.includes(domain);
}
