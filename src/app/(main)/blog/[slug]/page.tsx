import { getBlogBySlug } from '@/app/(main)/(admin)/admin/blogs/actions'
import leftChevron from '@/assets/left-chevron.png'
import publishAt from '@/assets/rocket.png'
import { formatRelativeDate } from "@/lib/utils"
import Image from "next/image"
import Link from 'next/link'
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {

  const data = await getBlogBySlug((await params)?.slug)

  return {
    title: data.blog?.title,
    description: data.blog?.description,
    openGraph: {
      title: data.blog?.title,
      description: data.blog?.description,
      images: [
        {
          url: data.blog?.image, // Replace with your image URL
          width: 1200,
          height: 630,
          alt: data.blog?.title,
        },
      ],
    },
  }

}



export default async function SingleBlog({ params }: PageProps) {


  if (!(await params)?.slug) {
    return notFound()
  }


  const data = await getBlogBySlug((await params)?.slug)


  if (data.error || !data.blog) {
    return notFound()
  }

  const { image, title, description, htmlContent, createdAt, slug, tags } = data.blog

  return (
    <div className=" max-w-7xl mx-auto p-2  space-y-6 py-4 md:py-10">
      <Link href={'/blog'} className=' text-muted-foreground hover:text-white text-xs flex items-center gap-2'>
        <Image alt='' src={leftChevron} className=' dark:invert' height={10} />
        <p>blog</p>
        <Image alt='' src={leftChevron} className=' dark:invert' height={10} />
        <p>{slug}</p>
      </Link>
      <div className=" flex flex-col md:flex-row items-start  gap-3 md:gap-8">
        <div className="w-full flex-1 aspect-[3/2] rounded-lg relative">
          <Image alt={title} src={image} fill sizes='400px' className=' rounded-lg object-cover' />
        </div>
        <div className=" flex-1">
          <h1 className=" font-bold text-xl md:text-3xl">{title}</h1>
          <p className=" text-sm text-muted-foreground">{description}</p>
          <div className=' flex items-center py-2 gap-3'>
            {
              tags.map((tag, index) => (
                <p key={index} className=' text-gray-500 hover:text-white duration-300'>#{tag}</p>
              ))
            }
          </div>
          <div className="flex items-center md:pt-4 gap-2 font-semibold text-sm">
            <Image alt='' src={publishAt} height={15} width={15} className=' dark:invert' />
            <p>Release Date : {formatRelativeDate(createdAt)}</p>
          </div>
        </div>

      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
