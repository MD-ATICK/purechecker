"use client"
import Loading from "@/components/Loading";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";


interface LoadingButtonProps extends ButtonProps {
    isPending?: boolean
}

export default function LoadingButton({ isPending, disabled, className, ...props }: LoadingButtonProps) {


    const { user } = useUserStore()

    if (user) {
      
        if ((user.emailVerified !== null && !user.banned) || user.role === 'ADMIN') {
            return (
                <Button
                    className={cn('', className)}
                    disabled={disabled || isPending}
                    {...props}
                >
                    {isPending ? <Loading /> : props.children}
                </Button>
            )
        }

        if (user.emailVerified === null) {
            return (
                <Button
                    className={cn('', className)}
                    type="button"
                    onClick={() => toast.error('Please verify your email first.')}
                >
                    {props.children}
                </Button>
            )
        }


        if (user.banned) {
            return (
                <Button
                    className={cn('', className)}
                    type="button"
                    onClick={() => toast.error('You are banned.')}
                >
                    {props.children}
                </Button>
            )
        }

    }

    if (!user) {
        return (
            <Button
                className={cn('', className)}
                type="button"
                onClick={() => toast.error('Please login or sign-up to get access.')}
            >
                {props.children}
            </Button>
        )
    }

}