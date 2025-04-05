import { clsx, type ClassValue } from "clsx";
import crypto from 'crypto';
import { formatDate, formatDistanceToNowStrict } from 'date-fns';
import { twMerge } from "tailwind-merge";

import { userDashboardData } from "@prisma/client";
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

function countEmailsByDay(emails: { email: string; checkedAt: Date }[]) {

  const date30DaysAgo = new Date();
  date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

  return emails
      .filter(email => email.checkedAt >= date30DaysAgo) // Filter emails from the last 30 days
      .reduce((acc, email) => {
          const dateKey = email.checkedAt.toISOString().split('T')[0]; // Extract the date (YYYY-MM-DD)
          if (!acc[dateKey]) {
              acc[dateKey] = 0;
          }
          acc[dateKey] += 1;
          return acc;
      }, {} as Record<string, number>);
}


export const getLast30dayDashboardData = (userDashboardData: userDashboardData) => {
  // Count emails by type for the last 30 days
  const deliverableCount = countEmailsByDay(userDashboardData.deliverableEmails);
  const undeliverableCount = countEmailsByDay(userDashboardData.undeliverableEmails);
  const apiUsageCount = countEmailsByDay(userDashboardData.apiUsagesEmails);

  // Prepare all dates in the last 30 days
  const allDates = [];
  for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      allDates.push(date.toISOString().split('T')[0]); // Add the date (YYYY-MM-DD)
  }

  // Merge data with 0 values for missing days
  const finalData = allDates.map(date => ({
      day : date,
      deliverable: deliverableCount[date] || 0,
      unDeliverable: undeliverableCount[date] || 0,
      apiUsage: apiUsageCount[date] || 0,
  }));

  return finalData.reverse();
}




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
