"use client"
import NotFound from "@/app/not-found";
import { useUserStore } from "@/store/useUserStore";
import UploadFileCo from "./UploadFileCo";

export default function Page() {


  const { user } = useUserStore()
  if (!user || !user.id) {
    return NotFound()
  }

  return (
    <div className=" p-[1vw] ">
      <UploadFileCo userId={user.id} />
    </div>
  )
}
