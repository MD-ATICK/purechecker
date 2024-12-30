import { Blog } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.id}`} className=' space-y-4 rounded-sm shadow-sm p-3'>
      <div className=' w-full aspect-[3/2] relative'>
        <Image alt='' fill src={blog.image} sizes='300px' className=' rounded-lg object-cover' />
      </div>
      <div>
        <h1 className=' hover:underline font-bold text-lg'>{blog.title}</h1>
        <p className=' text-sm  text-muted-foreground'>{blog.description}</p>
      </div>
    </Link>
  )
}
