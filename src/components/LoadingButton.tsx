"use client"
import Loading from "@/app/loading";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUser";
import { toast } from "sonner";


interface LoadingButtonProps extends ButtonProps {
    isPending?: boolean
}

export default function LoadingButton({ isPending, disabled, className, ...props }: LoadingButtonProps) {


    const { user } = useUserStore()

    return (
        <>
            {user ? (
                user?.emailVerified !== null ?
                    <Button
                        className={cn('', className)}
                        disabled={disabled || isPending}
                        {...props}
                    >
                        {isPending ? <Loading /> : props.children}
                    </Button> :
                    <Button
                        className={cn('', className)}
                        type="button"
                        onClick={() => toast.error('Please login or sign-up to get access.')}
                    >
                        {props.children}
                    </Button>
            ) : (
                <Button
                    className={cn('', className)}
                    type="button"
                    onClick={() => toast.error('Please verify your email first')}
                >
                    {props.children}
                </Button>
            )

            }
        </>
    )
}