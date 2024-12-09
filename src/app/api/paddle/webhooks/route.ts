import { buyPurchase } from '@/app/(main)/pricing/actions';
import { EventName, Paddle } from '@paddle/paddle-node-sdk';

const paddle = new Paddle('d2fc0d93483be40943d596c118c8577fbcf68c7d88fce33f2e')

export async function POST(req: Request) {
    try {
        const signature = req.headers.get('paddle-signature') as string || ''
        const rawRequestBody = await req.text()
        const secretKey = 'pdl_ntfset_01jekpxcrhngnj3chc6j0dkyb3_DKGuiZpWgIP0UiI32PrUCMVKozSEWOcB'

        if (!signature || typeof signature !== 'string') {
            return new Response(JSON.stringify({ error: 'No signature' }), { status: 401 });
        }


        if (signature && rawRequestBody) {

            const eventData = await paddle.webhooks.unmarshal(rawRequestBody, secretKey, signature);


            switch (eventData?.eventType) {
                case EventName.TransactionCompleted:
                    const { volumeId, userId } = eventData.data.customData as { volumeId: string, userId: string }

                    if (volumeId && userId) {
                        await buyPurchase({ volumeId, userId, transactionId: eventData.data.id })
                    }
                    break;

                // const { id, transactionId, currentBillingPeriod, status} = eventData.data
                case EventName.SubscriptionCreated:
                case EventName.SubscriptionUpdated:
                    // todo: eventData.data.scheduledChange means cancel(if hit when this current period end)
                    console.log('showing important data ------------------------------', eventData.data.billingCycle, eventData.data.currentBillingPeriod, eventData.data.scheduledChange)
                    console.log({ 'subscription updated or created ': eventData.data.status })
                    break;
                case EventName.SubscriptionPastDue:
                    console.log({ 'subscription past due ': eventData.data.status })
                    break;
                case EventName.SubscriptionCanceled:
                    console.log({ 'subscription canceled': eventData.data.status })
                    break;
                default:
                    break;
            }
            return new Response(JSON.stringify(eventData), { status: 200 })
        }


    } catch (error) {
        console.log('webhook error', (error as Error).message)
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 })
    }

}