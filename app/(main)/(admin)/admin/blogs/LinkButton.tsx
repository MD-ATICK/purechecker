import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/core';
import { Toggle } from '@/components/ui/toggle';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'lucide-react';

interface LinkButtonProps {
  editor: Editor;
}

export const LinkButton = ({ editor }: LinkButtonProps) => {
  const [activeLinkPrompt, setActiveLinkPrompt] = useState(false);
  const [linkValue, setLinkValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<{ from: number; to: number } | null>(null);

  const handleLinkToggle = () => {
    // Save selection only when editor has focus
    if (editor.view.hasFocus()) {
      selectionRef.current = {
        from: editor.state.selection.from,
        to: editor.state.selection.to,
      };
    }
    setActiveLinkPrompt(!activeLinkPrompt);
  };

  useEffect(() => {
    if (activeLinkPrompt) {
      // Focus input with slight delay to ensure popup is rendered
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [activeLinkPrompt]);

  const applyLink = () => {
    if (!linkValue.trim()) return;

    // First focus the editor to ensure selection can be restored
    editor.commands.focus();

    // Restore selection if we have it
    if (selectionRef.current) {
      editor.commands.setTextSelection(selectionRef.current);
    }

    // Apply the link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: linkValue.trim(),
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'editor-link',
      })
      .run();

    setActiveLinkPrompt(false);
    setLinkValue('');
  };

  return (
    <div className="relative">
      <Toggle
        size="sm"
        pressed={activeLinkPrompt}
        onPressedChange={handleLinkToggle}
        className="h-full aspect-square rounded-sm"
        aria-label="Insert link"
      >
        <Link className="w-4 h-4" />
      </Toggle>

      <AnimatePresence>
        {activeLinkPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-9 bg-white shadow-lg z-50 p-1 rounded-md"
          >
            <Input
              ref={inputRef}
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') applyLink();
                if (e.key === 'Escape') setActiveLinkPrompt(false);
              }}
              onBlur={() => setTimeout(() => setActiveLinkPrompt(false), 200)}
              placeholder="https://example.com"
              className="w-64 h-8"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};