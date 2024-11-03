import { Volume } from '@prisma/client'
import PurchaseCard from './PurchaseCard'

export default function Purchase({ purchases }: { purchases: Volume[] }) {
    return (
        <div className=' py-6 flex flex-col w-full'>
            {
                purchases.map(purchase => (
                    <PurchaseCard key={purchase.id} purchase={purchase} />
                ))
            }
        </div>
    )
}
