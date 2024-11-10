import VolumeActionButtons from '@/app/(admin)/admin/pricing/PricingActionButton'
import { formatIndianCurrency } from '@/lib/utils'
import { Volume } from '@prisma/client'
import BuyNowButton from './BuyNowButton'

export default function PurchaseCard({ purchase, route }: { purchase: Volume, route?: "ADMIN" | "USER" }) {

    const { amount, credit, type } = purchase

    return (
        <div className='  dark:hover:bg-gray-700 border-b-2 rounded-md mb-2 border-white dark:border-background bg-secondary/80 shadow-sm w-full flex justify-between items-center p-2 px-3 md:py-5 md:px-8'>
            <h2 className=' text-lg md:text-3xl font-bold ext-primary'>{formatIndianCurrency(credit)} emails</h2>
            <div className=' flex items-center  gap-3 md:gap-8'>
                <h2 className=' text-xl md:text-2xl mb-3 font-bold'>${formatIndianCurrency(amount)}</h2>
                <p className=' text-xs hidden dark:text-sky-500'>${(amount / credit).toFixed(4)} / email</p>
                {
                    route === "ADMIN" ?
                        (
                            <VolumeActionButtons volume={purchase} />
                        ) :
                        (

                            <BuyNowButton volumeId={purchase.id} type={type} />
                        )
                }
            </div>
        </div>
    )
}
