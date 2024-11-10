import { Volume } from "@prisma/client";
import SubscriptionCard from "./SubscriptionCard";

export default function Subscription({ subscriptions, route }: { subscriptions: Volume[], route?: "ADMIN" | "USER"  }) {
    return (
        <div className=" py-4 md:py-10 grid-cols-2 md:grid-cols-5 gap-3 md:gap-8 grid ">
            {
                subscriptions.map(subscription => (<SubscriptionCard route={route} key={subscription.id} subscription={subscription} />))
            }
        </div>
    )
}
