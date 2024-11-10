"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { notFound } from 'next/navigation';

export default function BuyCreditsPage() {
    const user = useUser()
    if (!user || !user.id) {
        return notFound()
    }

    const handlePurchase = async (credits: number, price: number) => {
        const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credits, price, userId: user.id, email: user.email }),
        });

        const { url } = await res.json();
        window.location.href = url
        // router.push(url); // Redirect to Paddle checkout page
    };

    return (
        <div className=' p-10'>
            <Button onClick={() => handlePurchase(5000, 5)}>
                Buy Credits
            </Button>
        </div>
    );
}
