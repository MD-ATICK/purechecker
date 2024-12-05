"use client"

import { Button } from "@/components/ui/button";
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from "react";

export default function Test() {

  const [paddle, setPaddle] = useState<Paddle>();
  
  // const handlePayment = async () => {
  //   if (window.Paddle) {
  //     await window.Paddle.Checkout.open({
  //       items: [
  //         {
  //           priceId: 'pri_01je3x5306ed7aqpfmy39awjdp',
  //           quantity: 1
  //         }
  //       ],
  //       customer: {
  //         email: 'customer@gmail.com'
  //       }
  //     })
  //   }
  // }

  const handlePayment = () => {
    paddle?.Checkout.open({
      items: [{ priceId: 'pri_01je3x5306ed7aqpfmy39awjdp', quantity: 1 }],
    });
  };

  // useEffect(() => {
  //   if (window.Paddle) {
  //     window.Paddle.Initialize({
  //       token: 'live_f34a0edff531556f462721cf531',
  //     })
  //     window.Paddle.Environment.set('sandbox');
  //   }
    
  // }, []);

  useEffect(() => {
    initializePaddle({ environment: 'sandbox', token: 'live_f34a0edff531556f462721cf531' }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, []);

  return (
    <div className=" container mx-auto p-10">
      <Button onClick={handlePayment}>
        Buy Plan 1
      </Button>
    </div>
  )
}
