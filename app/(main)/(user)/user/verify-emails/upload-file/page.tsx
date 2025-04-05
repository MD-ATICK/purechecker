"use client"
import Loading from "@/components/Loading";
import { useUserStore } from "@/store/useUserStore";
import UploadFileCo from "./UploadFileCo";

export default function Page() {


  const { user } = useUserStore()
  if (!user || !user.id) {
    return <Loading />
  }

  return (
    <div className=" p-[1vw] ">
      <UploadFileCo userId={user.id} />
    </div>
  )
}
