import { Volume } from '@prisma/client'
import PurchaseCard from './PurchaseCard'

export default function Purchase({ purchases, route }: { purchases: Volume[], route?: "ADMIN" | "USER"  }) {
    return (
        <div className=' py-4 md:py-8 flex flex-col w-full'>
            {
                purchases.map(purchase => (
                    <PurchaseCard route={route} key={purchase.id} purchase={purchase} />
                ))
            }
        </div>
    )
}
