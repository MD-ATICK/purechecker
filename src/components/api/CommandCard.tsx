"use client"

import { Copy } from "lucide-react";
import { useState } from "react";

export default function CommandCard({ command }: { command: string }) {

    const [copied, setCopied] = useState(false);

    const handleCopy = (selectedCommand: string) => {
        navigator.clipboard.writeText(selectedCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gray-900 overflow-auto justify-between  text-gray-300 rounded-md p-4 my-7 shadow-md">
            <div className="flex justify-between items-center">

                {/* MacOS-like header */}
                <div className="flex items-center gap-2 pb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>

                {/* Command */}
                <button
                    onClick={() => handleCopy(command)}
                    className="flex items-center gap-1 bg-gray-800 text-white rounded-md px-2 py-1 text-xs shadow-sm hover:bg-gray-700"
                >
                    {copied ? "Copied!" : <Copy size={14} />}
                </button>
            </div>
            <div className="flex items-start px-4 w-full overflow-auto my-4 justify-between">
                <pre className="  text-start text-sm font-medium md:text-lg w-full">
                    <code className=" text-sm">
                        {command}
                    </code>
                </pre>
            </div>
        </div>
    )
}
