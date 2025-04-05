"use client";

import { getSubCredit } from "@/actions/users";
import Loading from "@/components/Loading";
import { useCreditStore } from "@/store/useCreditStore";
import { useEffect, useTransition } from "react";

interface props {
  userId: string;
  dashboard?: boolean;
}
export default function CreditBox({ userId, dashboard }: props) {
  const { credit, setCredit } = useCreditStore();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getCredit = async () => {
      startTransition(async () => {
        const credit = await getSubCredit(userId);
        setCredit(credit || 0);
      });
    };
    getCredit();
  }, [userId, setCredit]);

  return (
    <>
      {!dashboard && (
        <div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            {/* <Image alt="" src={rocket} height={17} className=" " /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              id="diamond"
              style={{ height: "35px", width: "35px" }}
            >
              <path
                fill="#DF5DFF"
                d="m5 15 2-9 4.5-3L15 4l2 2 2 9-3 3-4 3-7-6Z"
              ></path>
              <path
                fill="#EDA3FF"
                d="m5 15 2-9 4.5-3L10 7.5 9 16l3 5-7-6Z"
              ></path>
              <path
                fill="#B029D1"
                d="M14 16V7.5L11.5 3 15 4l2 2 2 9-3 3-4 3 2-5Z"
              ></path>
            </svg>

            {isPending ? (
              <span>
                {" "}
                <Loading />
              </span>
            ) : (
              <span className="sm:text-lg font-bold text-black">
                {credit !== undefined ? credit : "Loading..."}
              </span>
            )}
          </div>
        </div>
      )}
      {dashboard && (
        <div className="flex items-center py-2 justify-between w-full">
          <div className=" text-xs">Credits : </div>
          <div className="text-xs text-sky-500 font-semibold">
            {credit !== undefined ? credit : "Loading..."}
          </div>
        </div>
      )}
    </>
  );
}
