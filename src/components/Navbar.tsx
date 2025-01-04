import NotFound from '@/app/not-found'
import { auth } from '@/auth'
import PoweredNavbar from './ui/PoweredNavbar'

export default async function Navbar() {

  const session = await auth()

  if (!session?.user) {
    return NotFound()
  }

  if (session.user) {
    return (
      <div className=' sticky top-0 left-0 z-50'>
        <PoweredNavbar user={session.user} />
      </div>
    )

  }
}
