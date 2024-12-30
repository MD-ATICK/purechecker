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

export default async function OrderPage() {

    // todo : make a model of order. just 1 min work.
    const orders = await db.order.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })

    return (
        <div className=" w-full">
            <Table>
                <TableCaption>A list of Orders.</TableCaption>
                <TableHeader>
                    <TableRow className=" font-medium">
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>PaddlePaymentID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className=" text-center">Type</TableHead>
                        <TableHead>Credit</TableHead>
                        <TableHead>CreatedAt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders.map((order) => {

                            return (
                                <TableRow key={order.id} >
                                    <TableCell className="w-[100px] font-medium">{order.id}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.email}</TableCell>
                                    <TableCell>{order?.paddlePaymentId}</TableCell>
                                    <TableCell className=" text-center">${formatNumber(order.amount)}</TableCell>
                                    <TableCell className=" text-center">{order.type}</TableCell>
                                    <TableCell className=" text-center">{formatNumber(order.credit)}</TableCell>
                                    <TableCell className=" whitespace-nowrap">{formatRelativeDate(order.createdAt)}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
