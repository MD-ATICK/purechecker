import VolumeActionButtons from '@/app/(main)/(admin)/admin/pricing/PricingActionButton'
import { formatIndianCurrency } from '@/lib/utils'
import { Volume } from '@prisma/client'
import BuyNowButton from './BuyNowButton'

export default function PurchaseCard({ purchase, route }: { purchase: Volume, route?: "ADMIN" | "USER" }) {

    const { amount, credit, type, paddlePriceId } = purchase

    return (
        <div className=' dark:hover:bg-primary/20/80 rounded-lg mb-2  dark:border-background bg-primary/10 border border-primary shadow-sm w-full flex justify-between items-center p-2 px-3 md:py-5 md:px-8'>
            <div>
                <h2 className=' text-lg md:text-3xl font-bold ext-primary'>{formatIndianCurrency(credit)} emails  </h2>
                <p className=' text-xs md:text-sm text-gray-600'>One-time payment, last forever until it&apos;s fully used.</p>
            </div>
            <div className=' flex items-center  gap-3 md:gap-8'>
                <h2 className=' text-2xl md:text-3xl mb-3 font-bold'>${formatIndianCurrency(amount)}</h2>
                <p className=' text-xs hidden dark:text-sky-500'>${(amount / credit).toFixed(4)} / email</p>
                {
                    route === "ADMIN" ?
                        (
                            <VolumeActionButtons volume={purchase} />
                        ) :
                        (

                            <BuyNowButton volumeId={purchase.id} type={type} paddlePriceId={paddlePriceId} />
                        )
                }
            </div>
        </div>
    )
}
