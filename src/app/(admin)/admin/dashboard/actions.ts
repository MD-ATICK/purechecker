"use server"

import { db } from "@/lib/prisma";




export const getUsersData = async () => {

    const currentDate = new Date()
    const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const users = await db.user.count({ where: { role: "USER" } })
    const previousMonthUsers = await db.user.count({
        where: {
            role: "USER", createdAt: {
                gt: previousMonthStart,
                lt: previousMonthEnd,
            }
        }
    })
    const currentMonthUsers = await db.user.count({ where: { role: "USER", createdAt: { gt: currentMonthStart } } })

    const statsPercent = ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100
    return { users, statsPercent: previousMonthUsers === 0 ? (100 * currentMonthUsers) : statsPercent };
}


export const getTotalVerifyEmails = async () => {

    const currentDate = new Date()
    const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const verifyEmails = await db.verifyEmail.count({})
    const previousMonthVerifyEmails = await db.verifyEmail.count({
        where: {
            createdAt: {
                gt: previousMonthStart,
                lt: previousMonthEnd,
            }
        }
    })
    const currentMonthVerifyEmails = await db.verifyEmail.count({ where: { createdAt: { gt: currentMonthStart } } })

    const statsPercent = ((currentMonthVerifyEmails - previousMonthVerifyEmails) / previousMonthVerifyEmails) * 100
    return { verifyEmails, statsPercent: previousMonthVerifyEmails === 0 ? (100 * currentMonthVerifyEmails) : statsPercent };
}


export const getTotalSubscriptions = async () => {


    const currentDate = new Date()
    const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const subscriptions = await db.subscription.count({})
    const previousMonthSubscriptions = await db.subscription.count({
        where: {
            createdAt: {
                gt: previousMonthStart,
                lt: previousMonthEnd,
            }
        }
    })
    const currentMonthSubscriptions = await db.subscription.count({ where: { createdAt: { gt: currentMonthStart } } })

    const statsPercent = ((currentMonthSubscriptions - previousMonthSubscriptions) / previousMonthSubscriptions) * 100
    return { subscriptions, statsPercent: previousMonthSubscriptions === 0 ? (100 * currentMonthSubscriptions) : statsPercent };
}


export const getTotalPayments = async () => {



    const currentDate = new Date()
    const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);



    const payments = await db.order.aggregate({
        _sum: {
            amount: true
        }
    })
    const previousMonthPayments = await db.order.aggregate({

        where: {
            createdAt: {
                gte: previousMonthStart,
                lte: previousMonthEnd,
            },
        },
        _sum: {
            amount: true
        }
    })
    const currentMonthPayments = await db.order.aggregate({
        where: {
            createdAt: {
                gt: currentMonthStart
            }
        },
        _sum: {
            amount: true
        }
    })

    const statsPercent = (((currentMonthPayments._sum.amount || 0) - (previousMonthPayments._sum.amount || 0)) / (previousMonthPayments._sum.amount || 0)) * 100
    return { payments: payments._sum.amount, statsPercent: previousMonthPayments._sum.amount === 0 ?  100 : statsPercent };



}


export interface last30DaysDataProps {
    Day: string,
    Users: number
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

        last30DaysData.push({ Day: dayName, Users: count })

    }
    return last30DaysData;
}