"use client"
import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface CopyButtonProps {
  text: string;
  short?: boolean
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('copy text successfully')
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className=' flex items-center  gap-3 max-w-[500px] w-full'>
      <PasswordInput value={text} readOnly className=' min-w-full' />
      <Button
      size={'sm'}
        onClick={handleCopy}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        {
          (copied ? "Copied!" : "Copy")
        }
      </Button>
    </div>
  );
}
