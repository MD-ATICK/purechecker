"use client"
import { useUserStore } from '@/store/useUserStore'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function LogoutButton() {

  const { setNullUser } = useUserStore()

  return (
    <DropdownMenuItem className='' onClick={() => {
      setNullUser()
      signOut({ redirectTo: '/login' })
      // await logout()
    }}>
      Logout
    </DropdownMenuItem>
  )
}
