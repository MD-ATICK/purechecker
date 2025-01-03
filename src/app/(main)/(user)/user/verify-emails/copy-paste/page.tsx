import NotFound from '@/app/not-found'
import { getUser } from '@/lib/getUser'
import CopyPastePage from './CopyPastePage'

export default async function page() {

    const user = await getUser()
    if (!user || !user.id) {
        return NotFound()
    }


    console.log({ user })
    return (
        <div className=' p-[1vw]'>
            <CopyPastePage banned={user.banned} userId={user.id} emailVerified={user.emailVerified} />
        </div>
    )
}
