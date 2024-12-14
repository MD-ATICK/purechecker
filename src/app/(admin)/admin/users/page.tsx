import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { db } from "@/lib/prisma"
import { formatNumber, formatRelativeDate } from "@/lib/utils"
import UserActionButtons from "./UserActionButtons"

export default async function UsersPage() {


    const users = await db.user.findMany({orderBy: {createdAt: 'desc'},take: 50, include: { credits: true, subscriptions: true, verifyEmails: true, _count: { select: { verifyEmails: true } } } })

    return (
        <div>
            <Table>
                <TableCaption>A list of users.</TableCaption>
                <TableHeader>
                    <TableRow className=" font-medium">
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Credit</TableHead>
                        <TableHead>SubscriptionId</TableHead>
                        <TableHead>VerifyEmails</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        users.map((user) => {

                            const subCredit = user.credits.reduce((acc, curr) => acc + curr.credit, 0)

                            return (
                                <TableRow key={user.id} >
                                    <TableCell className="w-[100px] font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell className=" text-center">{formatNumber(subCredit)}</TableCell>
                                    <TableCell className=" text-center">{user.subscriptions.find((sub) => sub.status === "active")?.id || "null"}</TableCell>
                                    <TableCell className="  text-center">{formatNumber(user._count.verifyEmails)}</TableCell>
                                    <TableCell>{formatRelativeDate(user.createdAt)}</TableCell>
                                    <TableCell>
                                        <UserActionButtons userId={user.id} />
                                    </TableCell>

                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
