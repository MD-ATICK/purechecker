"use client";

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
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import ImageResize from "tiptap-extension-resize-image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { getBlogById, updateBlog } from "../../actions";
import { ToolbarCo } from "../../add/components/toolbar-co";
import ArrayInput from "../../add/components/tags-input";

export default function EditPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [content, setContent] = useState("");
	const [isImageDeleting, setIsImageDeleting] = useState(false);
	const blogId = useParams()?.id as string;

	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const [error, setError] = useState("");
	const [isBlogLoading, startBlogTransition] = useTransition();

	const [muted, setMuted] = useState(true);
	const [tags, setTags] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [subCategories, setSubCategories] = useState<string[]>([]);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			if (!title || !description || !image || !content) {
				toast.error("Please fill all the fields");
			} else {
				const data = await updateBlog(blogId, {
					title,
					description,
					htmlContent: content,
					image,
					tags,
					categories,
					subCategories,
				});
				if (data.success) {
					toast.success("Blog Updated Successfully");
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
				levels: [1, 2, 3, 4, 5, 6],
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

	const getBlog = async () => {
		startBlogTransition(async () => {
			if (blogId) {
				const data = await getBlogById(blogId);
				console.log(data.blog, data.error);
				if (!data.blog) {
					setError("There haven't been any blogs with this id");
				}

				if (data.blog) {
					setMuted(false);
					setTitle(data.blog.title);
					setDescription(data.blog.description);
					console.log(data.blog.htmlContent);
					setContent(data.blog.htmlContent);
					setImage(data.blog.image);
					setCategories(data.blog.categories);
					setSubCategories(data.blog.subCategories);
					setTags(data.blog.tags);
				}
			}
		});
	};

	useEffect(() => {
		if (blogId) {
			getBlog();
		}

		if (editor && content) {
			editor.commands.setContent(content);
		}

		// eslint-disable-next-line
	}, [blogId, editor, muted]);

	if (!editor) {
		return <div className='h-64 bg-gray-100 rounded-lg animate-pulse' />;
	}

	if (!blogId || error) {
		return <div className=' p-4 text-gray-600'> Error : {error}</div>;
	}

	if (isBlogLoading) {
		return (
			<div className=' h-10 font-semibold text-gray-600 w-full flex justify-center items-center'>
				Loading Data ...
			</div>
		);
	}

	return (
		<div className=' bg-gray-200 font-sans px-2  min-h-screen'>
			<div className=' py-4 space-y-2'>
				<div className='flex justify-between items-center'>
					<p className=' text-primary font-semibold text-lg'>
						Edit Blog Create
					</p>
					<LoadingButton
						isPending={isPending}
						onClick={handleSubmit}
						className=' rounded-sm h-9'
					>
						+ Publish Blog
					</LoadingButton>
				</div>
				{image && (
					<div className=' flex items-center gap-2'>
						<Image
							src={image}
							width={400}
							height={400}
							alt='image'
							className='  object-cover rounded-lg'
						/>
						{!isImageDeleting && (
							<Button
								variant={"destructive"}
								onClick={() => handleDelete(image)}
							>
								Delete
							</Button>
						)}
						{isImageDeleting && <p>Deleting...</p>}
					</div>
				)}
				{!image && (
					<UploadButton
						endpoint='imageUploader'
						className=' bg-gray-400 py-2 rounded-sm border '
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
				)}
				<Input
					placeholder='Title'
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='w-full h-10 shadow-none border-gray-500 bg-white rounded-none'
				/>
				<Textarea
					placeholder='Description'
					value={description}
					onChange={e => setDescription(e.target.value)}
					className='w-full h-10 shadow-none border-gray-500 bg-white rounded-none'
				/>
				{/* Tags */}
				<ArrayInput values={tags} setValues={setTags} placeholder='Tags' />

				{/* Categories */}
				<ArrayInput
					values={categories}
					setValues={setCategories}
					placeholder='Categories'
				/>

				{/* Sub Categories */}
				<ArrayInput
					values={subCategories}
					setValues={setSubCategories}
					placeholder='Sub Categories'
				/>
			</div>
			<ToolbarCo editor={editor} />
			<EditorContent
				editor={editor}
				className='min-h-40 bg-white p-4 text-black focus:outline-none w-full border border-gray-400 border-t-0'
			/>
		</div>
	);
}
