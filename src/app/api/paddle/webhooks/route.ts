import { buyPurchase, buySubscription, updateSubscription } from '@/app/(main)/pricing/actions';
import { db } from '@/lib/prisma';
import { EventName, Paddle, SubscriptionNotification, TransactionNotification } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.NEXT_PUBLIC_PADDLE_API_KEY!)



export async function POST(req: Request) {
    try {

        const signature = req.headers.get('paddle-signature') as string || ''
        const rawRequestBody = await req.text()
        const secretKey = process.env.NEXT_PUBLIC_PADDLE_SIMULATOR_SECKET_KEY

        if (!signature || typeof signature !== 'string') {
            return new Response(JSON.stringify({ error: 'No signature' }), { status: 401 });
        }


        if (secretKey && signature && rawRequestBody) {

            const eventData = await paddle.webhooks.unmarshal(rawRequestBody, secretKey, signature);


            switch (eventData?.eventType) {
                case EventName.TransactionCompleted:
                    await handleTransactionCreated(eventData.eventType, eventData.data)
                    break;

                case EventName.SubscriptionCreated:
                case EventName.SubscriptionUpdated:
                    await handleSubscriptionUpsert(eventData.eventType, eventData.data);
                    break;

                case EventName.SubscriptionCanceled:
                    await handleSubscriptionCanceled(eventData.eventType, eventData.data);
                    break;

                default:
                    break;
            }
            return new Response(JSON.stringify(eventData), { status: 200 })
        }


    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Something is wrong" }), { status: 500 })
    }

}


const handleTransactionCreated = async (eventType: EventName, data: TransactionNotification) => {
    try {
        const { volumeId, userId } = data.customData as { volumeId: string, userId: string, customerId: string }

        if (eventType !== EventName.TransactionCompleted) {
            throw new Error('Invalid event type')
        }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) {
            throw new Error('User not found')
        }

        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) {
            throw new Error('Volume not found')
        }

        await buyPurchase({ volumeId: volume.id, userId: user.id, transactionId: data.id })

    } catch (error) {
        throw new Error((error as Error).message)
    }
}


const handleSubscriptionUpsert = async (eventType: EventName.SubscriptionCreated | EventName.SubscriptionUpdated, data: SubscriptionNotification) => {
    try {


        const { volumeId, userId } = data.customData as { volumeId: string, userId: string, customerId: string }

        if (eventType !== EventName.SubscriptionCreated && eventType !== EventName.SubscriptionUpdated) {
            throw new Error('Invalid event type')
        }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) {
            throw new Error('User not found')
        }

        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) {
            throw new Error('Volume not found')
        }

        const subscription = await db.subscription.findFirst({ where: { paddleSubscriptionId: data.id, userId: user.id } })
        if (data.currentBillingPeriod?.endsAt && data.currentBillingPeriod?.startsAt) {

            if (subscription) {

                await updateSubscription({
                    volumeId: volume.id,
                    userId: user.id,
                    subscriptionId: data.id,
                    status: data.status,
                    currentPeriodStart: data.currentBillingPeriod?.startsAt,
                    currentPeriodEnd: data.currentBillingPeriod?.endsAt,
                    subscriptionScheduleChange: data.scheduledChange ? true : false,
                })

            } else {

                // if : currently buying a subscription
                await buySubscription({
                    volumeId: volume.id,
                    userId: user.id,
                    subscriptionId: data.id,
                    status: data.status,
                    currentPeriodStart: data.currentBillingPeriod?.startsAt,
                    currentPeriodEnd: data.currentBillingPeriod?.endsAt,
                    subscriptionScheduleChange: data.scheduledChange ? true : false,
                    billingCycleInterval: data.items[0].price?.billingCycle?.interval
                })

            }
        }

    } catch (error) {
        console.log(error)
        throw new Error("something is wrong")
    }
}
const handleSubscriptionCanceled = async (eventType: EventName.SubscriptionCanceled | EventName.SubscriptionUpdated, data: SubscriptionNotification) => {
    try {

        const { volumeId, userId } = data.customData as { volumeId: string, userId: string, customerId: string }

        if (eventType !== EventName.SubscriptionCanceled) {
            throw new Error('Invalid event type')
        }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) {
            throw new Error('User not found')
        }

        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) {
            throw new Error('Volume not found')
        }

        await db.subscription.updateMany({
            where: { userId: user.id, volumeId: volume.id, paddleSubscriptionId: data.id },
            data: { status: data.status },
        });

    } catch (error) {
        throw new Error((error as Error).message)
    }
}