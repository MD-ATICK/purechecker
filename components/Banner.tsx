
interface props {
    name : string,
    desc : string
}
export default function Banner({name, desc} : props) {
  return (
    <div className=' h-52 md:h-[45vh] p-2 w-full flex flex-col bg-primary/20 justify-start py-[4vw] space-y-2 items-center Banner-ClipPath'>
        <h1 className=' text-2xl font-bold md:text-4xl'>{name}</h1>
        <p className=' text-sm w-full md:max-w-[60%] text-center text-muted-foreground'>{desc}</p>
    </div>
  )
}
