import logo from '@/assets/logo.png'
import { checkSubscription, getUser } from '@/lib/getUser'
import Image from 'next/image'
import Link from 'next/link'
import CreditBox from './CreditBox'
import MenuSheet from './MenuSheet'
import { Button } from './ui/button'
import UserButton from './UserButton'
export default async function Navbar() {

  const user = await getUser()
  if (user && user.subscriptionId) {
    await checkSubscription({ userId: user.id!, subscriptionId: user.subscriptionId })
  }


  return (
    <div className=" sticky top-0 px-2 w-full backdrop-blur-lg bg-white z-50 dark:bg-background shadow-sm h-16 flex justify-between items-center bg-[#01031017]">
      <main className=' container mx-auto flex items-center justify-between'>

        {/* LOGO */}
        <Link href={'/'} className='flex items-center gap-2'>
          <Image alt='' src={logo} height={30} />
          <h1 className=" font-bold mb-3 text-lg sm:text-2xl">PureChecker</h1>
        </Link>

        {/* NAV ITEMS */}
        <nav className=' hidden lg:flex items-center gap-2'>
          <Link href={'/'} className=' font-medium' >
            <Button variant={"ghost"} className=' w-[100px] text-[15px]'>Home</Button>
          </Link>
          <Link href={'/pricing'} className=' font-medium' >
            <Button variant={"ghost"} className=' w-[100px] text-[15px]'>Pricing</Button>
          </Link>
          <Link href={'/contact-us'} className=' font-medium' >
            <Button variant={"ghost"} className=' w-[100px] text-[15px]'>Contact Us</Button>
          </Link>
          <Link href={'/docs'} className=' font-medium' >
            <Button variant={"ghost"} className=' w-[100px] text-[15px]'>Docs</Button>
          </Link>
          <Link href={'/blog'} className=' font-medium' >
            <Button variant={"ghost"} className=' w-[80px] text-[15px]'>Blog</Button>
          </Link>
          <Link href={'/faq'} className=' font-medium' >
            <Button variant={"ghost"} className=' w-[80px] text-[15px]'>FAQS</Button>
          </Link>
        </nav>


        {/* ACTIONS BUTTON */}
        <div className=' flex items-center gap-2'>
          <MenuSheet className=' lg:hidden' />

          {/* comment mode toggle because of jamela. in future, i will uncomment again. */}
          {/* {
            user &&
            <ModeToggle />
          } */}
          {
            user && <div className=' flex items-center justify-center gap-2 sm:gap-4'>
              <CreditBox userId={user.id!} />
              <UserButton role={user.role} name={user.name || "John Due"} />
            </div>
          }
          {!user && (
            <div className='md:flex hidden items-center gap-3'>
              <Link href={'/login'}>
                <Button variant={'secondary'}>Login</Button>
              </Link>
              <Link href={'/signup'}>
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
          {!user && (
            <div className='flex md:hidden items-center gap-2'>
              <Link href={'/login'}>
                <Button variant={'outline'} size={'sm'}>Login</Button>
              </Link>
              <Link href={'/signup'}>
                <Button size={'sm'}>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}
