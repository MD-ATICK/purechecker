import { TriangleAlert } from "lucide-react"

export default function BannedMessage() {
  return (
    <div className=" fixed w-full font-semibold flex md:justify-center gap-2 items-start text-red-700 text-sm bg-[#fdb4b4] p-3 top-20">
        <TriangleAlert className=" size-5" />
        <p>You have been banned for violating our terms and conditions.</p>
    </div>
  );
}
