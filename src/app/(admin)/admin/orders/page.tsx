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
import OrderActionButtons from "./OrderActionButtons"

export default async function OrderPage() {

    // todo : make a model of order. just 1 min work.
    const orders = await db.purchase.findMany({ include: { User: true },orderBy: {createdAt: 'desc'},take: 50 })

    return (
        <div>
            <Table>
                <TableCaption>A list of Orders.</TableCaption>
                <TableHeader>
                    <TableRow className=" font-medium">
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>PaymentId</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>plan</TableHead>
                        <TableHead>Credit</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders.map((order) => {

                            return (
                                <TableRow key={order.id} >
                                    <TableCell className="w-[100px] font-medium">{order.id}</TableCell>
                                    <TableCell>{order.User.name}</TableCell>
                                    <TableCell>{order.User.email}</TableCell>
                                    <TableCell>{order.paddleTransactionId}</TableCell>
                                    <TableCell className=" text-center">{formatNumber(order.amount)}</TableCell>
                                    <TableCell className=" text-center">{"order.plan"}</TableCell>
                                    <TableCell className=" text-center">{formatNumber(order.credit)}</TableCell>
                                    <TableCell>{formatRelativeDate(order.createdAt)}</TableCell>
                                    <TableCell>
                                        <OrderActionButtons userId={order.User.id} />
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
