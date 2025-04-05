"use client";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Toolbar from "./Toolbar";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from "@tiptap/extension-link";

interface props {
  description: string;
  onChange: (richText: string) => void;
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
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell.configure({
        HTMLAttributes: {
          class: "border w-full border-gray-300 p-2", // Tailwind classes for table cells
        },
      }),
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] rounded-lg border-2 p-4  focus:border-primary outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent required={true} editor={editor} />
    </div>
  );
}
