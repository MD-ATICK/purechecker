import { checkHasSubscriptionAccess } from "@/actions/users";
import { db } from "@/lib/prisma";

export async function GET(request: Request) {
    const cronToken = process.env.CRON_JOB_TOKEN;
    const tokenFromRequest = request.headers.get('x-cron-token') || new URL(request.url).searchParams.get('token');

    if (`${tokenFromRequest}-abc123def` !== `${cronToken}-abc123def`) {
        return Response.json({ error: 'Unauthorized' }, { status: 200 });
    }

    const subscriptionUsers = await db.user.findMany({ where: { subscriptions: { some: { status: "active" } } }, include: { subscriptions: true } });
    const detectedUsers: string[] = []
    const executedUsers: string[] = []

    for (const user of subscriptionUsers) {
        const subscription = user.subscriptions[0]
        if (!subscription) return;

        detectedUsers.push(user.email!)

        const volume = await db.volume.findUnique({ where: { id: subscription.volumeId } })
        if (!volume) return;

        const checkHasAccessToCredit = await checkHasSubscriptionAccess(subscription.id, user.id)

        if (checkHasAccessToCredit) {
            executedUsers.push(user.email!)
            await db.credit.create({
                data: {
                    type: 'SUBSCRIPTION',
                    credit: volume.dailyCredit || (volume.credit / Math.floor(parseInt(process.env.NEXT_PUBLIC_SUBSCRIPTION_DAY_LENGTH || "30"))),
                    userId: user.id,
                }
            })
        }

    }

    // Your cron job logic here
    await db.cronJob.create({
        data: {
            detectedUsers,
            executedUsers,
            detectedUsersLength: detectedUsers.length,
            executedUsersLength: executedUsers.length,
            type: 'subscription'
        }
    })
    return Response.json({ success: true }, { status: 200 });
}