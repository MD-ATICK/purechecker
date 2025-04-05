import { db } from "@/lib/prisma";


export async function GET(request: Request) {
    const cronToken = process.env.CRON_JOB_TOKEN;
    const tokenFromRequest = request.headers.get('x-cron-token') || new URL(request.url).searchParams.get('token');

    if (`${tokenFromRequest}-abc123def` !== `${cronToken}-abc123def`) {
        return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return Response.json({ success: true, message: 'Cron job is OFF' }, { status: 200 });

    const users = await db.user.findMany({});
    const detectedUsers: string[] = []
    const executedUsers: string[] = []
    for (const user of users) {

        const hasOrdered = await db.credit.findUnique({ where: { userId: user.id, type: { in: ['PURCHASE', 'SUBSCRIPTION'] } } })
        if (!hasOrdered) {
            const startOfDay = new Date();
            detectedUsers.push(user.email!)
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const credit = await db.credit.findUnique({ where: { userId: user.id, type: "DEFAULT", createdAt: { gte: startOfDay, lte: endOfDay } } })
            if (!credit) {
                executedUsers.push(user.email!)
                await db.credit.updateMany({ where: { userId: user.id, type: "DEFAULT" }, data: { credit: 0 } })
                await db.credit.create({ data: { credit: Number(process.env.NEXT_PUBLIC_PER_DAY_FREE_CREDIT || 100), userId: user.id, type: 'DEFAULT' } })
            }
        }
    }

    await db.cronJob.create({
        data: {
            detectedUsers,
            executedUsers,
            detectedUsersLength: detectedUsers.length,
            executedUsersLength: executedUsers.length,
            type: 'free'
        }
    })
    return Response.json({ success: true }, { status: 200 });

}