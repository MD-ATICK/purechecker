"use client"
import { emailVerify } from '@/actions/emailVerify';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';
import LoadingButton from '../LoadingButton';
import { Input } from '../ui/input';

export default function EmailCheckerField() {

  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition()

  const onsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search.length) {
      return toast.error('enter some thing')
    }
    startTransition(async () => {
      const data = await emailVerify(search)
      if (data.exist) {
        toast.success('Email is exist')
      } else {
        toast.error('Email is not exist')
      }
    })
  }


  return (
    <form onSubmit={onsubmit} className=' w-full flex items-center gap-2'>

      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Enter your email' alt='' className=' bg-background h-14 w-full' />
      <LoadingButton isPending={isPending} disabled={isPending || !search.length} type='submit' className=' h-14'>Check Email</LoadingButton>
    </form>
  )
}
