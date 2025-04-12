import { TriangleAlert } from "lucide-react";
import React from "react";

export default function BanMessage() {
  return (
    <div className=" w-full flex z-50 md:justify-center gap-2 text-sm items-start text-red-700 md:text-lg bg-[#fdb4b4] p-3 top-20">
      <TriangleAlert className=" size-5 md:size-6" />
      <p>You have been banned for violating our terms and conditions.</p>
    </div>
  );
}
