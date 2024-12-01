// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const { credits, userId, email, price } = await req.json();


    try {
        const response = await fetch('https://vendors.paddle.com/api/2.0/product/generate_pay_link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vendor_id: '207104',
                vendor_auth_code: 'f4b4d8747e76948c956e7b4e85b211d8340c45be576b2f2951',
                title: `Purchase ${credits} Credits`,
                prices: [`USD:${price}`],
                customer_email: email,
                passthrough: JSON.stringify({ userId, credits }),
                return_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you`,
                webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paddle-webhook`,
            }),
        });
        const data = await response.json()
        if (data.success) {
            return NextResponse.json({ url: data.response.url });
        } else {
            return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
        }
    } catch (error) {
        console.error('Paddle SDK Error:', error);
        return NextResponse.json({ error: 'Paddle SDK request failed' }, { status: 500 });
    }
}
