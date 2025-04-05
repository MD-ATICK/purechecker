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
import { formatRelativeDate } from "@/lib/utils"

export default async function OrderPage() {

    // todo : make a model of order. just 1 min work.
    const cronJobs = await db.cronJob.findMany({ orderBy: {createdAt: 'desc'},take: 50})

    return (
        <div>
            <Table>
                <TableCaption>A list of Jobs.</TableCaption>
                <TableHeader>
                    <TableRow className=" font-medium">
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className=" text-center">Detected_Users</TableHead>
                        <TableHead className=" text-center">Executed_Users</TableHead>
                        <TableHead>createdAt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        cronJobs.map((job, index) => {

                            return (
                                <TableRow key={job.id} >
                                    <TableCell className="w-[100px] font-medium">{index + 1}</TableCell>
                                    <TableCell>{job.type}</TableCell>
                                    <TableCell className=" text-center">{job.detectedUsersLength}</TableCell>
                                    <TableCell className=" text-center">{job.executedUsersLength}</TableCell>
                                    <TableCell>{formatRelativeDate(job.createdAt)}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
