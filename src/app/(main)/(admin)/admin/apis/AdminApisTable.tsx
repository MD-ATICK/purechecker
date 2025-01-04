import { getAllApiTokens } from "@/app/(main)/(user)/user/api/actions"
import defaultImage from '@/assets/girl.jpg'
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
import Image from "next/image"
import AdminApiTokenTableActionButton from "./AdminApisActionButton"

export default async function AdminApiTable() {


    const data = await getAllApiTokens()

    return (
        <div className=" w-full">
            <Table>
                <TableCaption>A list of Api Token.</TableCaption>
                <TableHeader>
                    <TableRow className=" font-medium">
                        <TableHead className="w-[50px]">NO</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className=" whitespace-nowrap">Secret Key</TableHead>
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
                                        {index+1}
                                    </TableCell>  

                                    <TableCell className="font-medium text-xs">
                                        <Image alt="" src={apiToken.User?.image || defaultImage} className=" rounded-sm object-cover aspect-square" width={30} height={30} />
                                    </TableCell>
                                    <TableCell className="font-medium text-xs">
                                       {apiToken.User?.name}
                                    </TableCell>

                                    <TableCell className="font-medium text-xs">
                                       {apiToken.User?.email}
                                    </TableCell>
                                    <TableCell className="font-medium text-xs">
                                       {apiToken.secretKey}
                                    </TableCell>
                                    <TableCell className=" text-center">{apiToken.apiRequestLimit || "N/A"}</TableCell>
                                    <TableCell className=" text-center">{apiToken.verifyEmails.filter(ve => ve.isExist).length}</TableCell>
                                    <TableCell className=" text-center">{apiToken.verifyEmails.filter(ve => !ve.isExist).length}</TableCell>
                                    <TableCell className=" text-center">{apiToken.verifyEmails.length}</TableCell>
                                    <TableCell className=" text-xs whitespace-nowrap">{formatRelativeDate(apiToken.createdAt)}</TableCell>
                                    <TableCell>
                                        <AdminApiTokenTableActionButton apiTokenId={apiToken.id} />
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
