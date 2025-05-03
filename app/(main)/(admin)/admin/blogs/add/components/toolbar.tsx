"use client";

import { BubbleMenu, Editor, EditorContent } from "@tiptap/react";
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	Code,
	Heading1,
	Heading2,
	Heading3,
	Image as ImageIcon,
	Italic,
	LinkIcon,
	List,
	ListOrdered,
	Quote,
	Redo,
	Strikethrough,
	Undo,
} from "lucide-react";
import { useCallback, useState } from "react";

interface TiptapEditorProps {
	editor: Editor;
}

const Toolbar = ({ editor }: TiptapEditorProps) => {
	// const [isUploading, setIsUploading] = useState(false);

	// const handleImageUpload = useCallback(async (file: File) => {
	// 	setIsUploading(true);
	// 	try {
	// 		const formData = new FormData();
	// 		formData.append("file", file);

	// 		const response = await fetch("/api/upload", {
	// 			method: "POST",
	// 			body: formData,
	// 		});

	// 		if (!response.ok) throw new Error("Upload failed");

	// 		const { url } = await response.json();
	// 		return url;
	// 	} catch (error) {
	// 		console.error("Upload error:", error);
	// 		throw error;
	// 	} finally {
	// 		setIsUploading(false);
	// 	}
	// }, []);

	// const addImage = useCallback(() => {
	// 	const input = document.createElement("input");
	// 	input.type = "file";
	// 	input.accept = "image/*";

	// 	input.onchange = async e => {
	// 		const file = (e.target as HTMLInputElement).files?.[0];
	// 		if (file) {
	// 			const url = await handleImageUpload(file);
	// 			editor?.chain().focus().setImage({ src: url }).run();
	// 		}
	// 	};

	// 	input.click();
	// }, [editor, handleImageUpload]);

	const [linkDialogOpen, setLinkDialogOpen] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");

	const handleLinkSubmit = useCallback(() => {
		if (linkUrl) {
			editor?.chain().focus().setLink({ href: linkUrl }).run();
		}
		setLinkDialogOpen(false);
		setLinkUrl("");
	}, [editor, linkUrl]);

	const [imageDialogOpen, setImageDialogOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	const handleImageSubmit = useCallback(() => {
		if (imageUrl) {
			editor
				?.chain()
				.focus()
				.setImage({
					src: imageUrl,
				})
				.run();
		}
		setImageDialogOpen(false);
		setImageUrl("");
	}, [editor, imageUrl]);
	return (
		<div className='flex flex-col h-full'>
			{/* Sticky Top Toolbar */}
			<div className='sticky top-0 z-10 bg-white border-b p-2 flex flex-wrap gap-1'>
				{/* {editor?.isActive("table") && (
					<div className='flex gap-2 p-2 bg-gray-100 border-b'>
						<button
							onClick={() => editor.chain().focus().addColumnBefore().run()}
							className='p-1 text-xs border rounded'
						>
							+Col Before
						</button>
						<button
							onClick={() => editor.chain().focus().addColumnAfter().run()}
							className='p-1 text-xs border rounded'
						>
							+Col After
						</button>
						<button
							onClick={() => editor.chain().focus().deleteColumn().run()}
							className='p-1 text-xs border rounded'
						>
							-Col
						</button>
						<button
							onClick={() => editor.chain().focus().addRowBefore().run()}
							className='p-1 text-xs border rounded'
						>
							+Row Before
						</button>
						<button
							onClick={() => editor.chain().focus().addRowAfter().run()}
							className='p-1 text-xs border rounded'
						>
							+Row After
						</button>
						<button
							onClick={() => editor.chain().focus().deleteRow().run()}
							className='p-1 text-xs border rounded'
						>
							-Row
						</button>
					</div>
				)} */}

				{/* <button
					type='button'
					onClick={() =>
						editor?.chain().focus().insertTable({ rows: 2, cols: 2 }).run()
					}
					disabled={
						!editor
							?.can()
							.chain()
							.focus()
							.insertTable({ rows: 2, cols: 2 })
							.run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("Table") ? "bg-gray-200" : ""
					}`}
					aria-label='Table'
				>
					<Table className=' h-5 w-5' />
				</button> */}
				<div className=' relative'>
					<button
						type='button'
						onClick={() => setImageDialogOpen(true)}
						className='p-2 rounded hover:bg-gray-100'
						aria-label='Insert Image'
					>
						<ImageIcon className='w-5 h-5' />
					</button>
					{imageDialogOpen && (
						<div className='absolute top-10 left-0 bg-gray-200 p-4 rounded-lg w-96'>
							<div className=' h-4 aspect-square bg-gray-200 rotate-45 absolute -top-2 left-3'></div>
							<input
								type='url'
								value={imageUrl}
								onChange={e => setImageUrl(e.target.value)}
								placeholder='https://example.com/image.jpg'
								className='w-full p-2 border rounded mb-2'
							/>
							<div className='flex justify-end gap-2'>
								<button
									type='button'
									onClick={() => setImageDialogOpen(false)}
									className='px-3 py-1 border rounded'
								>
									Cancel
								</button>
								<button
									onClick={handleImageSubmit}
									className='px-3 py-1 bg-blue-500 text-white rounded'
								>
									Insert Image
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Text Formatting */}
				<button
					type='button'
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("bold") ? "bg-gray-200" : ""
					}`}
					aria-label='Bold'
				>
					<Bold className='w-5 h-5' />
				</button>
				<button
					type='button'
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("italic") ? "bg-gray-200" : ""
					}`}
					aria-label='Italic'
				>
					<Italic className='w-5 h-5' />
				</button>
				<button
					type='button'
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("strike") ? "bg-gray-200" : ""
					}`}
					aria-label='Strikethrough'
				>
					<Strikethrough className='w-5 h-5' />
				</button>
				<button
					type='button'
					onClick={() => editor.chain().focus().toggleCode().run()}
					disabled={!editor.can().chain().focus().toggleCode().run()}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("code") ? "bg-gray-200" : ""
					}`}
					aria-label='Code'
				>
					<Code className='w-5 h-5' />
				</button>

				{/* Headings */}
				<div className='border-l border-gray-300 mx-2 h-6 self-center' />
				<button
					type='button'
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
					}`}
					aria-label='Heading 1'
				>
					<Heading1 className='w-5 h-5' />
				</button>
				<button
					type='button'
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
					}`}
					aria-label='Heading 2'
				>
					<Heading2 className='w-5 h-5' />
				</button>
				<button
					type='button'
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
					}`}
					aria-label='Heading 3'
				>
					<Heading3 className='w-5 h-5' />
				</button>

				{/* Lists */}
				<div className='border-l border-gray-300 mx-2 h-6 self-center' />
				<button
					type='button'
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("bulletList") ? "bg-gray-200" : ""
					}`}
					aria-label='Bullet List'
				>
					<List className='w-5 h-5' />
				</button>
				<button
					type='button'
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("orderedList") ? "bg-gray-200" : ""
					}`}
					aria-label='Ordered List'
				>
					<ListOrdered className='w-5 h-5' />
				</button>
				<button
					type='button'
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("blockquote") ? "bg-gray-200" : ""
					}`}
					aria-label='Blockquote'
				>
					<Quote className='w-5 h-5' />
				</button>

				{/* Media */}
				<div className='border-l border-gray-300 mx-2 h-6 self-center' />
				{/* Upload image */}
				{/* <button
					type='button'
					onClick={addImage}
					className='p-2 rounded hover:bg-gray-100'
					disabled={isUploading}
					aria-label='Insert Image'
				>
					<ImageIcon className='w-5 h-5' />
				</button> */}
				{/* <button
					type='button'
					onClick={() => setLinkDialogOpen(true)}
					className={`p-2 rounded hover:bg-gray-100 ${
						editor.isActive("link") ? "bg-gray-200" : ""
					}`}
					aria-label='Insert Link'
				>
					<Link className='w-5 h-5' />
				</button> */}

				{/* Undo/Redo */}
				<div className='border-l border-gray-300 mx-2 h-6 self-center' />
				<button
					type='button'
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().undo()}
					className='p-2 rounded hover:bg-gray-100'
					aria-label='Undo'
				>
					<Undo className='w-5 h-5' />
				</button>
				<button
					type='button'
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().redo()}
					className='p-2 rounded hover:bg-gray-100'
					aria-label='Redo'
				>
					<Redo className='w-5 h-5' />
				</button>
			</div>

			{/* Editor Content */}
			<div className='flex-1 overflow-y-auto p-4'>
				<EditorContent editor={editor} className='h-full' />

				{/* Bubble Menu for quick formatting */}
				{editor && (
					<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
						<div className='flex bg-white shadow-lg border rounded-lg p-1 gap-1'>
							<button
								type='button'
								onClick={() => editor.chain().focus().toggleBold().run()}
								className={`p-2 rounded hover:bg-gray-100 ${
									editor.isActive("bold") ? "bg-gray-200" : ""
								}`}
							>
								<Bold className='w-5 h-5' />
							</button>
							<button
								type='button'
								onClick={() => editor.chain().focus().toggleItalic().run()}
								className={`p-2 rounded hover:bg-gray-100 ${
									editor.isActive("italic") ? "bg-gray-200" : ""
								}`}
							>
								<Italic className='w-5 h-5' />
							</button>
							<div className=' relative'>
								<button
									onClick={() => setLinkDialogOpen(true)}
									className={`p-2 rounded hover:bg-gray-100 ${
										editor.isActive("link") ? "bg-gray-200" : ""
									}`}
								>
									<LinkIcon className='w-5 h-5' />
								</button>
								{linkDialogOpen && (
									<div className='absolute top-10 left-0 bg-gray-200 p-4 rounded-lg w-96'>
										<div className=' h-4 aspect-square bg-gray-200 rotate-45 absolute -top-2 left-3'></div>
										<input
											type='url'
											value={linkUrl}
											onChange={e => setLinkUrl(e.target.value)}
											placeholder='https://example.com'
											className='w-full p-2 border rounded mb-2'
										/>
										<div className='flex justify-end gap-2'>
											<button
												type='button'
												onClick={() => setLinkDialogOpen(false)}
												className='px-3 py-1 border rounded'
											>
												Cancel
											</button>
											<button
												onClick={handleLinkSubmit}
												className='px-3 py-1 bg-blue-500 text-white rounded'
											>
												Continue
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</BubbleMenu>
				)}
			</div>

			{/* Sticky Bottom Status Bar */}
			<div className='sticky bottom-0 z-10 bg-white border-t p-2 text-sm text-gray-500 flex justify-between items-center'>
				<div>{editor.getCharacterCount()} characters</div>
				<div className='flex gap-2'>
					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign("left").run()}
						className={`p-1 rounded hover:bg-gray-100 ${
							editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
						}`}
						aria-label='Align Left'
					>
						<AlignLeft className='w-4 h-4' />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign("center").run()}
						className={`p-1 rounded hover:bg-gray-100 ${
							editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
						}`}
						aria-label='Align Center'
					>
						<AlignCenter className='w-4 h-4' />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign("right").run()}
						className={`p-1 rounded hover:bg-gray-100 ${
							editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
						}`}
						aria-label='Align Right'
					>
						<AlignRight className='w-4 h-4' />
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign("justify").run()}
						className={`p-1 rounded hover:bg-gray-100 ${
							editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""
						}`}
						aria-label='Justify'
					>
						<AlignJustify className='w-4 h-4' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Toolbar;
