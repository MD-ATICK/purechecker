"use client"
import { logout } from '@/actions/logout'
import { useUserStore } from '@/store/useUserStore'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function LogoutButton() {

  const { setNullUser } = useUserStore()
  const router = useRouter()

  return (
    <DropdownMenuItem className='' onClick={async () => {
      setNullUser()
      await logout()
      await signOut({ redirect: false })
      router.push('/login')
    }}>
      Logout
    </DropdownMenuItem>
  )
}
