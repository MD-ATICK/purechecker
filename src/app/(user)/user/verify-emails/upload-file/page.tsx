import NotFound from "@/app/not-found";
import { getUser } from "@/lib/getUser";
import UploadFileCo from "./UploadFileCo";

export default async function page() {


  const user = await getUser()
  if (!user || !user.id) {
      return NotFound()
  }

  return (
    <div className=" p-[1.5vw]">
      <UploadFileCo userId={user.id} />
    </div>
  )
}
