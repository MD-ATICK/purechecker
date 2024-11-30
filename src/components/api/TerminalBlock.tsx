import { Copy } from "lucide-react";
import { useState } from "react";

interface TerminalCodeBlockProps {
    command: string;
}

export function TerminalCodeBlock({ command }: TerminalCodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gray-900 overflow-auto justify-between  text-gray-300 rounded-md p-4 my-7 shadow-md">
            {/* MacOS-like header */}
            <div className="flex items-center gap-2 pb-4">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>

            {/* Command */}
            <div className="flex items-start justify-between">
                <pre className="  text-start w-full">
                    <code>
                        {command}
                    </code>
                </pre>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 bg-gray-800 text-white rounded-md px-2 py-1 text-xs shadow-sm hover:bg-gray-700"
                >
                    {copied ? "Copied!" : <Copy size={14} />}
                </button>
            </div>
        </div>
    );
}
