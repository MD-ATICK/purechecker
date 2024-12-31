"use client"
import { GetDbVerificationTokenByToken } from '@/actions/token';
import { resetPassword } from '@/app/(main)/(user)/user/settings/actions';
import Loading from '@/app/loading';
import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ForgotPasswordSchema, ForgotPasswordValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerificationToken } from '@prisma/client';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [error, setError] = useState("");
    const [isPending, startTransaction] = useTransition()
    const [verificationToken, setVerificationToken] = useState<VerificationToken | undefined>(undefined);
    const router = useRouter()

    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const onsubmit = async (values: ForgotPasswordValues) => {
        setError('')
        startTransaction(async () => {
            const { success, error } = await resetPassword(verificationToken!.email, values)
            if (error) {
                setError(error)
                return;
            }

            if (success) {
                router.push('/login')
            }

        })
    }


    const handleCheckToken = useCallback(async () => {
        startTransaction(async () => {
            if (!token) {
                toast.error('token not found')
                return;
            }

            const { error, verificationToken } = await GetDbVerificationTokenByToken(token)
            if (error) {
                setError(error)
                return;
            }

            setVerificationToken(verificationToken)
        })
    }, [token])

    useEffect(() => {
        handleCheckToken()
    }, [handleCheckToken]);

    return (
        <div className=' flex flex-col justify-center items-center py-6'>

            {/* useEffect loading part */}
            {isPending && !verificationToken && <Loading />}


            {/* forgot password form part */}
            {!error && verificationToken && (
                <div className=' py-10 w-[400px]'>
                    <h2>Reset Password</h2>
                    <p className=' text-gray-400 text-sm'>Change your password with in 15 minutes else this link will be expired.</p>
                    <br />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)} className=' space-y-5'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" flex items-center gap-1">Password <FormMessage /></FormLabel>
                                        <FormControl>
                                            <PasswordInput disabled={isPending} placeholder="password" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" flex items-center gap-1">Confirm Password <FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input type="password" disabled={isPending} placeholder="password" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                            <Button className=" w-full" disabled={isPending}>
                                {
                                    isPending ? <Loading /> : 'Reset Password'
                                }
                            </Button>
                            <Link href={'/login'} className=" text-sm font-medium w-full hover:underline">
                                <p className=' pt-2 text-center text-gray-200'>Back to login</p>
                            </Link>
                        </form>
                    </Form>
                </div>
            )}

            {/* error part */}
            {error && !isPending && (
                <p className=' text-sm text-red-500 flex items-center gap-2'>
                    <Info size={16} />
                    {error}
                </p>
            )}
        </div>
    )
}
