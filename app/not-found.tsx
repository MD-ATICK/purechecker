import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className=' h-screen w-full flex p-3 justify-center items-center'>
      <div className=' space-y-2 text-center flex-col w-full md:w-1/2 flex justify-center items-center'>
        <h1>Page not found</h1>
        <p className=' text-sm text-muted-foreground'> Oops! The page you’re looking for doesn’t exist or might have been moved. Don’t worry, you can head back to our homepage or explore other sections of our site. If you think this is a mistake, please let us know, and we’ll get it sorted out. Thanks for your patience!</p>
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