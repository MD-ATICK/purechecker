"use client"
import { logout } from '@/actions/logout'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function LogoutButton() {
  return (
    <DropdownMenuItem className='' onClick={async () => {
      await logout()
      await signOut({ redirectTo: '/login' })
    }}>
      Logout
    </DropdownMenuItem>
  )
}
