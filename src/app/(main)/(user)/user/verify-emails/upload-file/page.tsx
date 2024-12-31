"use client"
import NotFound from "@/app/not-found";
import { useUser } from "@/hooks/useUser";
import UploadFileCo from "./UploadFileCo";

export default function Page() {


  const user = useUser()
  if (!user || !user.id) {
      return NotFound()
  }

  return (
    <div className=" p-[1vw] ">
      <UploadFileCo userId={user.id} />
    </div>
  )
}
