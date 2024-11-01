"use client"
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function EmailCheckerField() {
  return (
    <div className=' w-full flex items-center gap-2'>
       <Input placeholder='Enter your email' alt='' className=' bg-background h-14 w-full' />
       <Button className=' h-14'>Check Email</Button>
    </div>
  )
}
