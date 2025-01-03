"use client"
import { logout } from '@/actions/logout'
import { useUserStore } from '@/store/useUserStore'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function LogoutButton() {

  const { setNullUser } = useUserStore()

  return (
    <DropdownMenuItem className='' onClick={async () => {
      setNullUser()
      await logout()
      await signOut({ redirectTo: '/login' })
    }}>
      Logout
    </DropdownMenuItem>
  )
}
