"use client"
import reloadImage from '@/assets/reload.png'
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/hooks/useUser"
import { Subscription } from "@prisma/client"
import { formatDate } from "date-fns"
import { Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { customerPortal, getSubscriptionById } from "./actions"

export default function Page() {


  const user = useUser()
  const [isPendingMB, startTransitionMB] = useTransition()
  const [isPendingSB, startTransitionSB] = useTransition()

  const [subscription, setSubscription] = useState<Subscription | null>(null);


  const manageBillingHandler = async () => {
    startTransitionMB(async () => {
      try {
        if (user?.customerId) {
          const data = await customerPortal(user?.customerId as string)

          if (data?.error) {
            toast.error(data.error)
          }

          if (data?.success) {
            window.location.href = data.url
          }
        }

      } catch (error) {
        toast.error((error as Error).message)
      }
    })
  }

  useEffect(() => {
    const getSubscriptionHandler = async () => {
      startTransitionSB(async () => {
        if (user?.subscriptionId) {
          const res = await getSubscriptionById(user?.subscriptionId as string)
          if (res.error) {
            toast.error(res.error)
          }

          if (res.success) {
            setSubscription(res.subscription)
          }
        }
      })
    }

    getSubscriptionHandler()
  }, [user?.subscriptionId]);

  return (
    <>
      {user ? (
        <div className=" container mx-auto px-2 h-[80vh] w-full gap-8 flex flex-col justify-center items-center">
          <h1 className=" font-bold text-3xl">Billing Management</h1>
          {
            isPendingSB &&
            <Skeleton className=" max-w-3xl w-full aspect-[16/7]" />
          }
          {
            !subscription && !isPendingSB &&
            <div className=" shadow-lg bg-secondary p-6 flex flex-col gap-5 rounded-lg max-w-3xl overflow-hidden w-full relative">

              {/* top content */}
              <div>
                <h1 className=" h-2 w-full bg-yellow-600 absolute -top-4 left-0"></h1>
                <div className=" flex items-center gap-3">
                  <span className="h-5 mt-2 aspect-square rounded-full bg-yellow-600"></span>
                  <h2 className=" font-bold">     No Active Subscription</h2>
                </div>
                <p className=" text-sm text-gray-300">Upgrade to Pro to unlock premium features</p>
              </div>


              {/* subscription info box */}
              <div className=" flex flex-col justify-center gap-2 items-center">
                <p className=" text-center text-sm text-gray-300">
                  Get access to exclusive content and features with our Pro plan.
                </p>
                <br />
                <Link href={'/pricing'}>
                  <Button className=" bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700">
                    Upgrade Subscription
                  </Button>
                </Link>
              </div>
              <br />

              {/* manage billing button */}
              {
                user.emailVerified && subscription &&
                <div onClick={manageBillingHandler} className=" flex items-center justify-end">
                  <LoadingButton disabled={isPendingMB} isPending={isPendingMB}>Manage Billing</LoadingButton>
                </div>
              }
            </div>
          }
          {
            subscription && !isPendingSB &&
            <div className=" shadow-lg bg-secondary p-6 flex flex-col gap-5 rounded-lg max-w-3xl overflow-hidden w-full relative">

              {/* top content */}
              <div>
                <h1 className=" h-2 w-full  bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 absolute -top-4 left-0"></h1>
                <div className=" flex items-center gap-3">
                  <span className="h-5 mt-2 aspect-square rounded-full bg-green-600"></span>
                  <h2 className=" font-bold capitalize">{subscription.status} Subscription</h2>
                </div>
                <p className=" text-sm text-gray-300"> Stay up-to-date with your current plan and renewal details</p>
              </div>


              {/* subscription info box */}
              <div className=" bg-background rounded-lg p-2 flex flex-col gap-3 px-10 ">
                <div className="">
                  <p className=" text-sm">Plan</p>
                  <p className=" capitalize">{subscription.billingCycleInterval}</p>
                </div>
                <div className="">
                  <p className=" text-sm ">Next Billing Date</p>
                  <p className="">{formatDate(subscription.currentPeriodEnd, 'dd/MM/yyyy')}</p>
                </div>
              </div>
              {subscription.subscriptionScheduleChange &&
                <div className=" h-12 w-full gap-2 text-xs sm:text-sm rounded-lg bg-[#fff20046] border border-yellow-600  text-yellow-300 flex justify-center items-center" >
                  <Info size={16} />
                  <p>
                    Cancel Subscription will executed on the end of the current billing cycle.
                  </p>
                </div>
              }

              {/* manage billing button */}
              <div onClick={manageBillingHandler} className=" flex items-center justify-end">
                <LoadingButton disabled={isPendingMB} isPending={isPendingMB}>Manage Billing</LoadingButton>
              </div>
            </div>
          }
        </div>
      ) : (
        <div className=" py-6 flex flex-col justify-center items-center">
          <Button variant={'secondary'} onClick={() => window.location.reload()}>
            Reload Page
            <Image alt="" className='dark:invert' src={reloadImage} height={16} />
          </Button>
        </div>
      )
      }
    </>
  )
}
