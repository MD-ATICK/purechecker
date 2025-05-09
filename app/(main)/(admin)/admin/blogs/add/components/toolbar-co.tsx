import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	ImageUp,
	Italic,
	Link as LinkIcon,
	List,
	ListOrdered,
	Quote,
	Redo,
	Undo,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export const ToolbarCo = ({ editor }: { editor: Editor }) => {
	const [showLinkInput, setShowLinkInput] = useState(false);
	const [showImageInput, setShowImageInput] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	if (!editor) return null;

	return (
		<div className='bg-white border h-10 flex items-center gap-2 p-1'>
			<select
				className='text-xs p-1 capitalize bg-gray-100 text-gray-500 border border-black'
				onChange={e => {
					const value = e.target.value;
					if (value === "unset") {
						editor.chain().focus().unsetFontFamily().run();
					} else {
						editor.chain().focus().setFontFamily(value).run();
					}
				}}
				value={
					editor.isActive("textStyle", { fontFamily: "Inter" })
						? "Inter"
						: editor.isActive("textStyle", {
								fontFamily: '"Comic Sans MS", "Comic Sans"',
						  })
						? '"Comic Sans MS", "Comic Sans"'
						: editor.isActive("textStyle", { fontFamily: "serif" })
						? "serif"
						: editor.isActive("textStyle", { fontFamily: "monospace" })
						? "monospace"
						: editor.isActive("textStyle", { fontFamily: "cursive" })
						? "cursive"
						: editor.isActive("textStyle", {
								fontFamily: "var(--title-font-family)",
						  })
						? "var(--title-font-family)"
						: "unset"
				}
			>
				<option value='unset'>Default Font</option>
				<option value='Inter'>Inter</option>
				<option value='"Comic Sans MS", "Comic Sans"'>Comic Sans</option>
				<option value='serif'>Serif</option>
				<option value='monospace'>Monospace</option>
				<option value='cursive'>Cursive</option>
				<option value='var(--title-font-family)'>CSS Variable</option>
			</select>

			<select
				className='text-xs p-1 capitalize bg-gray-100 text-gray-500 border border-black'
				onChange={e => {
					const value = e.target.value;
					if (value === "0") {
						editor.chain().focus().setParagraph().run();
					} else {
						editor
							.chain()
							.focus()
							.toggleHeading({
								level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6,
							})
							.run();
					}
				}}
				value={
					editor.isActive("heading", { level: 1 })
						? "1"
						: editor.isActive("heading", { level: 2 })
						? "2"
						: editor.isActive("heading", { level: 3 })
						? "3"
						: editor.isActive("heading", { level: 4 })
						? "4"
						: editor.isActive("heading", { level: 5 })
						? "5"
						: editor.isActive("heading", { level: 6 })
						? "6"
						: "0"
				}
			>
				<option value='0'>Paragraph</option>
				<option value='1'>H1</option>
				<option value='2'>H2</option>
				<option value='3'>H3</option>
				<option value='4'>H4</option>
				<option value='5'>H5</option>
				<option value='6'>H6</option>
			</select>

			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={`font-bold h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive("bold") ? "bg-gray-200" : ""
				}`}
			>
				B
			</button>

			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive("italic") ? "bg-gray-200" : ""
				}`}
			>
				<Italic size={15} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive("bulletList") ? "bg-gray-200" : ""
				}`}
			>
				<List size={18} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive("orderedList") ? "bg-gray-200" : ""
				}`}
			>
				<ListOrdered size={18} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive("blockquote") ? "bg-gray-200" : ""
				}`}
			>
				<Quote size={18} />
			</button>

			<button
				onClick={() => editor.chain().focus().setTextAlign("left").run()}
				className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
				}`}
			>
				<AlignLeft size={18} />
			</button>

			<button
				onClick={() => editor.chain().focus().setTextAlign("center").run()}
				className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
				}`}
			>
				<AlignCenter size={18} />
			</button>

			<button
				onClick={() => editor.chain().focus().setTextAlign("right").run()}
				className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
				}`}
			>
				<AlignRight size={18} />
			</button>

			<div className='relative'>
				<button
					onClick={() => setShowLinkInput(prev => !prev)}
					className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
						editor.isActive("link") ? "bg-gray-200" : ""
					}`}
				>
					<LinkIcon size={18} />
				</button>

				{showLinkInput && (
					<div className='absolute top-full left-0 bg-white shadow p-2 border rounded z-10 flex gap-1'>
						<input
							type='text'
							placeholder='https://example.com'
							value={linkUrl}
							onChange={e => setLinkUrl(e.target.value)}
							className='text-sm border px-2 py-1 rounded w-48'
						/>
						<button
							onClick={() => {
								editor
									.chain()
									.focus()
									.extendMarkRange("link")
									.setLink({ href: linkUrl })
									.run();
								setShowLinkInput(false);
								setLinkUrl("");
							}}
							className='text-xs bg-blue-500 text-white px-2 rounded'
						>
							Add
						</button>
					</div>
				)}
			</div>
			<div className='relative px-2'>
				<button
					onClick={() => setShowImageInput(prev => !prev)}
					className='h-full aspect-square flex justify-center items-center hover:bg-gray-200'
				>
					<ImageUp size={18} />
				</button>

				{showImageInput && (
					<div className='absolute top-full left-0 bg-white shadow p-2 border rounded z-10 flex gap-1'>
						<input
							type='text'
							placeholder='Image URL'
							value={imageUrl}
							onChange={e => setImageUrl(e.target.value)}
							className='text-sm border px-2 py-1 rounded w-48'
						/>
						<button
							onClick={() => {
								editor.chain().focus().setImage({ src: imageUrl }).run();
								setShowImageInput(false);
								setImageUrl("");
							}}
							className='text-xs bg-green-500 text-white px-2 rounded'
						>
							Insert
						</button>
					</div>
				)}
			</div>
			<button
				onClick={() => editor.chain().focus().undo().run()}
				className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
				}`}
			>
				<Undo size={18} />
			</button>
			<button
				onClick={() => editor.chain().focus().redo().run()}
				className={`h-full aspect-square flex justify-center items-center hover:bg-gray-200 ${
					editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
				}`}
			>
				<Redo size={18} />
			</button>
		</div>
	);
};
