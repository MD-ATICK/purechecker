

export default function BannedMessage() {
    return (
        <div className=" h-16 border-t-2 border-red-500 w-full fixed gap-2 bottom-0 z-50 left-0 text-center flex justify-center backdrop-blur-lg bg-[#900a0a70] items-center">
            <p className=" text-xs md:text-sm text-red-400">You Account have been Banned.</p>
            {/* <Link className=" text-sm text-sky-400 font-semibold hover:underline" href={`mailto:${emailConfig['support'].user}?subject=Support Request&body=Please describe your issue here...`}>Contact with Support </Link> */}
        </div>
    )
}
