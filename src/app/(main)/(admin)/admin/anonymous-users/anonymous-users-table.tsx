import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAnonymousUsers } from "@/lib/anonymousAction";
import { formatRelativeDate } from "@/lib/utils";

export default async function AnonymousUsersTable() {
  const data = await getAllAnonymousUsers();
  return (
    <div className=" w-full">
      <Table>
        <TableCaption>A list of Anonymous Users.</TableCaption>
        <TableHeader>
          <TableRow className=" font-medium">
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className=" text-center">Device</TableHead>
            <TableHead className=" text-center">Limit</TableHead>
            <TableHead className=" text-center">Credit_Have</TableHead>
            <TableHead className=" text-center">Credit_Used</TableHead>
            <TableHead>CreatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((au, index) => {
            return (
              <TableRow key={au.id}>
                <TableCell className="w-[50px] text-xs font-medium">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-center text-xs">
                  {au.device}
                </TableCell>
                <TableCell className="font-medium text-center text-xs">20</TableCell>
                <TableCell className="font-medium text-center text-xs">
                  {au.credit}
                </TableCell>
                <TableCell className="font-medium text-center text-xs">
                  {20 -Number(au.credit)}
                </TableCell>
                <TableCell className=" text-xs whitespace-nowrap">
                  {formatRelativeDate(au.createdAt)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
