import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUser } from "@/lib/getUser"
import { db } from "@/lib/prisma"
import { formatNumber, formatRelativeDate } from "@/lib/utils"
import { notFound } from "next/navigation"

export default async function CreditHistoryPage() {

  const user = await getUser()

  const creditHistory = await db.credit.findMany({ where: { userId: user?.id }, include: { User: true } })


  if (!user || !user.id) {
      return notFound()
  }

  return (
      <div>
          <Table>
              <TableCaption>A list of Orders.</TableCaption>
              <TableHeader>
                  <TableRow className=" font-medium">
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className=" text-center">PaymentId</TableHead>
                      <TableHead className=" text-center">Type</TableHead>
                      <TableHead className=" text-center">Credit</TableHead>
                      <TableHead>CreatedAt</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {
                      creditHistory.map((credit) => {

                          return (
                              <TableRow key={credit.id} >
                                  <TableCell className="w-[100px] font-medium">{credit.id}</TableCell>
                                  <TableCell>{credit.User.name}</TableCell>
                                  <TableCell>{credit.User.email}</TableCell>
                                  <TableCell className=" text-muted-foreground text-center">{credit.paymentId || 'N/A'}</TableCell>
                                  <TableCell className=" text-center">{credit.type}</TableCell>
                                  <TableCell className=" text-center">{formatNumber(credit.credit)}</TableCell>
                                  <TableCell>{formatRelativeDate(credit.createdAt)}</TableCell>

                              </TableRow>
                          )
                      })
                  }
              </TableBody>
          </Table>
      </div>
  )
}
