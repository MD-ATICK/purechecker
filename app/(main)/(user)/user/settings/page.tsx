import Loading from "@/components/Loading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUser } from "@/lib/getUser"
import { db } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"
import ChangePasswordForm from "./ChangePasswordForm"
import ProfileUpdateForm from "./ProfileUpdateForm"

export default async function SettingsPage() {

    const nextAuthUser = await getUser()


    if (!nextAuthUser || !nextAuthUser.id) {
        return notFound()
    }

    const user = await db.user.findUnique({ where: { id: nextAuthUser.id } })
    if (user === undefined) {
        return <Loading />
    }

    if (!user || !user.id) {
        return notFound()
    }

    return (
        <div className={cn(' p-2 py-4 md:p-6 space-y-3 grid gap-12')}>
            {
                nextAuthUser.isOAuth ?
                    (
                        <ProfileUpdateForm user={user} />
                    ) : (
                        <Tabs defaultValue="profile" className=" w-full">
                            <TabsList className=" w-full h-12 md:h-14  grid grid-cols-2">
                                <TabsTrigger className=" text-xs md:text-sm" value="profile">Profile Update</TabsTrigger>
                                <TabsTrigger className=" text-xs md:text-sm" value="password">Change Password</TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile">
                                <ProfileUpdateForm user={user} />
                            </TabsContent>
                            <TabsContent value="password">
                                <ChangePasswordForm user={user} />
                            </TabsContent>
                        </Tabs>
                    )
            }
        </div>
    )
}
