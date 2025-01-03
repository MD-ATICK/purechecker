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
            // Image,
            // Table.configure({
            //     resizable: true,
            // }),
            // TableRow,
            // TableHeader,
            // TableCell.configure({
            //     HTMLAttributes: {
            //       class: 'border w-full border-gray-300 p-2', // Tailwind classes for table cells
            //     },
            //   }),
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

    // const addImage = () => {
    //     const url = prompt('Enter the URL of the image:');
    //     if (url) {
    //         editor?.chain().focus().setImage({ src: url }).run();
    //     }
    // };


    if (!editor) {
        return null
    }

    return (
        <div>
            {/* for table */}
            {/* <div className="control-group">
                <div className="button-group">
                    <Button
                        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                        }
                    >
                        Insert table
                    </Button>
                    <Button onClick={() => editor.chain().focus().addColumnBefore().run()}>
                        Add column before
                    </Button>
                    <Button onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</Button>
                    <Button onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</Button>
                    <Button onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before</Button>
                    <Button onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</Button>
                    <Button onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</Button>
                    <Button onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</Button>
                    <Button onClick={() => editor.chain().focus().mergeCells().run()}>Merge cells</Button>
                    <Button onClick={() => editor.chain().focus().splitCell().run()}>Split cell</Button>
                    <Button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                        Toggle header column
                    </Button>
                    <Button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                        Toggle header row
                    </Button>
                    <Button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                        Toggle header cell
                    </Button>
                    <Button onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split</Button>
                    <Button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
                        Set cell attribute
                    </Button>
                    <Button onClick={() => editor.chain().focus().fixTables().run()}>Fix tables</Button>
                    <Button onClick={() => editor.chain().focus().goToNextCell().run()}>Go to next cell</Button>
                    <Button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
                        Go to previous cell
                    </Button>
                </div>
            </div> */}

            {/* for image */}
            {/* <button onClick={addImage}>Add Image</button> */}

            <Toolbar editor={editor} />
            <EditorContent required={true} editor={editor} />
        </div>
    )
}
