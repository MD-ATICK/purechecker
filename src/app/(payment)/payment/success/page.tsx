import { Button } from '@/components/ui/button'
import { formatDate } from 'date-fns'
import Link from 'next/link'
interface SuccessPageProps {
    searchParams: Promise<{ transactionId: string }>
}


export default async function SuccessPage({ searchParams }: SuccessPageProps) {

    const { transactionId } = await searchParams


    if (!transactionId) {
        return (
            <div className=' text-center mx-auto container flex justify-center items-center flex-col'>
                <div className=' space-y-4 py-10'>
                    <h1 className=' text-3xl md:text-4xl text-red-500 font-bold'>Failed</h1>
                    <p className=' text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, natus.</p>
                    <p className=' text-sm'>No transaction found!</p>
                </div>
            </div>
        )
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_PADDLE_SANDBOX_API}/transactions/${transactionId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PADDLE_API_KEY}`,
        }
    })

    const { data } = await res.json()

    if (!res.ok) {
        return (
            <div className=' text-center mx-auto container flex justify-center items-center flex-col'>
                <div className=' space-y-4 py-20'>
                    <h1 className=' text-3xl md:text-4xl text-red-500 font-bold'>Failed</h1>
                    <p className=' text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, natus.</p>
                    <p className=' text-sm'>No transaction found!</p>

                    <div className='flex items-center justify-center gap-3'>
                        <Button>
                            <Link href={'/pricing'}>
                                Buy Again
                            </Link>
                        </Button>
                        <Button>
                            <Link href={'/'}>
                                Go Home
                            </Link>
                        </Button>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className=' text-center mx-auto container flex justify-center items-center flex-col'>
            <div className=' space-y-4 py-20'>
                <h1 className=' text-3xl md:text-4xl text-green-500 font-bold'>Success! 🎉</h1>
                <p className=' text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, natus.</p>
                <p className=' text-sm'>transactionId: {transactionId}</p>
                <p className=' text-sm text-gray-500 font-medium'>Created At : {formatDate(data.created_at, " dd MMMM yyyy HH:mm a")}</p>
                <div className='flex items-center justify-center gap-3'>
                    <Button>
                        <Link href={'/pricing'}>
                            Buy Again
                        </Link>
                    </Button>
                    <Button>
                        <Link href={'/'}>
                            Go Home
                        </Link>
                    </Button>

                </div>
            </div>
        </div>
    )
}
