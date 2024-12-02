import { db } from "@/lib/prisma";


export async function GET(request: Request) {
    const cronToken = process.env.CRON_JOB_TOKEN;
    const tokenFromRequest = request.headers.get('x-cron-token') || new URL(request.url).searchParams.get('token');
    const date = new Date()

    if (tokenFromRequest !== cronToken) {
        return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }


    const users = await db.user.findMany({});
    for (const user of users) {

        const hasOrder = await db.credit.findUnique({ where: { userId: user.id, type: { in: ['PURCHASE', 'SUBSCRIPTION'] } } })
        if (hasOrder) {
            console.log('not accessed')
        } else {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const credit = await db.credit.findUnique({ where: { userId: user.id, type: "DEFAULT", createdAt: { gte: startOfDay, lte: endOfDay } } })
            if (!credit) {
                console.log('credit provided done', user.email, Number(process.env.NEXT_PUBLIC_PER_DAY_FREE_CREDIT) || 100)
                await db.credit.updateMany({ where: { userId: user.id, type: "DEFAULT" }, data: { credit: 0 } })
                await db.credit.create({ data: { credit: Number(process.env.NEXT_PUBLIC_PER_DAY_FREE_CREDIT || 100), userId: user.id, type: 'DEFAULT' } })
            }
        }
    }

    return Response.json({ success: true, date, context: 'Daily Free Credit' }, { status: 200 });

}