"use client"

import Loading from "@/app/loading";
import blogImage from '@/assets/blog.png';
import closeImage from '@/assets/close.png';
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BlogSchema, BlogValues } from "@/lib/validation";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Blog } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import TipTapEditor from "./TipTapEditor";
import { createBlog, updateBlog } from "./actions";


export default function BlogDialog({ blog }: { userId: string, blog?: Blog }) {

  const [isImageDeleting, setIsImageDeleting] = useState(false);
  const [image, setImage] = useState<string | undefined>(blog?.image);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<BlogValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: blog || {
      image: "",
      title: "",
      category: "",
      tags: [],
      description: "",
      htmlContent: "",
    }
  })

  const onsubmit = async (values: BlogValues) => {
    setError('')
    startTransition(async () => {
      const data = blog ? await updateBlog(blog.id, values) : await createBlog(values)
      if (data.success) {
        router.refresh()
        toast.success('Blog Created Successfully')
        setOpen(false)
      }
      if (data?.error) {
        toast.error(data?.error)
      }
    })
  }

  const handleDelete = async (image: string) => {
    setIsImageDeleting(true)
    const imageKey = image.split('https://utfs.io/f/')[1]
    const res = await fetch(`/api/uploadthing/delete`, {
      method: "POST",
      body: JSON.stringify({ imageKey }),
    })

    if (res.ok) {
      setIsImageDeleting(false)
      setImage(undefined)
      toast.success("Image deleted successfully")
    }

  }

  const tags = form.watch("tags");

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      form.setValue("tags", [...tags, tag]); // Add the new tag to the array
    }
  };

  // Function to handle removing a tag
  const removeTag = (tag: string) => {
    form.setValue("tags", tags.filter(t => t !== tag)); // Remove the selected tag
  };


  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }
  }, [image, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          blog ? (
            <Button size={'icon'}>
              <Image alt='' className=' invert' src={blogImage} height={20} />
            </Button>
          ) : (
            <Button>
              Add
            </Button>
          )
        }
      </DialogTrigger>
      <DialogContent className=" h-[90vh] overflow-y-scroll">
        <DialogTitle>
          Add Blog
        </DialogTitle>
        <DialogDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero!
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className=" space-y-4 my-4">
            <div className=" space-y-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload An Image</FormLabel>
                    <FormDescription>Choose an image that will show-case your hotel nicely</FormDescription>
                    <FormControl>
                      {!image && <div className=" p-12 bg-primary-foreground rounded-xl hover:border-white border border-dashed ">
                        <UploadButton
                          {...field}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setImage(res[0].url)
                            toast.success("Upload Completed");
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`);
                          }}
                        />
                      </div>}

                    </FormControl>
                  </FormItem>
                )}
              />
              {image && <div className=" relative max-w-[300px] aspect-[16/10]">
                <Image src={image} alt="" fill sizes="200px" className=" object-cover rounded-xl" />
                <Button type='button' size={'icon'} variant={'secondary'} className=" text-white absolute top-2 right-2 rounded-full text-lg font-semibold backdrop-blur-lg bg-[#00000081]" onClick={() => handleDelete(image)}>
                  {isImageDeleting ?
                    <Loading /> : (
                      <Image alt="" src={closeImage} height={15} className=" invert" />
                    )}
                </Button>
              </div>}

            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" flex items-center gap-1">Title <FormMessage /></FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isPending} placeholder="enter title" {...field} />
                  </FormControl>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" flex items-center gap-1">Description <FormMessage /></FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isPending} placeholder="enter description" {...field} />
                  </FormControl>

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" flex items-center gap-1">Category <FormMessage /></FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isPending} placeholder="enter category" {...field} />
                  </FormControl>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="htmlContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" flex items-center gap-1">Html Content <FormMessage /></FormLabel>
                  <FormControl>
                    <TipTapEditor description={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />


            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  {/* Input for adding new tag */}
                  <div className="flex flex-col items-start mt-3 gap-2">
                    <FormLabel className=" flex items-center gap-1">Tags <FormMessage /></FormLabel>
                    <FormDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, earum.</FormDescription>
                    <Input
                      placeholder="Enter a tag"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = ''; // Clear input after adding
                        }
                      }}
                    />
                  </div>

                  {/* Display list of tags */}
                  <div className="flex gap-2 flex-wrap mt-2">
                    {field.value.map((tag: string, index: number) => (
                      <span key={index} className="flex items-center px-4 p-1 text-sm gap-2 rounded-sm bg-secondary">
                        {tag}
                        <button type="button" className=" text-lg" onClick={() => removeTag(tag)}>
                          <Image alt="" src={closeImage} height={12} className=" dark:invert" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Display validation error */}
                  {fieldState.error && <p className="text-red-600">{fieldState.error.message}</p>}
                </>
              )}
            />

            {
              error &&
              <p className=" h-10 w-full rounded-lg bg-[#f2a8a8] text-sm text-red-600 flex justify-center items-center" >{error}</p>
            }
            <br />
            <LoadingButton className=" w-full" isPending={isPending} disabled={isPending}>{blog ? 'Update' : 'Create'}</LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
