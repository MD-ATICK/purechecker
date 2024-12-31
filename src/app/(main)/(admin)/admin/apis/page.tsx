import { getUser } from '@/lib/getUser'
import { notFound } from 'next/navigation'
import AdminApiTable from './AdminApisTable'

export default async function page() {

    const user = await getUser()

    if(!user || !user.id){
        return notFound()
    }

  return (
    <div>
      <AdminApiTable userId={user.id} />
    </div>
  )
}
