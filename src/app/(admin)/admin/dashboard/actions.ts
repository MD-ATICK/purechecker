"use server"

import { db } from "@/lib/prisma";




export const getUsersData = async () => {

    const currentDate = new Date()
    const yesterdayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const yesterdayEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const users = await db.user.count({ where: { role: "USER" } })
    const yesterDayUsers = await db.user.count({
        where: {
            role: "USER", createdAt: {
                lt: yesterdayStart,
                gt: yesterdayEnd
            }
        }
    })
    const todayUsers = await db.user.count({ where: { role: "USER", createdAt: { gt: today } } })
    const statsPercent = ((todayUsers - yesterDayUsers) / yesterDayUsers) * 100
    return { users, statsPercent: statsPercent === Infinity ? 100 : statsPercent };
}
export const getTotalVerifyEmails = async () => {

    const currentDate = new Date()
    const yesterdayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const yesterdayEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const verifyEmails = await db.verifyEmail.count({})
    const yesterDayVerifyEmails = await db.user.count({
        where: {
            createdAt: {
                lt: yesterdayStart,
                gt: yesterdayEnd
            }
        }
    })
    const todayVerifyEmails = await db.verifyEmail.count({ where: { createdAt: { gt: today } } })
    const statsPercent = ((todayVerifyEmails - yesterDayVerifyEmails) / yesterDayVerifyEmails) * 100
    return { verifyEmails, statsPercent: statsPercent === Infinity ? 100 : statsPercent };
}

export const getTotalSubscriptions = async () => {

    const currentDate = new Date()
    const yesterdayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const yesterdayEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const subscriptions = await db.subscription.count({})
    const yesterDayData = await db.subscription.count({
        where: {
            createdAt: {
                lte: yesterdayStart,
                gte: yesterdayEnd
            }
        }
    })
    const todayData = await db.verifyEmail.count({ where: { createdAt: { gt: today } } })
    const statsPercent = ((todayData - yesterDayData) / yesterDayData) * 100
    return { subscriptions, statsPercent: statsPercent === Infinity ? 100 : statsPercent };
}


export const getTotalPayments = async () => {

    const currentDate = new Date()
    const yesterdayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const yesterdayEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const payments = await db.order.aggregate({
        _sum: {
            amount: true
        }
    })
    const yesterDayData = await db.order.aggregate({
        where: {
            createdAt: {
                lte: yesterdayStart,
                gte: yesterdayEnd
            }
        },
        _sum: {
            amount: true
        }
    })
    const todayData = await db.order.aggregate({
        where: {
            createdAt: {
                gt: today
            }
        },
        _sum: {
            amount: true
        }
    })

    const statsPercent = (((todayData._sum.amount || 0) - (yesterDayData._sum.amount || 0)) / (yesterDayData._sum.amount || 0)) * 100
    return { payments: payments._sum.amount, statsPercent: statsPercent === Infinity ? 100 : statsPercent };
}


export interface last30DaysDataProps {
    day: string,
    count: number
}

export const getLast30DayUsersData = async () => {
    const last30DaysData: last30DaysDataProps[] = []

    const currentDate = new Date()

    for (let i = 30; i > 0; i--) {
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (i - 1));
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (i - 2));
        const dayName = startDate.toLocaleDateString('en-US', { month: "short", day: "numeric" });

        const count = await db.user.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            }
        })

        last30DaysData.push({ day: dayName, count })

    }
    return last30DaysData;
}