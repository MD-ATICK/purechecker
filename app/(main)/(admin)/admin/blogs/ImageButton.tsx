import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/core';
import { Toggle } from '@/components/ui/toggle';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageDown } from 'lucide-react';

interface ImageButtonProps {
  editor: Editor;
}

export const ImageButton = ({ editor }: ImageButtonProps) => {
  const [activeImagePrompt, setActiveImagePrompt] = useState(false);
  const [imageValue, setImageValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<{ from: number; to: number } | null>(null);

  const handleImageToggle = () => {
    // Save current cursor position
    if (editor.view.hasFocus()) {
      selectionRef.current = {
        from: editor.state.selection.from,
        to: editor.state.selection.to,
      };
    }
    setActiveImagePrompt(!activeImagePrompt);
  };

  useEffect(() => {
    if (activeImagePrompt) {
      // Focus input with slight delay
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [activeImagePrompt]);

  const insertImage = () => {
    if (!imageValue.trim()) return;

    // Restore cursor position if available
    if (selectionRef.current) {
      editor.commands.setTextSelection(selectionRef.current);
    }

    // Insert image at current position
    editor
      .chain()
      .focus()
      .setImage({ 
        src: imageValue.trim(),
        alt: 'User uploaded image',
        title: '',
      })
      .run();

    setActiveImagePrompt(false);
    setImageValue('');
  };

  return (
    <div className="relative">
      <Toggle
        size="sm"
        pressed={activeImagePrompt}
        onPressedChange={handleImageToggle}
        className="h-full aspect-square rounded-sm"
        aria-label="Insert image"
      >
        <ImageDown className="w-4 h-4" />
      </Toggle>

      <AnimatePresence>
        {activeImagePrompt && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-9 bg-white shadow-lg z-50 p-1 rounded-md"
          >
            <div className="flex flex-col gap-1">
              <Input
                ref={inputRef}
                value={imageValue}
                onChange={(e) => setImageValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') insertImage();
                  if (e.key === 'Escape') setActiveImagePrompt(false);
                }}
                placeholder="https://example.com/image.jpg"
                className="w-64 h-8"
              />
              <button 
                onClick={insertImage}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Press Enter to insert
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};