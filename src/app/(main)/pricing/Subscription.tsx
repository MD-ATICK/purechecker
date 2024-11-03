import { Volume } from "@prisma/client";
import SubscriptionCard from "./SubscriptionCard";

export default function Subscription({ subscriptions }: { subscriptions: Volume[] }) {
    return (
        <div className=" py-10 grid-cols-5 gap-10 grid ">
            {
                subscriptions.map(subscription => (<SubscriptionCard key={subscription.id} subscription={subscription} />))
            }
        </div>
    )
}
