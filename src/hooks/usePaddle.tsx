// hooks/usePaddle.tsx
"use client";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export default function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>()

  useEffect(() => {
    initializePaddle({
      environment: 'sandbox', token: 'test_ba5824dda1f9e88081ca5c59eb2',
      eventCallback: (data) => {
        if (data.name === 'checkout.completed') {
          window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/success?transactionId=${data.data?.transaction_id}`
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
  }, [paddle?.Checkout]);


  return paddle;
}


