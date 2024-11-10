import Bold from '@/assets/bold-text.png'
import Italic from '@/assets/italics.png'
import ListBullet from '@/assets/menu.png'
import StrikeThrough from '@/assets/strike-through.png'
import ListNumber from '@/assets/text.png'
import { Toggle } from '@/components/ui/toggle'
import { type Editor } from '@tiptap/react'
import Image from 'next/image'

interface props {
  editor: Editor | null
}

export default function Toolbar({ editor }: props) {

  if (!editor) {
    return <p className=' p-2 text-sm text-muted-foreground font-medium'>editor not attend!</p>
  }

  return (
    <div className=' border mb-2 h-12 flex items-center'>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className=' h-full font-bold aspect-square rounded-sm'
      >
        H1
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className=' h-full font-bold aspect-square rounded-sm'
      >
        H2
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className=' h-full aspect-square rounded-sm'
      >
        <Image alt='' src={Bold} height={15} />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className=' h-full aspect-square rounded-sm'
      >
        <Image alt='' src={Italic} height={15} />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        className=' h-full aspect-square rounded-sm'
      >
        <Image alt='' src={StrikeThrough} height={15} />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className=' h-full aspect-square rounded-sm'
      >
        <Image alt='' src={ListBullet} height={15} />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        className=' h-full aspect-square rounded-sm'
      >
        <Image alt='' src={ListNumber} height={15} />
      </Toggle>
    </div>
  )
}
