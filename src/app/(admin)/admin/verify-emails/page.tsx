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
import VerifyEmailsActionButtons from "./VerifyEmailsActionButtons"

export default async function UsersPage() {


    const verifyEmails = await db.verifyEmail.findMany({ include: { User: true }, take: 50, orderBy: { createdAt: "desc" } })

    return (
        <div>
            <Table>
                <TableCaption>A list of users.</TableCaption>
                <TableHeader>
                    <TableRow className=" font-medium">
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className=" whitespace-nowrap">Verify Email</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>IsExist</TableHead>
                        <TableHead>IsDisposable</TableHead>
                        <TableHead>IsValidSyntax</TableHead>
                        <TableHead>IsValidDomain</TableHead>
                        <TableHead>RiskLevel</TableHead>
                        <TableHead>isDisable</TableHead>
                        <TableHead>MxRecord</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        verifyEmails.map((verifyEmail) => {

                            return (
                                <TableRow key={verifyEmail.id} className={verifyEmail.isExist ? "bg-[#00ff003f] hover:bg-[#00ff003f]/40" : "bg-[#ff151549] hover:bg-[#ff151549]/40"} >
                                    <TableCell className="w-[100px] font-medium">{verifyEmail.id}</TableCell>
                                    <TableCell>{verifyEmail.User.name}</TableCell>
                                    <TableCell>{verifyEmail.email}</TableCell>
                                    <TableCell className=" whitespace-nowrap text-center text-xs">{verifyEmail.reason || "N/A"}</TableCell>
                                    <TableCell className=" text-center">{String(verifyEmail.isExist)}</TableCell>
                                    <TableCell className=" text-center">{String(verifyEmail.isDisposable)}</TableCell>
                                    <TableCell className="  text-center">{String(verifyEmail.isValidSyntax)}</TableCell>
                                    <TableCell className="  text-center">{String(verifyEmail.isValidDomain)}</TableCell>
                                    <TableCell className="  text-center">{verifyEmail.riskLevel}</TableCell>
                                    <TableCell className="  text-center text-xs">{String(verifyEmail.mxRecords[0].exchange)}</TableCell>
                                    <TableCell className="  text-center">{String(verifyEmail.isDisable)}</TableCell>
                                    <TableCell className=" text-xs">{formatRelativeDate(verifyEmail.createdAt)}</TableCell>
                                    <TableCell>
                                        <VerifyEmailsActionButtons userId={verifyEmail.User.id} />
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
