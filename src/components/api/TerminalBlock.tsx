import apiImage from '@/assets/api.png';
import packingImage from '@/assets/packaging.png';
import Image from "next/image";
import CommandCard from "./CommandCard";

interface TerminalCodeBlockProps {
    command: {
        installs: string[];
        singleCheck: string;
        bulkCheck: string;
    };
}

export function TerminalCodeBlock({ command }: TerminalCodeBlockProps) {


    return (
        <div className=' space-y-6 py-4'>
            <div>
                <div className="flex items-center gap-3">
                    <Image src={packingImage} height={20} width={20} alt="" className=' dark:invert' />
                    <p className=" text-gray-500 text-sm text-start">Installation Packages</p>
                </div>
                {
                    command.installs.map((install, index) => (
                        <CommandCard key={index} command={install} />
                    ))
                }
            </div>

            {/* Single Command */}
            <div>
                <div className="flex items-center gap-3">
                    <Image src={apiImage} height={20} width={20} alt="" className=' dark:invert' />
                    <p className=" text-gray-500 text-sm text-start">Single Email Checking Api</p>
                </div>
                <CommandCard command={command.singleCheck} />
            </div>

            {/* Bulk Command */}
            <div>
                <div className="flex items-center gap-3">
                    <Image src={apiImage} height={20} width={20} alt="" className=' dark:invert' />
                    <p className=" text-gray-500 text-sm text-start">Bulk Emails Checking Api</p>
                </div>
                <CommandCard command={command.bulkCheck} />
            </div>

        </div>
    );
}
