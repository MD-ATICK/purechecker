"use client"
import { singleCheckEmailVerify } from '@/actions/emailVerify';
import searchImage from '@/assets/search.png';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { useCreditStore } from '@/store/useCreditStore';
import { VerifyEmail } from '@prisma/client';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';


export default function EmailCheckerField() {
  const [search, setSearch] = useState('');
  const [isPending, setIsPending] = useState(false);
  const user = useUser();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<VerifyEmail>();

  const { credit, setCredit } = useCreditStore()

  const onsubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.emailVerified) {
      return toast.error('Please verify your email first');
    }

    if (!search.length) {
      return toast.error('Enter something');
    }
    if (!user || !user.id) {
      return toast.error('Please login first');
    }

    try {
      setIsPending(true);
      const res = await singleCheckEmailVerify(search, user.id as string)
      if (res.data) {
        setResult(res.data)
        setCredit(credit - 1)
        // setSearch("")
        setOpen(true)
        if (res.data.isExist) {
          toast.success('Email exists');
        } else {
          toast.success('Email does not exist');
        }
      } else if (res.error) {
        toast.error(res.error);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className=' w-full'>
      <form onSubmit={onsubmit} className='w-full flex items-center gap-2'>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Enter your email'
          className='bg-background h-14 w-full'
        />
        <LoadingButton
          isPending={isPending}
          disabled={isPending || !search.length}
          type='submit'
          className='h-14 block md:hidden'
        >
          <Image alt='' src={searchImage} height={20} />
        </LoadingButton>
        <LoadingButton
          isPending={isPending}
          disabled={isPending || !search.length}
          type="submit"
          className='h-14 hidden md:block'
        >
          Check Single Email
        </LoadingButton>
      </form>

      {
        result && (
          <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className={cn('w-[95%] md:min-w-[60%] p-6 md:p-10 rounded-xl border-2', result.isExist ? ' border-green-500' : 'border-destructive')}>
              <div className=' w-full space-y-3 md:space-y-8'>
                <div className=' text-center flex-col flex justify-center items-center'>
                  <DialogTitle className=' font-bold text-xl md:text-3xl'>{result.email}</DialogTitle>
                  <p className='text-sm md:text-lg text-muted-foreground'>is <span className={cn('font-bold', result.isExist ? ' text-green-500' : 'text-red-500')}>{result.isExist ? 'deliverable' : "undeliverable"}</span> email address</p>
                </div>
                <div className=' grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10'>
                  {/* PART - 1 START */}
                  <div className=' space-y-0 md:space-y-5'>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Status</p>
                      <p className=' text-sm font-bold '>{result.isExist ? 'unknown' : result.reason}</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>ESP</p>
                      <p className=' font-bold  text-sm md:text-lg capitalize'>{result.domain.split('.')[0]}</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Account</p>
                      <p className=' font-bold  text-sm md:text-lg'>{result.email.split('@')[0]}</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Free</p>
                      <p className=' font-bold  text-sm md:text-lg'>{result.free}</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Role</p>
                      <p className=' font-bold  text-sm md:text-lg'>{result.role}</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Risk Level</p>
                      <p className={cn('font-bold  text-sm md:text-lg', result.riskLevel === 'low' ? 'text-green-500' : 'text-red-500')}>{result.riskLevel}</p>
                    </div>

                  </div>

                  {/* PART - 2 START */}
                  <div className=' space-y-0 md:space-y-5'>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Mx Server:</p>
                      <p className=' font-bold text-xs md:text-md'>{result?.mxRecords[0]?.exchange || 'unknown'}</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>First Name:</p>
                      <p className=' font-bold text-md text-muted-foreground'>Unknown</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Last Name:</p>
                      <p className=' font-bold text-md text-muted-foreground'>Unknown</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Disposable:</p>
                      <p className={cn('font-bold text-md', !result.isDisposable ? 'text-green-500' : 'text-red-500')}>{result.isDisposable ? "Yes" : "No"}</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Valid Syntax:</p>
                      <p className={cn('font-bold text-md', result.isValidSyntax ? 'text-green-500' : 'text-red-500')}>{result.isValidSyntax ? "Yes" : "No"}</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                      <p className=' text-muted-foreground font-medium'>Valid Domain:</p>
                      <p className={cn('font-bold text-md', result.isValidDomain ? 'text-green-500' : 'text-red-500')}>{result.isValidDomain ? "Yes" : "No"}</p>
                    </div>

                  </div>
                </div>
                <Button onClick={() => setOpen(false)} variant={'secondary'} className=' h-12 w-full'>Cancel</Button>
              </div>
            </DialogContent>
          </Dialog>
        )
      }
    </div>
  );
}
