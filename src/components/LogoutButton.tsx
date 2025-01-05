"use client"
import { useUserStore } from '@/store/useUserStore'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function LogoutButton() {

  const { setNullUser, setIsAuthPending } = useUserStore()

  return (
    <DropdownMenuItem className='' onClick={() => {
      setIsAuthPending(true)
      setNullUser()
      signOut({ redirectTo: '/login' })
      setIsAuthPending(false)
      // await logout()
    }}>
      Logout
    </DropdownMenuItem>
  )
}
