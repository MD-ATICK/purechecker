import apiImage from '@/assets/api.png';
import packingImage from '@/assets/packaging.png';
import Image from "next/image";
import CommandCard from "./CommandCard";

interface TerminalCodeBlockProps {
    codeSnippet: {
        language: string,
        installs: string[];
        singleCheck: string;
        bulkCheck: string;
    };
}

export function TerminalCodeBlock({ codeSnippet }: TerminalCodeBlockProps) {


    return (
        <div className=' space-y-6 py-4'>
            <div>
                {
                    codeSnippet.installs.length > 0 &&
                <div className="flex items-center gap-3">
                    <Image src={packingImage} height={20} width={20} alt="" className=' dark:invert' />
                    <p className=" text-gray-500 text-sm text-start">Installation Packages ({codeSnippet.language})</p>
                </div>
                }
                {
                    codeSnippet.installs.map((install, index) => (
                        <CommandCard key={index} command={install} />
                    ))
                }
            </div>

            {/* Single Command */}
            <div>
                <div className="flex items-center gap-3">
                    <Image src={apiImage} height={20} width={20} alt="" className=' dark:invert' />
                    <p className=" text-gray-500 text-sm text-start">Single Email Checking Api ({codeSnippet.language})</p>
                </div>
                <CommandCard command={codeSnippet.singleCheck} />
            </div>

            {/* Bulk Command */}
            <div>
                <div className="flex items-center gap-3">
                    <Image src={apiImage} height={20} width={20} alt="" className=' dark:invert' />
                    <p className=" text-gray-500 text-sm text-start">Bulk Emails Checking Api ({codeSnippet.language})</p>
                </div>
                <CommandCard command={codeSnippet.bulkCheck} />
            </div>

        </div>
    );
}
