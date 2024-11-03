import { VerifyEmail } from '@prisma/client'

export default function Check({ data }: { data?: VerifyEmail }) {
    return (
        <div>
            hi{data?.email}
        </div>
    )
}
