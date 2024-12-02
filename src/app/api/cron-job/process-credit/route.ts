import { checkHasSubscriptionAccess } from "@/actions/users";
import { db } from "@/lib/prisma";

export async function GET(request: Request) {
    const cronToken = process.env.CRON_JOB_TOKEN;
    const tokenFromRequest = request.headers.get('x-cron-token') || new URL(request.url).searchParams.get('token');
    const date = new Date()

    if (tokenFromRequest !== cronToken) {
        return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }


    const subscriptionUsers = await db.user.findMany({ where: { subscriptions: { some: { status: "ACTIVE" } } }, include: { subscriptions: true } });

    for (const user of subscriptionUsers) {
        const subscription = user.subscriptions[0]
        if (!subscription) return;


        const volume = await db.volume.findUnique({ where: { id: subscription.volumeId } })
        if (!volume) return;

        // if (!isTimeBetween11AMto12PM()) {
        //     return Response.json({ error: 'Unauthorized-T' }, { status: 403 });
        // }

        console.log('has access check')
        const checkHasAccessToCredit = await checkHasSubscriptionAccess(subscription.id, user.id)

        if (checkHasAccessToCredit) {
            console.log('credit provided done', volume.dailyCredit)
            await db.credit.create({
                data: {
                    type: 'SUBSCRIPTION',
                    credit: volume.dailyCredit || (volume.credit / parseInt(process.env.CREDIT_LENGTH || "30")) || 100,
                    userId: user.id,
                }
            })
        }

    }

    // Your cron job logic here
    return Response.json({ success: true, date , context : 'Daily Subscription Credit'}, { status: 200 });
}