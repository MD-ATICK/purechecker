"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import Blockquote from "@tiptap/extension-blockquote";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import TipTapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BadgePlus, BookPlus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ImageResize from "tiptap-extension-resize-image";
import { createBlog } from "../actions";
import TiptapEditor from "./components/editor";

export default function NewBlogAdd() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [content, setContent] = useState("");
	const [isImageDeleting, setIsImageDeleting] = useState(false);

	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			if (!title || !description || !image || !content) {
				toast.error("Please fill all the fields");
			} else {
				const data = await createBlog({
					title,
					description,
					htmlContent: content,
					image,
				});
				if (data.success) {
					toast.success("Blog Created Successfully");
					router.refresh();
					router.push("/admin/blogs");
				}
				if (data?.error) {
					toast.error(data?.error);
				}
			}
		});
	};

	const handleDelete = async (image: string) => {
		setIsImageDeleting(true);
		const imageKey = image.split("https://utfs.io/f/")[1];
		const res = await fetch(`/api/uploadthing/delete`, {
			method: "POST",
			body: JSON.stringify({ imageKey }),
		});

		if (res.ok) {
			setIsImageDeleting(false);
			setImage("");
			toast.success("Image deleted successfully");
		}
	};

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				codeBlock: {
					HTMLAttributes: {
						class: "bg-primary/10 rounded-md p-4 font-mono",
					},
				},
			}),
			ImageResize,
			Color.configure({
				types: ["textStyle"],
			}),
			TextStyle,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Heading.configure({
				levels: [1, 2],
			}),
			Blockquote.configure({
				HTMLAttributes: {
					class: "border-l-4 border-gray-300 pl-4 my-2",
				},
			}),
			TipTapImage.configure({
				HTMLAttributes: {
					class: "rounded-lg border mx-auto max-w-full h-auto",
				},
			}),
			Table.configure({
				resizable: true,
				HTMLAttributes: {
					class: "max-w-[400px]",
					style: "width: 100%; table-layout: fixed;",
				},
			}),
			TableRow,
			TableHeader,
			TableCell.configure({
				HTMLAttributes: {
					class: "border w-full border-gray-300 p-2",
				},
			}),
			Link.configure({
				openOnClick: true,
				HTMLAttributes: {
					class: " underline",
				},
			}),
		],
		content,
		editorProps: {
			attributes: {
				class: "min-h-[450px] rounded-lg  focus:border-primary outline-none",
				placeholder: "Write your article...",
			},
		},
		onUpdate: ({ editor }) => {
			setContent(editor.getHTML());
		},
	});

	if (!editor) {
		return <div className='h-64 bg-gray-100 rounded-lg animate-pulse' />;
	}

	return (
		<div className='flex flex-col'>
			<div className='container mx-auto px-4 py-0 max-w-5xl flex-1 flex flex-col relative'>
				<div className=' flex items-center gap-2 mb-4'>
					<div className=' h-9 aspect-square rounded-md bg-primary/10 flex justify-center items-center text-primary'>
						<BadgePlus size={15} />
					</div>
					<h1
						className='text-2xl hidden md:block font-bold mb-4 text-gray-600
					'
					>
						Create New Blog Post
					</h1>
				</div>

				{/* Upload image */}
				{!image && (
					<div className=' mb-6 flex justify-center items-center flex-col w-full aspect-[16/5] bg-primary/10 py-4 hover:bg-primary/20 border-dashed border-2 border-primary rounded-xl'>
						<Upload className=' text-primary size-10 md:size-14' />
						<h1 className=' text-sm md:text-xl'>
							Upload Your <span className=' font-bold text-primary'>Image</span>{" "}
						</h1>
						<UploadButton
							endpoint='imageUploader'
							className=' bg-primary/20 rounded-lg p-3 '
							onClientUploadComplete={res => {
								// Do something with the response
								console.log("Files: ", res);
								setImage(res[0].url);
							}}
							onUploadError={(error: Error) => {
								// Do something with the error.
								alert(`ERROR! ${error.message}`);
							}}
						/>
					</div>
				)}
				{image && (
					<div className=' relative max-w-[300px] aspect-[16/10] mb-4'>
						<Image
							src={image}
							alt=''
							fill
							sizes='200px'
							className=' object-cover rounded-xl'
						/>
						<Button
							type='button'
							size={"icon"}
							variant={"secondary"}
							className=' text-white absolute top-2 right-2 rounded-full text-lg font-semibold backdrop-blur-lg bg-[#00000081]'
							onClick={() => handleDelete(image)}
						>
							{isImageDeleting ? <Loading /> : <Trash2 size={20} />}
						</Button>
					</div>
				)}
				<div className='flex-1 flex flex-col '>
					<div className='mb-6'>
						<input
							type='text'
							id='title'
							value={title}
							onChange={e => setTitle(e.target.value)}
							required
							className=' text-2xl font-semibold font-serif border-l-[3px] p-2 focus:border-none focus:outline-none focus:ring-0'
							placeholder='Enter your post title'
						/>
					</div>
					<div className='mb-6'>
						<textarea
							id='description'
							value={description}
							onChange={e => setDescription(e.target.value)}
							required
							className=' text-xl font-semibold w-full font-serif border-l-[4px] p-2 focus:border-none focus:outline-none focus:ring-0'
							placeholder='Enter your post description'
						/>
					</div>

					<div className=''>
						<TiptapEditor editor={editor} />
					</div>

					<div className='flex justify-end gap-4 pt-6 absolute -top-6 md:-top-3 right-0'>
						<Button
							onClick={handleSubmit}
							variant='default'
							disabled={
								isPending ||
								!title.trim() ||
								!content.trim() ||
								!image ||
								!description.trim()
							}
						>
							{isPending ? (
								"Publishing..."
							) : (
								<span className=' flex items-center gap-2'>
									{" "}
									<BookPlus /> Publish
								</span>
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
