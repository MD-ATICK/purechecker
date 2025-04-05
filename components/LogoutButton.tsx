"use client"
import { logout } from '@/actions/logout'
import { useUserStore } from '@/store/useUserStore'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'

export default function LogoutButton() {

  const { setNullUser } = useUserStore()

  return (
    <DropdownMenuItem className='' onClick={async () => {
      await logout()
      await signOut({ redirectTo: '/login' })
      setNullUser()
      // await logout()
    }}>
      <LogOutIcon /> Logout
    </DropdownMenuItem>
  )
}
