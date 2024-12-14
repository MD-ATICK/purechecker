// hooks/usePaddle.tsx
"use client";
import { createCredit } from "@/app/(main)/pricing/actions";
import { Environments, initializePaddle, Paddle } from "@paddle/paddle-js";
import { CreditType } from "@prisma/client";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>()
  const environment: Environments = process.env.NEXT_PUBLIC_PADDLE_ENV === "production" ? "production" : "sandbox"



  useEffect(() => {
    initializePaddle({
      environment,
      token: process.env.NEXT_PUBLIC_PADDLE_TOKEN!,
      eventCallback: async (data) => {
        if (data.name === 'checkout.completed') {
          const { volume_id, type, user_id } = data.data?.custom_data as { volume_id: string, user_id: string, type: CreditType }
          const res = await createCredit(user_id, volume_id, type)
          if (res.success) {
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


