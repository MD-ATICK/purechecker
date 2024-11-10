
interface props {
    name : string,
    desc : string
}
export default function Banner({name, desc} : props) {
  return (
    <div className=' h-52 md:h-80 p-2 w-full flex flex-col  bg-background justify-start py-10 space-y-3 items-center Banner-ClipPath'>
        <h1 className=' text-2xl font-bold md:text-4xl'>{name}</h1>
        <p className=' text-sm md:text-lg  text-center text-muted-foreground'>{desc}</p>
    </div>
  )
}
