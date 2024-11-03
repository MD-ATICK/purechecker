import { formatIndianCurrency } from '@/lib/utils'
import { Volume } from '@prisma/client'
import BuyNowButton from './BuyNowButton'

export default function PurchaseCard({ purchase }: { purchase: Volume }) {

    const { amount, credit, type } = purchase

    return (
        <div className='  dark:hover:bg-gray-700 border-b-2 rounded-md mb-2 border-white dark:border-background bg-secondary shadow-sm w-full flex justify-between items-center p-6'>
            <h1 className=' text-3xl font-bold ext-primary'>{formatIndianCurrency(credit)} emails</h1>
            <div className=' flex items-center gap-8'>
                <h1 className=' text-2xl font-bold'>${formatIndianCurrency(amount)}</h1>
                <h1 className='  dark:text-sky-500'>${(amount / credit).toFixed(4)} / email</h1>
                <BuyNowButton volumeId={purchase.id} type={type} />
            </div>
        </div>
    )
}
