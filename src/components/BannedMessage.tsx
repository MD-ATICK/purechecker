

export default function BannedMessage() {
    return (
            <div className=" h-16 z-50 border border-red-500 w-full fixed gap-2 bottom-0 top-16 left-0 text-center flex justify-center backdrop-blur-lg bg-[#3d0606] items-center">
                <p className=" text-xs md:text-sm text-red-400">You Account have been Banned.</p>
                {/* <Link className=" text-sm text-sky-400 font-semibold hover:underline" href={`mailto:${emailConfig['support'].user}?subject=Support Request&body=Please describe your issue here...`}>Contact with Support </Link> */}
            </div>
    )
}
