// hooks/usePaddle.tsx
"use client";
import { sendEmail } from "@/actions/sendMail";
import { getUserById } from "@/actions/users";
import { getVolumeById } from "@/app/(main)/(admin)/admin/pricing/actions";
import { createCredit } from "@/app/(main)/pricing/actions";
import PurchaseMail from "@/emails/PurchanseMail";
import SubscriptionMail from "@/emails/SubscriptionMail";
import { Environments, initializePaddle, Paddle } from "@paddle/paddle-js";
import { CreditType } from "@prisma/client";
import { render } from "@react-email/components";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>()


  const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environments || "production"

  useEffect(() => {
    initializePaddle({
      environment,
      token: process.env.NEXT_PUBLIC_PADDLE_TOKEN!,

      eventCallback: async (data) => {
        if (data.name === 'checkout.completed') {
          const { volume_id, type, user_id } = data.data?.custom_data as { volume_id: string, user_id: string, type: CreditType }
          const res = await createCredit(user_id, volume_id, type)
          const user = await getUserById(user_id)
          const volumeRes = await getVolumeById(volume_id)
         
          if (res.success && user && volumeRes.success) {
            if (type === "SUBSCRIPTION") {
              const html = await render(<SubscriptionMail name={user.name!} email={user.email!} amount={volumeRes.volume.amount} credit={volumeRes.volume.credit} perDayCredit={Math.floor(volumeRes.volume.credit / 30)} createdAt={new Date().toISOString()} type={volumeRes.volume.type} />)
              const subject = ` Subscription Purchase Confirmation`
              await sendEmail({ to: user.email!, html, subject, type: 'billing' })
            } else {
              const html = await render(<PurchaseMail name={user.name!} email={user.email!} amount={volumeRes.volume.amount} credit={volumeRes.volume.credit} createdAt={new Date().toISOString()} type={volumeRes.volume.type} />)
              const subject = `One-Time Purchase Confirmation`
              await sendEmail({ to: user.email!, html, subject, type: 'billing' })

            }
            window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?transactionId=${data.data?.transaction_id}`
            
          } else {
            notFound()
          }
          paddle?.Checkout.close()
        }
      }
    }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, [paddle?.Checkout, environment]);


  return paddle;
}


