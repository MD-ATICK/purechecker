import NotFound from "@/app/not-found";
import { getUser } from "@/lib/getUser";
import UploadFilePage from "./UploadFilePage";

export default async function page() {


  const user = await getUser()
  if (!user || !user.id) {
      return NotFound()
  }


  return (
    <div className=" p-[1.5vw]">
      <UploadFilePage userId={user.id} />
    </div>
  )
}
