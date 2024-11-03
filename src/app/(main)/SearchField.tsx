"use client"
import { emailVerify } from '@/actions/emailVerify';
import LoadingButton from '@/components/LoadingButton';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks/useUser';
import { useCreditStore } from '@/store/useCreditStore';
import { VerifyEmail } from '@prisma/client';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';


export default function EmailCheckerField() {
  const [search, setSearch] = useState('');
  const [isPending, setIsPending] = useState(false);
  const user = useUser();
  const [result, setResult] = useState<VerifyEmail>();

  const { setCredit } = useCreditStore()

  const onsubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search.length) {
      return toast.error('Enter something');
    }
    if (!user || !user.id) {
      return toast.error('Please login first');
    }

    try {
      setIsPending(true);
      const res = await emailVerify(search, user.id as string);
      if (res.data) {
        setResult(res.data)
        setCredit(res.credit)
        setSearch("")
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
          className='h-14'
        >
          Check Email
        </LoadingButton>
      </form>
      {result && (<p>{result.email}</p>)}
    </div>
  );
}
