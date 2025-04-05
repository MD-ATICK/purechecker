"use client"

import packingImage from '@/assets/result.png';
import CommandCard from "@/components/api/CommandCard";
import { TerminalCodeBlock } from "@/components/api/TerminalBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { bulkResult, codeSnippets, languages, LanguagesType, singleResult } from "./data";

export default function ApiDocs() {

    const [activeLanguage, setActiveLanguage] = useState<LanguagesType>("Java");

    return (
        <div className=" py-10 space-y-2 ">

            <div className="  text-yellow-500 text-xs sm:text-sm flex text-start gap-3">
                <div className=" h-4 aspect-square">
                    <Info size={16} className="" />
                </div>
                <span>You can get your USER_ID from your dashboard Api Section.
                    <Link href={'/user/api'} className=" underline">Go now</Link>
                </span>
            </div>

            <div className="  text-yellow-500 text-xs sm:text-sm flex text-start gap-3">
                <div className=" h-4 aspect-square">
                    <Info size={16} className="" />
                </div>
                <span>
                    You can get your SECRET_ID from your dashboard Api. But Create will be decreased by 1 from which you use secret_key in your fetch request.
                    <Link href={'/user/api'} className=" underline">Go now</Link>
                </span>
            </div>

            <br />

            <Tabs className="" defaultValue={activeLanguage}>
                <TabsList className=" h-auto w-full gap-2">
                    {
                        languages.map(lan => (
                            <TabsTrigger
                                key={lan}
                                value={lan}
                                className=" h-10 hover:bg-background max-w-32"
                                onClick={() => setActiveLanguage(lan)}
                            >
                                {lan}
                            </TabsTrigger>
                        ))
                    }
                </TabsList>
                <TabsContent value={activeLanguage} className=''>
                    <TerminalCodeBlock codeSnippet={codeSnippets.find(cs => cs.language === activeLanguage)!} />
                </TabsContent>
            </Tabs>

            <div className=" mt-12">
                <div className="flex items-center gap-3">
                    <Image src={packingImage} height={30} width={30} alt="" className=' dark:invert' />
                    <p className=" text-green-500  text-start">Single Email Response : </p>
                </div>
                <CommandCard command={singleResult} />
            </div>
            <div className=" mt-12">
                <div className="flex items-center gap-3">
                    <Image src={packingImage} height={30} width={30} alt="" className=' dark:invert' />
                    <p className=" text-green-500 text-start">Bulk Email Response : </p>
                </div>
                <CommandCard command={bulkResult} />
            </div>
        </div>
    )
}
