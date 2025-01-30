"use client";

import { useEffect, useState } from "react";
import {
  getTotalPayments,
  getTotalSubscriptions,
  getTotalVerifyEmails,
  getUsersData,
} from "./actions";
import HeaderStatsSkeleton from "./HeaderStatsSkeleton";

export default function HeaderStats() {
  const [usersData, setUsersData] = useState<{
    users: number;
    statsPercent: number;
  } | null>(null);
  const [subscriptionsData, setSubscriptionsData] = useState<{
    subscriptions: number;
    statsPercent: number;
  } | null>(null);
  const [paymentsData, setPaymentsData] = useState<{
    payments: number;
    statsPercent: number;
  } | null>(null);
  const [emailsData, setEmailsData] = useState<{
    verifyEmails: number;
    statsPercent: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [users, subscriptions, payments, emails] = await Promise.all([
          getUsersData(),
          getTotalSubscriptions(),
          getTotalPayments(),
          getTotalVerifyEmails(),
        ]);
        setUsersData(users);
        setSubscriptionsData(subscriptions);
        setPaymentsData(payments);
        setEmailsData(emails);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <HeaderStatsSkeleton type="ADMIN" />;
  }

  return (
    <div className="md:h-48 p-6 bg-sky-50 w-full grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6">
      <StatsCard
        title="Users"
        value={usersData?.users}
        percent={usersData?.statsPercent}
      />
      <StatsCard
        title="Subscription Users"
        value={subscriptionsData?.subscriptions}
        percent={subscriptionsData?.statsPercent}
      />
      <StatsCard
        title="Payments"
        value={paymentsData?.payments}
        percent={paymentsData?.statsPercent}
      />
      <StatsCard
        title="Verify Emails"
        value={emailsData?.verifyEmails}
        percent={emailsData?.statsPercent}
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  percent,
}: {
  title: string;
  value: number | undefined;
  percent: number | undefined;
}) {
  return (
    <div className="h-full w-full p-2 flex flex-col justify-between md:p-4 border-b-2 md:border-r-2 md:border-b-0">
      <h2 className="text-lg md:text-xl font-bold">{title}</h2>
      <div className="flex items-end justify-between pr-4">
        <h1 className="text-primary -mb-1">{value}</h1>
        {percent && percent < 0 ? (
          <p className="text-red-500">{Math.floor(percent)}%</p>
        ) : (
          <p className="text-green-500">+{Math.floor(percent ?? 0)}%</p>
        )}
      </div>
    </div>
  );
}
