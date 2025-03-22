import Bold from "@/assets/bold-text.png";
import Italic from "@/assets/italics.png";
import ListBullet from "@/assets/menu.png";
import StrikeThrough from "@/assets/strike-through.png";
import ListNumber from "@/assets/text.png";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { type Editor } from "@tiptap/react";
import { AnimatePresence } from "framer-motion";
import { BetweenHorizonalStart, BetweenVerticalStart, ImageDown, Table } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {motion} from 'framer-motion'

interface props {
  editor: Editor | null;
}

export default function Toolbar({ editor }: props) {
  const [activeImagePrompt, setActiveImagePrompt] = useState(false);
  const [imageValue, setImageValue] = useState("");

  if (!editor) {
    return (
      <p className=" p-2 text-sm text-muted-foreground font-medium">
        editor not attend!
      </p>
    );
  }
    
  return (
    <div className=" border rounded-md mb-2 h-12 flex items-center gap-1">
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className=" h-full font-bold aspect-square rounded-sm"
      >
        H1
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className=" h-full font-bold aspect-square rounded-sm"
      >
        H2
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className=" h-full aspect-square rounded-sm"
      >
        <Image className=" dark:invert" alt="" src={Bold} height={15} />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className=" h-full aspect-square rounded-sm"
      >
        <Image className=" dark:invert" alt="" src={Italic} height={15} />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        className=" h-full aspect-square rounded-sm"
      >
        <Image
          className=" dark:invert"
          alt=""
          src={StrikeThrough}
          height={15}
        />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className=" h-full aspect-square rounded-sm"
      >
        <Image className=" dark:invert" alt="" src={ListBullet} height={15} />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        className=" h-full aspect-square rounded-sm"
      >
        <Image className=" dark:invert" alt="" src={ListNumber} height={15} />
      </Toggle>
      <div className=" relative">
        <Toggle
          size={"sm"}
          pressed={activeImagePrompt}
          onPressedChange={() => setActiveImagePrompt(!activeImagePrompt)}
          className=" h-full aspect-square rounded-sm"
        >
          <ImageDown />
        </Toggle>
        {activeImagePrompt && (
          <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 , y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y : -10 }}
           className=" w-40 h-10 absolute -left-8 top-9 bg-white shadow-lg z-50"
           >
            <Input
              value={imageValue}
              onChange={(e) => setImageValue(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && imageValue !== "") {
                  editor.chain().focus().setImage({ src: imageValue }).run();
                  setActiveImagePrompt(false);
                  setImageValue("")
                }
              }}
              placeholder="Enter image URL"
              className=" w-[300px] h-full bg-white"
            />
          </motion.div>
          </AnimatePresence>
        )}
      </div>

      <Toggle
        size={"sm"}
        pressed={false}
        onPressedChange={() => editor?.chain().focus().insertTable({ rows: 2, cols: 2}).run()}
        className=" h-full aspect-square rounded-sm"
        >
        <Table />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={false}
        onPressedChange={() => editor?.chain().focus().addRowAfter().run()}
        className=" h-full aspect-square rounded-sm"
        >
        <BetweenHorizonalStart />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={false}
        onPressedChange={() =>    editor?.chain().focus().addColumnAfter().run()}
        className=" h-full aspect-square rounded-sm"
      >
        <BetweenVerticalStart />
      </Toggle>
    </div>
  );
}
