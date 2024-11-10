import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className=' h-screen w-full flex p-3 justify-center items-center'>
      <div className=' space-y-2 text-center flex-col w-full md:w-1/2 flex justify-center items-center'>
        <h1>Page not found</h1>
        <p className=' text-sm text-muted-foreground'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa maiores dolores aliquid a mollitia possimus officiis dicta enim exercitationem. Praesentium?</p>
        <br />
        <Link href="/">
          <Button variant={'secondary'}>
          Go to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}