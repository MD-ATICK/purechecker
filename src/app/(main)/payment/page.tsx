"use client"

import { Button } from "@/components/ui/button";
import usePaddle from "@/hooks/usePaddle";

export default function Test() {

  const paddle = usePaddle()
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

  const handlePayment = async () => {
    await paddle?.Checkout.open({
      items: [{ priceId: 'pri_01jef9e27xhn6x8w3bjmsdfx5x' }],
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

  // useEffect(() => {
  //   initializePaddle({ environment: 'sandbox', token: 'test_ba5824dda1f9e88081ca5c59eb2' }).then(
  //     (paddleInstance: Paddle | undefined) => {
  //       if (paddleInstance) {
  //         setPaddle(paddleInstance);
  //       }
  //     },
  //   );
  // }, []);

  return (
    <div className=" container mx-auto p-10">
      <Button onClick={handlePayment}>
        Buy Plan
      </Button>
    </div>
  )
}
