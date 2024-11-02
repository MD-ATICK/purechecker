
interface props {
    name : string,
    desc : string
}
export default function Banner({name, desc} : props) {
  return (
    <div className=' h-80 w-full flex flex-col  bg-background justify-center space-y-3 items-center Banner-ClipPath'>
        <h1 className=' font-bold text-4xl'>{name}</h1>
        <p className=' text-muted-foreground'>{desc}</p>
    </div>
  )
}
