"use client"
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic';
import OrderedList from '@tiptap/extension-ordered-list';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from './Toolbar';

interface props {
    description: string,
    onChange: (richText: string) => void
}


export default function TipTapEditor({ description, onChange }: props) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({ levels: [1, 2] }),
            Bold,
            Italic,
            BulletList,
            OrderedList,
        ],
        content: description,
        editorProps: {
            attributes: {
                class: "min-h-[150px] rounded-lg border-2 p-4  focus:border-primary outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div>

            <Toolbar editor={editor} />
            <EditorContent required={true} editor={editor} />
        </div>
    )
}
