import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatRelativeDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { getAllApiTokensByUserId } from "./actions"
import ApiTokenTableActionButton from "./ApiTokenTableActionButton"
import CopyButton from "./CopyButton"

export default async function ApiTable({ userId }: { userId: string }) {


    if (!userId) {
        return notFound()
    }


    const data = await getAllApiTokensByUserId(userId)

    return (
        <div className=" w-full">
            <Table>
                <TableCaption>A list of Api Token.</TableCaption>
                <TableHeader>
                    <TableRow className=" font-medium">
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>Api Name</TableHead>
                        <TableHead>Secret Key</TableHead>
                        <TableHead className=" whitespace-nowrap">Limit</TableHead>
                        <TableHead className=" text-center">Deliverable</TableHead>
                        <TableHead className=" text-center">Undeliverable</TableHead>
                        <TableHead className=" text-center whitespace-nowrap">Api Usage</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.apiTokens?.map((apiToken, index) => {
                            return (
                                <TableRow key={apiToken.id} >
                                    <TableCell className="w-[50px] text-xs font-medium">
                                        {index + 1}
                                    </TableCell>    
                                    <TableCell className=" text-center">{apiToken.apiName}</TableCell>
                                    <TableCell className="font-medium min-w-[300px]">
                                        <CopyButton text={apiToken.secretKey} short={true} />
                                    </TableCell>
                                    <TableCell className=" text-center">{apiToken.apiRequestLimit || 'N/A'}</TableCell>
                                    <TableCell className=" text-center">{apiToken.verifyEmails.filter(ve => ve.isExist).length}</TableCell>
                                    <TableCell className=" text-center">{apiToken.verifyEmails.filter(ve => !ve.isExist).length}</TableCell>
                                    <TableCell className=" text-center">{apiToken.verifyEmails.length}</TableCell>
                                    <TableCell className=" text-xs whitespace-nowrap">{formatRelativeDate(apiToken.createdAt)}</TableCell>
                                    <TableCell>
                                        <ApiTokenTableActionButton apiTokenId={apiToken.id} />
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
